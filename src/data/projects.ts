import elizabethImg from "../assets/projects/elizabeth.png"

export type MediaItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string }

export interface ShaderParams {
  colors: string[]
  proportion: number
  softness: number
  distortion: number
  swirl: number
  swirlIterations: number
  shape: "checks" | "dots" | "lines"
  shapeScale: number
  speed: number
}

export interface Project {
  id: string
  name: string
  description: string
  tags: string[]
  image: string
  href: string
  longDescription: string
  year: string
  status: "Live" | "In Development" | "Archived"
  techStack: string[]
  links: { label: string; url: string }[]
  media?: MediaItem[]
  shader: ShaderParams
}

export const projects: Project[] = [
  {
    id: "elizabeth",
    name: "Elizabeth",
    description: "AI-powered document assistant that chats with you about your files across your filesystem — open folders, search, summarize in natural language.",
    tags: ["AI", "NLP"],
    image: elizabethImg,
    href: "/projects/elizabeth",
    longDescription: "Elizabeth is a local-first AI assistant that understands your filesystem as a living knowledge base. Point it at any directory and Elizabeth builds a semantic index, letting you ask questions, retrieve files by meaning, and generate summaries — all without sending your documents to the cloud. Built with a FastAPI backend and a React frontend, it uses a retrieval-augmented pipeline over locally-embedded vectors to give you natural language access to your own files.",
    year: "2024",
    status: "In Development",
    techStack: ["Python", "FastAPI", "React", "TypeScript", "LangChain", "FAISS", "SQLite"],
    links: [{ label: "GitHub", url: "#" }],
    media: [
      { type: "image", src: elizabethImg, alt: "Elizabeth dashboard" },
      { type: "image", src: elizabethImg, alt: "Elizabeth search view" },
      { type: "video", src: "/placeholder.mp4", poster: elizabethImg },
    ],
    shader: {
      colors: ["hsl(260, 80%, 6%)", "hsl(280, 90%, 38%)", "hsl(240, 60%, 52%)", "hsl(300, 40%, 18%)"],
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
    description: "Real-time emergency dispatch coordination platform with live map tracking, unit assignment, and incident reporting for first responders.",
    tags: ["React", "Maps"],
    image: elizabethImg,
    href: "/projects/rescue-rush",
    longDescription: "Rescue Rush is a web-based command-and-control platform built to streamline emergency dispatch operations. Dispatchers get a live tactical map powered by Mapbox GL, showing unit positions, incident locations, and routing in real time. WebSocket-driven updates ensure all dispatchers share the same operational picture simultaneously. Unit assignment, status changes, and incident reports are logged with full audit trails — giving coordinators the clarity they need under pressure.",
    year: "2024",
    status: "Live",
    techStack: ["React", "TypeScript", "Mapbox GL", "Node.js", "WebSockets", "PostgreSQL", "Docker"],
    links: [
      { label: "GitHub", url: "#" },
      { label: "Live Demo", url: "#" },
    ],
    media: [
      { type: "image", src: elizabethImg, alt: "Rescue Rush live map" },
      { type: "video", src: "/placeholder.mp4", poster: elizabethImg },
      { type: "image", src: elizabethImg, alt: "Rescue Rush dispatch panel" },
    ],
    shader: {
      colors: ["hsl(10, 70%, 5%)", "hsl(22, 95%, 42%)", "hsl(42, 88%, 52%)", "hsl(0, 55%, 22%)"],
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
    id: "mct",
    name: "MCT",
    description: "Mobile command terminal for field operatives — secure, offline-first data sync with end-to-end encrypted mission logs.",
    tags: ["Mobile", "Crypto"],
    image: elizabethImg,
    href: "/projects/mct",
    longDescription: "MCT (Mobile Command Terminal) is a React Native application built for field teams operating in low-connectivity environments. All data is stored locally in a SQLCipher-encrypted database and synced opportunistically when connectivity is available. Mission logs, personnel notes, and operational data are end-to-end encrypted using a Signal Protocol implementation before leaving the device — ensuring confidentiality even if the sync server is ever compromised.",
    year: "2023",
    status: "Archived",
    techStack: ["React Native", "TypeScript", "SQLCipher", "Expo", "Signal Protocol", "Node.js"],
    links: [{ label: "GitHub", url: "#" }],
    media: [
      { type: "image", src: elizabethImg, alt: "MCT terminal view" },
      { type: "video", src: "/placeholder.mp4", poster: elizabethImg },
      { type: "image", src: elizabethImg, alt: "MCT encrypted log" },
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
]
