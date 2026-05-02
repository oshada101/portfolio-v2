import elizabethImg from "../assets/projects/elizabeth.png";
import rescueRushImg from "../assets/projects/rescuerush.png";
import wctImg from "../assets/projects/wct.png";
import wct2Img from "../assets/projects/wct2.png";
import wct3Img from "../assets/projects/wct3.png";
import wct4Img from "../assets/projects/wct4.png";

export type MediaItem =
    | { type: "image"; src: string; alt?: string }
    | { type: "video"; src: string; poster?: string };

export interface ShaderParams {
    colors: string[];
    proportion: number;
    softness: number;
    distortion: number;
    swirl: number;
    swirlIterations: number;
    shape: "checks" | "dots" | "lines";
    shapeScale: number;
    speed: number;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    tags: string[];
    image: string;
    href: string;
    longDescription: string;
    year: string;
    status: "Live" | "In Development" | "Archived";
    techStack: string[];
    links: { label: string; url: string }[];
    media?: MediaItem[];
    shader: ShaderParams;
    featured?: boolean;
}

export const projects: Project[] = [
    {
        id: "elizabeth",
        name: "Elizabeth",
        description:
            "AI-powered document assistant that chats with you about your files across your filesystem — open folders, search, summarize in natural language.",
        tags: ["AI", "NLP"],
        image: elizabethImg,
        href: "/projects/elizabeth",
        featured: true,
        longDescription:
            "Elizabeth is a local-first AI assistant that understands your filesystem as a living knowledge base. Point it at any directory and Elizabeth builds a semantic index, letting you ask questions, retrieve files by meaning, and generate summaries — all without sending your documents to the cloud. Built with a FastAPI backend and a React frontend, it uses a retrieval-augmented pipeline over locally-embedded vectors to give you natural language access to your own files.",
        year: "2024",
        status: "In Development",
        techStack: [
            "Python",
            "FastAPI",
            "React",
            "TypeScript",
            "LangChain",
            "FAISS",
            "SQLite",
        ],
        links: [{ label: "GitHub", url: "#" }],
        media: [
            { type: "image", src: elizabethImg, alt: "Elizabeth dashboard" },
        ],
        shader: {
            colors: [
                "hsl(260, 80%, 6%)",
                "hsl(280, 90%, 38%)",
                "hsl(240, 60%, 52%)",
                "hsl(300, 40%, 18%)",
            ],
            proportion: 0.38,
            softness: 0.9,
            distortion: 0.4,
            swirl: 1.2,
            swirlIterations: 14,
            shape: "checks",
            shapeScale: 0.08,
            speed: 0.5,
        },
    },
    {
        id: "rescue-rush",
        name: "Rescue Rush",
        description:
            "Real-time emergency dispatch coordination platform with live map tracking, unit assignment, and incident reporting for first responders.",
        tags: ["React", "Maps"],
        href: "/projects/rescue-rush",
        featured: true,
        longDescription:
            "Rescue Rush is a web-based command-and-control platform built to streamline emergency dispatch operations. Dispatchers get a live tactical map powered by Mapbox GL, showing unit positions, incident locations, and routing in real time. WebSocket-driven updates ensure all dispatchers share the same operational picture simultaneously. Unit assignment, status changes, and incident reports are logged with full audit trails — giving coordinators the clarity they need under pressure.",
        year: "2024",
        status: "Live",
        techStack: [
            "React",
            "TypeScript",
            "Mapbox GL",
            "Node.js",
            "WebSockets",
            "PostgreSQL",
            "Docker",
        ],
        image: rescueRushImg, 
        links: [{ label: "GitHub", url: "#" }],
        media: [
            { type: "image", src: rescueRushImg, alt: "rescue rush" },
        ],
        shader: {
            colors: [
                "hsl(10, 70%, 5%)",
                "hsl(22, 95%, 42%)",
                "hsl(42, 88%, 52%)",
                "hsl(0, 55%, 22%)",
            ],
            proportion: 0.52,
            softness: 1.2,
            distortion: 0.18,
            swirl: 0.5,
            swirlIterations: 8,
            shape: "dots",
            shapeScale: 0.14,
            speed: 0.8,
        },
    },
{
  id: "wct",
  name: "WCT",
  description: "Agentic AI system for wildlife identification, migration tracking, and threat detection — empowering researchers and conservationists with intelligent insights.",
  tags: ["AI", "Conservation", "Computer Vision"],
  image: wctImg,
  href: "/projects/wct",
  featured: true,
  longDescription: "Wildlife Conservation Tracker is an Agentic AI system designed to understand, analyze, and protect wildlife. Built with a multi-agent architecture controlled by an Orchestrator (Manager Agent), it helps researchers identify species from images using CNN-based classification, track migration routes and behavioral patterns from GPS data, and detect emerging threats like poaching, habitat loss, and climate impact through real-time data gathering. The system features an interactive chat interface for natural language queries, species identification with confidence scores, interactive migration maps, and threat visualization dashboards.",
  year: "2023",
  status: "In Development",
  techStack: ["React", "TypeScript", "FastAPI", "Python", "TensorFlow", "PostgreSQL", "Gemini API"],
  links: [{ label: "GitHub", url: "https://github.com/DigitalBotanist/WCT" }],
  media: [
    { type: "image" as const, src: wctImg, alt: "WCT dashboard interface" },
    { type: "image" as const, src: wct2Img, alt: "Species identification view" },
    { type: "image" as const, src: wct3Img, alt: "Migration pattern map" },
    { type: "image" as const, src: wct4Img, alt: "Threat analysis visualization" },
  ],
  shader: {
    colors: ["hsl(160, 55%, 4%)", "hsl(172, 78%, 28%)", "hsl(142, 48%, 38%)", "hsl(180, 35%, 12%)"],
    proportion: 0.6,
    softness: 0.7,
    distortion: 0.32,
    swirl: 1.8,
    swirlIterations: 18,
    shape: "lines",
    shapeScale: 0.06,
    speed: 0.35,
  },
},
    {
        id: "vaultkey",
        name: "VaultKey",
        description:
            "Zero-knowledge password manager with biometric unlock, local-only vault encryption, and secure cross-device sync over user-owned storage.",
        tags: ["Security", "Crypto"],
        image: elizabethImg,
        href: "/projects/vaultkey",
        featured: false,
        longDescription:
            "VaultKey is a zero-knowledge password manager that never sends plaintext credentials anywhere. The vault is AES-256-GCM encrypted on-device using a key derived from the master password via Argon2id. Biometric unlock (WebAuthn) wraps a device-bound session key so users don't re-enter their master password. Sync is handled by encrypting the vault blob and storing it in the user's own cloud storage (Dropbox, S3, or any WebDAV endpoint) — VaultKey's servers see only opaque ciphertext.",
        year: "2024",
        status: "In Development",
        techStack: [
            "React",
            "TypeScript",
            "WebAuthn",
            "Web Crypto API",
            "Rust",
            "Tauri",
            "Argon2",
        ],
        links: [{ label: "GitHub", url: "#" }],
        media: [
            { type: "image", src: elizabethImg, alt: "VaultKey vault view" },
            {
                type: "image",
                src: elizabethImg,
                alt: "VaultKey biometric unlock",
            },
        ],
        shader: {
            colors: [
                "hsl(220, 60%, 5%)",
                "hsl(210, 85%, 35%)",
                "hsl(195, 70%, 50%)",
                "hsl(230, 45%, 15%)",
            ],
            proportion: 0.44,
            softness: 1.0,
            distortion: 0.22,
            swirl: 0.9,
            swirlIterations: 11,
            shape: "dots",
            shapeScale: 0.11,
            speed: 0.45,
        },
    },
    {
        id: "gridwatch",
        name: "GridWatch",
        description:
            "Infrastructure monitoring dashboard with real-time anomaly detection, alert routing, and a visual topology map of distributed services.",
        tags: ["DevOps", "Infra"],
        image: elizabethImg,
        href: "/projects/gridwatch",
        featured: false,
        longDescription:
            "GridWatch is an ops-first observability dashboard designed for small platform teams who need Datadog-level visibility without the bill. It scrapes Prometheus metrics, correlates them with structured logs from Loki, and surfaces anomalies using a lightweight statistical model running at the edge. The topology view renders service dependency graphs in real time — click any node to drill into its latency histogram, error rate, and recent traces. Alerts are routed through configurable PagerDuty or Slack webhooks.",
        year: "2023",
        status: "Live",
        techStack: [
            "Go",
            "React",
            "TypeScript",
            "Prometheus",
            "Loki",
            "D3.js",
            "PostgreSQL",
            "Docker",
        ],
        links: [
            { label: "GitHub", url: "#" },
            { label: "Live Demo", url: "#" },
        ],
        media: [
            { type: "image", src: elizabethImg, alt: "GridWatch topology map" },
            { type: "image", src: elizabethImg, alt: "GridWatch alert panel" },
            { type: "video", src: "/placeholder.mp4", poster: elizabethImg },
        ],
        shader: {
            colors: [
                "hsl(140, 50%, 4%)",
                "hsl(155, 75%, 30%)",
                "hsl(170, 60%, 44%)",
                "hsl(145, 38%, 14%)",
            ],
            proportion: 0.55,
            softness: 0.85,
            distortion: 0.28,
            swirl: 1.1,
            swirlIterations: 13,
            shape: "lines",
            shapeScale: 0.09,
            speed: 0.6,
        },
    },
    {
        id: "patchwork",
        name: "Patchwork",
        description:
            "Collaborative code review tool that annotates diffs with AI-generated explanations and surfaces potential bugs before they reach production.",
        tags: ["AI", "Dev Tools"],
        image: elizabethImg,
        href: "/projects/patchwork",
        featured: false,
        longDescription:
            "Patchwork integrates directly into GitHub pull requests and adds a layer of AI-assisted review on top of every diff. For each changed function it generates a plain-English explanation of what changed and why, flags potential null-pointer issues, type mismatches, and logic regressions, and links to relevant lines in the codebase for context. Review comments are posted as GitHub suggestions so engineers can accept them in one click. Patchwork's analysis runs entirely server-side on each push, with results appearing in the PR within 30–60 seconds.",
        year: "2025",
        status: "In Development",
        techStack: [
            "TypeScript",
            "Node.js",
            "GitHub Apps API",
            "OpenAI",
            "PostgreSQL",
            "Redis",
            "Docker",
        ],
        links: [{ label: "GitHub", url: "#" }],
        media: [
            {
                type: "image",
                src: elizabethImg,
                alt: "Patchwork PR annotation",
            },
            { type: "image", src: elizabethImg, alt: "Patchwork diff view" },
        ],
        shader: {
            colors: [
                "hsl(30, 65%, 5%)",
                "hsl(28, 90%, 40%)",
                "hsl(45, 80%, 55%)",
                "hsl(20, 50%, 18%)",
            ],
            proportion: 0.48,
            softness: 1.1,
            distortion: 0.35,
            swirl: 0.7,
            swirlIterations: 9,
            shape: "checks",
            shapeScale: 0.12,
            speed: 0.55,
        },
    },
    {
        id: "siftboard",
        name: "Siftboard",
        description:
            "Personal research workspace that clips, tags, and semantically links web content — a second brain built for deep reading and synthesis.",
        tags: ["Productivity", "AI"],
        image: elizabethImg,
        href: "/projects/siftboard",
        featured: false,
        longDescription:
            "Siftboard is a browser-extension-backed research tool that turns scattered web reading into a structured knowledge graph. Highlight any passage on any page and Siftboard clips it, auto-tags it by topic, and embeds it for semantic search. The canvas view lets you drag clips onto a spatial board and draw connections between ideas — a more tactile alternative to linear note-taking. Under the hood, a local embedding model (running via WebAssembly) powers the semantic search so your research never leaves the browser.",
        year: "2025",
        status: "In Development",
        techStack: [
            "TypeScript",
            "React",
            "Chrome Extensions API",
            "WebAssembly",
            "IndexedDB",
            "transformers.js",
        ],
        links: [{ label: "GitHub", url: "#" }],
        media: [
            { type: "image", src: elizabethImg, alt: "Siftboard canvas view" },
            { type: "image", src: elizabethImg, alt: "Siftboard clip panel" },
        ],
        shader: {
            colors: [
                "hsl(300, 55%, 5%)",
                "hsl(285, 80%, 35%)",
                "hsl(310, 60%, 50%)",
                "hsl(295, 40%, 16%)",
            ],
            proportion: 0.42,
            softness: 0.95,
            distortion: 0.38,
            swirl: 1.5,
            swirlIterations: 16,
            shape: "dots",
            shapeScale: 0.1,
            speed: 0.4,
        },
    },
];

export const featuredProjects = projects.filter((p) => p.featured);
