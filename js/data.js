/* =========================================================
   简历数据 —— 改简历只需要改这个文件
   （终端展示与打印版共用同一份数据，改一处全局生效）

   i18n：数据按语言分包 —— zh（中文）与 en（英文）。
   两份字段完全一致，改内容时记得两份同步改；
   页面语言可用 lang 命令 / 右上角按钮切换，或加 ?lang=en。

   写作口径（重要，改之前先读）：
   1. 技能按目标岗位权重排序：AI Agent → LLM 工程 → 安全 → 后端系统 → 业务。
   2. 只写能当场被面试官追问到底的事实，不写「大幅提升」这类无法验证的副词。
      没有实测数字就写机制（能讲清怎么做到的），不编量级。
   3. 年龄以真实出生年份为准（2002）。身份证登记为 2007，属户籍晚报，
      二者差 5 岁——被问到时按 interview/ 里的口径解释，不要写进简历。
   4. 【SRC 口径 · 不要改回去】漏洞数量写作「报送」，不写「定级」。
      Hunt/reports/ 里 6 份报告的「漏洞等级」是自评，不是平台给的；
      **平台认证/定级的只有 1 个 —— 就是那个 JWT alg=none 会话伪造（越权读员工数据）**，
      其余 5 个是「已报送、未定级」，不要写成 6 个都被认可。
      写「获平台定级确认（4 高危）」属于可被查证的虚假陈述。
   5. 【墨枢口径 · 不要改回去】不写「RAG 混合检索」，也不写「Neo4j 知识图谱」：
      当前实现是 Chroma 向量 + 元数据过滤（rag_service.hybrid_search 没有 BM25 分支），
      Neo4j 属可选演进方向、仓库代码 0 引用。依据 Moshu/ARCHITECTURE.md 第 9、10 节
      自述「hybrid 名不副实」「不能把 Compose 服务定义当作已经接入」——
      面试官打开仓库就能推翻的两句话，比少写两条亮点贵得多。
   6. 量化优先用可复现的工程事实（评测用例数 / 命中率 / 迁移数 / ADR 数 / 提交数），
      而不是 star 数：star 每天都在变，投递前必须用 gh api 复核一次再定稿。
      已有真实评测产物的位置：Moshu/evaluations/、listing/Third/evals/、nodeAdmin/ci.yml。
   7. 【学历口径 · 不要改回去】education.verify.code 与 reportUrl 必须保持为空：
      两者都会把在线验证码原文写进公开仓库与 GitHub Pages；备案表「出生日期」
      栏可能显示 2007，与简历的「24 岁 · 2002」当场冲突。投递需要时临时填入 →
      导出 PDF → 立即清空，且不要把带码的版本提交进 Git。
   8. 【分层记忆口径 · 不要写回「精确召回」】四层不是同一种取用方式，分两条路径：
      · 精确读取（确定性）：L0 原文 + L3 主角/物品状态、世界规则——按写作位置取
        「当时有效」的那一份（valid_from/valid_to + source_refs），细节不足才按
        出处下钻 L0 小片段。状态不能靠相似度或出现频次决定，否则写第 8 章会被
        第 12 章的转交、第 30 章的遗失污染。
      · 召回（相关性/有界窗口）：只有情节——L1 简介按实体/关键词/时间范围 + 向量
        检索选块，L2 大纲按当前卷章选结构。
      依据 Moshu/docs/design/记忆分层设计.md §7「召回与预算」的取用顺序。
   ========================================================= */

window.RESUME_DATA = {
  /* ---------------- 中文 ---------------- */
  zh: {
    name: '刘正硕',
    role: 'AI Agent 工程师 · 全栈 / 后端开发 · 安全研究',

    ageInfo: '24 岁 · 2002',
    contacts: [
      { icon: '📱', text: '191-9581-9124' },
      { icon: '📧', text: 'a2778978136@163.com', href: 'mailto:a2778978136@163.com' },
      { icon: '💻', text: 'github.com/HXSLtim', href: 'https://github.com/HXSLtim' },
      { icon: '📍', text: '现居杭州余杭 · 期望杭州' },
    ],

    about:
      'AI Agent 工程 + 安全研究双背景，全栈落地能力。' +
      '以 LangChain / LangGraph 编排多 Agent 系统，落地 ReAct 循环、Function Calling 工具链、分层记忆与 RAG 检索——是能跑、能评测、有失败兜底的工程件，不是 Demo。' +
      '企业 SRC 向 5 家企业报送过 6 个安全漏洞，含服务端验签缺失导致的会话伪造与内部系统未授权数据读取；攻防双视角让我把权限与数据护栏做进交付流程。',

    experiences: [
      {
        company: '独立交付 · 远程全栈（自由职业）',
        role: '全栈开发工程师',
        industry: 'AI + RPA 自动化 / 中后台 / 微信生态',
        date: '2024 – 2025',
        points: [
          '2024 年起独自开发 AI + RPA 多平台自动上架工具（技术细节见项目经历）：LLM 负责理解与生成、RPA 负责执行，替代纯人工重复上架',
          '以项目制远程交付中后台管理系统与微信生态应用；并交付 Windows 文件透明加密系统（API Hook + 内存级加解密）',
        ],
      },
      {
        company: '雪姬猫工作室',
        role: '全栈开发工程师',
        industry: '游戏陪玩 · 浙江金华 · 远程',
        date: '2025 – 2026.07',
        points: [
          '工作室唯一 IT：远程承担全部技术 —— 后台管理系统、Web 前端、微信小程序，全栈一人负责；前端 Vue 主力开发，后端为存量 .NET Core（C#）系统，由我维护并二次开发',
          '部署 Windows IIS + Nginx，数据库 SQL Server，独立负责环境配置与线上故障排查；将核心业务场景沉淀为开源项目 GameLink（Go + React，54 Star / 16 Fork，343 次提交）：github.com/HXSLtim/GameLink',
        ],
      },
    ],

    skills: [
      {
        tag: 'AI Agent 开发',
        desc: 'LangChain / LangGraph 状态图编排多 Agent 协作；ReAct 循环 + Function Calling / ToolNode 工具调用链；分层记忆（L0-L3 四层 + 来源元数据 + 版本栅栏）；RAG 检索（向量库 + 元数据过滤 + 作用域受权）；评测与回归（自建用例集 + 人工判据 + 固定预算复现）；MCP 服务开发（能力矩阵声明 + 调用审计）',
      },
      {
        tag: 'LLM 工程',
        desc: 'JSON Schema / Pydantic 结构化输出、Prompt 迭代、失败重试与格式漂移防护、低置信字段转人工；日常主力 Claude Code / Codex，并自建 tmux 多 Agent 协同工作区（见项目经历）',
      },
      {
        tag: '安全研究',
        desc: '企业 SRC 漏洞挖掘，聚焦认证绕过与未授权数据访问：资产测绘 → 前端 / 小程序逆向 → 接口抽取 → 无凭证差分验证 → 假值对照定界；具备 API Hook 注入与内存级加解密能力',
      },
      {
        tag: '全栈与系统',
        desc: '后端 Go / Node.js（NestJS + Fastify + Drizzle）/ Python，可接手存量 .NET Core；前端 Vue / React / Next.js / 微信小程序；数据库 PostgreSQL（含 RLS 多租户隔离）/ MySQL / SQL Server；Redis / Kafka（Outbox）/ PgBouncer；OpenTelemetry + Prometheus + Grafana；Docker / IIS / Nginx',
      },
      {
        tag: '业务与方案设计',
        desc: '在 GameLink 中独立设计会员体系、订单分发、支付结算的业务闭环；擅长需求量化拆解、方案选型与 ROI 论证',
      },
    ],

    projects: [
      {
        name: '墨枢 · 多 Agent AI 小说创作平台',
        tag: '开源 · Python',
        date: '2025.11 – 至今',
        link: 'https://github.com/HXSLtim/Moshu',
        desc: '面向百万字长篇的 AI 辅助创作系统，核心解决长篇世界观与角色一致性。',
        points: [
          'LangGraph 编排三阶段生成工作流（统一上下文预算 + 有限重试）；常驻创作对话 Agent 经 ToolNode 装配只读检索工具与提案制能力工具，稿件类产出一律先出候选、经作者裁决后才落库',
          '分层记忆（L0 原文 / L1 章节简介 / L2 结构化大纲 / L3 高频状态）分两条取用路径：原文与主角 / 物品状态按写作位置精确读取——L3 状态带 valid_from / valid_to 生效区间与来源出处，只取目标章「当时有效」的那一份，细节不足时再按出处下钻 L0 小片段',
          '情节才走召回：L1 简介按实体 / 关键词 / 时间范围 + 向量检索选块（最近 3 章 × 700 字符、总预算 2400 字符、候选窗口 ≤50 条），L2 大纲按当前卷章选相关剧情结构，被预算省略的项全部记入 manifest',
          '选型理由：状态「哪一条是真的」不能由相似度或出现频次决定——写第 8 章必须取「主角持有青霜剑，来源第 3 章」，不能被第 12 章的转交、第 30 章的遗失污染；所以原文与状态精确、按章生效，只有情节适合召回。三道门把关：来源（版本 + 字符区间 + SHA-256）、时态（计划与已发生分开）、作者（AI 只写候选）',
          '检索为 Chroma 向量 + 元数据过滤（作品 / 作者 / 生命周期 / 章号边界），派生索引可重建、目标章之后不可见；当前未接 BM25 混合分支与图数据库，对外口径与实现保持一致',
          'MCP 服务开发：统一 MCP 控制中心以能力矩阵声明可用能力，调用全量审计，未实现能力显式失败而非返回占位结果',
          '自建记忆质量评测集：12 例合成中文任务（续写 / 改写 / 事实查询 / 简介提取各 3 例）+ 2 例长章用例，固定输入与逐段 SHA-256、来源边界与 0/1/2 人工判据；已在真实模型上跑通 5 例简介提取，作者盲评与四组对照尚未执行',
        ],
        result: '开源获 12 Star，评测基线随仓库公开：github.com/HXSLtim/Moshu',
      },
      {
        name: 'AI Collab · 多 Agent 协同开发系统',
        tag: '开源 · tmux / zsh',
        date: '2026.09 – 至今',
        link: 'https://github.com/HXSLtim/ai-collab',
        desc: '把 Claude、Codex、Antigravity 三个编码 Agent 编成一支协作队伍的本地工作区 —— Claude 规划、Codex 后端、Antigravity 前端，三条线并行推进同一任务。',
        points: [
          '角色分工即编排：Claude 负责规划与任务编排、Codex 负责后端与测试运维、Antigravity 负责前端原型与 UX，三类能力互补而不重复',
          '自建 Agent 间消息总线：tmux set-buffer + bracketed paste 投递、延迟补发提交键，消息带 [sender → target] 时间戳帧并全量落盘为可回溯的协作日志',
          '用协作协议抑制消息风暴：每任务每条线最多 ACK + FINAL 两条回复、禁止进度闲聊，把上下文预算留给实际产出',
          '工程权衡：走 CLI 粘贴而非 API —— 复用各 Agent 的交互态与订阅额度，省掉 API 成本与密钥管理；代价是目标 pane 必须处于等待输入状态，以 ai read / ai submit 兜底',
        ],
        result: '已开源并日常使用 ——「AI 负责实现、我负责设计与验收」这套工作方式就是靠它落地的：github.com/HXSLtim/ai-collab',
      },
      {
        name: 'nodeAdmin · 多租户中后台框架',
        tag: '开源 · NestJS + React',
        date: '2026.02 – 至今',
        link: 'https://github.com/DistroCore/nodeAdmin',
        desc: '面向企业内部平台的多租户中后台框架：NestJS 11 + Fastify 后端、React 18 + Vite 前端、PostgreSQL 16 + Drizzle ORM，把鉴权、审计、异步消息、实时通信、可观测性与插件体系一次做齐。',
        points: [
          '多租户隔离下沉到数据库：由 PostgreSQL RLS 强制租户边界，而非只靠应用层；同一套代码经 TenantContext + SINGLE_TENANT_MODE 同时支持单租户与多租户部署',
          '事件一致性用 Outbox 模式：业务写入与 outbox 行在同一事务落库，Kafka 消费端按 eventId 幂等消费 —— 不双写、不丢消息',
          '插件市场：NestJS 模块与 React 页面以 dynamic import + importmap 共享依赖动态装载，插件安装 / 卸载 / 更新均无需重新部署',
          '工程化基线：7 段 CI（静态检查 / 单测 / 依赖审计 / 构建 / 集成 / E2E / 镜像）+ 24 条 ADR 决策日志 + 37 个数据库迁移；audit-ci 拦截高危依赖且白名单带强制过期时间；OpenTelemetry + Prometheus + Grafana 全链路可观测',
        ],
        result: '公开仓库（MIT）：285 次提交全部由我完成（截至 2026.10），2026.02 起持续开发至今 —— github.com/DistroCore/nodeAdmin',
      },
      {
        name: 'AI 自动上架工具 · LLM + RPA',
        tag: 'AI 落地 · Python',
        date: '2024 – 2025',
        desc: '2024 年起独立开发的电商多平台自动上架工具：LLM 理解与生成 + Function Calling 驱动 RPA 执行，商品信息从素材到上架全自动流转。',
        points: [
          'LLM 按 JSON Schema 约束抽取与生成各平台商品字段（标题、卖点、规格属性），保证输出格式稳定可解析',
          'Function Calling 驱动 RPA 执行层完成各平台填表上架 —— LLM 做决策、RPA 做执行',
          '可靠性三件套：Schema 校验 + 失败重试防格式漂移；低置信字段标记转人工，不带病上架；每步结果机器可校验，不过不上传',
          '离线评测：9 例字段抽取用例（replay 回放执行），字段命中 18/19（94.7%）、verify 通过率 100%、2 次修复尝试全部恢复、0 失败；评测脚本与报告随项目版本化',
        ],
        result: '在多平台上架场景持续落地使用，形成 LLM + RPA 混合架构的可复用实践。',
      },
      {
        name: '企业 SRC 漏洞挖掘 · 安全研究',
        tag: '安全 · 漏洞报送',
        date: '2026.09',
        desc: '在多个企业安全响应平台（SRC）持续进行漏洞挖掘与报送，聚焦认证绕过与未授权数据访问。',
        points: [
          '向 5 家企业累计报送 6 个安全漏洞，其中 1 个获平台认证（服务端验签缺失导致的会话伪造，JWT alg=none）—— 无需任何账号即可伪造管理员身份进入后台并读取员工数据；其余为已报送、平台未定级',
          '方法论闭环：资产测绘 → 前端 / 小程序逆向 → 接口抽取 → 无凭证差分验证 → 假值对照定界 → 平台报送',
          '测试纪律：只读最小化验证、真实数据 ≤5 组、写操作零触碰、无效果证据不报送',
        ],
        result: '所有发现均通过官方渠道按 SRC 纪律完成报送：只读最小化验证、真实数据 ≤5 组、写操作零触碰。',
      },
    ],

    advantages: [
      {
        tag: 'Agent 驱动开发',
        desc: '日常研发本身即由 AI 编程 Agent 主导实现，我负责需求拆解、架构设计、约束给定与验收回归；因为做过安全研究，验收时习惯用差分验证、边界对照主动去证伪 AI 的产出，而不是「能跑就算过」。',
      },
      {
        tag: 'AI Agent 工程能力',
        desc: '不止会调 API：多 Agent 编排、工具调用链、分层记忆、RAG 检索与 MCP 服务都在真实项目里落地过，清楚每个环节会在哪里失败、怎么兜底。',
      },
      {
        tag: '攻防双视角',
        desc: '安全研究实战背景，交付系统时同步考虑权限、数据与内容风险，擅长把安全护栏做进交付流程，而非事后补漏。',
      },
      {
        tag: '全栈落地能力',
        desc: '从后端服务、数据库、前端到服务器部署全链路都能自己动手，需求、架构、验收一个人闭环，不局限于理论知识。',
      },
      {
        tag: '严谨务实自律',
        desc: '只写能被追问到底的事实，不做无法验证的承诺；擅长长期迭代优化项目，具备极强的问题排查能力与复盘能力。',
      },
      {
        tag: '学习适配性高',
        desc: '持续深耕新技术、新逻辑，可快速适配不同岗位需求，快速掌握新的技术框架与业务逻辑。',
      },
    ],

    education: {
      school: '重庆工程学院',
      major: '网络工程专业',
      degree: '本科',
      date: '2020.09 – 2024.06',
      // 学信网在线验证：code 是在线验证码，url 是官方查验入口，reportUrl 是学信档案直链。
      // ⚠️【口径 · 不要改回去】code 与 reportUrl 必须为空 —— reportUrl 里带 vcode 原文，
      //    留着等于把验证码照样写进公开仓库。本站（GitHub Pages）是公开的，验证码会被爬虫抓走；
      //    且备案表「出生日期」栏可能显示 2007，与简历的「24 岁 · 2002」当场冲突。
      //    投递需要时：临时填入 → 导出 PDF → 立即清空，不要把带码的版本提交进 Git。
      //    续期流程与风险说明见 README「学历可验证」一节。
      verify: {
        label: '学信网在线验证码',
        code: '',
        url: 'https://www.chsi.com.cn/xlcx/bgcx.jsp',
        reportUrl: '',
      },
    },
  },

  /* ---------------- English ---------------- */
  en: {
    name: 'Liu Zhengshuo',
    role: 'AI Agent Engineer · Full-stack / Backend · Security Research',

    ageInfo: '24 y/o · 2002',
    contacts: [
      { icon: '📱', text: '191-9581-9124' },
      { icon: '📧', text: 'a2778978136@163.com', href: 'mailto:a2778978136@163.com' },
      { icon: '💻', text: 'github.com/HXSLtim', href: 'https://github.com/HXSLtim' },
      { icon: '📍', text: 'Based in Hangzhou (Yuhang) · Targeting Hangzhou' },
    ],

    about:
      'AI agent engineering plus hands-on security research, with full-stack delivery capability. ' +
      'I orchestrate multi-agent systems with LangChain / LangGraph — ReAct loops, Function Calling tool chains, layered memory and RAG retrieval — shipping work that runs and gets evaluated, not demos. ' +
      'Six vulnerabilities disclosed to five companies on enterprise SRC programs, including session forgery from missing server-side signature verification and unauthorised reads of internal systems; an attacker-defender mindset means I build permission and data guardrails into delivery.',

    experiences: [
      {
        company: 'Independent Delivery · Remote Full-stack (Freelance)',
        role: 'Full-stack Developer',
        industry: 'AI + RPA automation / Admin systems / WeChat ecosystem',
        date: '2024 – 2025',
        points: [
          'From 2024, built an AI + RPA multi-platform listing tool solo (technical detail under Projects): the LLM understands and generates, RPA executes — replacing fully manual listing work',
          'Delivered admin/back-office systems and WeChat ecosystem apps on a project basis; also built a Windows transparent file-encryption system (API Hook on file I/O + in-memory crypto)',
        ],
      },
      {
        company: 'Xuejimao Studio',
        role: 'Full-stack Developer',
        industry: 'Gaming companion services · Jinhua, Zhejiang · Remote',
        date: '2025 – 2026.07',
        points: [
          'Sole IT for the studio: remotely owned everything — admin backend, web frontend and WeChat mini program; I led the Vue frontend and maintain/extend the legacy .NET Core (C#) backend',
          'Deployed on Windows IIS behind an Nginx reverse proxy with SQL Server, owning environment setup and production troubleshooting; distilled the core business scenarios into the open-source GameLink (Go + React, 54 stars / 16 forks, 343 commits): github.com/HXSLtim/GameLink',
        ],
      },
    ],

    skills: [
      {
        tag: 'AI Agent Development',
        desc: 'Multi-agent orchestration via LangChain / LangGraph state graphs; ReAct loops and Function Calling / ToolNode tool chains; layered memory (L0-L3 with source metadata and version fencing); RAG retrieval (vector store + metadata filtering + scope authorisation); evaluation and regression (self-built case sets + human rubric + fixed-budget reproduction); MCP service development with capability-matrix declarations and full call auditing',
      },
      {
        tag: 'LLM Engineering',
        desc: 'JSON Schema / Pydantic structured output, prompt iteration, retry and format-drift protection, low-confidence fields routed to humans; daily drivers Claude Code and Codex, plus a self-built tmux multi-agent workspace (see Projects)',
      },
      {
        tag: 'Security Research',
        desc: 'Vulnerability research on enterprise SRC programs, focused on authentication bypass and unauthorised data access: asset mapping → frontend / mini-program reverse engineering → endpoint extraction → credential-free differential verification → decoy-value boundary testing; hands-on API Hook injection and in-memory encryption',
      },
      {
        tag: 'Full-stack & Systems',
        desc: 'Backend Go / Node.js (NestJS + Fastify + Drizzle) / Python, comfortable taking over legacy .NET Core; frontend Vue / React / Next.js / WeChat mini-programs; databases PostgreSQL (incl. RLS multi-tenancy) / MySQL / SQL Server; Redis / Kafka (outbox) / PgBouncer; OpenTelemetry + Prometheus + Grafana; Docker / IIS / Nginx',
      },
      {
        tag: 'Business & Solution Design',
        desc: 'Independently designed the membership, order-dispatch and payment-settlement loops in GameLink; strong at quantifying requirements, evaluating options and arguing ROI',
      },
    ],

    projects: [
      {
        name: 'Moshu · Multi-Agent AI Novel Writing Platform',
        tag: 'Open source · Python',
        date: 'Nov 2025 – Present',
        link: 'https://github.com/HXSLtim/Moshu',
        desc: 'An AI-assisted writing system for million-word novels, built around one problem: keeping worldview and characters consistent across the whole book.',
        points: [
          'LangGraph orchestrates a three-stage generation workflow (shared context budget, bounded retries); the resident writing agent assembles read-only retrieval tools and proposal-based capability tools through ToolNode, and every draft is returned as a candidate for the author to accept or reject before it is persisted',
          'Layered memory (L0 raw text / L1 chapter digests / L2 structured outline / L3 high-frequency state) uses two distinct access paths: raw text and protagonist / item state are read deterministically by writing position — L3 carries valid_from / valid_to intervals plus source references, so only the state in effect at the target chapter is loaded, and raw text is drilled into as small fragments along those references when detail is missing',
          'Plot is what gets retrieved: L1 digests are selected by entity / keyword / time range plus vector search (latest 3 chapters × 700 characters, a 2,400-character digest budget, candidate window ≤50), L2 outline selects structure for the current volume and chapter, and everything dropped by the budget is recorded in the manifest',
          'Why the split: which state is true cannot be decided by similarity or how often it appears — writing chapter 8 must load "the protagonist holds the sword, sourced from chapter 3" and must not be polluted by the handover in chapter 12 or the loss in chapter 30; so raw text and state stay exact and chapter-effective while only plot is retrieved. Three gates: source (version + offsets + SHA-256), tense (planned vs. occurred kept apart), author (AI only writes candidates)',
          'Retrieval is Chroma vector search plus metadata filtering (novel / author / lifecycle / chapter boundary); the index is rebuildable derived data and anything past the target chapter stays invisible — no BM25 branch and no graph database are wired in, so the public wording matches the implementation',
          'MCP service development: a unified MCP control centre declaring its capability matrix, auditing every call, and failing explicitly on unimplemented capabilities instead of returning placeholder results',
          'Self-built memory-quality evaluation set: 12 synthetic Chinese tasks (3 each for continuation, rewrite, fact query and digest extraction) plus 2 long-chapter cases, with fixed inputs, per-segment SHA-256, source boundaries and a 0/1/2 human rubric; 5 digest runs completed on a real model, while author blind review and the four comparison groups are not done yet',
        ],
        result: '12 stars since open-sourcing, evaluation baseline public in-repo: github.com/HXSLtim/Moshu',
      },
      {
        name: 'AI Collab · Multi-Agent Collaborative Development System',
        tag: 'Open source · tmux / zsh',
        date: 'Sep 2026 – Present',
        link: 'https://github.com/HXSLtim/ai-collab',
        desc: 'A local workspace that turns three coding agents — Claude, Codex and Antigravity — into a collaborating team: Claude plans, Codex owns backend, Antigravity owns frontend, all advancing in parallel on the same task.',
        points: [
          'Role division as orchestration: Claude plans and orchestrates, Codex owns backend, testing and ops, Antigravity owns frontend prototypes and UX — complementary capabilities, not duplicates',
          'Self-built inter-agent message bus: delivers via tmux set-buffer + bracketed paste with a delayed submit key, frames every message with a [sender → target] timestamp, and logs it into a reviewable collaboration log',
          'A protocol that suppresses message storms: at most one ACK and one FINAL per task per line, no progress chatter — keeping the context budget for real output',
          'Trade-off: driving CLIs by paste instead of API reuses each agent’s interactive state and subscription quota, avoiding API cost and key management; the cost is that a target pane must be waiting for input, with ai read / ai submit as fallback',
        ],
        result: 'Open-sourced and used daily — the AI implements, I design and verify workflow runs on this orchestration: github.com/HXSLtim/ai-collab',
      },
      {
        name: 'nodeAdmin · Multi-Tenant Back-Office Framework',
        tag: 'Open source · NestJS + React',
        date: 'Feb 2026 – Present',
        link: 'https://github.com/DistroCore/nodeAdmin',
        desc: 'A multi-tenant back-office framework for internal enterprise platforms: NestJS 11 + Fastify backend, React 18 + Vite frontend, PostgreSQL 16 + Drizzle ORM — covering auth, audit, async messaging, realtime, observability and a plugin system in one foundation.',
        points: [
          'Tenant isolation pushed down into the database: PostgreSQL RLS enforces tenant boundaries rather than relying on the application layer alone; one codebase serves single- and multi-tenant deployments via TenantContext + SINGLE_TENANT_MODE',
          'Event consistency via the outbox pattern: business writes and the outbox row commit in one transaction, and Kafka consumers are idempotent by eventId — no double writes, no lost messages',
          'Plugin marketplace: NestJS modules and React pages load dynamically via import() with importmap-shared dependencies, so plugins install, uninstall and update without a redeploy',
          'Engineering baseline: seven-job CI (static / unit / audit / build / integration / E2E / docker) plus a 24-entry ADR decision log and 37 database migrations; an audit-ci gate blocking high-severity advisories with expiring allowlist entries; full OpenTelemetry + Prometheus + Grafana observability',
        ],
        result: 'Public repo (MIT): all 285 commits authored by me (as of Oct 2026), in continuous development since Feb 2026 — github.com/DistroCore/nodeAdmin',
      },
      {
        name: 'AI Listing Automation · LLM + RPA',
        tag: 'AI in production · Python',
        date: '2024 – 2025',
        desc: 'A multi-platform e-commerce listing tool built solo from 2024: LLM understanding and generation plus Function Calling-driven RPA execution — raw material to published listing with no manual step.',
        points: [
          'LLM output constrained by JSON Schema extracts and generates per-platform product fields (titles, selling points, spec attributes), keeping output stable and parseable',
          'Function Calling drives the RPA execution layer to fill and submit listings — the LLM decides, RPA executes',
          'Reliability triad: schema validation + retries against format drift; low-confidence fields flagged for humans so nothing broken is published; every step machine-verifiable — no pass, no upload',
          'Offline evaluation: 9 field-extraction cases run in replay mode — 18/19 fields hit (94.7%), 100% verifier pass rate, 2/2 repairs recovered, zero failures; both the eval script and its report are versioned with the project',
        ],
        result: 'Continuously used for multi-platform listing, forming a reusable LLM + RPA hybrid pattern.',
      },
      {
        name: 'Enterprise SRC Vulnerability Research · Security',
        tag: 'Security · Disclosure',
        date: 'Sep 2026',
        desc: 'Continuous vulnerability research and disclosure across multiple enterprise SRC programs, focused on authentication bypass and unauthorised data access.',
        points: [
          'Six vulnerabilities disclosed across five companies, one of them platform-certified: session forgery from missing server-side signature verification (JWT alg=none) — admin identity forged and employee data read with no account at all; the rest were disclosed but never graded',
          'Closed methodology loop: asset mapping → frontend / mini-program reverse engineering → endpoint extraction → credential-free differential verification → decoy-value boundary testing → disclosure',
          'Testing discipline: read-only minimal verification, at most 5 real records, zero write operations, and nothing reported without proof of impact',
        ],
        result: 'All findings disclosed through official channels under SRC discipline: read-only minimal verification, at most 5 real records, zero write operations.',
      },
    ],

    advantages: [
      {
        tag: 'Agent-driven development',
        desc: 'My day-to-day development is led by AI coding agents; I own requirement decomposition, architecture, constraints and acceptance regression. Coming from security research, I verify by trying to falsify the output — differential checks, boundary controls — rather than accepting whatever happens to run.',
      },
      {
        tag: 'AI agent engineering',
        desc: 'Not just API calls: multi-agent orchestration, tool chains, layered memory, RAG retrieval and MCP services all landed in real projects — I know where each stage fails and how to catch it.',
      },
      {
        tag: 'Attacker-defender perspective',
        desc: 'Hands-on security research background; I think about permission, data and content risk while building, and bake guardrails into the delivery pipeline rather than patching afterwards.',
      },
      {
        tag: 'Full-stack delivery',
        desc: 'Hands-on across backend services, databases, frontend and server deployment; requirements, architecture and acceptance closed by one person, not just theory.',
      },
      {
        tag: 'Rigorous & self-disciplined',
        desc: 'I only state what can survive follow-up questioning and make no unverifiable claims; strong at long-term iteration, debugging and retrospectives.',
      },
      {
        tag: 'Fast learner',
        desc: 'Continuing into new technologies and logic; adapts quickly to different role requirements, new frameworks and business logic.',
      },
    ],

    education: {
      school: 'Chongqing Institute of Engineering',
      major: 'Network Engineering',
      degree: 'Bachelor',
      date: '2020.09 – 2024.06',
      // See the zh block: code and reportUrl stay empty on purpose (public site + birth-date risk).
      verify: {
        label: 'CHSI online verification code',
        code: '',
        url: 'https://www.chsi.com.cn/xlcx/bgcx.jsp',
        reportUrl: '',
      },
    },
  },
};
