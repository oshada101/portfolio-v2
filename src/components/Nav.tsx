import { useState } from "react"
import { Link } from "react-router-dom"

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav
      className={
        open
          ? "fixed inset-0 z-50 flex flex-col backdrop-blur-lg bg-gray-400/20 border-b border-white/40 md:top-4 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:w-[70%] md:rounded-lg md:border md:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
          : "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-[70%] backdrop-blur-lg bg-gray-400/20 border border-white/40 rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
      }
    >
      <div className="flex items-center justify-between px-4 py-2">
        <Link
          to="/"
          className="font-montserrat-alt text-3xl tracking-widest"
          style={{ color: "var(--primary)" }}
          onClick={() => setOpen(false)}
        >
          OSHADA
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
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

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-current transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden flex flex-col items-center justify-center flex-1 gap-10 pb-20">
          <a
            href="/#projects"
            className="nav-link font-montserrat-alt text-2xl font-medium"
            onClick={() => setOpen(false)}
          >
            Projects
          </a>
          <a
            href="/#services"
            className="nav-link font-montserrat-alt text-2xl font-medium"
            onClick={() => setOpen(false)}
          >
            Services
          </a>
          <a
            href="/#contact"
            className="btn-shimmer font-montserrat-alt text-lg font-medium px-8 py-4 rounded-lg text-white border border-white/10"
            style={{ backgroundColor: "var(--primary)" }}
            onClick={() => setOpen(false)}
          >
            Get in touch
          </a>
        </div>
      )}
    </nav>
  )
}
