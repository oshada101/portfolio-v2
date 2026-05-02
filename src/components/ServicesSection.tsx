import React, { useState } from "react"
import { useInView } from "../hooks/useInView"

const SERVICES = [
  {
    id: "01",
    title: "AI / ML",
    tags: ["Machine Learning", "LLMs", "Data Pipelines", "Computer Vision"],
    description:
      "Custom-trained models, intelligent automation pipelines, and data-driven systems engineered for measurable real-world impact.",
    colors: ["#e879f9", "#aa3bff", "#6d28d9"],
    accent: "#aa3bff",
  },
  {
    id: "02",
    title: "Web Development",
    tags: ["React", "Next.js", "Node.js", "TypeScript"],
    description:
      "Fast, accessible, production-grade web applications — from pixel-perfect UI to scalable, secure backend infrastructure.",
    colors: ["#22d3ee", "#3b82f6", "#4f46e5"],
    accent: "#3b82f6",
  },
  {
    id: "03",
    title: "Desktop Apps",
    tags: ["Electron", "Tauri", "Cross-Platform", "Native APIs"],
    description:
      "Cross-platform desktop experiences that feel native — snappy, offline-capable, and deeply integrated with the operating system.",
    colors: ["#fde68a", "#f97316", "#dc2626"],
    accent: "#f97316",
  },
  {
    id: "04",
    title: "Mobile Apps",
    tags: ["React Native", "iOS", "Android", "Expo"],
    description:
      "iOS and Android apps that feel at home on-device — from rapid MVP to a polished, store-ready release.",
    colors: ["#86efac", "#22c55e", "#0d9488"],
    accent: "#22c55e",
  },
]

function hexToRgb(hex: string) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  }
}

function interpColor(colors: string[], t: number): string {
  const n = colors.length - 1
  const seg = Math.min(Math.floor(t * n), n - 1)
  const st = t * n - seg
  const a = hexToRgb(colors[seg])
  const b = hexToRgb(colors[seg + 1])
  return `rgb(${Math.round(a.r + (b.r - a.r) * st)},${Math.round(a.g + (b.g - a.g) * st)},${Math.round(a.b + (b.b - a.b) * st)})`
}

function CardLines({ colors, id }: { colors: string[]; id: string }) {
  const NUM = 80
  const W = 400
  const H = 200
  const fx = -10
  const fy = 215
  const LEN = 480
  const A_START = 8
  const A_END = 102

  const lines = Array.from({ length: NUM }, (_, i) => {
    const t = i / (NUM - 1)
    const rad = ((A_START + t * (A_END - A_START)) * Math.PI) / 180
    return {
      x2: fx + LEN * Math.cos(rad),
      y2: fy - LEN * Math.sin(rad),
      color: interpColor(colors, t),
    }
  })

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <defs>
        <linearGradient id={`wf-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="45%" stopColor="white" stopOpacity="0.7" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      {lines.map(({ x2, y2, color }, i) => (
        <line
          key={i}
          x1={fx}
          y1={fy}
          x2={x2}
          y2={y2}
          stroke={color}
          strokeWidth="0.9"
          opacity="0.85"
        />
      ))}
      <rect width={W} height={H} fill={`url(#wf-${id})`} />
    </svg>
  )
}

export default function ServicesSection() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [headerRef, headerInView] = useInView()
  const [gridRef, gridInView] = useInView()

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      {/* Dot grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(12,0,56,0.045) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top accent rule */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(170,59,255,0.4), transparent)",
        }}
      />

      <div className="relative z-10 mx-auto w-[calc(100%-2rem)] md:w-[70%]">
        {/* Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`mb-14 scroll-reveal${headerInView ? " in-view" : ""}`}
        >
          <p
            className="mb-5 font-space-mono text-xs uppercase tracking-[0.35em]"
            style={{ color: "#aa3bff" }}
          >
            Expertise
          </p>
          <h2
            className="font-montserrat-alt font-bold"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 4.5rem)",
              lineHeight: 1,
              color: "#0C0038",
            }}
          >
            Services
          </h2>
        </div>

        {/* Cards grid */}
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          onMouseLeave={() => setHovered(null)}
        >
          {SERVICES.map((svc, i) => {
            const isHovered = hovered === i
            return (
              <div
                key={svc.id}
                onMouseEnter={() => setHovered(i)}
                className={`scroll-reveal${gridInView ? " in-view" : ""}`}
                style={{
                  transitionDelay: gridInView ? `${i * 0.1}s` : "0s",
                  borderRadius: "20px",
                  border: `1px solid ${isHovered ? svc.accent + "66" : "#e5e4e7"}`,
                  background: "#ffffff",
                  boxShadow: isHovered
                    ? `0 16px 48px ${svc.accent}1a, 0 2px 8px rgba(12,0,56,0.06)`
                    : "0 2px 12px rgba(12,0,56,0.05)",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  transition:
                    "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                  overflow: "hidden",
                  cursor: "default",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                {/* Radiating lines background */}
                <div className="pointer-events-none absolute inset-0">
                  <CardLines colors={svc.colors} id={svc.id} />
                </div>

                {/* Content */}
                <div style={{ position: "relative", zIndex: 1, padding: "2rem 2rem 1.75rem" }}>
                  <h3
                    className="font-montserrat-alt font-bold"
                    style={{
                      fontSize: "clamp(1.4rem, 2.4vw, 1.85rem)",
                      lineHeight: 1.05,
                      color: "#0C0038",
                      marginBottom: "1rem",
                    }}
                  >
                    {svc.title}
                  </h3>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {svc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-3 py-1 font-space-mono text-xs"
                        style={{
                          border: `1px solid ${isHovered ? svc.accent + "44" : "rgba(12,0,56,0.1)"}`,
                          color: isHovered ? svc.accent : "#6b6375",
                          background: "rgba(255,255,255,0.8)",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p
                    className="font-inter text-sm leading-relaxed"
                    style={{ color: "#6b6375" }}
                  >
                    {svc.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
