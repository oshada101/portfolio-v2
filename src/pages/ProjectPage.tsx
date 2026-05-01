import { useParams, Link } from "react-router-dom"
import { projects } from "../data/projects"
import Nav from "../components/Nav"
import chevronLeft from "../assets/chevron-left.svg"
import chevronRight from "../assets/chevron-right.svg"

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  "Live":             { bg: "rgba(34,197,94,0.15)",    text: "#22c55e" },
  "In Development":   { bg: "var(--accent-bg)",         text: "var(--accent)" },
  "Archived":         { bg: "rgba(107,99,117,0.15)",   text: "#6b6375" },
}

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const idx = projects.findIndex((p) => p.id === id)
  const project = projects[idx]

  if (!project) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-8"
        style={{ backgroundColor: "var(--primary)" }}
      >
        <Nav />
        <p className="font-space-mono text-xs uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.3)" }}>
          404
        </p>
        <h1 className="font-montserrat-alt font-bold text-white text-5xl">Project not found</h1>
        <Link
          to="/"
          className="btn-shimmer font-inter text-sm font-medium px-6 py-3 rounded-lg text-white border border-white/10"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          ← Go home
        </Link>
      </div>
    )
  }

  const prevProject = projects[(idx - 1 + projects.length) % projects.length]
  const nextProject = projects[(idx + 1) % projects.length]
  const statusStyle = STATUS_STYLES[project.status] ?? STATUS_STYLES["Archived"]

  return (
    <div>
      <Nav />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section
        className="min-h-screen relative flex overflow-hidden"
        style={{ backgroundColor: "var(--primary)" }}
      >
        {/* Subtle dot-grid texture */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Left text panel */}
        <div className="relative z-10 flex-1 flex flex-col justify-end pb-20 pt-36 px-12 md:px-20 lg:px-28">
          {/* Ghost index number */}
          <span
            className="absolute top-1/2 -translate-y-1/2 left-6 font-montserrat-alt font-bold select-none pointer-events-none"
            style={{
              fontSize: "clamp(8rem, 22vw, 26rem)",
              color: "rgba(255,255,255,0.025)",
              lineHeight: 1,
            }}
          >
            {String(idx + 1).padStart(2, "0")}
          </span>

          {/* Tags */}
          <div
            className="flex items-center gap-2 mb-7"
            style={{ animation: "project-reveal 0.65s cubic-bezier(0.22,1,0.36,1) both", animationDelay: "0ms" }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-space-mono text-xs uppercase tracking-[0.2em] px-3 py-1 rounded-sm border"
                style={{ color: "var(--accent)", borderColor: "var(--accent-border)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            className="font-montserrat-alt font-bold text-white leading-[0.88] mb-9"
            style={{
              fontSize: "clamp(3.25rem, 8vw, 9rem)",
              animation: "project-reveal 0.65s cubic-bezier(0.22,1,0.36,1) both",
              animationDelay: "90ms",
            }}
          >
            {project.name}
          </h1>

          {/* Year + Status */}
          <div
            className="flex items-center gap-5"
            style={{ animation: "project-reveal 0.65s cubic-bezier(0.22,1,0.36,1) both", animationDelay: "180ms" }}
          >
            <span className="font-space-mono text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              {project.year}
            </span>
            <span
              className="font-space-mono text-xs uppercase tracking-widest px-3 py-1 rounded-sm"
              style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
            >
              {project.status}
            </span>
          </div>
        </div>

        {/* Right image panel — hidden on small screens */}
        <div className="hidden md:block relative shrink-0" style={{ width: "52%" }}>
          <img
            src={project.image}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ animation: "project-image-reveal 1.1s cubic-bezier(0.22,1,0.36,1) both", animationDelay: "120ms" }}
          />
          {/* Gradient blending left edge into primary bg */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to right, var(--primary) 0%, rgba(12,0,56,0.5) 30%, transparent 60%)" }}
          />
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          style={{ animation: "project-reveal 0.65s cubic-bezier(0.22,1,0.36,1) both", animationDelay: "280ms" }}
        >
          <span
            className="font-space-mono text-xs tracking-[0.28em] uppercase"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Scroll
          </span>
        </div>
      </section>

      {/* ── Content ─────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-8 md:px-12">

          {/* Back */}
          <Link
            to="/"
            className="nav-link font-space-mono text-xs uppercase tracking-[0.22em] inline-flex items-center gap-2 mb-16"
          >
            ← All Projects
          </Link>

          {/* Accent rule */}
          <div
            className="w-full h-px mb-16"
            style={{ background: "linear-gradient(to right, var(--accent), transparent)" }}
          />

          {/* Two-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">

            {/* Overview */}
            <div className="md:col-span-7">
              <p
                className="font-space-mono text-xs uppercase tracking-[0.3em] mb-5"
                style={{ color: "#6b6375" }}
              >
                Overview
              </p>
              <p
                className="font-inter text-[1.1rem] leading-[1.85]"
                style={{ color: "#08060d" }}
              >
                {project.longDescription}
              </p>
            </div>

            {/* Details panel */}
            <div className="md:col-span-5 space-y-10">

              {/* Year + Status */}
              <div>
                <p
                  className="font-space-mono text-xs uppercase tracking-[0.3em] mb-4"
                  style={{ color: "#6b6375" }}
                >
                  Details
                </p>
                <div className="flex items-center gap-3">
                  <span
                    className="font-space-mono text-sm font-bold"
                    style={{ color: "#08060d" }}
                  >
                    {project.year}
                  </span>
                  <span
                    className="font-space-mono text-xs uppercase tracking-widest px-3 py-1 rounded-sm"
                    style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Tech stack */}
              <div>
                <p
                  className="font-space-mono text-xs uppercase tracking-[0.3em] mb-4"
                  style={{ color: "#6b6375" }}
                >
                  Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-space-mono text-xs px-3 py-1.5 rounded-sm border"
                      style={{
                        backgroundColor: "var(--primary)",
                        color: "rgba(255,255,255,0.82)",
                        borderColor: "var(--accent-border)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px my-16" style={{ backgroundColor: "#e5e4e7" }} />

          {/* Links */}
          <div>
            <p
              className="font-space-mono text-xs uppercase tracking-[0.3em] mb-6"
              style={{ color: "#6b6375" }}
            >
              Links
            </p>
            <div className="flex flex-wrap gap-4">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer font-inter text-sm font-medium px-8 py-3 rounded-lg text-white"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Prev / Next ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--primary)" }}>
        <div
          className="w-full h-px"
          style={{ background: "linear-gradient(to right, transparent, var(--accent-border), transparent)" }}
        />
        <div className="grid grid-cols-2">

          {/* Previous */}
          <Link
            to={prevProject.href}
            className="group flex flex-col justify-between p-10 md:p-16 border-r transition-colors duration-200 hover:bg-white/[0.04]"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <span
              className="font-space-mono text-xs uppercase tracking-[0.22em] flex items-center gap-2 mb-8"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              <img src={chevronLeft} alt="" width={11} height={11} className="invert opacity-40" />
              Previous
            </span>
            <div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {prevProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-space-mono text-xs px-2 py-0.5 rounded-sm border"
                    style={{ color: "rgba(255,255,255,0.25)", borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span
                className="font-montserrat-alt font-bold block transition-colors duration-200"
                style={{
                  fontSize: "clamp(1.4rem, 3.5vw, 3.25rem)",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                <span className="group-hover:text-white transition-colors duration-200">
                  {prevProject.name}
                </span>
              </span>
            </div>
          </Link>

          {/* Next */}
          <Link
            to={nextProject.href}
            className="group flex flex-col justify-between p-10 md:p-16 text-right transition-colors duration-200 hover:bg-white/[0.04]"
          >
            <span
              className="font-space-mono text-xs uppercase tracking-[0.22em] flex items-center justify-end gap-2 mb-8"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              Next
              <img src={chevronRight} alt="" width={11} height={11} className="invert opacity-40" />
            </span>
            <div>
              <div className="flex flex-wrap gap-1.5 mb-3 justify-end">
                {nextProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-space-mono text-xs px-2 py-0.5 rounded-sm border"
                    style={{ color: "rgba(255,255,255,0.25)", borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span
                className="font-montserrat-alt font-bold block transition-colors duration-200"
                style={{
                  fontSize: "clamp(1.4rem, 3.5vw, 3.25rem)",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                <span className="group-hover:text-white transition-colors duration-200">
                  {nextProject.name}
                </span>
              </span>
            </div>
          </Link>

        </div>
      </section>
    </div>
  )
}
