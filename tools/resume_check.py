#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""简历自检脚本 —— 等价于《AI Agent 简历编写指南》里那个 resume_storytelling_check.py，
但对着**这份简历的真实口径**检查，而不是通用套路。

它不替你写简历，只做四件事：
  1. 找空泛（缺量化指标、缺「背景·动作·结果·复盘」的维度）；
  2. 找弱表达（负责 / 参与 / 熟悉、大幅提升这类无法验证的副词）；
  3. 守住已经踩过的坑（口径守卫）：混合检索、Neo4j 图谱、验证码、
     「平台定级」、过期数字、年龄口径 —— 这些一旦写回去就是可被查证的虚假陈述；
  4. 查中英同步与 PDF/HTML 漂移（data.js 改了、投递 PDF 没跟着改是高频事故）。

用法：
  python3 tools/resume_check.py --mode resume              # 检查 js/data.js + 两份岗位 HTML
  python3 tools/resume_check.py --mode resume --online     # 顺带用 gh api 复核 star/commit 是否过期
  python3 tools/resume_check.py --mode resume --json       # 机器可读，便于挂 pre-commit
  python3 tools/resume_check.py --mode story  --file talk.md   # 检查项目讲述稿
  echo "基于 LangGraph……" | python3 tools/resume_check.py --mode story

退出码：有 error 返回 1，否则 0（可直接当提交门禁）。
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent          # Resume/
DATA_JS = ROOT / "js" / "data.js"
# 投递版 PDF 的 HTML 源（仓库外）：<工作区>/documents/interview/
INTERVIEW_DIR = ROOT.parents[2] / "documents" / "interview"
HTML_FILES = [
    INTERVIEW_DIR / "resume-aiagent.html",
    INTERVIEW_DIR / "resume-fullstack.html",
    INTERVIEW_DIR / "resume-crawler.html",
]
# 内容独立于 data.js 的岗位版本：仍受口径守卫、字体栈与数字漂移检查约束，
# 但不要求覆盖 data.js 里那批项目（它们换的是另一套项目集）。
STANDALONE_HTML = {"resume-crawler.html"}

# ---------------------------------------------------------------- 词表

# 量化指标：数字 + 单位/语境。刻意收窄，避免把「2020.09」这类日期算成指标。
METRIC = re.compile(
    r"\d+(?:\.\d+)?\s*(?:%|％|条|例|次|个|张|段|轮|万|秒|分钟|字符|字节|行|"
    r"ms|s\b|Star|stars|★|Fork|forks|commits|commit|ADR|迁移|端点|用例)"
    # 中文数字 + 单位（「两条回复」「三类能力」也是量化约束）
    r"|[一二两三四五六七八九十百千]+\s*(?:条|例|次|个|张|段|轮|层|类|家|份|组|倍|成)"
    # 英文数词
    r"|\b(?:one|two|three|four|five|six|seven|eight|nine|ten|twelve)\b",
    re.I,
)
# 弱动词：简历里出现就等于把贡献边界写糊了。
WEAK_VERB = re.compile(r"^(负责|参与|熟悉|了解|协助|帮助|配合|支持|学习|接触|尝试|跟进)")
# 无法验证的副词 —— README 写作口径第 2 条明令禁止。
HYPE = re.compile(r"(大幅|显著|极大|巨大|优秀|丰富|深入|精通|全面|高效|强大|完美|业界领先|遥遥领先|顶尖)")
# 技术动作：判断「动作」维度是否交代了怎么做。
ACTION = re.compile(
    r"(基于|设计|实现|引入|下沉|编排|构建|搭建|接入|重构|抽取|装配|自建|改造|"
    r"维护|迁移|拆分|打通|沉淀|抽象|定位|排查|修复|约束|审计|校验|评估|评测|"
    r"designed|implemented|built|introduced|migrated|orchestrat|refactor|assembl|"
    r"audit|validat|evaluat|deployed|distilled|pushed down|enforce)",
    re.I,
)
# 复盘/边界：指南要求「每个项目能讲清楚背景、动作、结果、复盘」。
REFLECT = re.compile(
    r"(未接|未做|尚未|待做|待补|待|边界|局限|不宣称|不编|不写|下一步|后续|"
    r"代价是|取舍|风险|盲评|对照|当前不支持|暂不|仍待|回放|replay|"
    r"not yet|not wired|deliberately|limitation|boundary|trade-?off|out of scope|"
    r"next step|does not claim|nothing reported|pending)",
    re.I,
)

# ---------------------------------------------------------------- 口径守卫
# 每条都是**已经踩过或差点踩**的坑，写成断言，改回去就直接报错。
GUARDS: list[tuple[str, re.Pattern, str, str]] = [
    (
        "error",
        re.compile(r"混合检索|hybrid\s+RAG|hybrid\s+retrieval", re.I),
        "墨枢口径：不写「混合检索」。rag_service.hybrid_search 目前是向量检索 + 元数据过滤，"
        "没有 BM25 / 关键词分支（Moshu/ARCHITECTURE.md 第 10 节自述「hybrid 名不副实」）。"
        "改回「RAG 检索（向量库 + 元数据过滤 + 作用域受权）」。",
    ),
    (
        "error",
        re.compile(r"Neo4j|neo4j|知识图谱", re.I),
        "墨枢口径：不写「Neo4j / 知识图谱」。Neo4j 是可选演进方向，仓库代码 0 引用，"
        "面试官搜一下就能推翻。",
    ),
    (
        "error",
        re.compile(r"平台定级|已定级|获.{0,6}定级|4\s*高危|高危定级"),
        "SRC 口径：只能写「报送」，不能写「定级」。6 份报告的等级是自评，"
        "平台实际定级的只有 1 个（中危）。",
    ),
    (
        "error",
        re.compile(r"精确召回|每层都是带来源元数据的记忆块"),
        "分层记忆口径：四层不是同一种取用方式，不能统称「精确召回」。原文 + 主角/物品状态"
        "是按写作位置「精确读取」（valid_from/valid_to + source_refs，状态不能靠相似度或"
        "出现频次决定）；只有情节（L1 简介 / L2 大纲）才是召回。"
        "依据 Moshu/docs/design/记忆分层设计.md §7。",
    ),
    (
        "error",
        re.compile(r"\b19\s*岁|2007"),
        "年龄口径：简历只写「24 岁 · 2002」。身份证 2007 属户籍晚报，"
        "按 interview/01 的 30 秒口径口头解释，不写进简历。",
    ),
    (
        "error",
        re.compile(r"13\s*岁入学"),
        "年龄口径：从身份证倒推出的「13 岁入学」是从未发生过的事实，说一次崩一次。",
    ),
]

# 「易腐数字」：每天都在变，投递前必须复核。--online 会在线校验。
PERISHABLE = re.compile(r"\d+\s*(?:Star|stars|★|Fork|forks|次提交|commits?)\b", re.I)

# ---------------------------------------------------------------- 工具


def die(msg: str, code: int = 2) -> None:
    print(f"resume_check: {msg}", file=sys.stderr)
    raise SystemExit(code)


def load_data_js(path: Path) -> dict:
    """用 node 读 js/data.js（它是给浏览器用的脚本，不能直接 import）。"""
    node = shutil.which("node")
    if not node:
        die("找不到 node，无法解析 js/data.js")
    js = (
        "global.window={};"
        f"require({json.dumps(str(path))});"
        "process.stdout.write(JSON.stringify(global.window.RESUME_DATA));"
    )
    out = subprocess.run([node, "-e", js], capture_output=True, text=True)
    if out.returncode != 0:
        die(f"node 解析 data.js 失败：{out.stderr.strip()[:300]}")
    return json.loads(out.stdout)


def text_of_project(p: dict) -> str:
    return " ".join([p.get("desc", ""), *p.get("points", []), p.get("result", "")])


def mask_comments(text: str) -> str:
    """把注释替换成等长空白（保留换行），这样口径守卫不会误伤「口径说明本身」，
    同时报错行号仍然与文件一致。"""
    def blank(m: re.Match) -> str:
        return re.sub(r"[^\n]", " ", m.group(0))

    text = re.sub(r"/\*.*?\*/", blank, text, flags=re.S)
    text = re.sub(r"<!--.*?-->", blank, text, flags=re.S)
    return re.sub(r"^(\s*)//.*$", blank, text, flags=re.M)


def claims(text: str) -> dict[str, set[str]]:
    """抽取易腐数字声明并归一化：
    「54 Star」「49 stars」「12★」→ 54star / 12star；「285 次提交」「271 commits」→ 285commit。"""
    out: dict[str, set[str]] = {"star": set(), "fork": set(), "commit": set()}
    for m in PERISHABLE.finditer(text):
        raw = re.sub(r"\s+", "", m.group(0)).lower()
        num = re.match(r"\d+", raw).group(0)
        if "star" in raw or "★" in raw:
            out["star"].add(num)
        elif "fork" in raw:
            out["fork"].add(num)
        elif "commit" in raw or "次提交" in raw:
            out["commit"].add(num)
    return out


def flat_claims(text: str) -> set[str]:
    c = claims(text)
    return {f"{n}star" for n in c["star"]} | {f"{n}fork" for n in c["fork"]} | {
        f"{n}commit" for n in c["commit"]
    }


class Report:
    def __init__(self) -> None:
        self.errors: list[str] = []
        self.warnings: list[str] = []
        self.suggestions: list[str] = []
        self.notes: dict[str, object] = {}

    def error(self, msg: str) -> None:
        self.errors.append(msg)

    def warn(self, msg: str) -> None:
        self.warnings.append(msg)

    def suggest(self, msg: str) -> None:
        self.suggestions.append(msg)

    @property
    def score(self) -> int:
        return max(0, 100 - 12 * len(self.errors) - 4 * len(self.warnings))


# ---------------------------------------------------------------- resume 模式


def check_guards(rep: Report, blobs: dict[str, str]) -> None:
    for where, text in blobs.items():
        # 注释里允许出现这些词（口径说明本身就要提到它们），所以先掩掉注释再扫。
        code = mask_comments(text)
        for level, pattern, msg in GUARDS:
            for m in pattern.finditer(code):
                snippet = code[max(0, m.start() - 24) : m.end() + 24].replace("\n", " ")
                line_no = code[: m.start()].count("\n") + 1
                (rep.error if level == "error" else rep.warn)(
                    f"[口径守卫] {where}:{line_no} 命中「{m.group(0)}」—— {msg}\n"
                    f"            …{snippet.strip()}…"
                )

    # 验证码：只查值，不查注释。
    for lang in ("zh", "en"):
        verify = (DATA.get(lang, {}).get("education") or {}).get("verify") or {}
        for field in ("code", "reportUrl"):
            if str(verify.get(field) or "").strip():
                rep.error(
                    f"[口径守卫] data.js {lang}.education.verify.{field} 非空——"
                    "本站是公开 GitHub Pages，验证码会被爬虫抓走；且备案表出生日期可能显示 2007，"
                    "与「24 岁 · 2002」当场冲突。投递时临时填入 → 导出 PDF → 立即清空。"
                )


def check_projects(rep: Report, lang: str) -> None:
    projects = DATA[lang]["projects"]
    rep.notes.setdefault("projects", {})[lang] = len(projects)
    for p in projects:
        name = p.get("name", "?")
        body = text_of_project(p)
        points = p.get("points", [])

        # ① 量化指标
        if not METRIC.search(body):
            rep.warn(f"[{lang}] 项目「{name}」没有任何量化指标 —— 指南自检清单第 1 条。")

        # ② 维度完整性：场景 / 动作 / 结果 / 复盘
        missing = []
        if not p.get("desc"):
            missing.append("场景")
        if not ACTION.search(body):
            missing.append("动作")
        if not METRIC.search(body) and not p.get("result"):
            missing.append("结果")
        if not REFLECT.search(body):
            missing.append("复盘/边界")
        if missing:
            rep.warn(f"[{lang}] 项目「{name}」缺维度：{'、'.join(missing)}")

        # ③ 弱动词：只在 bullet 开头判，句中「负责」是正常叙述
        for i, pt in enumerate(points):
            if WEAK_VERB.match(pt.strip()):
                rep.warn(f"[{lang}] 「{name}」第 {i + 1} 条以弱动词开头：{pt[:28]}…")

        # ④ 无法验证的副词
        for m in HYPE.finditer(body):
            rep.warn(f"[{lang}] 「{name}」出现无法验证的副词「{m.group(0)}」—— 改写成机制或数字。")

        # ⑤ 投递 PDF 需要仓库直达链接
        if not p.get("link") and "http" not in str(p.get("result", "")):
            rep.suggest(f"[{lang}] 「{name}」没有仓库链接，投递版 PDF 加不上可点链接。")


def check_bilingual(rep: Report) -> None:
    """zh / en 字段必须完全对齐 —— 只改一份是这份简历最常见的事故。"""
    zh, en = DATA["zh"], DATA["en"]
    if len(zh["projects"]) != len(en["projects"]):
        rep.error(f"中英项目数不一致：zh={len(zh['projects'])} en={len(en['projects'])}")
    for i, (a, b) in enumerate(zip(zh["projects"], en["projects"])):
        if len(a.get("points", [])) != len(b.get("points", [])):
            rep.error(
                f"项目 {i + 1}「{a.get('name')}」中英 bullet 数不一致："
                f"{len(a.get('points', []))} vs {len(b.get('points', []))}"
            )
    for key in ("skills", "advantages", "experiences"):
        if len(zh[key]) != len(en[key]):
            rep.error(f"中英 {key} 条数不一致：{len(zh[key])} vs {len(en[key])}")
    if len(zh["contacts"]) != len(en["contacts"]):
        rep.error("中英 contacts 条数不一致")


def check_html_sync(rep: Report, raw: str) -> None:
    """投递 PDF（HTML 源）与 data.js 漂移检测 —— 改了数据源没重导 PDF 是高频事故。"""
    existing = [p for p in HTML_FILES if p.exists()]
    if not existing:
        rep.suggest("没找到岗位 HTML 简历，跳过 PDF 漂移检查。")
        return
    src_numbers = flat_claims(raw)
    for path in existing:
        text = path.read_text(encoding="utf-8")
        html_numbers = flat_claims(text)
        # 投递版里出现了数据源里已经没有的数字 = 过期 PDF，必须重导。
        if only_html := html_numbers - src_numbers:
            rep.error(
                f"{path.name} 里有 data.js 中已不存在的数字：{sorted(only_html)}"
                "（多半是改了 data.js 没重导 PDF）"
            )
        # 数据源有、投递版没有 = 可能是有意取舍，也可能漏了，交给作者判断。
        if only_src := src_numbers - html_numbers:
            rep.suggest(
                f"{path.name} 未包含 data.js 里的数字：{sorted(only_src)}"
                "（确认是有意取舍，还是漏同步）"
            )
        # 项目名是否都进了投递版
        # （内容独立于 data.js 的岗位版本不要求覆盖同一批项目 —— 它们本来就换了项目集）
        if path.name in STANDALONE_HTML:
            continue
        for p in DATA["zh"]["projects"]:
            key = re.split(r"[·（(]", p["name"])[0].strip()
            if key and key not in text:
                rep.warn(f"{path.name} 里没有项目「{key}」——确认是有意取舍还是漏了。")


def check_online(rep: Report, raw: str) -> None:
    """用 gh api 复核实测数字。star / commit 每天都在变，投递前必须跑一次。"""
    if not shutil.which("gh"):
        rep.suggest("没装 gh，跳过在线复核（--online）。")
        return
    repos = sorted(set(re.findall(r"github\.com/([\w.-]+/[\w.-]+)", raw)))
    repos = [r for r in repos if not r.endswith(".git")]
    if not repos:
        return
    actual_stars: set[str] = set()
    actual_commits: set[str] = set()
    for repo in repos:
        info = subprocess.run(
            ["gh", "api", f"repos/{repo}", "--jq", "[.stargazers_count, .forks_count] | @tsv"],
            capture_output=True, text=True,
        )
        if info.returncode != 0:
            rep.suggest(f"在线复核跳过 {repo}：{info.stderr.strip().splitlines()[:1]}")
            continue
        stars, forks = info.stdout.strip().split("\t")
        actual_stars |= {f"{stars}star", f"{forks}fork"}

        head = subprocess.run(
            ["gh", "api", f"repos/{repo}/commits?per_page=1", "-i"],
            capture_output=True, text=True,
        )
        m = re.search(r'[?&]page=(\d+)>; rel="last"', head.stdout)
        commits = m.group(1) if m else "1"
        actual_commits.add(f"{commits}commit")
        print(f"  · {repo}: {stars}★ / {forks} fork / {commits} commits", file=sys.stderr)

    claimed = flat_claims(raw)
    actual = actual_stars | actual_commits
    if stale := claimed - actual:
        rep.error(
            f"在线复核发现已过期或对不上的数字：{sorted(stale)}"
            f"（实测：{sorted(actual)}）—— 同步 data.js 与两份 HTML，然后重导 PDF。"
        )
    rep.notes["online"] = {"repos": repos, "actual": sorted(actual), "claimed": sorted(claimed)}


def check_pdf_fonts(rep: Report, blobs: dict[str, str]) -> None:
    """投递版字体栈守卫：Arial/PingFang 等苹果受限字体被 Chrome 导出时会退化成 Type3 轮廓，
    反向映射把「用 / 工 / 生 / 自」等常用字映射到康熙部首码位（⽤ ⼯ ⽣ ⾃），
    结果是 ATS 搜不到「应用开发」「工程师」这类关键词 —— 实测 10 个 JD 关键词只中 1 个。
    STHeiti 可被正常内嵌为 TrueType 子集，抽取干净。"""
    for name, text in blobs.items():
        if not name.endswith(".html"):
            continue
        m = re.search(r"font-family:\s*([^;]+);", text)
        if not m:
            continue
        stack = m.group(1)
        if "PingFang" in stack and ("STHeiti" not in stack or stack.index("PingFang") < stack.index("STHeiti")):
            rep.error(
                f"{name} 的字体栈把 PingFang 排在 STHeiti 前面 —— 导出 PDF 会退化成 Type3，"
                "常用字被映射成康熙部首码位，ATS 关键词（应用开发 / 工程师 / 项目…）搜不到。"
                "改成 font-family: \"STHeiti\", \"PingFang SC\", …"
            )


def run_resume(rep: Report, online: bool) -> None:
    raw = DATA_JS.read_text(encoding="utf-8")
    blobs = {"data.js": raw}
    for path in HTML_FILES:
        if path.exists():
            blobs[path.name] = path.read_text(encoding="utf-8")

    check_guards(rep, blobs)
    check_pdf_fonts(rep, blobs)
    for lang in ("zh", "en"):
        check_projects(rep, lang)
    check_bilingual(rep)
    check_html_sync(rep, raw)
    if online:
        check_online(rep, raw)

    if not rep.warnings and not rep.errors:
        rep.suggest("保留当前写法，面试时准备架构图、评估集构造和失败案例。")
    rep.suggest("投递前跑一次 --online，star / commit 会变；变了的数字要同步 HTML 并重导 PDF。")


# ---------------------------------------------------------------- story 模式

STORY_TALK = re.compile(r"(客户|业务|场景|问题|痛点|需求|背景|当时)")
STORY_ACT = re.compile(r"(我(?:负责|做|设计|实现|改|加|写|拆|定)|然后|具体做法|方案是|我把它|我把)")
STORY_RESULT = re.compile(r"(结果|最后|上线|提升|下降|降到|通过率|命中|完成|交付|付费|验收)")
HEDGE = re.compile(r"(大概|应该是|好像是|差不多|可能吧|反正是)")
FILLER = re.compile(r"(然后然后|就是说|那个那个)")


def run_story(rep: Report, text: str) -> None:
    text = text.strip()
    if not text:
        die("story 模式没有输入：用 --file 或管道喂一段讲述稿。")
    n = len(re.sub(r"\s", "", text))
    rep.notes["chars"] = n

    if n < 120:
        rep.warn(f"讲述稿只有 {n} 字，太短：面试官 20 秒就能听出你没内容（建议 150–400 字）。")
    if n > 600:
        rep.warn(f"讲述稿 {n} 字，太长：手机上念不完，先砍到 400 字以内。")

    for label, pattern, fix in (
        ("背景/场景", STORY_TALK, "先说清是什么业务、谁在痛，别一上来讲技术栈。"),
        ("动作", STORY_ACT, "必须出现「我」的动作，否则听起来像在讲别人的项目。"),
        ("结果", STORY_RESULT, "要有一个可核对的结果（指标 / 上线 / 交付 / 付费）。"),
        ("复盘", REFLECT, "结尾补一句边界或下一步：哪里没做好、下一步怎么做。"),
    ):
        if not pattern.search(text):
            rep.warn(f"讲述稿缺「{label}」—— {fix}")

    if not METRIC.search(text):
        rep.warn("讲述稿里没有任何数字 —— 面试官会认为这件事没有可验证的结果。")

    for m in HYPE.finditer(text):
        rep.warn(f"出现无法验证的副词「{m.group(0)}」，换成具体机制或数字。")
    for m in HEDGE.finditer(text):
        rep.warn(f"不确定措辞「{m.group(0)}」—— 会直接削弱可信度，要么确定地说，要么说不知道。")
    for m in FILLER.finditer(text):
        rep.warn(f"口语填充「{m.group(0)}」，删掉。")
    for guard_level, pattern, msg in GUARDS:
        for m in pattern.finditer(text):
            rep.error(f"[口径守卫] 讲述稿命中「{m.group(0)}」—— {msg}")

    if not rep.errors and not rep.warnings:
        rep.suggest("四段式齐全、有数字、无空泛副词 —— 可以出声念一遍掐时间。")


# ---------------------------------------------------------------- 入口


def main() -> int:
    ap = argparse.ArgumentParser(description="简历 / 项目讲述稿自检")
    ap.add_argument("--mode", choices=["resume", "story"], default="resume")
    ap.add_argument("--file", help="story 模式的输入文件（省略则读 stdin）")
    ap.add_argument("--online", action="store_true", help="用 gh api 复核 star / commit 是否过期")
    ap.add_argument("--json", action="store_true", help="输出 JSON")
    args = ap.parse_args()

    global DATA
    rep = Report()

    if args.mode == "resume":
        if not DATA_JS.exists():
            die(f"找不到 {DATA_JS}")
        DATA = load_data_js(DATA_JS)
        run_resume(rep, args.online)
    else:
        DATA = {}
        text = Path(args.file).read_text(encoding="utf-8") if args.file else sys.stdin.read()
        run_story(rep, text)

    if args.json:
        print(json.dumps(
            {"score": rep.score, "errors": rep.errors, "warnings": rep.warnings,
             "suggestions": rep.suggestions, "notes": rep.notes},
            ensure_ascii=False, indent=2,
        ))
    else:
        print(f"score: {rep.score}")
        print(f"errors: {len(rep.errors)}")
        for e in rep.errors:
            print(f"- ❌ {e}")
        print(f"warnings: {len(rep.warnings)}")
        for w in rep.warnings:
            print(f"- ⚠️  {w}")
        print("suggestions:")
        for s in rep.suggestions:
            print(f"- {s}")

    return 1 if rep.errors else 0


DATA: dict = {}

if __name__ == "__main__":
    raise SystemExit(main())
