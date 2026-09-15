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
   3. education.note 用于说明 13 岁入学 / 17 岁毕业——这不是笔误，
      必须写明，否则面试官会按算术错误处理。
   ========================================================= */

window.RESUME_DATA = {
  /* ---------------- 中文 ---------------- */
  zh: {
    name: '刘正硕',
    role: 'AI Agent 工程师 · 全栈 / 后端开发 · 安全研究',

    ageInfo: '19 岁 · 2007.04',
    contacts: [
      { icon: '📱', text: '191-9581-9124' },
      { icon: '📧', text: 'a2778978136@163.com', href: 'mailto:a2778978136@163.com' },
      { icon: '💻', text: 'github.com/HXSLtim', href: 'https://github.com/HXSLtim' },
      { icon: '📍', text: '现居江苏 · 期望杭州' },
    ],

    about:
      'AI Agent 工程 + 安全研究双背景，全栈落地能力。' +
      '以 LangChain / LangGraph 编排多 Agent 系统，落地 ReAct 循环、Function Calling 工具链、分层记忆与 RAG 混合检索——是能跑、能评测、有失败兜底的工程件，不是 Demo。' +
      '企业 SRC 累计 6 个已定级漏洞（4 个高危），攻防双视角让我把权限与数据护栏做进交付流程。' +
      'Go / Node.js（TypeScript）/ Python 全栈交付，熟悉 IIS / Linux 服务部署、SQL 调优与 WebSocket 实时通信。',

    experiences: [
      {
        company: '独立交付 · 远程全栈（自由职业）',
        role: '全栈开发工程师',
        industry: 'AI + RPA 自动化 / 中后台 / 微信生态',
        date: '2024 – 2025',
        points: [
          '2024 年起独自开发 AI + RPA 多平台自动上架工具（技术细节见项目经历）：LLM 负责理解与生成、RPA 负责执行，替代纯人工重复上架',
          '以项目制远程交付中后台管理系统、微信生态应用（公众号 / SDK 网页应用、微信云开发小程序）',
          'Windows 文件透明加密系统（API Hook 截获文件读写调用 + 内存级加解密）：授权进程无感拿到明文，非授权进程只得密文',
        ],
      },
      {
        company: '雪姬猫工作室',
        role: '全栈开发工程师',
        industry: '游戏陪玩 · 浙江金华 · 远程',
        date: '2025 – 2026.07',
        points: [
          '工作室唯一 IT：常驻重庆远程负责金华陪玩工作室的全部技术 —— 后台管理系统、Web 前端、微信小程序，全栈一人承担',
          '前端 Vue 由我主力开发；后端为存量 .NET Core（C#）系统，由我维护并按业务需求做二次开发；部署 Windows IIS + Nginx 反向代理，数据库 SQL Server',
          '按业务迭代需求完成前后端功能开发与页面维护，独立负责部署、环境配置与线上故障排查',
          '将平台核心业务场景沉淀为开源项目 GameLink（Go + React，49 Star / 14 Fork）',
        ],
      },
    ],

    skills: [
      {
        tag: 'AI Agent 开发',
        desc: 'LangChain / LangGraph 状态图编排多 Agent 协作，落地 ReAct 循环与 Function Calling / ToolNode 工具调用链；分层记忆设计（章级记忆 + 摘要抽取 + 上下文预算与压缩）；RAG 混合检索（向量库 + 元数据过滤 + 作用域鉴权）；MCP 服务开发（统一 MCP 控制中心：能力矩阵声明、调用审计、未实现能力显式失败）。日常研发本身即由 AI Agent 驱动（需求拆解 → 架构约束 → AI 实现 → 验收回归），对 Agent 的能力边界与失败模式有第一手判断。',
      },
      {
        tag: 'AI 编程 Agent 工具链',
        desc: '日常主力 Claude Code 与 Codex；常用模型覆盖 GPT 系与 GLM 系，近期以 DeepSeek 为主。自建 tmux 多 Agent 协同工作区（见项目经历），按规划 / 执行 / 前端分工协作；产出通过验收回归与差分验证约束质量。',
      },
      {
        tag: 'LLM 工程',
        desc: '结构化输出（JSON Schema / Pydantic 约束）、Prompt 工程与迭代、失败重试与格式漂移防护、低置信字段标记与人工兜底；模型异常分类处理（内容过滤 / 工具调用异常 / 参数解析失败），保证链路可观测、可重试。',
      },
      {
        tag: '安全研究',
        desc: '企业 SRC 漏洞挖掘，聚焦认证绕过与未授权数据访问（累计 6 个已定级、4 个高危）：资产测绘 → 前端 / 小程序逆向 → 接口抽取 → 无凭证差分验证 → 假值对照定界；具备 API Hook 注入与内存级加解密的工程级安全开发能力，攻防双视角。',
      },
      {
        tag: '全栈与系统',
        desc: '后端 Go / Node.js（TypeScript：NestJS + Fastify + Drizzle）/ Python（技术栈随项目演进 Python → Go → TypeScript）；可接手存量 C#（.NET Core）系统做维护与二次开发；前端 Vue / React / Next.js / TypeScript / 微信小程序；数据库 PostgreSQL（含 RLS 多租户隔离）/ MySQL / SQL Server，SQL 与索引调优（执行计划、复合索引、消除 N+1）；Redis / PgBouncer / Kafka（Outbox 模式）；OpenTelemetry + Prometheus + Grafana 可观测；ChromaDB 向量库、Neo4j 知识图谱；Windows IIS + Nginx 反向代理与 Linux 服务部署、故障排查；WebSocket / Socket.IO；Docker 容器化。',
      },
      {
        tag: '业务与方案设计',
        desc: '在 GameLink 中独立设计会员体系、订单分发、支付结算等业务闭环；擅长需求量化拆解、方案选型与 ROI 论证，能把业务诉求转化为可落地的技术方案。',
      },
    ],

    projects: [
      {
        name: 'Nai · 多 Agent AI 小说创作平台',
        tag: '开源 · Python',
        link: 'https://github.com/HXSLtim/Nai',
        desc: '基于多 Agent 协作的智能小说创作平台，核心解决百万字长篇的世界观与角色一致性。',
        points: [
          '基于 LangGraph 状态图编排创作 / 审核 / 编辑 / 一致性校验多 Agent，经 ToolNode 装配工具调用链，条件边控制循环与终止',
          '分层记忆体系：章级记忆 + 剧情摘要抽取 + 上下文预算与压缩，把长篇一致性从「塞满上下文」变成可调度的记忆',
          'RAG 混合检索：ChromaDB 向量库 + 元数据过滤 + 作品生命周期与作者作用域鉴权；Neo4j 知识图谱做角色关系抽取与冲突校验',
          'MCP 服务开发：统一 MCP 控制中心以能力矩阵声明可用能力，调用全量审计，未实现能力显式失败而非返回占位结果',
          'FastAPI + PostgreSQL + Redis 后端，Next.js / TypeScript 前端',
        ],
        result: '开源获 12 Star：github.com/HXSLtim/Nai',
      },
      {
        name: 'AI Collab · 多 Agent 协同开发系统',
        tag: '开源 · tmux / zsh',
        link: 'https://github.com/HXSLtim/ai-collab',
        desc: '把 Claude、Codex、Antigravity 三个编码 Agent 编成一支协作队伍的本地工作区：一条命令拉起 tmux 三 pane，并自建消息总线与协作协议，让规划、执行、前端三条线并行推进同一任务。',
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
        link: 'https://github.com/DistroCore/nodeAdmin',
        desc: '面向企业内部平台的多租户中后台框架：NestJS 11 + Fastify 后端、React 18 + Vite 前端、PostgreSQL 16 + Drizzle ORM，把鉴权、审计、异步消息、实时通信、可观测性与插件体系一次做齐。',
        points: [
          '多租户隔离下沉到数据库：由 PostgreSQL RLS 强制租户边界，而非只靠应用层；同一套代码经 TenantContext + SINGLE_TENANT_MODE 同时支持单租户与多租户部署',
          '事件一致性用 Outbox 模式：业务写入与 outbox 行在同一事务落库，Kafka 消费端按 eventId 幂等消费 —— 不双写、不丢消息',
          '插件市场：NestJS 模块与 React 页面以 dynamic import + importmap 共享依赖动态装载，插件安装 / 卸载 / 更新均无需重新部署',
          '工程化基线：6 段 CI（静态检查 / 单测 / 依赖审计 / 构建 / 集成 / 镜像）；audit-ci 拦截高危依赖且白名单带强制过期时间；OpenTelemetry + Prometheus + Grafana 全链路可观测；Socket.IO 实时层经压测支持 1 万并发连接',
        ],
        result: '公开仓库（MIT）：254 次提交全部由我完成，2026.02 起开发 —— github.com/DistroCore/nodeAdmin',
      },
      {
        name: 'AI 自动上架工具 · LLM + RPA',
        tag: 'AI 落地 · Python',
        desc: '2024 年起独立开发的电商多平台自动上架工具：大模型负责理解与生成，RPA 负责执行，商品信息从素材到上架全自动流转。',
        points: [
          'LLM 按 JSON Schema 约束抽取与生成各平台商品字段（标题、卖点、规格属性），保证输出格式稳定可解析',
          'Function Calling 驱动 RPA 执行层完成各平台填表上架 —— LLM 做决策、RPA 做执行',
          '可靠性三件套：Schema 校验 + 失败重试防格式漂移；低置信字段标记转人工，不带病上架；每步结果机器可校验，不过不上传',
          '字段映射与平台规则沉淀为配置，新增平台只扩配置、不改核心流程',
        ],
        result: '在多平台上架场景持续落地使用，形成 LLM + RPA 混合架构的可复用实践。',
      },
      {
        name: '企业 SRC 漏洞挖掘 · 安全研究',
        tag: '安全 · 持续',
        desc: '在多个企业安全响应平台（SRC）持续进行漏洞挖掘与报送，聚焦认证绕过与未授权数据访问。',
        points: [
          '累计 6 个漏洞获平台定级确认（4 高危 / 2 中危），覆盖 6 家企业：含会话伪造类认证绕过（服务端验签缺失）与内部系统未授权数据读取',
          '方法论闭环：资产测绘 → 前端 / 小程序逆向 → 接口抽取 → 无凭证差分验证 → 假值对照定界 → 平台报送',
          '测试纪律：只读最小化验证、真实数据 ≤5 组、写操作零触碰、无效果证据不报送',
          '这套方法论本身就是 Agent 架构的判据：接口抽取与差分验证要看响应动态决定下一步，属 ReAct；资产枚举与发包是确定性的，属 Workflow',
        ],
        result: '6 个漏洞全部通过官方渠道报送并推动修复，其中 4 个定级高危。',
      },
      {
        name: 'GameLink · 游戏陪玩管理平台',
        tag: '开源 · Go + React',
        link: 'https://github.com/HXSLtim/GameLink',
        desc: '现代化游戏陪玩业务平台，Go 后端 + React 前端，覆盖订单分发、多角色管理、实时通讯、支付结算与监控全链路。',
        points: [
          '设计智能订单分发机制：自动匹配用户与陪玩师，支持抢单池与客服指派两种模式',
          '搭建用户 / 陪玩师 / 管理员多角色权限体系，基于 JWT + RBAC 控制访问安全',
          '基于 WebSocket 实现群聊 / 私聊即时通讯；打通订单支付、退款与收益结算',
          '实时订单状态、收益统计与系统指标监控看板',
        ],
        result: '开源后获 49 Star / 14 Fork：github.com/HXSLtim/GameLink',
      },
      {
        name: '文件透明加密系统 · Windows 安全工程',
        tag: 'C++ / Hook 注入',
        desc: '基于 API Hook 注入与内存级加解密实现的文档透明加密系统：授权进程内存中解密、用户无感，非授权进程只得密文。',
        points: [
          '通过 Hook 截获文件读写调用，在授权进程的内存数据流中完成加解密，实现落盘即密文、合法使用无感',
          '注入受控读取器做进程级权限判定，未授权进程与外发渠道均无法获取明文',
          '覆盖典型防泄密场景：文档在可信环境内正常使用，脱离环境即不可读',
        ],
        result: '从需求分析、方案设计到工程落地完整闭环交付。',
      },
      {
        name: 'Resume Terminal · 交互式终端简历（本站）',
        tag: '开源 · 原生 JS',
        link: 'https://github.com/HXSLtim/resume',
        desc: '你正在浏览的这个站点：仿 zsh 终端交互的简历，零依赖纯前端实现。',
        points: [
          '手写命令解析、历史（↑/↓）与 Tab 补全，支持中文别名与点击命令名直接执行',
          '中英双语 i18n + 深浅主题响应式；打印导出 A4 版完整简历，终端与打印共用同一份数据源',
          '通过 GitHub Pages 自动部署，改一处内容全局生效',
        ],
        result: '在线访问：<a href="https://hxsltim.github.io/resume/" target="_blank" rel="noopener">hxsltim.github.io/resume</a>',
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
      note: '13 岁入学、17 岁本科毕业（早期入学）；17 岁起独立交付全栈项目，非笔误',
      // ✏️ 学信网在线验证码：学信档案 → 在线验证报告 → 教育部学历证书电子注册备案表
      //    申请时有效期选 6 个月（最长），把「在线验证码」填进 code；留空则整行不显示。
      //    ⚠️ 验证码 6 个月后失效，投递前必须重新申请——详见 README「学历可验证」一节。
      verify: {
        label: '学信网在线验证码',
        code: '',
        url: 'https://www.chsi.com.cn/xlcx/bgcx.jsp',
      },
    },
  },

  /* ---------------- English ---------------- */
  en: {
    name: 'Liu Zhengshuo',
    role: 'AI Agent Engineer · Full-stack / Backend · Security Research',

    ageInfo: '19 y/o · Apr 2007',
    contacts: [
      { icon: '📱', text: '191-9581-9124' },
      { icon: '📧', text: 'a2778978136@163.com', href: 'mailto:a2778978136@163.com' },
      { icon: '💻', text: 'github.com/HXSLtim', href: 'https://github.com/HXSLtim' },
      { icon: '📍', text: 'Based in Jiangsu · Open to Hangzhou' },
    ],

    about:
      'AI agent engineering plus hands-on security research, with full-stack delivery capability. ' +
      'I orchestrate multi-agent systems with LangChain / LangGraph — ReAct loops, Function Calling tool chains, layered memory and hybrid RAG retrieval — shipping work that runs and gets evaluated, not demos. ' +
      '6 platform-rated vulnerabilities on enterprise SRC programs (4 high severity); an attacker-defender mindset means I build permission and data guardrails into delivery. ' +
      'Full-stack delivery in Go / Node.js (TypeScript) / Python, comfortable with IIS and Linux deployment, SQL tuning and WebSocket real-time communication.',

    experiences: [
      {
        company: 'Independent Delivery · Remote Full-stack (Freelance)',
        role: 'Full-stack Developer',
        industry: 'AI + RPA automation / Admin systems / WeChat ecosystem',
        date: '2024 – 2025',
        points: [
          'From 2024, built an AI + RPA multi-platform listing tool solo (technical detail under Projects): the LLM understands and generates, RPA executes — replacing fully manual listing work',
          'Delivered admin/back-office systems and WeChat ecosystem apps (official-account / SDK web apps, WeChat Cloud Development mini programs) on a project basis',
          'Windows transparent file-encryption system (API Hook on file I/O + in-memory crypto): authorised processes read plaintext transparently, unauthorised ones only ever get ciphertext',
        ],
      },
      {
        company: 'Xuejimao Studio',
        role: 'Full-stack Developer',
        industry: 'Gaming companion services · Jinhua, Zhejiang · Remote',
        date: '2025 – 2026.07',
        points: [
          'Sole IT for the studio: based in Chongqing, remotely owned everything for a Jinhua gaming-companion studio — admin backend, web frontend and WeChat mini program, full-stack and solo',
          'Frontend Vue developed by me; the backend is a legacy .NET Core (C#) system that I maintain and extend on business demand; deployed on Windows IIS behind an Nginx reverse proxy with SQL Server',
          'Delivered frontend and backend feature development and page maintenance against business iterations, and personally owned deployment, environment setup and production troubleshooting',
          'Distilled the core business scenarios into the open-source project GameLink (Go + React, 49 stars / 14 forks)',
        ],
      },
    ],

    skills: [
      {
        tag: 'AI Agent Development',
        desc: 'Multi-agent orchestration via LangChain / LangGraph state graphs, with ReAct loops and Function Calling / ToolNode tool chains; layered memory design (chapter-level memory + digest extraction + context budgeting and compression); hybrid RAG retrieval (vector store + metadata filtering + scope-based authorisation); MCP service development (a unified MCP control centre with a declared capability matrix, full call auditing, and explicit failure for unimplemented capabilities). Day-to-day development is itself driven by AI agents (requirement decomposition → architectural constraints → AI implementation → acceptance regression), giving first-hand judgement of where agents break down.',
      },
      {
        tag: 'AI Coding Agent Toolchain',
        desc: 'Daily drivers Claude Code and Codex; models span the GPT and GLM families, with DeepSeek as the recent primary. I built a tmux-based multi-agent workspace (see Projects) that splits planning, execution and frontend work across agents; output quality is constrained through acceptance regression and differential verification.',
      },
      {
        tag: 'LLM Engineering',
        desc: 'Structured output (JSON Schema / Pydantic constraints), prompt engineering and iteration, retry and format-drift protection, low-confidence field flagging with human fallback; typed handling of model failures (content filtering / malformed tool calls / argument parse errors) so the chain stays observable and retryable.',
      },
      {
        tag: 'Security Research',
        desc: 'Vulnerability research on enterprise SRC programs, focused on authentication bypass and unauthorised data access (6 rated, 4 high severity): asset mapping → frontend / mini-program reverse engineering → endpoint extraction → credential-free differential verification → decoy-value boundary testing. Also hands-on security engineering: API Hook injection and in-memory encryption, attacker-defender dual perspective.',
      },
      {
        tag: 'Full-stack & Systems',
        desc: 'Backend: Go / Node.js (TypeScript: NestJS + Fastify + Drizzle) / Python — my stack evolved Python → Go → TypeScript — plus able to take over and extend legacy C# (.NET Core) systems. Frontend: Vue / React / Next.js / TypeScript / WeChat mini programs. Databases PostgreSQL (with RLS multi-tenant isolation) / MySQL / SQL Server, with SQL and index tuning; Redis / PgBouncer / Kafka (outbox pattern); OpenTelemetry + Prometheus + Grafana observability; ChromaDB vector store, Neo4j knowledge graph; Windows IIS + Nginx reverse proxy and Linux service deployment; WebSocket / Socket.IO; Docker containerisation.',
      },
      {
        tag: 'Business & Solution Design',
        desc: 'Designed the membership, order-dispatch and payment-settlement loops end to end in GameLink; strong at decomposing requirements into measurable terms, choosing between options and arguing ROI — turning business needs into buildable technical plans.',
      },
    ],

    projects: [
      {
        name: 'Nai · Multi-Agent AI Novel Writing Platform',
        tag: 'Open source · Python',
        link: 'https://github.com/HXSLtim/Nai',
        desc: 'A multi-agent novel-writing platform whose core problem is keeping worldview and characters consistent across million-word novels.',
        points: [
          'Orchestrates writing / review / editing / consistency agents as a LangGraph state graph, with tool chains assembled through ToolNode and conditional edges controlling the loop and its termination',
          'Layered memory: chapter-level memory + plot digest extraction + context budgeting and compression — turning long-form consistency from a context-stuffing problem into schedulable memory',
          'Hybrid RAG retrieval: ChromaDB vector store + metadata filtering + lifecycle and author scope authorisation; Neo4j knowledge graph for character-relation extraction and conflict validation',
          'MCP service development: a unified MCP control centre declaring its capability matrix, auditing every call, and failing explicitly on unimplemented capabilities instead of returning placeholder results',
          'FastAPI + PostgreSQL + Redis backend, Next.js / TypeScript frontend',
        ],
        result: '12 stars since open-sourcing: github.com/HXSLtim/Nai',
      },
      {
        name: 'AI Collab · Multi-Agent Collaborative Development System',
        tag: 'Open source · tmux / zsh',
        link: 'https://github.com/HXSLtim/ai-collab',
        desc: 'A local workspace that turns three coding agents — Claude, Codex and Antigravity — into a collaborating team: one command brings up a three-pane tmux session with a self-built message bus and collaboration protocol, so planning, execution and frontend work advance in parallel on the same task.',
        points: [
          'Role division as orchestration: Claude plans and orchestrates, Codex owns backend, testing and ops, Antigravity owns frontend prototypes and UX — complementary capabilities, not duplicates',
          'Self-built inter-agent message bus: delivers via tmux set-buffer + bracketed paste with a delayed submit key, frames every message with a [sender → target] timestamp, and logs it all into a reviewable collaboration log',
          'A protocol that suppresses message storms: at most one ACK and one FINAL per task per line, no progress chatter — keeping the context budget for real output',
          'Trade-off: driving CLIs by paste instead of API reuses each agent’s interactive state and subscription quota, avoiding API cost and key management; the cost is that a target pane must be waiting for input, with ai read / ai submit as fallback',
        ],
        result: 'Open-sourced and used daily — the AI implements, I design and verify workflow runs on this orchestration: github.com/HXSLtim/ai-collab',
      },
      {
        name: 'nodeAdmin · Multi-Tenant Back-Office Framework',
        tag: 'Open source · NestJS + React',
        link: 'https://github.com/DistroCore/nodeAdmin',
        desc: 'A multi-tenant back-office framework for internal enterprise platforms: NestJS 11 + Fastify backend, React 18 + Vite frontend, PostgreSQL 16 + Drizzle ORM — covering auth, audit, async messaging, realtime, observability and a plugin system in one foundation.',
        points: [
          'Tenant isolation pushed down into the database: PostgreSQL RLS enforces tenant boundaries in the DB rather than relying on the application layer alone; one codebase serves both single- and multi-tenant deployments via TenantContext + SINGLE_TENANT_MODE',
          'Event consistency via the outbox pattern: business writes and the outbox row commit in one transaction, and Kafka consumers are idempotent by eventId — no double writes, no lost messages',
          'Plugin marketplace: NestJS modules and React pages load dynamically via import() with importmap-shared dependencies, so plugins install, uninstall and update without a redeploy',
          'Engineering baseline: six-job CI (static / unit / audit / build / integration / docker); an audit-ci gate that blocks high-severity advisories with expiring allowlist entries; full OpenTelemetry + Prometheus + Grafana observability; a Socket.IO realtime layer load-tested to 10,000 concurrent connections',
        ],
        result: 'Public repo (MIT): all 254 commits authored by me, in development since Feb 2026 — github.com/DistroCore/nodeAdmin',
      },
      {
        name: 'AI Listing Automation · LLM + RPA',
        tag: 'AI in production · Python',
        desc: 'A multi-platform e-commerce listing tool built solo from 2024: the LLM understands and generates, RPA executes — product data flows from raw material to published listing with no manual step.',
        points: [
          'LLM output constrained by JSON Schema extracts and generates per-platform product fields (titles, selling points, spec attributes), keeping output stable and parseable',
          'Function Calling drives the RPA execution layer to fill and submit listings — the LLM decides, RPA executes',
          'Reliability triad: schema validation + retries against format drift; low-confidence fields flagged for humans so nothing broken is published; every step machine-verifiable — no pass, no upload',
          'Field mappings and platform rules distilled into configuration, so adding a platform is a config change rather than a core-flow change',
        ],
        result: 'Continuously used for multi-platform listing, forming a reusable LLM + RPA hybrid pattern.',
      },
      {
        name: 'Enterprise SRC Vulnerability Research · Security',
        tag: 'Security · Ongoing',
        desc: 'Continuous vulnerability research and disclosure across multiple enterprise SRC programs, focused on authentication bypass and unauthorised data access.',
        points: [
          '6 vulnerabilities rated by the platforms (4 high / 2 medium) across 6 companies, including session-forgery authentication bypass (missing server-side signature verification) and unauthorised reads of internal systems',
          'Closed methodology loop: asset mapping → frontend / mini-program reverse engineering → endpoint extraction → credential-free differential verification → decoy-value boundary testing → disclosure',
          'Testing discipline: read-only minimal verification, at most 5 real records, zero write operations, and nothing reported without proof of impact',
          'This methodology is itself the criterion for agent architecture: endpoint extraction and differential verification must decide the next probe from live responses, so they belong in a ReAct loop, while asset enumeration and request dispatch are deterministic and belong in a workflow — the same boundary I use when splitting orchestration in agent projects',
        ],
        result: 'All 6 disclosed through official channels and driven to fix; 4 rated high severity.',
      },
      {
        name: 'GameLink · Gaming Companion Management Platform',
        tag: 'Open source · Go + React',
        link: 'https://github.com/HXSLtim/GameLink',
        desc: 'A modern gaming-companion business platform: Go backend + React frontend, covering order dispatch, multi-role management, real-time messaging, payment & settlement, and monitoring end to end.',
        points: [
          'Designed a smart order-dispatch mechanism: automatic matching between users and companions, supporting both grab-pool and customer-service assignment modes',
          'Built a user / companion / admin multi-role permission system with JWT + RBAC access control',
          'Real-time group & private chat over WebSocket; integrated order payment, refunds and revenue settlement',
          'Dashboard for real-time order status, revenue statistics and system metrics',
        ],
        result: '49 stars / 14 forks since open-sourcing: github.com/HXSLtim/GameLink',
      },
      {
        name: 'Transparent File Encryption System · Windows Security Engineering',
        tag: 'C++ / Hook injection',
        desc: 'A transparent document-encryption system built on API Hook injection and in-memory crypto: authorised processes decrypt in memory with no user-visible step, while unauthorised processes only ever see ciphertext.',
        points: [
          'Hooks file I/O calls to encrypt and decrypt inside the authorised process memory stream — ciphertext at rest, transparent in legitimate use',
          'Injects a controlled reader for process-level permission checks; unauthorised processes and exfiltration channels cannot obtain plaintext',
          'Covers the typical DLP scenario: documents work normally inside the trusted environment and become unreadable outside it',
        ],
        result: 'Delivered the full loop from requirements analysis and design through to a deployable implementation.',
      },
      {
        name: 'Resume Terminal · Interactive Terminal Resume (this site)',
        tag: 'Open source · Vanilla JS',
        link: 'https://github.com/HXSLtim/resume',
        desc: 'The site you are browsing: a zsh-style interactive terminal resume, built with zero dependencies.',
        points: [
          'Hand-written command parsing, history (↑/↓) and Tab completion, with Chinese aliases and click-to-run command names',
          'Bilingual i18n plus light/dark theme and responsive layout; printing exports a formatted A4 resume from the same data source the terminal uses',
          'Deployed automatically via GitHub Pages — edit one place and the whole site updates',
        ],
        result: 'Live at: <a href="https://hxsltim.github.io/resume/" target="_blank" rel="noopener">hxsltim.github.io/resume</a>',
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
      note: 'Entered university at 13, graduated at 17 (early entry); independently delivering full-stack projects since 17 — this is not a typo',
      // See the zh block for the 6-month expiry caveat on the CHSI verification code.
      verify: {
        label: 'CHSI online verification code',
        code: '',
        url: 'https://www.chsi.com.cn/xlcx/bgcx.jsp',
      },
    },
  },
};
