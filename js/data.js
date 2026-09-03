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
      '拥有全栈开发落地能力，深耕后端开发、自动化脚本、AI Agent 应用，兼具技术落地、产品构思、项目统筹能力。' +
      '思维务实严谨，擅长拆解复杂需求、从零搭建可落地的技术项目；熟悉 Linux / macOS 服务部署、数据库优化与自动化程序开发，' +
      '全程主导多个个人技术项目、量化项目与产品构想项目，擅长规避技术风险、优化程序性能、实现功能闭环落地；' +
      '同时具备文创世界观设定、商业体系设计的多元化创作与规划能力。',

    experiences: [
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
        desc: '基于 Python 深耕 AI Agent 研发，了解智能代理核心逻辑、功能搭建、场景落地，可结合业务需求开发智能化自动化应用，具备 AI 项目从零搭建的实战思维。',
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
        name: 'AI Agent 智能应用开发',
        tag: 'AI Agent',
        desc: '自主从零研发轻量化 AI 智能代理应用，聚焦自动化场景落地，替代重复人工操作，适配日常数据处理、智能响应、自动化执行等多元场景。',
        points: [
          '独立完成项目整体架构设计，拆解核心功能模块，搭建稳定的 AI Agent 运行框架，优化程序响应速度与执行效率',
          '结合实际使用场景优化智能决策逻辑，修复程序运行漏洞，提升自动化任务的精准度与稳定性',
          '适配多系统运行环境，完成本地环境调试、兼容性优化，实现项目可直接部署、即时可用',
          '梳理项目开发文档，沉淀可复用的开发逻辑与方案模板',
        ],
        result: '成功落地可用的轻量化 AI Agent 工具，可高效完成批量数据处理、自动化任务执行，大幅降低重复操作成本，具备极强的实用性与拓展性。',
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
      'Full-stack delivery capability with a focus on backend development, automation scripting and AI agent applications, combining hands-on engineering, product thinking and project coordination. ' +
      'Pragmatic and rigorous; skilled at breaking down complex requirements and building production-ready projects from scratch. ' +
      'Familiar with Linux / macOS service deployment, database optimization and automation tooling. ' +
      'Have end-to-end owned multiple personal tech projects, quantitative projects and product concepts, with strong risk control, performance tuning and feature-loop delivery. ' +
      'Also experienced in creative worldbuilding and business-system design.',

    experiences: [
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
        desc: 'Deep focus on AI agent development with Python; understands agent core logic, capability building and real-scenario landing; builds intelligent automation apps against real business needs with a from-scratch project mindset.',
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
        name: 'AI Agent Application Development',
        tag: 'AI Agent',
        desc: 'Built lightweight AI agent applications from scratch, focused on automation scenarios: replacing repetitive manual work across data processing, smart responses and automated execution.',
        points: [
          'Designed the overall architecture independently, decomposed core modules, built a stable agent runtime, and optimized response speed and execution efficiency',
          'Improved decision logic against real usage scenarios, fixed runtime bugs, and improved the precision and stability of automated tasks',
          'Adapted to multiple OS environments with local debugging and compatibility work — directly deployable and immediately usable',
          'Documented the development process into reusable logic and solution templates',
        ],
        result: 'Delivered a practical lightweight AI agent tool that efficiently handles batch data processing and automated task execution, greatly reducing repetitive work — highly practical and extensible.',
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
