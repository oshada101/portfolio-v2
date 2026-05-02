import React from "react"
import { useInView } from "../hooks/useInView"

const LINKS = [
  {
    label: "GitHub",
    sublabel: "github.com/oshada101",
    href: "https://github.com/oshada101",
  },
  {
    label: "Email",
    sublabel: "oshada1188@gmail.com",
    href: "mailto:oshada1188@gmail.com",
  },
  {
    label: "LinkedIn",
    sublabel: "linkedin.com/in/oshada",
    href: "https://linkedin.com/in/oshada",
  },
]

export default function ContactSection() {
  const [headerRef, headerInView] = useInView()
  const [linksRef, linksInView] = useInView()

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(12,0,56,0.045) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top accent rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(170,59,255,0.4), transparent)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 lg:px-24">

        {/* Header */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`mb-14 scroll-reveal${headerInView ? " in-view" : ""}`}>
          <p
            className="font-space-mono text-xs uppercase tracking-[0.35em] mb-5"
            style={{ color: "#aa3bff" }}
          >
            Get in touch
          </p>
          <h2
            className="font-montserrat-alt font-bold"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)", lineHeight: 1, color: "#0C0038" }}
          >
            Let's connect.
          </h2>
        </div>

        {/* Link rows */}
        <div ref={linksRef as React.RefObject<HTMLDivElement>}>
          {LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={`group flex items-center justify-between border-t py-8 md:py-10 transition-all duration-300 hover:pl-3 scroll-reveal${linksInView ? " in-view" : ""}`}
              style={{ borderColor: "#e5e4e7", transitionDelay: linksInView ? `${i * 0.13}s` : "0s" }}
            >
              {/* Left: index + name */}
              <div className="flex items-baseline gap-5">
                <span
                  className="font-space-mono text-xs tabular-nums hidden sm:block"
                  style={{ color: "#d1d0d4" }}
                >
                  0{i + 1}
                </span>
                <span
                  className="font-montserrat-alt font-bold transition-colors duration-300 group-hover:text-[#aa3bff]"
                  style={{ fontSize: "clamp(2.5rem, 7vw, 7.5rem)", lineHeight: 1, color: "#0C0038" }}
                >
                  {link.label}
                </span>
              </div>

              {/* Right: sublabel + arrow */}
              <div className="flex flex-col items-end gap-2 ml-4 shrink-0">
                <span
                  className="font-space-mono text-xs uppercase tracking-[0.15em] transition-opacity duration-300 opacity-0 group-hover:opacity-100 hidden md:block"
                  style={{ color: "#6b6375" }}
                >
                  {link.sublabel}
                </span>
                <span
                  className="font-montserrat-alt text-2xl md:text-3xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  style={{ color: "rgba(170,59,255,0.45)" }}
                >
                  ↗
                </span>
              </div>
            </a>
          ))}
          <div className="border-t" style={{ borderColor: "#e5e4e7" }} />
        </div>

      </div>
    </section>
  )
}
