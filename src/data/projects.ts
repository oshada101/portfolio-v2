import elizabethImg from "../assets/projects/elizabeth.png"

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
  },
]
