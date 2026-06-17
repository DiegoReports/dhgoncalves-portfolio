export type Locale = "en" | "pt";

export type ArticleEntry = { title: string; excerpt: string; href: string };
export type CareerStep = {
  role: string;
  startDate: string;
};

export type JobEntry = {
  yearRange: string;
  duration: string;
  company: string;
  role: string;
  techStack: string;
  details: string;
  careerPath?: CareerStep[];
};

type Copy = {
  nav: {
    about: string;
    experience: string;
    projects: string;
    activities: string;
    articles: string;
    contacts: string;
  };
  hero: {
    titles: string[];
    subtitleLead: string;
    subtitleBold1: string;
    subtitleMid: string;
    subtitleBoldItalic: string;
    subtitleTail: string;
    projectsCta: string;
    scrollDown: string;
    social: { github: string; linkedin: string; email: string; instagram: string };
  };
  about: {
    kicker: string;
    headingLine1: string;
    headingRole: string;
    headingLine2: string;
    skillsIntro1: string;
    skillsIntro2: string;
    skillsIntro3: string;
    skillGroups: { title: string; skills: string[] }[];
    photoPlaceholder: string;
  };
  work: {
    sectionTitle: string;
    totalLabel: string;
    totalYears: number;
    totalMonths: number;
    durationYearLabel: string;
    durationMonthLabel: string;
    viewDetails: string;
    careerProgressionLabel: string;
    jobs: JobEntry[];
  };
  projects: {
    kicker: string;
    items: {
      title: string;
      description: string;
      techStack: string[];
      thumbLabel: string;
      thumbEmoji?: string;
      thumbImage?: string;
      statLabel: string;
      statValue: string;
      statSub: string;
    }[];
  };
  articles: {
    sectionTitle: string;
    readMore: string;
    items: ArticleEntry[];
  };
  activities: {
    sectionTitle: string;
    kicker: string;
    hobbiesTitle: string;
    hobbies: { cycling: string; running: string; futsal: string };
    stravaLabel: string;
    stravaConnect: string;
    stravaConnectCta: string;
    adidasLabel: string;
    adidasCta: string;
    loading: string;
    error: string;
    pace: string;
    distance: string;
  };
  footer: {
    ctaLine1: string;
    ctaLine2: string;
    subtitle1: string;
    subtitle2: string;
    contactsKicker: string;
    navMain: string;
    siteCardTitle: string;
    siteLine1a: string;
    siteLine1b: string;
    siteLine2a: string;
    siteLine2b: string;
    siteLine3a: string;
    siteLine3b: string;
    social: { github: string; linkedin: string; email: string; instagram: string; whatsapp: string };
    copyright: string;
  };
  notFound: {
    title: string;
    message: string;
    back: string;
  };
};

export const translations: Record<Locale, Copy> = {
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      activities: "Hobbies",
      articles: "Articles",
      contacts: "Contacts",
    },
    hero: {
      titles: ["RPA Developer", "Web Developer", "Full Stack Developer", "Low-code Developer", "AI Developer", "Automation Engineer"],
      subtitleLead: "My goal is to",
      subtitleBold1: "automate processes",
      subtitleMid: " and build",
      subtitleBoldItalic: "clean web solutions",
      subtitleTail: "to make business operations seamless.",
      projectsCta: "Projects",
      scrollDown: "Scroll down",
      social: {
        github: "Github",
        linkedin: "LinkedIn",
        email: "E-mail",
        instagram: "Instagram",
      },
    },
    about: {
      kicker: "... /About me ...",
      headingLine1: "Hello! I'm a",
      headingRole: "RPA & Web Developer",
      headingLine2: "10+ years building solutions.",
      skillsIntro1: "Some of my",
      skillsIntro2: "favorite technologies,",
      skillsIntro3: "tools and platforms I work with",
      skillGroups: [
        { title: "RPA Tools", skills: ["Rocketbot Studio", "UiPath", "Power Automate", "BotCity"] },
        { title: "Frontend & Web", skills: ["React", "TypeScript", "TailwindCSS", "HTML5", "CSS3", "JavaScript"] },
        { title: "Dev & Scripting", skills: ["Python", "NodeJS", "Git & GitHub", "PostgreSQL", "SQL Server Management Studio"] },
        { title: "AI & Cloud", skills: ["Azure AI (IA900)", "OpenAI", "Claude", "MS Copilot", "Google Workspace / Gemini"] },
        { title: "Project Management", skills: ["Jira", "Notion", "MS Planner / MS Project", "Power BI"] },
      ],
      photoPlaceholder: "Your photo here",
    },
    work: {
      sectionTitle: "Work",
      totalLabel: "Work experience",
      totalYears: 10,
      totalMonths: 8,
      durationYearLabel: "years",
      durationMonthLabel: "months",
      viewDetails: "View details",
      careerProgressionLabel: "Career Progression",
      jobs: [
        {
          yearRange: "2025 -",
          duration: "1 year 5 months",
          company: "Rocketbot (Chile)",
          role: "RPA Developer",
          techStack: "Python · Rocketbot Studio · SAP · Lincros · Glorian",
          details:
            "Developing robots with Rocketbot Studio to automate logistics processes. Integration with SAP, Lincros and Glorian ERP systems. Web automation targeting banking portals. Involved in all project stages: process mapping, documentation, integrated testing and final delivery. Client: Imbera Cooling.",
        },
        {
          yearRange: "2024 - 2025",
          duration: "~6 months",
          company: "Freelance",
          role: "Full Stack Developer",
          techStack: "React · TypeScript · TailwindCSS · FastAPI · Python · PostgreSQL · Supabase",
          details:
            "Developed SGP (Production Management System) for an industrial client. Full-stack web application with service order tracking, sequential production stages, real-time monitoring via SSE, role-based access control (Admin/Operator), and an analytics dashboard. Deployed on Vercel (frontend), Railway (backend) and Supabase (PostgreSQL database).",
        },
        {
          yearRange: "2025",
          duration: "~2 months",
          company: "Freelance",
          role: "Frontend Developer",
          techStack: "HTML5 · CSS3 · Bootstrap 5 · JavaScript",
          details:
            "Built a professional photography portfolio and services website for a client. Six-page static site (landing + 5 service categories) with an image gallery using Swiper carousel, WhatsApp-integrated contact form, animated statistics, and testimonials section.",
        },
        {
          yearRange: "2022 - 2024",
          duration: "2 years",
          company: "EARQ Consultoria",
          role: "Support Analyst",
          techStack: "Uipath · Orquestrator · SQL · Process Monitoring",
          details:
            "Update and monitoring of automated activities and operational databases. KPI report generation with data extracted via SQL. Daily technical support for RPA tools and inconsistency analysis. Process documentation and improvement tracking in a collaborative environment with operations teams. Client: DHL Supply Chain.",
        },
        {
          yearRange: "2015 - 2022",
          duration: "7 years",
          company: "SBK BPO",
          role: "RPA Developer / Administrative Analyst",
          techStack: "Process Automation · Documentation · Operations",
          details:
            "Handling legal requests and sensitive information with high organizational standards. Operational task and deadline tracking focused on data completeness and accuracy. Internal process mapping and documentation, prioritizing clarity and knowledge reuse. Support for operational routines focused on consistency and standardization. Client: Bradesco CPI.",
          careerPath: [
            { role: "Operational Assistant", startDate: "March/2015" },
            { role: "Administrative Analyst", startDate: "September/2018" },
            { role: "RPA Developer", startDate: "March/2019" },
          ],
        },
      ],
    },
    projects: {
      kicker: "... /Projects ...",
      items: [
        {
          title: "Logistics Robot Suite",
          description:
            "End-to-end automation of logistics processes using Rocketbot Studio. Integration with SAP, Lincros and Glorian ERP systems, including web automation for banking portals. Full project lifecycle: process mapping, documentation, integrated testing and delivery.",
          techStack: ["Python", "Rocketbot Studio", "SAP", "Web Automation", "APIs"],
          thumbLabel: "Bot dashboard",
          thumbEmoji: "🤖",
          statLabel: "Reduction",
          statValue: "80%",
          statSub: "Manual effort",
        },
        {
          title: "Supply Chain RPA Monitoring",
          description:
            "RPA monitoring and SQL-based reporting system for large-scale supply chain operations. Automated KPI extraction, inconsistency detection and process documentation supporting cross-functional teams across finance and operations departments.",
          techStack: ["SQL Server", "Uipath", "RPA Monitoring", "Process Docs"],
          thumbLabel: "Dashboard",
          thumbEmoji: "🤖",
          statLabel: "Coverage",
          statValue: "100%",
          statSub: "Process visibility",
        },
        {
          title: "SGP – Production Management System",
          description:
            "Full-stack web application for industrial production order management. Features service order tracking, sequential production stages, real-time monitoring via SSE, role-based access control (Admin/Operator) and an analytics dashboard. Deployed on Vercel, Railway and Supabase.",
          techStack: ["React", "TypeScript", "TailwindCSS", "FastAPI", "Python", "PostgreSQL", "Supabase"],
          thumbLabel: "SGP system",
          thumbEmoji: "🌐",
          thumbImage: "/assets/barromanager_screenshot.png",
          statLabel: "Access roles",
          statValue: "2",
          statSub: "Admin + Operator",
        },
        {
          title: "Gizulinski Fotografia",
          description:
            "Professional photography portfolio and services website for a client. Six-page static site covering five service categories, with an image gallery, WhatsApp-integrated contact form, animated statistics and testimonials.",
          techStack: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript"],
          thumbLabel: "Photography site",
          thumbEmoji: "🎨",
          thumbImage: "/assets/gidzulinskifotografia_screenshot.png",
          statLabel: "Pages",
          statValue: "6",
          statSub: "Service categories",
        },
      ],
    },
    activities: {
      sectionTitle: "Activities",
      kicker: "... /Hobbies & Activities ...",
      hobbiesTitle: "My Hobbies",
      hobbies: { cycling: "Cycling", running: "Running", futsal: "Futsal" },
      stravaLabel: "Latest on Strava",
      stravaConnect: "Follow me on Strava",
      stravaConnectCta: "View profile",
      adidasLabel: "Adidas Running",
      adidasCta: "Connect on Adidas Running",
      loading: "Loading activities…",
      error: "Could not load activities",
      pace: "Pace",
      distance: "Distance",
    },
    articles: {
      sectionTitle: "Articles",
      readMore: "coming soon ...",
      items: [
        {
          title: "How to optimize Python bots for enterprise scale",
          excerpt:
            "Learn the best practices for building performant automation scripts that can handle thousands of transactions daily.",
          href: "#",
        },
        {
          title: "UiPath vs Power Automate: A complete comparison",
          excerpt:
            "An in-depth analysis of the two leading RPA platforms, their strengths, and when to use each one.",
          href: "#",
        },
        {
          title: "Building resilient automation workflows",
          excerpt:
            "Discover error handling patterns and retry mechanisms that make your bots production-ready.",
          href: "#",
        },
        {
          title: "Integrating AI with RPA for intelligent automation",
          excerpt:
            "How to combine machine learning models with robotic process automation for smarter workflows.",
          href: "#",
        },
      ],
    },
    footer: {
      ctaLine1: "Let's",
      ctaLine2: "Automate",
      subtitle1: "Full-stack",
      subtitle2: "RPA & Web Developer",
      contactsKicker: "... /Contacts ...",
      navMain: "Main",
      siteCardTitle: "Site",
      siteLine1a: "Handcrafted by",
      siteLine1b: "ME",
      siteLine2a: "Designed with",
      siteLine2b: "passion",
      siteLine3a: "Powered by",
      siteLine3b: "React",
      social: {
        github: "Github",
        linkedin: "LinkedIn",
        email: "E-mail",
        instagram: "Instagram",
        whatsapp: "WhatsApp",
      },
      copyright: "© 2026 Diego Gonçalves · RPA & Web Developer. All rights reserved.",
    },
    notFound: {
      title: "404",
      message: "This page does not exist.",
      back: "Back to home",
    },
  },
  pt: {
    nav: {
      about: "Sobre",
      experience: "Experiência",
      projects: "Projetos",
      activities: "Hobbies",
      articles: "Artigos",
      contacts: "Contatos",
    },
    hero: {
      titles: ["Desenvolvedor RPA", "Desenvolvedor Web", "Desenvolvedor Full Stack", "Desenvolvedor Low-code", "Desenvolvedor IA", "Engenheiro de Automação"],
      subtitleLead: "O meu objetivo é",
      subtitleBold1: "automatizar processos",
      subtitleMid: " e construir",
      subtitleBoldItalic: "soluções web eficientes",
      subtitleTail: "para tornar as operações de negócio mais fluidas.",
      projectsCta: "Projetos",
      scrollDown: "Role para baixo",
      social: {
        github: "Github",
        linkedin: "LinkedIn",
        email: "E-mail",
        instagram: "Instagram",
      },
    },
    about: {
      kicker: "... /Sobre mim ...",
      headingLine1: "Olá! Sou",
      headingRole: "Desenvolvedor RPA & Web",
      headingLine2: "10+ anos construindo soluções.",
      skillsIntro1: "Algumas das minhas",
      skillsIntro2: "tecnologias favoritas,",
      skillsIntro3: "ferramentas e plataformas com que trabalho",
      skillGroups: [
        { title: "Ferramentas RPA", skills: ["Rocketbot Studio", "UiPath", "Power Automate", "BotCity"] },
        { title: "Frontend & Web", skills: ["React", "TypeScript", "TailwindCSS", "HTML5", "CSS3", "JavaScript"] },
        { title: "Dev & Scripts", skills: ["Python", "NodeJS", "Git & GitHub", "PostgreSQL", "SQL Server Management Studio"] },
        { title: "IA & Cloud", skills: ["Azure AI (IA900)", "OpenAI", "Claude", "MS Copilot", "Google Workspace / Gemini"] },
        { title: "Gestão de Projetos", skills: ["Jira", "Notion", "MS Planner / MS Project", "Power BI"] },
      ],
      photoPlaceholder: "A sua foto aqui",
    },
    work: {
      sectionTitle: "Trabalho",
      totalLabel: "Experiência profissional",
      totalYears: 10,
      totalMonths: 8,
      durationYearLabel: "anos",
      durationMonthLabel: "meses",
      viewDetails: "Ver detalhes",
      careerProgressionLabel: "Progressão de Carreira",
      jobs: [
        {
          yearRange: "2025 -",
          duration: "1 ano e 5 meses",
          company: "Rocketbot (Chile)",
          role: "Desenvolvedor RPA",
          techStack: "Python · Rocketbot Studio · SAP · Lincros · Glorian",
          details:
            "Desenvolver robôs com Rocketbot Studio para automatização de processos logísticos. Integração com sistemas como SAP, Lincros e Glorian. Automatizações Web voltadas para sites bancários. Participação em todas as etapas: mapeamento, documentação, testes integrados e entrega final. Cliente: Imbera Cooling.",
        },
        {
          yearRange: "2024 - 2025",
          duration: "~6 meses",
          company: "Freelance",
          role: "Desenvolvedor Full Stack",
          techStack: "React · TypeScript · TailwindCSS · FastAPI · Python · PostgreSQL · Supabase",
          details:
            "Desenvolvimento do SGP (Sistema de Gestão da Produção) para um cliente industrial. Aplicação web full-stack com controle de ordens de serviço, etapas sequenciais de produção, monitoramento em tempo real via SSE, controle de acesso por perfil (Admin/Operador) e dashboard de analytics. Deploy na Vercel (frontend), Railway (backend) e Supabase (PostgreSQL).",
        },
        {
          yearRange: "2025",
          duration: "~2 meses",
          company: "Freelance",
          role: "Desenvolvedor Frontend",
          techStack: "HTML5 · CSS3 · Bootstrap 5 · JavaScript",
          details:
            "Desenvolvimento de site de portfólio e serviços de fotografia profissional para cliente. Site estático com 6 páginas (landing + 5 categorias de serviço), galeria de imagens com carrossel Swiper, formulário de contato integrado ao WhatsApp, estatísticas animadas e seção de depoimentos.",
        },
        {
          yearRange: "2022 - 2024",
          duration: "2 anos",
          company: "EARQ Consultoria",
          role: "Analista de Suporte",
          techStack: "Uipath · Orquestrator · SQL · Monitoramento Operacional",
          details:
            "Atualização e monitoramento de atividades automatizadas e bases de dados operacionais. Geração de relatórios e indicadores com dados extraídos via SQL. Suporte técnico diário a ferramentas de RPA e análise de inconsistências. Documentação de processos e controle de melhorias em ambiente colaborativo com equipes de operações. Cliente: DHL Supply Chain.",
        },
        {
          yearRange: "2015 - 2022",
          duration: "7 anos",
          company: "SBK BPO",
          role: "Desenvolvedor RPA / Analista Administrativo",
          techStack: "Automação de Processos · Documentação · Operações",
          details:
            "Atendimento a solicitações jurídicas e levantamento de informações sensíveis, com alto nível de organização e controle. Acompanhamento de tarefas e prazos operacionais com foco na completude e precisão dos dados. Mapeamento e documentação de processos internos, priorizando clareza e reutilização de conhecimento. Apoio na execução de rotinas operacionais com foco em consistência e padronização. Cliente: Bradesco CPI.",
          careerPath: [
            { role: "Auxiliar Operacional", startDate: "Março/2015" },
            { role: "Analista Administrativo", startDate: "Setembro/2018" },
            { role: "Desenvolvedor RPA", startDate: "Março/2019" },
          ],
        },
      ],
    },
    projects: {
      kicker: "... /Projetos ...",
      items: [
        {
          title: "Suite de Robôs Logísticos",
          description:
            "Automação ponta a ponta de processos logísticos com Rocketbot Studio. Integração com SAP, Lincros e Glorian, incluindo automação web para portais bancários. Ciclo completo: mapeamento, documentação, testes integrados e entrega.",
          techStack: ["Python", "Rocketbot Studio", "SAP", "Web Automation", "APIs"],
          thumbLabel: "Painel do bot",
          thumbEmoji: "🤖",
          statLabel: "Redução",
          statValue: "80%",
          statSub: "Esforço manual",
        },
        {
          title: "Monitoramento RPA — Supply Chain",
          description:
            "Sistema de monitoramento RPA e relatórios SQL para operações de supply chain em larga escala. Extração automatizada de KPIs, detecção de inconsistências e documentação de processos, apoiando equipes de finanças e operações.",
          techStack: ["SQL Server", "Uipath", "Monitoramento RPA", "Documentação"],
          thumbLabel: "Dashboard",
          thumbEmoji: "🤖",
          statLabel: "Cobertura",
          statValue: "100%",
          statSub: "Visibilidade de processo",
        },
        {
          title: "SGP – Sistema de Gestão da Produção",
          description:
            "Aplicação web full-stack para gestão de ordens de serviço em ambiente industrial. Funcionalidades: controle de ordens, etapas sequenciais de produção, monitoramento em tempo real via SSE, controle de acesso por perfil (Admin/Operador) e dashboard de analytics. Deploy na Vercel, Railway e Supabase.",
          techStack: ["React", "TypeScript", "TailwindCSS", "FastAPI", "Python", "PostgreSQL", "Supabase"],
          thumbLabel: "Sistema SGP",
          thumbEmoji: "🌐",
          thumbImage: "/assets/barromanager_screenshot.png",
          statLabel: "Perfis de acesso",
          statValue: "2",
          statSub: "Admin + Operador",
        },
        {
          title: "Gizulinski Fotografia",
          description:
            "Site de portfólio e serviços de fotografia profissional para cliente. Site estático com 6 páginas cobrindo cinco categorias de serviço, galeria de imagens, formulário de contato integrado ao WhatsApp, estatísticas animadas e depoimentos.",
          techStack: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript"],
          thumbLabel: "Site de fotografia",
          thumbEmoji: "🎨",
          thumbImage: "/assets/gidzulinskifotografia_screenshot.png",
          statLabel: "Páginas",
          statValue: "6",
          statSub: "Categorias de serviço",
        },
      ],
    },
    activities: {
      sectionTitle: "Atividades",
      kicker: "... /Hobbies & Atividades ...",
      hobbiesTitle: "Meus Hobbies",
      hobbies: { cycling: "Ciclismo", running: "Corrida", futsal: "Futsal" },
      stravaLabel: "Últimas no Strava",
      stravaConnect: "Me siga no Strava",
      stravaConnectCta: "Ver perfil",
      adidasLabel: "Adidas Running",
      adidasCta: "Conectar no Adidas Running",
      loading: "Carregando atividades…",
      error: "Não foi possível carregar as atividades",
      pace: "Ritmo",
      distance: "Distância",
    },
    articles: {
      sectionTitle: "Artigos",
      readMore: "Em breve",
      items: [
        {
          title: "Como otimizar bots Python em escala empresarial",
          excerpt:
            "Boas práticas para scripts de automação performáticos, capazes de processar milhares de transações por dia.",
          href: "#",
        },
        {
          title: "UiPath vs Power Automate: comparação completa",
          excerpt:
            "Análise aprofundada das duas principais plataformas RPA, forças de cada uma e quando usar qual.",
          href: "#",
        },
        {
          title: "Construir fluxos de automação resilientes",
          excerpt:
            "Padrões de tratamento de erros e retry que deixam os bots prontos para produção.",
          href: "#",
        },
        {
          title: "Integrar IA com RPA para automação inteligente",
          excerpt:
            "Como combinar modelos de machine learning com RPA para fluxos mais inteligentes.",
          href: "#",
        },
      ],
    },
    footer: {
      ctaLine1: "Vamos",
      ctaLine2: "Automatizar",
      subtitle1: "Full-stack",
      subtitle2: "Desenvolvedor RPA & Web",
      contactsKicker: "... /Contatos ...",
      navMain: "Início",
      siteCardTitle: "Site",
      siteLine1a: "Feito à mão por",
      siteLine1b: "MIM",
      siteLine2a: "Desenhado com",
      siteLine2b: "paixão",
      siteLine3a: "Motor",
      siteLine3b: "React",
      social: {
        github: "Github",
        linkedin: "LinkedIn",
        email: "E-mail",
        instagram: "Instagram",
        whatsapp: "WhatsApp",
      },
      copyright: "© 2026 Diego Gonçalves · Desenvolvedor RPA & Web. Todos os direitos reservados.",
    },
    notFound: {
      title: "404",
      message: "Esta página não existe.",
      back: "Voltar ao início",
    },
  },
};
