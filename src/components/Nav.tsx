import { Link } from "react-router-dom"

export default function Nav() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[70%] backdrop-blur-lg bg-gray-400/20 border border-white/40 rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between px-2 py-2">
        <Link to="/" className="font-montserrat-alt text-3xl tracking-widest" style={{ color: "var(--primary)" }}>
          OSHADA
        </Link>
        <div className="flex items-center gap-8">
          <a href="/#projects" className="nav-link font-montserrat-alt text-sm font-medium">
            Projects
          </a>
          <a href="/#services" className="nav-link font-montserrat-alt text-sm font-medium">
            Services
          </a>
          <a
            href="/#contact"
            className="btn-shimmer font-montserrat-alt text-sm font-medium px-5 py-3 rounded-lg text-white border border-white/10"
            style={{ backgroundColor: "var(--primary)" }}
          >
            Get in touch
          </a>
        </div>
      </div>
    </nav>
  )
}
