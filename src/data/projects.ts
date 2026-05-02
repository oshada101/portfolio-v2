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
    shape: "checks" | "stripes" | "edge";
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
        tags: ["AI", "LangChain"],
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
        links: [{ label: "GitHub", url: "https://github.com/oshada101/elizabeth" }],
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
        tags: ["React", "Node","Maps"],
        href: "/projects/rescue-rush",
        featured: true,
        longDescription:
            "Rescue Rush is a web-based command-and-control platform built to streamline emergency dispatch operations. Dispatchers get a live tactical map powered by Mapbox GL, showing unit positions, incident locations, and routing in real time. WebSocket-driven updates ensure all dispatchers share the same operational picture simultaneously. Unit assignment, status changes, and incident reports are logged with full audit trails — giving coordinators the clarity they need under pressure.",
        year: "2024",
        status: "Live",
        techStack: [
            "React",
            "TypeScript",
            "leaflet",
            "Node.js",
            "WebSockets",
            "PostgreSQL",
            "Docker",
        ],
        image: rescueRushImg, 
        links: [{ label: "GitHub", url: "https://github.com/oshada101/rescueRush" }],
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
            shape: "edge",
            shapeScale: 0.14,
            speed: 0.8,
        },
    },
{
  id: "wct",
  name: "WCT",
  description: "Agentic AI system for wildlife identification, migration tracking, and threat detection — empowering researchers and conservationists with intelligent insights.",
  tags: ["AI", "Computer Vision", "LangGraph"],
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
    shape: "stripes",
    shapeScale: 0.06,
    speed: 0.35,
  },
},
  
];

export const featuredProjects = projects.filter((p) => p.featured);
