import { Warp } from "@paper-design/shaders-react"
import Nav from "../components/Nav"

const LINKS = [
  {
    label: "GitHub",
    sublabel: "github.com/oshada",
    href: "https://github.com/oshada",
  },
  {
    label: "Email",
    sublabel: "copier5612@proton.me",
    href: "mailto:copier5612@proton.me",
  },
  {
    label: "LinkedIn",
    sublabel: "linkedin.com/in/oshada",
    href: "https://linkedin.com/in/oshada",
  },
]

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Deep violet Warp — distinct from landing's blue-teal palette */}
      <div className="absolute inset-0">
        <Warp
          style={{ height: "100%", width: "100%" }}
          proportion={0.55}
          softness={0.9}
          distortion={0.18}
          swirl={1.4}
          swirlIterations={14}
          shape="checks"
          shapeScale={0.07}
          scale={1.1}
          rotation={0.25}
          speed={0.55}
          colors={[
            "hsl(260, 80%, 5%)",
            "hsl(278, 70%, 14%)",
            "hsl(265, 55%, 32%)",
            "hsl(248, 90%, 7%)",
          ]}
        />
      </div>

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Rotated decorative label */}
      <div
        className="absolute left-0 top-1/2 z-[2] pointer-events-none select-none"
        style={{ transform: "translateY(-50%) rotate(-90deg) translateX(-40%)" }}
      >
        <span
          className="font-montserrat-alt font-bold tracking-[0.5em] uppercase"
          style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.4rem)", color: "rgba(255,255,255,0.03)" }}
        >
          CONTACT
        </span>
      </div>

      <Nav />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-28 pb-16">
        <div className="max-w-6xl mx-auto w-full">

          {/* Header */}
          <div
            className="mb-16"
            style={{ animation: "project-reveal 0.65s cubic-bezier(0.22,1,0.36,1) both" }}
          >
            <p
              className="font-space-mono text-xs uppercase tracking-[0.35em] mb-5"
              style={{ color: "rgba(170,59,255,0.85)" }}
            >
              Get in touch
            </p>
            <h1
              className="font-montserrat-alt font-bold text-white"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)", lineHeight: 1 }}
            >
              Let's connect.
            </h1>
          </div>

          {/* Link rows */}
          <div>
            {LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-t py-8 md:py-10 transition-all duration-300 hover:pl-3"
                style={{
                  borderColor: "rgba(255,255,255,0.1)",
                  animation: "project-reveal 0.65s cubic-bezier(0.22,1,0.36,1) both",
                  animationDelay: `${80 + i * 90}ms`,
                }}
              >
                {/* Left: index + name */}
                <div className="flex items-baseline gap-5">
                  <span
                    className="font-space-mono text-xs tabular-nums hidden sm:block"
                    style={{ color: "rgba(255,255,255,0.22)" }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className="font-montserrat-alt font-bold text-white transition-colors duration-300 group-hover:text-[#aa3bff]"
                    style={{ fontSize: "clamp(2.5rem, 7vw, 7.5rem)", lineHeight: 1 }}
                  >
                    {link.label}
                  </span>
                </div>

                {/* Right: sublabel + arrow */}
                <div className="flex flex-col items-end gap-2 ml-4 shrink-0">
                  <span
                    className="font-space-mono text-xs uppercase tracking-[0.15em] transition-opacity duration-300 opacity-0 group-hover:opacity-100 hidden md:block"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {link.sublabel}
                  </span>
                  <span
                    className="font-montserrat-alt text-2xl md:text-3xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{ color: "rgba(170,59,255,0.55)" }}
                  >
                    ↗
                  </span>
                </div>
              </a>
            ))}
            {/* Bottom border */}
            <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }} />
          </div>

        </div>
      </div>
    </div>
  )
}
