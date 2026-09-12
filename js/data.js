/* =========================================================
   简历数据 —— 改简历只需要改这个文件
   （终端展示与打印版共用同一份数据，改一处全局生效）

   i18n：数据按语言分包 —— zh（中文）与 en（英文）。
   两份字段完全一致，改内容时记得两份同步改；
   页面语言可用 lang 命令 / 右上角按钮切换，或加 ?lang=en。
   ========================================================= */

window.RESUME_DATA = {
  /* ---------------- 中文 ---------------- */
  zh: {
    name: '刘正硕',
    role: '后端开发工程师 · AI 应用开发工程师 · 产品技术研发',

    ageInfo: '19 岁 · 2007.04',
    contacts: [
      { icon: '📱', text: '191-9581-9124' },
      { icon: '📧', text: 'a2778978136@163.com', href: 'mailto:a2778978136@163.com' },
      { icon: '💻', text: 'github.com/HXSLtim', href: 'https://github.com/HXSLtim' },
      { icon: '📍', text: '现居江苏 · 期望杭州' },
    ],

    about:
      '全栈开发落地能力 + 安全研究实战背景，深耕后端开发、自动化脚本（RPA）、AI Agent 应用，兼具技术落地、产品构思、项目统筹能力。' +
      '思维务实严谨，擅长拆解复杂需求、从零搭建可落地的技术项目；熟悉 Linux / macOS 服务部署、数据库优化与自动化程序开发；' +
      '在企业安全响应平台（SRC）持续产出高危级别漏洞成果，兼具攻防双视角；已有 LLM 结构化输出 + Function Call 驱动 RPA 的 AI 落地成品；' +
      '同时具备文创世界观设定、商业体系设计的多元化创作与规划能力。',

    experiences: [
      {
        company: '独立开发 · 远程全栈',
        role: '全栈开发工程师',
        industry: 'RPA 自动化 / 中后台 / 微信生态',
        date: '2024 – 2025',
        points: [
          '远程交付全栈项目：中后台管理系统、微信生态应用（公众号/SDK 网页应用、微信云开发小程序）、RPA 自动化工具',
          '开发 AI + RPA 自动上架工具（LLM 结构化输出 + Function Call 驱动执行），将大模型能力引入业务自动化流程',
          '独立完成 Windows 文件透明加密系统（API Hook + 内存级加解密），从需求分析到工程落地闭环',
        ],
      },
      {
        company: '雪机猫传媒有限公司',
        role: '全栈开发工程师',
        industry: '游戏陪玩',
        date: '2025 – 2026.07', // ✏️ 如需精确到起始月份可再改
        points: [
          '独立负责公司游戏陪玩平台的开发与维护，作为公司唯一 IT，全流程承担开发、上线与日常技术保障',
          '主导前端功能开发与页面维护，同时负责后端服务维护与基于业务需求的二次开发',
          '快速响应业务迭代需求，完成功能闭环落地，保障平台稳定运行',
          '将陪玩平台核心场景沉淀为开源项目 GameLink（Go + React，48 Star / 13 Fork）',
        ],
      },
    ],

    skills: [
      {
        tag: '后端与脚本开发',
        desc: '熟练使用 Go / Python / Node.js 编写自动化脚本、业务逻辑代码，精通 SQL 语句编写与数据库性能优化，可独立完成数据清洗、CSV 数据处理、接口逻辑开发，具备完整的后端功能开发与问题排查能力。',
      },
      {
        tag: '服务器与运维',
        desc: '熟悉 Linux、macOS 系统环境，掌握服务器部署、环境配置、故障排查，可独立完成项目上线、服务维护、稳定性优化工作。',
      },
      {
        tag: 'AI 应用开发',
        desc: '基于 Python 深耕 AI Agent 研发：LLM 结构化输出（JSON Schema 约束）、Function Calling / 工具调用、RPA 集成落地；熟悉微信生态开发（公众号/小程序 SDK、微信云开发），具备 AI 项目从零搭建到业务落地的完整实战经验。',
      },
      {
        tag: '安全研究',
        desc: '在企业安全响应平台（SRC）持续进行漏洞挖掘，产出高危级别成果（认证绕过、未授权数据读取类），全程遵循最小化验证与平台报送规范；具备 API Hook 注入、内存级加解密的工程级安全开发能力，攻防双视角。',
      },
      {
        tag: '产品与商业设计',
        desc: '具备完整的产品思维，可独立设计平台会员积分体系、用户体系、商业运营模式，了解股权合规、平台运营规则，擅长将商业构想转化为可落地的产品方案。',
      },
    ],

    projects: [
      {
        name: 'GameLink · 游戏陪玩管理平台',
        tag: '开源 · Go + React',
        link: 'https://github.com/HXSLtim/GameLink',
        desc: '现代化游戏陪玩业务平台，Go 后端 + React 前端，覆盖订单智能分发、多角色管理、实时通讯、支付结算与数据监控全链路。',
        points: [
          '设计智能订单分发机制：自动匹配用户与陪玩师，支持抢单池与客服指派两种模式',
          '搭建用户 / 陪玩师 / 管理员多角色权限体系，基于 JWT + RBAC 控制访问安全',
          '基于 WebSocket 实现群聊 / 私聊即时通讯；打通订单支付、退款与收益结算',
          '实时订单状态、收益统计与系统指标监控看板',
        ],
        result: '开源后获 48 Star / 13 Fork：github.com/HXSLtim/GameLink',
      },
      {
        name: 'Nai · 多 Agent AI 小说创作平台',
        tag: '开源 · Python',
        link: 'https://github.com/HXSLtim/Nai',
        desc: '基于多 Agent 协作的智能小说创作平台，支持世界观管理、角色管理、大纲管理与长篇创作一致性保障。',
        points: [
          '基于 LangChain 编排多 Agent 协作，覆盖素材整理、大纲规划与正文生成全流程',
          '使用 ChromaDB 向量库 + RAG 管理设定记忆，保障长篇创作中的世界观与角色一致性',
          'FastAPI 后端 + Next.js / TypeScript 前端的完整工程化实现',
        ],
        result: '开源获 12 Star：github.com/HXSLtim/Nai',
      },
      {
        name: 'AI 自动上架工具 · LLM + RPA',
        tag: 'AI 落地 · Python',
        desc: '电商多平台自动上架工具：大模型负责理解与生成，RPA 负责执行，实现商品信息从素材到上架的全自动流转，替代纯人工重复操作。',
        points: [
          'LLM 结构化输出按 JSON Schema 约束抽取与生成各平台商品字段（标题、卖点、规格属性），保证输出格式稳定可解析',
          'Function Calling 驱动 RPA 执行层完成各平台填表上架，LLM 做决策、RPA 做执行',
          '工程可靠性三件套：Schema 校验 + 失败重试防格式漂移；低置信字段标记留人工，不带病上架；每步结果机器可校验，不过不上传',
          '梳理字段映射与平台规则沉淀为配置，新增平台只需扩展配置无需改核心流程',
        ],
        result: '在多平台上架场景持续落地使用，将重复性人工上架操作自动化，形成 LLM + RPA 混合架构的可复用实践。',
      },
      {
        name: '企业 SRC 漏洞挖掘 · 安全研究',
        tag: '安全 · 持续',
        desc: '在多个企业安全响应平台（SRC）持续进行漏洞挖掘与报送，聚焦认证绕过、未授权数据访问类问题，全程遵循最小化验证原则与平台报送规范。',
        points: [
          '高危成果若干：包括会话伪造类认证绕过（服务端验签缺失场景）与内部系统未授权数据读取，均获平台定级确认并推动修复',
          '方法论闭环：资产测绘 → 前端/小程序逆向 → 接口抽取 → 无凭证差分验证 → 假值对照定界 → 平台报送',
          '测试纪律：只读最小化验证、真实数据 ≤5 组、写操作零触碰、无效果证据不报送',
        ],
        result: '多个高危漏洞获企业 SRC 平台定级确认，全部通过官方渠道报送并推动修复。',
      },
      {
        name: '文件透明加密系统 · Windows 安全工程',
        tag: 'C++ / Hook 注入',
        desc: '基于 API Hook 注入与内存级加解密实现的文档透明加密系统：授权进程读取时在内存中完成解密，用户全程无感；非授权进程只能获得密文，配套受控读取器进行权限判定。',
        points: [
          '通过 Hook 截获文件读写调用，在授权进程的内存数据流中完成加解密，实现落盘即密文、合法使用无感',
          '注入受控读取器做进程级权限判定，未授权进程与外发渠道均无法获取明文',
          '覆盖典型防泄密场景：文档在可信环境内正常使用，脱离环境即不可读',
        ],
        result: '独立完成从需求分析、方案设计到工程实现的完整闭环，形成可部署的透明加密防护方案。',
      },
      {
        name: '后端数据处理与数据库优化',
        tag: 'SQL / 数据',
        desc: '针对批量数据处理、数据清洗、数据库卡顿等问题，开发自动化数据处理脚本并完成 SQL 性能优化，解决海量数据处理效率低、数据库响应慢的问题。',
        points: [
          '自主编写自动化脚本，实现 CSV 批量数据导入、清洗、筛选、整理，替代人工手动操作，大幅提升数据处理效率',
          '深度优化 SQL 查询语句、索引结构与查询逻辑，解决数据库查询卡顿、冗余数据过多等问题，提升数据库响应速度',
          '梳理数据处理流程，标准化数据处理规范，规避数据错乱、丢失、重复等问题，保障数据准确性与完整性',
          '完成服务器端数据服务调试，适配线上运行环境，保障数据处理服务稳定持续运行',
        ],
        result: '实现数据处理全流程自动化，数据库查询效率大幅提升，成功解决海量数据处理卡顿、数据异常等核心问题。',
      },
      {
        name: '互联网平台商业体系设计',
        tag: '产品设计',
        desc: '独立构思并设计综合型服务平台商业模式，涵盖用户体系、会员积分体系、运营规则、股权合规体系，打造完整的平台运营闭环方案。',
        points: [
          '搭建平台核心用户体系，设计会员等级、积分获取、积分兑换、权益匹配机制，完善用户留存与激励体系',
          '研究平台运营合规规则，梳理股权架构、运营风险、合规要点，规避商业运营中的合规漏洞',
          '完整规划平台业务模块、盈利模式、运营流程，形成从用户引流、留存、变现的全链路商业方案',
          '结合市场需求优化产品逻辑，简化运营流程，提升平台商业模式的可行性与落地性',
        ],
        result: '输出一套完整、合规、可落地的平台商业运营方案，包含会员体系、盈利体系、合规体系三大核心模块。',
      },
      {
        name: 'Resume Terminal · 交互式终端简历（本站）',
        tag: '开源 · 原生 JS',
        link: 'https://github.com/HXSLtim/resume',
        desc: '你正在浏览的这个简历站点：仿 zsh 终端交互，零依赖纯前端实现命令解析、历史与补全、深浅主题与移动端响应式，打印可导出 A4 版简历，通过 GitHub Pages 自动部署。',
        points: [],
        result: '在线访问：<a href="https://hxsltim.github.io/resume/" target="_blank" rel="noopener">hxsltim.github.io/resume</a>',
      },
    ],

    advantages: [
      {
        tag: '技术落地能力强',
        desc: '所有项目均为自主从零落地，不局限于理论知识，擅长解决实际开发、运营中的各类问题，实战经验充足。',
      },
      {
        tag: '攻防双视角',
        desc: '安全研究实战背景，交付系统时同步考虑权限、数据与内容风险，擅长把安全护栏做进交付流程，而非事后补漏。',
      },
      {
        tag: '思维全面多元',
        desc: '兼具硬核技术研发能力、商业产品思维，可兼顾技术开发、产品规划、内容创作多维度工作。',
      },
      {
        tag: '严谨务实自律',
        desc: '做事注重细节、追求精准，规避虚假与冗余，擅长长期迭代优化项目，具备极强的问题排查能力与复盘能力。',
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
    },
  },

  /* ---------------- English ---------------- */
  en: {
    name: 'Liu Zhengshuo',
    role: 'Backend Developer · AI Application Developer · Product R&D',

    ageInfo: '19 y/o · Apr 2007',
    contacts: [
      { icon: '📱', text: '191-9581-9124' },
      { icon: '📧', text: 'a2778978136@163.com', href: 'mailto:a2778978136@163.com' },
      { icon: '💻', text: 'github.com/HXSLtim', href: 'https://github.com/HXSLtim' },
      { icon: '📍', text: 'Based in Jiangsu · Open to Hangzhou' },
    ],

    about:
      'Full-stack delivery capability plus hands-on security research background, focusing on backend development, automation scripting (RPA) and AI agent applications, combining hands-on engineering, product thinking and project coordination. ' +
      'Pragmatic and rigorous; skilled at breaking down complex requirements and building production-ready projects from scratch. ' +
      'Familiar with Linux / macOS service deployment, database optimization and automation tooling. ' +
      'Continuously producing high-severity findings on corporate SRC (security response) platforms, with both offensive and defensive perspectives. ' +
      'Shipped a production AI tool combining LLM structured output + Function Call driven RPA. ' +
      'Also experienced in creative worldbuilding and business-system design.',

    experiences: [
      {
        company: 'Independent Developer · Remote Full-stack',
        role: 'Full-stack Developer',
        industry: 'RPA Automation / Admin Systems / WeChat Ecosystem',
        date: '2024 – 2025',
        points: [
          'Delivered full-stack projects remotely: admin/management systems, WeChat-ecosystem apps (official-account/SDK web apps, WeChat Cloud mini-programs) and RPA automation tools',
          'Built an AI + RPA auto-listing tool (LLM structured output + Function Call driven execution), bringing LLM capabilities into business automation',
          'Independently delivered a Windows transparent file-encryption system (API Hook + in-memory encryption/decryption), from requirements to engineering closure',
        ],
      },
      {
        company: 'Xuejimao Media Co., Ltd.',
        role: 'Full-stack Developer',
        industry: 'Gaming companion services',
        date: '2025 – 2026.07',
        points: [
          'Solely responsible for developing and maintaining the company’s gaming-companion platform; as the only IT staff, owned the full cycle of development, launch and daily technical support',
          'Led frontend feature development and page maintenance, while maintaining backend services and building secondary development on business needs',
          'Delivered fast iteration on business requirements with complete feature loops, keeping the platform stable',
          'Distilled the core platform scenarios into the open-source project GameLink (Go + React, 48 stars / 13 forks)',
        ],
      },
    ],

    skills: [
      {
        tag: 'Backend & Scripting',
        desc: 'Proficient in Go / Python / Node.js for automation scripts and business logic; strong SQL writing and database performance tuning; independently handle data cleaning, CSV processing and API logic — complete backend development and troubleshooting capability.',
      },
      {
        tag: 'Servers & Ops',
        desc: 'Familiar with Linux and macOS environments; server deployment, environment setup and fault diagnosis; can independently ship projects, maintain services and improve stability.',
      },
      {
        tag: 'AI Application Development',
        desc: 'Deep focus on AI agent development with Python: LLM structured output (JSON Schema constraints), Function Calling / tool use, and RPA integration; familiar with WeChat-ecosystem development (official-account / mini-program SDK, WeChat Cloud). End-to-end experience from zero to business landing.',
      },
      {
        tag: 'Security Research',
        desc: 'Continuously hunting vulnerabilities on corporate SRC (security response) platforms with high-severity findings (authentication bypass, unauthorized data access), following minimal-verification and responsible-disclosure discipline; engineering-grade security skills including API Hook injection and in-memory encryption. Offensive + defensive perspectives.',
      },
      {
        tag: 'Product & Business Design',
        desc: 'Full product mindset: designs platform membership & points systems, user systems and business operation models; understands equity compliance and platform operation rules; good at turning business ideas into feasible product plans.',
      },
    ],

    projects: [
      {
        name: 'GameLink · Gaming Companion Management Platform',
        tag: 'Open source · Go + React',
        link: 'https://github.com/HXSLtim/GameLink',
        desc: 'A modern gaming-companion business platform: Go backend + React frontend, covering smart order dispatch, multi-role management, real-time messaging, payment & settlement, and data monitoring end to end.',
        points: [
          'Designed a smart order-dispatch mechanism: automatic matching between users and companions, supporting both grab-pool and customer-service assignment modes',
          'Built a user / companion / admin multi-role permission system with JWT + RBAC access control',
          'Real-time group & private chat over WebSocket; integrated order payment, refunds and revenue settlement',
          'Dashboard for real-time order status, revenue statistics and system metrics',
        ],
        result: '48 stars / 13 forks since open-sourcing: github.com/HXSLtim/GameLink',
      },
      {
        name: 'Nai · Multi-Agent AI Novel Writing Platform',
        tag: 'Open source · Python',
        link: 'https://github.com/HXSLtim/Nai',
        desc: 'An intelligent novel-writing platform based on multi-agent collaboration, supporting worldview management, character management, outline management and long-form consistency.',
        points: [
          'Orchestrates multi-agent collaboration with LangChain across material organizing, outline planning and draft generation',
          'Uses ChromaDB vector store + RAG to manage setting memory, keeping worldview and characters consistent in long-form writing',
          'Fully engineered with a FastAPI backend and a Next.js / TypeScript frontend',
        ],
        result: '12 stars since open-sourcing: github.com/HXSLtim/Nai',
      },
      {
        name: 'AI Auto-Listing Tool · LLM + RPA',
        tag: 'AI Landing · Python',
        desc: 'An e-commerce multi-platform auto-listing tool: the LLM understands and generates, RPA executes — fully automating the flow from product assets to live listings, replacing repetitive manual work.',
        points: [
          'LLM structured output extracts and generates per-platform product fields (title, selling points, specs) under JSON Schema constraints, keeping output stable and parseable',
          'Function Calling drives the RPA execution layer to fill and submit listings — LLM as the decision head, RPA as the execution hands',
          'Engineering reliability trio: schema validation + retry against format drift; low-confidence fields flagged for human review; machine-checkable results at every step',
          'Field mappings and platform rules externalized as configuration — new platforms onboard without touching core flow',
        ],
        result: 'In continuous use for multi-platform listing scenarios; a reusable LLM + RPA hybrid-architecture practice.',
      },
      {
        name: 'Corporate SRC Vulnerability Research · Security',
        tag: 'Security · Ongoing',
        desc: 'Continuous vulnerability hunting and disclosure on multiple corporate SRC platforms, focused on authentication bypass and unauthorized data access, with strict minimal-verification and platform-disclosure discipline.',
        points: [
          'Multiple high-severity findings: session-forgery authentication bypass (missing server-side signature validation) and unauthorized reads of internal systems — all platform-rated and driving fixes',
          'Closed-loop methodology: asset mapping → frontend/mini-program reverse engineering → API extraction → no-credential differential testing → fake-value contrast for scoping → platform disclosure',
          'Testing discipline: read-only minimal verification, ≤5 real records, zero write operations, no submission without impact evidence',
        ],
        result: 'Multiple high-severity vulnerabilities confirmed by corporate SRC platforms, all disclosed through official channels and driving fixes.',
      },
      {
        name: 'Transparent File Encryption System · Windows Security Engineering',
        tag: 'C++ / Hook Injection',
        desc: 'A transparent document-encryption system built on API Hook injection and in-memory encryption/decryption: authorized processes read decrypted content in memory seamlessly; unauthorized processes only ever see ciphertext, with an injected controlled reader enforcing per-process permissions.',
        points: [
          'Intercepted file read/write calls via hooks, performing encryption/decryption in the authorized process’s memory stream — data-at-rest is ciphertext while legitimate use stays transparent',
          'Injected controlled reader for process-level permission decisions; unauthorized processes and exfiltration channels cannot obtain plaintext',
          'Covers typical DLP scenarios: documents work normally inside trusted environments, unreadable outside',
        ],
        result: 'Independently delivered the full loop from requirements and design through engineering implementation into a deployable protection solution.',
      },
      {
        name: 'Backend Data Processing & Database Optimization',
        tag: 'SQL / Data',
        desc: 'For batch data processing, data cleaning and database lag issues: developed automated data-processing scripts and optimized SQL performance, solving slow massive-data processing and sluggish database responses.',
        points: [
          'Wrote automation scripts for batch CSV import, cleaning, filtering and organizing — replacing manual work and greatly improving data-processing efficiency',
          'Deeply optimized SQL query statements, index structures and query logic to fix query lag and redundant data, improving database response speed',
          'Standardized data-processing workflows to prevent data corruption, loss and duplication, ensuring accuracy and integrity',
          'Debugged server-side data services for the production environment, keeping them stable and continuously running',
        ],
        result: 'Fully automated the data-processing pipeline and greatly improved query efficiency, resolving massive-data lag and data-anomaly issues.',
      },
      {
        name: 'Internet Platform Business System Design',
        tag: 'Product Design',
        desc: 'Independently conceived and designed the business model of a comprehensive service platform, covering the user system, membership & points system, operation rules and equity compliance — a complete closed-loop operation plan.',
        points: [
          'Built the core platform user system: membership tiers, points earning / redemption and benefit matching, improving retention and incentives',
          'Researched platform operation compliance rules, sorted out equity structures, operational risks and compliance points to avoid loopholes',
          'Planned business modules, monetization models and operation flows into a full-funnel plan from acquisition and retention to monetization',
          'Refined product logic against market needs, simplified operation flows, and improved the feasibility of the business model',
        ],
        result: 'Produced a complete, compliant and actionable platform business operation plan covering three core modules: membership, monetization and compliance.',
      },
      {
        name: 'Resume Terminal · Interactive Terminal Resume (this site)',
        tag: 'Open source · Vanilla JS',
        link: 'https://github.com/HXSLtim/resume',
        desc: 'The site you are browsing: a zsh-style interactive resume. Zero-dependency frontend implementing command parsing, history & completion, light/dark themes and mobile responsiveness; printing exports a well-formatted A4 resume; deployed automatically via GitHub Pages.',
        points: [],
        result: 'Live at: <a href="https://hxsltim.github.io/resume/" target="_blank" rel="noopener">hxsltim.github.io/resume</a>',
      },
    ],

    advantages: [
      {
        tag: 'Strong delivery capability',
        desc: 'Every project was built and shipped from zero by myself — not just theory. Skilled at solving real problems in development and operations, with solid hands-on experience.',
      },
      {
        tag: 'Offensive & defensive perspectives',
        desc: 'Hands-on security research background: delivers systems with permissions, data and content risks designed in, building guardrails into the delivery process instead of patching afterwards.',
      },
      {
        tag: 'Well-rounded thinking',
        desc: 'Combines hardcore engineering with commercial product thinking; can cover technical development, product planning and content creation at the same time.',
      },
      {
        tag: 'Rigorous & self-disciplined',
        desc: 'Detail-oriented and precision-driven, avoiding fluff and redundancy; skilled at long-term project iteration, with strong debugging and retrospective ability.',
      },
      {
        tag: 'Fast learner',
        desc: 'Continuously digging into new technologies and logic; adapts quickly to different role requirements, new frameworks and business logic.',
      },
    ],

    education: {
      school: 'Chongqing Institute of Engineering',
      major: 'Network Engineering',
      degree: 'Bachelor',
      date: '2020.09 – 2024.06',
    },
  },
};
