import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const MENU_ITEMS = [
  { label: "Projects", href: "/#projects", idx: "01" },
  { label: "Services", href: "/#services", idx: "02" },
  { label: "Contact", href: "/#contact", idx: "03" },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [time, setTime] = useState("")

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    setTime(fmt())
    const id = setInterval(() => setTime(fmt()), 30_000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      {/* Top bar (always docked) */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-[70%] backdrop-blur-lg bg-gray-400/20 border border-white/40 rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between px-4 py-2">
          <Link
            to="/"
            className="wordmark text-3xl relative z-[60]"
            style={{ color: open ? "#FAF6EE" : "var(--primary)" }}
            onClick={() => {
              setOpen(false)
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            aria-label="Oshada — home"
          >
            OS<span className="wordmark-kern">H</span>ADA
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

          {/* Hamburger / Close */}
          <button
            className="md:hidden relative z-[60] w-10 h-10 flex items-center justify-center"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{ color: open ? "#FAF6EE" : "var(--primary)" }}
          >
            <span
              className={`absolute block h-[1.5px] w-7 bg-current transition-all duration-500 ease-[cubic-bezier(.76,0,.24,1)] ${
                open ? "rotate-45" : "-translate-y-[6px]"
              }`}
            />
            <span
              className={`absolute block h-[1.5px] w-7 bg-current transition-all duration-500 ease-[cubic-bezier(.76,0,.24,1)] ${
                open ? "-rotate-45" : "translate-y-[6px]"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile takeover overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 overflow-hidden pointer-events-${open ? "auto" : "none"}`}
        aria-hidden={!open}
      >
        {/* Background panel — slides + clip reveal */}
        <div
          className="absolute inset-0 transition-[clip-path] duration-[900ms] ease-[cubic-bezier(.76,0,.24,1)]"
          style={{
            background:
              "radial-gradient(140% 90% at 110% -10%, #5A1078 0%, #2A0654 35%, #0C0038 70%)",
            clipPath: open
              ? "circle(160% at 100% 0%)"
              : "circle(0% at 100% 0%)",
          }}
        >
          {/* Grain */}
          <div
            className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            }}
          />
          {/* Marble bleed corner */}
          <div
            className="absolute -bottom-32 -left-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-50"
            style={{
              background:
                "radial-gradient(circle, #FF6BD6 0%, #D946EF 35%, transparent 70%)",
            }}
          />
          {/* Decorative italic backdrop word */}
          <div
            className="absolute -right-6 top-[15%] select-none pointer-events-none"
            style={{
              fontFamily: "Fraunces, serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(160px, 48vw, 280px)",
              lineHeight: 0.9,
              color: "rgba(250, 246, 238, 0.04)",
              letterSpacing: "-0.04em",
            }}
          >
            menu
          </div>
        </div>

        {/* Content layer */}
        <div
          className={`absolute inset-0 flex flex-col px-7 pt-24 pb-8 transition-opacity duration-300 ${
            open ? "opacity-100 delay-[450ms]" : "opacity-0"
          }`}
          style={{ color: "#FAF6EE" }}
        >
          {/* Section index */}
          <div
            className={`flex items-center gap-3 mb-10 transition-all duration-700 ${
              open ? "opacity-60 translate-y-0 delay-[500ms]" : "opacity-0 -translate-y-2"
            }`}
          >
            <span className="block w-8 h-px bg-[#FAF6EE]/40" />
            <span
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Navigation / Index
            </span>
          </div>

          {/* Menu items */}
          <ul className="flex flex-col gap-1 flex-1">
            {MENU_ITEMS.map((item, i) => (
              <li
                key={item.label}
                className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${
                  open
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: open ? `${550 + i * 90}ms` : "0ms",
                }}
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group relative flex items-baseline justify-between py-4 border-b border-[#FAF6EE]/10"
                >
                  <div className="flex items-baseline gap-5">
                    <span
                      className="text-[11px] tracking-[0.2em] opacity-50 group-hover:opacity-100 transition-opacity"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      {item.idx}
                    </span>
                    <span
                      className="relative inline-block"
                      style={{
                        fontFamily: "var(--font-unbounded)",
                        fontWeight: 500,
                        fontSize: "clamp(48px, 14vw, 76px)",
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                      }}
                    >
                      <span className="block transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:translate-x-2 group-active:translate-x-2">
                        {item.label.toLowerCase()}
                      </span>
                      {/* underline accent */}
                      <span
                        className="absolute -bottom-1 left-0 h-[2px] w-0 group-hover:w-full transition-[width] duration-500"
                        style={{
                          background:
                            "linear-gradient(90deg, #FF6BD6, #D946EF)",
                        }}
                      />
                    </span>
                  </div>
                  {/* arrow */}
                  <span
                    className="text-2xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-active:opacity-100 group-active:translate-x-0 transition-all duration-500"
                    style={{ fontFamily: "Fraunces, serif", fontStyle: "italic" }}
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Footer block */}
          <div
            className={`mt-10 grid grid-cols-2 gap-6 transition-all duration-700 ${
              open ? "opacity-100 translate-y-0 delay-[900ms]" : "opacity-0 translate-y-4"
            }`}
          >
            <div>
              <div
                className="text-[9px] tracking-[0.3em] uppercase opacity-50 mb-2"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                Reach out
              </div>
              <a
                href="mailto:hello@oshada.dev"
                className="text-sm font-montserrat-alt underline decoration-[#FF6BD6]/60 underline-offset-4 hover:decoration-[#FF6BD6]"
              >
                hello@oshada.dev
              </a>
            </div>
            <div className="text-right">
              <div
                className="text-[9px] tracking-[0.3em] uppercase opacity-50 mb-2"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                Local · LK
              </div>
              <div
                className="text-sm tabular-nums"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {time}
              </div>
            </div>
          </div>

          {/* Bottom stamp */}
          <div
            className={`mt-6 flex items-center justify-between text-[10px] tracking-[0.25em] uppercase opacity-40 transition-opacity duration-700 ${
              open ? "opacity-40 delay-[1000ms]" : "opacity-0"
            }`}
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <span>© {new Date().getFullYear()}</span>
            <span className="flex items-center gap-2">
              <span className="block w-1.5 h-1.5 rounded-full bg-[#FF6BD6] animate-pulse" />
              Available for work
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
