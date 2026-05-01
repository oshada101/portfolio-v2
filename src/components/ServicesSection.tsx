import React, { useState } from "react"
import { useInView } from "../hooks/useInView"

const SERVICES = [
  {
    id: "01",
    title: "AI / ML",
    tags: ["Machine Learning", "LLMs", "Data Pipelines", "Computer Vision"],
    description:
      "Custom-trained models, intelligent automation pipelines, and data-driven systems engineered for measurable real-world impact.",
  },
  {
    id: "02",
    title: "Web Development",
    tags: ["React", "Next.js", "Node.js", "TypeScript"],
    description:
      "Fast, accessible, production-grade web applications — from pixel-perfect UI to scalable, secure backend infrastructure.",
  },
  {
    id: "03",
    title: "Desktop App Development",
    tags: ["Electron", "Tauri", "Cross-Platform", "Native APIs"],
    description:
      "Cross-platform desktop experiences that feel native — snappy, offline-capable, and deeply integrated with the operating system.",
  },
  {
    id: "04",
    title: "Mobile App Development",
    tags: ["React Native", "iOS", "Android", "Expo"],
    description:
      "iOS and Android apps that feel at home on-device — from rapid MVP to a polished, store-ready release.",
  },
]

export default function ServicesSection() {
  const [active, setActive] = useState<number | null>(null)
  const [headerRef, headerInView] = useInView()
  const [cardRef, cardInView] = useInView()

  return (
    <section
      id="services"
      className="relative bg-white py-24 md:py-32 overflow-hidden"
    >
      {/* Dot grid texture */}
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

      <div className="relative z-10 w-[calc(100%-2rem)] md:w-[70%] mx-auto">

        {/* Header */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`mb-14 scroll-reveal${headerInView ? " in-view" : ""}`}>
          <p
            className="font-space-mono text-xs uppercase tracking-[0.35em] mb-5"
            style={{ color: "#aa3bff" }}
          >
            Expertise
          </p>
          <h2
            className="font-montserrat-alt font-bold"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)", lineHeight: 1, color: "#0C0038" }}
          >
            Services
          </h2>
        </div>

        {/* Card */}
        <div
          ref={cardRef as React.RefObject<HTMLDivElement>}
          className={`rounded-2xl overflow-hidden scroll-reveal scroll-reveal-d1${cardInView ? " in-view" : ""}`}
          style={{
            border: "1px solid #e5e4e7",
            boxShadow: "0 8px 40px rgba(12,0,56,0.07)",
          }}
          onMouseLeave={() => setActive(null)}
        >
          {SERVICES.map((svc, i) => {
            const isActive = active === i
            return (
              <div
                key={svc.id}
                onMouseEnter={() => setActive(i)}
                className="transition-colors duration-300"
                style={{
                  background: isActive ? "rgba(170,59,255,0.06)" : "#ffffff",
                  borderBottom: i < SERVICES.length - 1 ? "1px solid #e5e4e7" : "none",
                }}
              >
                <div className="flex items-start gap-8 px-8 md:px-12 py-8 md:py-10">

                  {/* Number */}
                  <span
                    className="font-space-mono text-xs tabular-nums shrink-0 mt-1.5 transition-colors duration-300"
                    style={{ color: isActive ? "#aa3bff" : "#c9c7ce", minWidth: "2rem" }}
                  >
                    {svc.id}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">

                    {/* Title */}
                    <h3
                      className="font-montserrat-alt font-bold transition-colors duration-300"
                      style={{
                        fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                        lineHeight: 1.1,
                        color: isActive ? "#0C0038" : "#1a1030",
                      }}
                    >
                      {svc.title}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2.5">
                      {svc.tags.map((tag, ti) => (
                        <span key={tag} className="flex items-center gap-2">
                          {ti > 0 && (
                            <span
                              className="w-1 h-1 rounded-full shrink-0"
                              style={{ background: isActive ? "rgba(170,59,255,0.5)" : "#c9c7ce" }}
                            />
                          )}
                          <span
                            className="font-space-mono text-xs transition-colors duration-300"
                            style={{ color: isActive ? "#6b6375" : "#a09aaa" }}
                          >
                            {tag}
                          </span>
                        </span>
                      ))}
                    </div>

                    {/* Expanded content */}
                    <div
                      className="overflow-hidden transition-all duration-500"
                      style={{ maxHeight: isActive ? "200px" : "0px", opacity: isActive ? 1 : 0 }}
                    >
                      <p
                        className="font-inter text-sm leading-relaxed mt-5"
                        style={{ color: "#6b6375", maxWidth: "520px" }}
                      >
                        {svc.description}
                      </p>
                      <a
                        href="#contact"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center mt-5 px-5 py-2.5 rounded-full font-space-mono text-xs uppercase tracking-[0.18em] transition-all duration-300 hover:bg-[#0C0038] hover:text-white hover:border-[#0C0038]"
                        style={{
                          border: "1px solid #0C0038",
                          color: "#0C0038",
                          letterSpacing: "0.16em",
                        }}
                      >
                        Discuss project
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
