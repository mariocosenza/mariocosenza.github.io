// Mario Cosenza - Portfolio data (bilingual IT/EN)
// Cloud-focused profile. Skills shown as tags (no percentages).

export type Lang = "it" | "en";

export const profile = {
  name: "Mario Cosenza",
  role: {
    it: "Software Developer",
    en: "Software Developer",
  },
  tagline: {
    it: "Costruisco architetture Cloud-Native su Azure, servizi serverless e pipeline DevOps. Focus su scalabilità, automazione e infrastruttura come codice.",
    en: "I build Cloud-Native architectures on Azure, serverless services and DevOps pipelines. Focus on scalability, automation and infrastructure-as-code.",
  },
  shortBio: {
    it: "Software Developer specializzato in architetture Cloud-Native, con esperienza su Azure, Docker, Kubernetes e calcolo parallelo con MPI. Studente Magistrale in Cloud Computing.",
    en: "Software Developer specialised in Cloud-Native architectures, with experience on Azure, Docker, Kubernetes and parallel computing with MPI. MSc student in Cloud Computing.",
  },
  location: "Castellammare di Stabia (NA), Italia",
  email: "cosenzamario@proton.me",
  github: "https://github.com/mariocosenza",
  githubUser: "mariocosenza",
  linkedin: "https://linkedin.com/in/mariocosenza",
  photo: "/mario-photo.png",
};

export const about = {
  it: {
    title: "Su di me",
    description: [
      "Sono un Software Developer specializzato in architetture Cloud-Native e soluzioni backend scalabili. Coniugo rigore analitico e doti organizzative maturate anche nel coordinamento di progetti complessi, dall'allocazione delle risorse al monitoraggio delle milestone.",
      "Ho esperienza nel ciclo di vita del software, dalla progettazione di architetture distribuite alla realizzazione di servizi serverless e pipeline CI/CD. Lavoro principalmente su Azure con infrastruttura come codice (Bicep), containerizzazione con Docker e orchestrazione con Kubernetes.",
      "Completo la Laurea Magistrale in Informatica con curriculum Cloud Computing, approfondendo temi di serverless computing e ingegneria dei linguaggi di programmazione.",
    ],
    stat: { label: "5+", sub: "Progetti realizzati" },
  },
  en: {
    title: "About me",
    description: [
      "I'm a Software Developer specialised in Cloud-Native architectures and scalable backend solutions. I combine analytical rigour with organisational skills matured through coordinating complex projects, from resource allocation to milestone monitoring.",
      "I have hands-on experience across the software lifecycle, from designing distributed architectures to building serverless services and CI/CD pipelines. I primarily work on Azure with infrastructure-as-code (Bicep), Docker containerisation and Kubernetes orchestration.",
      "I'm completing my MSc in Computer Science with a Cloud Computing track, focusing on serverless computing and programming language engineering.",
    ],
    stat: { label: "5+", sub: "Projects shipped" },
  },
};

export type SkillCategory = {
  id: string;
  title: { it: string; en: string };
  icon: string; // lucide icon name
  color: string; // tailwind color hint for accent
  skills: string[]; // tag names, no levels
};

// Kubernetes è stato aggiunto esplicitamente a Cloud & DevOps come richiesto.
// MPI (Message Passing Interface) aggiunto per il calcolo parallelo/distribuito.
// Helm rimosso dal callout Kubernetes.
export const skillCategories: SkillCategory[] = [
  {
    id: "cloud-devops",
    title: { it: "Cloud & DevOps", en: "Cloud & DevOps" },
    icon: "Cloud",
    color: "cyan",
    skills: [
      "Azure (Functions, Container Apps, Cosmos DB, Event Grid, SignalR, KeyVault, RBAC)",
      "Kubernetes",
      "Docker",
      "Azure Bicep (IaC)",
      "CI/CD Pipelines",
      "Cloudflare R2",
      "Git / GitHub",
      "MPI (Message Passing Interface)",
    ],
  },
  {
    id: "backend",
    title: { it: "Backend", en: "Backend" },
    icon: "Server",
    color: "emerald",
    skills: [
      "Spring Boot 3 / Jakarta EE",
      "Flask / FastAPI",
      "GraphQL / gqlgen",
      "REST API",
      "SQL / JPQL / MQL",
      "JUnit / Mockito / Testcontainers",
    ],
  },
  {
    id: "ai-semantic",
    title: { it: "AI Engineering", en: "AI Engineering" },
    icon: "BrainCircuit",
    color: "purple",
    skills: [
      "LangChain / LangGraph",
      "Model Context Protocol (MCP)",
      "PyTorch",
      "Scikit-learn",
      "Pandas",
      "HuggingFace API / Ollama",
    ],
  },
  {
    id: "frontend-mobile",
    title: { it: "Frontend & Mobile", en: "Frontend & Mobile" },
    icon: "Layout",
    color: "pink",
    skills: [
      "React + TypeScript",
      "Next.js",
      "Flutter (Dart)",
      "JSP / JavaServer Pages",
    ],
  },
  {
    id: "languages",
    title: { it: "Linguaggi Core", en: "Core Languages" },
    icon: "Code2",
    color: "amber",
    skills: ["Java", "Python", "TypeScript", "Go", "Dart", "C"],
  },
  {
    id: "methodologies",
    title: { it: "Metodologie & Strumenti", en: "Methodologies & Tools" },
    icon: "Workflow",
    color: "rose",
    skills: [
      "Agile / Scrum",
      "TDD (Test-Driven Development)",
      "Waterfall",
      "JIRA",
    ],
  },
];

export type FeaturedProject = {
  id: string;
  name: string;
  period: string;
  stack: string[];
  description: { it: string; en: string };
  highlights: { it: string[]; en: string[] };
  icon: string; // lucide icon
  accent: string; // gradient hint
  repo?: string; // full repo URL on GitHub (optional)
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: "mocc",
    name: "MOCC",
    period: "Dic 2025 – Feb 2026",
    stack: ["Go", "Flutter", "Azure Bicep", "Cloud-Native"],
    description: {
      it: "Piattaforma Cloud-Native per la riduzione degli sprechi alimentari. Architettura scalabile definita con Azure Bicep, backend ad alte prestazioni in Go e frontend in Flutter.",
      en: "Cloud-Native platform for food-waste reduction. Scalable architecture defined with Azure Bicep, high-performance Go backend and Flutter frontend.",
    },
    highlights: {
      it: [
        "Architettura scalabile come codice (Bicep)",
        "Backend Go ad alte prestazioni",
        "Frontend cross-platform in Flutter",
      ],
      en: [
        "Scalable architecture-as-code (Bicep)",
        "High-performance Go backend",
        "Cross-platform Flutter frontend",
      ],
    },
    icon: "Leaf",
    accent: "from-emerald-500 to-cyan-500",
    repo: "https://github.com/mariocosenza",
  },
  {
    id: "icaro",
    name: "ICARO",
    period: "Dic 2025 – Feb 2026",
    stack: ["Python", "OpenCV", "MediaPipe Pose", "Flutter"],
    description: {
      it: "Man-Down detector basato su Computer Vision. Rilevamento cadute in tempo reale tramite analisi video e invio di allarmi a un'applicazione mobile Flutter.",
      en: "Computer-Vision-based man-down detector. Real-time fall detection via video analysis with alarms pushed to a Flutter mobile app.",
    },
    highlights: {
      it: [
        "Rilevamento cadute in tempo reale",
        "Analisi video con OpenCV + MediaPipe Pose",
        "Notifiche push su mobile",
      ],
      en: [
        "Real-time fall detection",
        "Video analysis with OpenCV + MediaPipe Pose",
        "Push notifications to mobile",
      ],
    },
    icon: "ShieldAlert",
    accent: "from-rose-500 to-orange-500",
    repo: "https://github.com/mariocosenza",
  },
  {
    id: "lila",
    name: "LILA",
    period: "Dic 2025 – Gen 2026",
    stack: ["Python", "LangGraph", "MCP", "LLVM"],
    description: {
      it: "Sistema multi-agente autonomo (Planner, Coder, Debugger, Tester) basato su LangGraph per l'automazione del ciclo di sviluppo software, con tool MCP custom per interagire con la toolchain di un linguaggio proprietario.",
      en: "Autonomous multi-agent system (Planner, Coder, Debugger, Tester) built on LangGraph to automate the software-development cycle, with a custom MCP tool to interact with a proprietary language toolchain.",
    },
    highlights: {
      it: [
        "Architettura multi-agente LangGraph",
        "MCP tool custom per toolchain proprietaria",
        "Parsing Lark + codegen LLVM-lite",
      ],
      en: [
        "LangGraph multi-agent architecture",
        "Custom MCP tool for proprietary toolchain",
        "Lark parsing + LLVM-lite codegen",
      ],
    },
    icon: "Bot",
    accent: "from-purple-500 to-pink-500",
    repo: "https://github.com/mariocosenza",
  },
  {
    id: "kgsum",
    name: "KGSum",
    period: "Dic 2024 – Set 2025",
    stack: ["Python", "Flask", "React", "Scikit-learn", "PyTorch"],
    description: {
      it: "Strumento per la classificazione e profilazione automatica di Knowledge Graph (tesi triennale 110 e Lode). Integrazione di modelli ML e interfaccia web interattiva.",
      en: "Tool for automatic classification and profiling of Knowledge Graphs (bachelor thesis, 110 cum laude). Integrates ML models with an interactive web UI.",
    },
    highlights: {
      it: [
        "Tesi triennale con Menzione Speciale",
        "Modelli ML (Scikit-learn, PyTorch)",
        "Interfaccia web React interattiva",
      ],
      en: [
        "Bachelor thesis with Special Mention",
        "ML models (Scikit-learn, PyTorch)",
        "Interactive React web UI",
      ],
    },
    icon: "Network",
    accent: "from-blue-500 to-violet-500",
    repo: "https://github.com/mariocosenza",
  },
  {
    id: "astromark",
    name: "AstroMark",
    period: "Set 2024 – Feb 2025",
    stack: ["Spring Boot", "React", "PostgreSQL", "JWT", "WebSocket"],
    description: {
      it: "Piattaforma distribuita per la gestione di didattica con API REST sicure (JWT), WebSocket e gestione workflow Jira.",
      en: "Distributed platform for teaching management with secure JWT REST APIs, WebSocket real-time updates and Jira workflow integration.",
    },
    highlights: {
      it: [
        "API REST sicure con JWT",
        "Comunicazione real-time su WebSocket",
        "Integrazione workflow Jira",
      ],
      en: [
        "Secure JWT REST APIs",
        "Real-time WebSocket communication",
        "Jira workflow integration",
      ],
    },
    icon: "GraduationCap",
    accent: "from-amber-500 to-rose-500",
    repo: "https://github.com/mariocosenza",
  },
  {
    id: "pcpc-mpi",
    name: "PCPC-MPI",
    period: "2025",
    stack: ["C", "MPI", "Parallel Computing", "HPC"],
    description: {
      it: "Implementazione di algoritmi di calcolo parallelo con MPI (Message Passing Interface). Progetto accademico di Parallel and Cloud Computing che esplora pattern di comunicazione point-to-point e collettiva, performance scaling e profiling su cluster HPC.",
      en: "Implementation of parallel computing algorithms with MPI (Message Passing Interface). Academic Parallel and Cloud Computing project exploring point-to-point and collective communication patterns, performance scaling and profiling on HPC clusters.",
    },
    highlights: {
      it: [
        "Comunicazione point-to-point e collettiva MPI",
        "Profiling performance e strong/weak scaling",
        "Esecuzione su cluster HPC",
      ],
      en: [
        "Point-to-point and collective MPI communication",
        "Performance profiling and strong/weak scaling",
        "Execution on HPC clusters",
      ],
    },
    icon: "Network",
    accent: "from-cyan-500 to-blue-500",
    repo: "https://github.com/mariocosenza/pcpc-mpi",
  },
];

export type TimelineItem = {
  id: string;
  date: string;
  title: { it: string; en: string };
  org: { it: string; en: string };
  type: "education" | "experience";
  description: { it: string; en: string };
  tags: string[];
};

// Solo formazione. Le certificazioni sono in array separato.
export const timeline: TimelineItem[] = [
  {
    id: "msc",
    date: "Set 2025 – Set 2027",
    title: { it: "Laurea Magistrale in Informatica — Cloud Computing", en: "MSc in Computer Science — Cloud Computing" },
    org: { it: "Università degli Studi di Salerno, Fisciano (SA)", en: "University of Salerno, Fisciano (SA)" },
    type: "education",
    description: {
      it: "Esami sostenuti: Cloud Computing, Serverless Computing, Ingegneria dei Linguaggi di Programmazione.",
      en: "Exams taken: Cloud Computing, Serverless Computing, Programming Language Engineering.",
    },
    tags: ["Cloud Computing", "Serverless", "Ingegneria dei Linguaggi"],
  },
  {
    id: "bsc",
    date: "Set 2025",
    title: { it: "Laurea Triennale in Informatica", en: "BSc in Computer Science" },
    org: { it: "Università degli Studi di Salerno, Fisciano (SA)", en: "University of Salerno, Fisciano (SA)" },
    type: "education",
    description: {
      it: "Voto: 110 e Lode con Menzione Speciale alla Carriera. Tesi: \"Classificazione e profilazione automatica di Knowledge Graph\".",
      en: "Grade: 110 cum laude with Special Career Mention. Thesis: \"Automatic classification and profiling of Knowledge Graphs\".",
    },
    tags: ["110 e Lode", "Menzione Speciale"],
  },
];

export type Certification = {
  id: string;
  title: { it: string; en: string };
  org: { it: string; en: string };
  status: { it: string; en: string };
  code: string;
  icon: string;
};

export const certifications: Certification[] = [
  {
    id: "az900",
    title: { it: "Azure Fundamentals", en: "Azure Fundamentals" },
    org: { it: "Microsoft", en: "Microsoft" },
    status: { it: "In preparazione", en: "In preparation" },
    code: "AZ-900",
    icon: "Cloud",
  },
  {
    id: "az204",
    title: { it: "Azure Developer Associate", en: "Azure Developer Associate" },
    org: { it: "Microsoft", en: "Microsoft" },
    status: { it: "In preparazione", en: "In preparation" },
    code: "AZ-204",
    icon: "Code2",
  },
];

export type Hobby = {
  id: string;
  title: { it: string; en: string };
  description: { it: string; en: string };
  icon: string; // lucide icon
};

export const hobbies: Hobby[] = [
  {
    id: "aviation",
    title: { it: "Aviazione civile e trasporti", en: "Civil aviation & transport" },
    description: {
      it: "Passione per gli aspetti ingegneristici e operativi del volo e dei trasporti.",
      en: "Passion for the engineering and operational aspects of flight and transport.",
    },
    icon: "Plane",
  },
  {
    id: "ferrari",
    title: { it: "Motorsport — Ferrari F1 & WEC", en: "Motorsport — Ferrari F1 & WEC" },
    description: {
      it: "Tifo Ferrari in Formula 1 e nel World Endurance Championship.",
      en: "Ferrari supporter in Formula 1 and the World Endurance Championship.",
    },
    icon: "Flag",
  },
  {
    id: "football",
    title: { it: "Calcio — Juve Stabia", en: "Football — Juve Stabia" },
    description: {
      it: "Seguo le sorti della Juve Stabia, squadra della mia città.",
      en: "Following Juve Stabia, the football club of my hometown.",
    },
    icon: "CircleDot",
  },
  {
    id: "judo",
    title: { it: "Judo agonistico", en: "Competitive judo" },
    description: {
      it: "Valori maturati nel judo competitivo: disciplina, rispetto, determinazione.",
      en: "Values matured in competitive judo: discipline, respect, determination.",
    },
    icon: "Medal",
  },
  {
    id: "hardware",
    title: { it: "Hardware & smartphone", en: "Hardware & smartphones" },
    description: {
      it: "Seguo l'evoluzione hardware, dei dispositivi mobili e delle reti FTTH.",
      en: "Following the evolution of hardware, mobile devices and FTTH networks.",
    },
    icon: "Cpu",
  },
  {
    id: "retro",
    title: { it: "PC retrò", en: "Retro PCs" },
    description: {
      it: "Interesse per l'hardware d'epoca e la preservazione del computing classico.",
      en: "Interest in vintage hardware and the preservation of classic computing.",
    },
    icon: "MonitorCog",
  },
  {
    id: "travel",
    title: { it: "Viaggi culturali", en: "Cultural travel" },
    description: {
      it: "Esplorazione di mete inedite con attenzione al patrimonio culturale.",
      en: "Exploring off-the-beaten-path destinations with a focus on cultural heritage.",
    },
    icon: "MapPin",
  },
];

export const languages = [
  { name: "Italiano", level: { it: "Madrelingua", en: "Native" }, value: 100 },
  { name: "English", level: { it: "B2 — Intermedio Avanzato", en: "B2 — Upper Intermediate" }, value: 75 },
];

export type NavItem = {
  id: string;
  label: { it: string; en: string };
  icon: string;
};

export const navItems: NavItem[] = [
  { id: "hero", label: { it: "Home", en: "Home" }, icon: "Home" },
  { id: "about", label: { it: "Su di me", en: "About" }, icon: "User" },
  { id: "cloud", label: { it: "Cloud", en: "Cloud" }, icon: "Cloud" },
  { id: "skills", label: { it: "Skills", en: "Skills" }, icon: "Cpu" },
  { id: "projects", label: { it: "Progetti", en: "Projects" }, icon: "FolderGit2" },
  { id: "timeline", label: { it: "Timeline", en: "Timeline" }, icon: "GraduationCap" },
  { id: "certifications", label: { it: "Certificazioni", en: "Certifications" }, icon: "Award" },
  { id: "hobbies", label: { it: "Hobby", en: "Hobbies" }, icon: "Heart" },
  { id: "contact", label: { it: "Contatti", en: "Contact" }, icon: "Mail" },
];

// Cloud capabilities for the new Cloud section in the home page
export type CloudCapability = {
  id: string;
  title: { it: string; en: string };
  description: { it: string; en: string };
  icon: string;
  accent: string;
};

export const cloudCapabilities: CloudCapability[] = [
  {
    id: "serverless",
    title: { it: "Serverless", en: "Serverless" },
    description: {
      it: "Event-driven architecture con Azure Functions, Container Apps ed Event Grid per workload scalabili a costo zero quando inattivi.",
      en: "Event-driven architecture with Azure Functions, Container Apps and Event Grid for scalable workloads with zero cost when idle.",
    },
    icon: "Zap",
    accent: "from-amber-400 to-orange-500",
  },
  {
    id: "k8s",
    title: { it: "Container Orchestration", en: "Container Orchestration" },
    description: {
      it: "Deploy e gestione di workload containerizzati con Docker e Kubernetes: Pods, Deployments, Services, Ingress, scaling orizzontale.",
      en: "Deploy and management of containerised workloads with Docker and Kubernetes: Pods, Deployments, Services, Ingress, horizontal scaling.",
    },
    icon: "Boxes",
    accent: "from-cyan-400 to-blue-500",
  },
  {
    id: "iac",
    title: { it: "Infrastructure as Code", en: "Infrastructure as Code" },
    description: {
      it: "Provisioning ripetibile e versionato con Azure Bicep. Ambienti dev/test/prod gestiti come codice, con review e rollback.",
      en: "Repeatable, versioned provisioning with Azure Bicep. Dev/test/prod environments managed as code, with review and rollback.",
    },
    icon: "FileCode2",
    accent: "from-emerald-400 to-teal-500",
  },
  {
    id: "cicd",
    title: { it: "CI/CD Pipelines", en: "CI/CD Pipelines" },
    description: {
      it: "Pipeline GitHub Actions per build, test, containerizzazione e deploy automatico su Azure con ambienti promozionali.",
      en: "GitHub Actions pipelines for build, test, containerisation and automatic deploy to Azure with promotional environments.",
    },
    icon: "GitBranch",
    accent: "from-purple-400 to-fuchsia-500",
  },
  {
    id: "data",
    title: { it: "Data & Messaging", en: "Data & Messaging" },
    description: {
      it: "Cosmos DB multi-modello, Storage Account, SignalR per real-time e Cloudflare R2 per storage object economico e distribuito.",
      en: "Multi-model Cosmos DB, Storage Account, SignalR for real-time and Cloudflare R2 for cost-effective distributed object storage.",
    },
    icon: "Database",
    accent: "from-rose-400 to-pink-500",
  },
  {
    id: "security",
    title: { it: "Security & Identity", en: "Security & Identity" },
    description: {
      it: "RBAC, KeyVault per secret management, identità gestite e princìpi least-privilege applicati a ogni risorsa cloud.",
      en: "RBAC, KeyVault for secret management, managed identities and least-privilege principles applied to every cloud resource.",
    },
    icon: "ShieldCheck",
    accent: "from-indigo-400 to-violet-500",
  },
];

// Quick tech stack chips for hero strip
export const techStack = [
  "Azure",
  "Kubernetes",
  "Docker",
  "Bicep",
  "Spring Boot",
  "Go",
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "Flutter",
  "MPI",
];
