import { useState } from "react"
import { Link } from "react-router-dom"
import { projects } from "../data/projects"
import Nav from "../components/Nav"

export default function AllProjectsPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  function handleMouseMove(e: React.MouseEvent) {
    setCursor({ x: e.clientX, y: e.clientY })
  }

  const hoveredProject = projects.find((p) => p.id === hoveredId)

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* floating image — fixed, follows cursor via clientX/Y */}
      <div
        style={{
          position: "fixed",
          left: cursor.x + 28,
          top: cursor.y,
          transform: "translateY(-50%)",
          pointerEvents: "none",
          zIndex: 40,
          opacity: hoveredId ? 1 : 0,
          transition: "opacity 0.22s ease",
          willChange: "transform",
        }}
      >
        {hoveredProject && (
          <img
            src={hoveredProject.image}
            alt={hoveredProject.name}
            style={{
              width: 320,
              height: 200,
              objectFit: "cover",
              display: "block",
              boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
            }}
          />
        )}
      </div>

      <div
        className="relative pt-24 pb-32"
        onMouseMove={handleMouseMove}
      >
        {/* header */}
        <div className="px-10 md:px-16 lg:px-24 mb-16 flex items-end justify-between">
          <h1
            className="font-space-mono text-xs uppercase tracking-[0.3em]"
            style={{ color: "#6b6375" }}
          >
            Selected Work
          </h1>
          <span
            className="font-space-mono text-xs"
            style={{ color: "#c5c3c9" }}
          >
            {projects.length} projects
          </span>
        </div>

        {/* divider */}
        <div className="w-full h-px" style={{ backgroundColor: "#e5e4e7" }} />

        {/* project rows */}
        {projects.map((project, i) => (
          <Link
            key={project.id}
            to={project.href}
            className="block group"
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* mobile */}
            <div
              className="md:hidden px-6 py-7 flex items-center justify-between"
              style={{
                borderBottom: "1px solid #e5e4e7",
                background: "transparent",
              }}
            >
              <div className="flex flex-col gap-1.5 min-w-0 pr-4">
                <span className="font-space-mono text-[10px]" style={{ color: "#c5c3c9" }}>
                  /{String(i + 1).padStart(2, "0")}
                </span>
                <h2
                  className="font-montserrat-alt font-bold leading-tight truncate"
                  style={{ fontSize: "1.5rem", color: "#1a1528" }}
                >
                  {project.name}
                </h2>
                <p className="font-inter text-xs leading-relaxed line-clamp-2" style={{ color: "#9c97a5" }}>
                  {project.description.split("—")[0].trim()}
                </p>
              </div>
              <span className="font-space-mono text-lg shrink-0" style={{ color: "var(--accent)" }}>→</span>
            </div>

            {/* desktop */}
            <div
              className="hidden md:grid px-16 lg:px-24 py-12"
              style={{
                gridTemplateColumns: "280px 1fr",
                gap: "2rem",
                alignItems: "center",
                borderBottom: "1px solid #e5e4e7",
                transition: "background 0.2s ease",
                background: hoveredId === project.id ? "#fafafa" : "transparent",
              }}
            >
              <div className="flex flex-col gap-6">
                <p
                  className="font-inter text-sm leading-relaxed"
                  style={{
                    color: hoveredId === project.id ? "#08060d" : "#9c97a5",
                    transition: "color 0.2s ease",
                    maxWidth: 240,
                  }}
                >
                  {project.description.split("—")[0].trim()}
                </p>
                <span className="font-space-mono text-xs" style={{ color: "#c5c3c9" }}>
                  /{String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-center justify-between overflow-hidden">
                <h2
                  className="font-montserrat-alt font-bold leading-none select-none"
                  style={{
                    fontSize: "clamp(3rem, 8vw, 9rem)",
                    color: hoveredId === project.id ? "var(--primary)" : "#1a1528",
                    transition: "color 0.2s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)",
                    transform: hoveredId === project.id ? "translateX(6px)" : "translateX(0)",
                  }}
                >
                  {project.name}
                </h2>
                <span
                  className="font-space-mono text-2xl ml-6 shrink-0"
                  style={{
                    color: "var(--accent)",
                    opacity: hoveredId === project.id ? 1 : 0,
                    transform: hoveredId === project.id ? "translateX(0)" : "translateX(-12px)",
                    transition: "opacity 0.2s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}

        {/* footer link */}
        <div className="px-10 md:px-16 lg:px-24 mt-16">
          <Link
            to="/"
            className="nav-link font-space-mono text-xs uppercase tracking-[0.22em] inline-flex items-center gap-2"
          >
            ← Back
          </Link>
        </div>
      </div>
    </div>
  )
}
