import React, { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { projects } from "../data/projects"
import chevronLeft from "../assets/chevron-left.svg"
import chevronRight from "../assets/chevron-right.svg"
import { useInView } from "../hooks/useInView"

export default function ProjectsSlider() {
  const [current, setCurrent] = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef(0)
  const didDrag = useRef(false)
  const [titleRef, titleInView] = useInView()
  const [sliderRef, sliderInView] = useInView()
  const [desktopRef, desktopInView] = useInView()

  const prev = () => setCurrent((c) => (c - 1 + projects.length) % projects.length)
  const next = () => setCurrent((c) => (c + 1) % projects.length)

  // Reset 10s countdown on every slide change (manual or auto)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % projects.length)
    }, 10000)
    return () => clearInterval(timer)
  }, [current])

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true)
    didDrag.current = false
    dragStart.current = e.clientX
  }

  const onMouseUp = (e: React.MouseEvent) => {
    if (!dragging) return
    setDragging(false)
    const delta = dragStart.current - e.clientX
    if (Math.abs(delta) > 5) didDrag.current = true
    if (delta > 50) next()
    else if (delta < -50) prev()
  }

  const onTouchStart = (e: React.TouchEvent) => {
    dragStart.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = dragStart.current - e.changedTouches[0].clientX
    if (delta > 50) next()
    else if (delta < -50) prev()
  }

  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center py-20 overflow-hidden">
      <div
        ref={titleRef as React.RefObject<HTMLDivElement>}
        className={`font-inter text-center text-3xl font-bold mb-10 scroll-reveal${titleInView ? " in-view" : ""}`}
        style={{ color: "var(--primary)" }}
      >
        Projects
      </div>

      {/* Mobile card list */}
      <div ref={sliderRef as React.RefObject<HTMLDivElement>} className={`md:hidden flex flex-col gap-6 px-4 mb-8 scroll-reveal scroll-reveal-d1${sliderInView ? " in-view" : ""}`}>
        {projects.map((p) => (
          <Link key={p.id} to={p.href} className="rounded-lg overflow-hidden shadow-xl block">
            <div className="relative" style={{ aspectRatio: "16/9" }}>
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4" style={{ backgroundColor: "var(--card-bg, #f5f6f8)" }}>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="font-inter font-semibold text-lg" style={{ color: "var(--primary)" }}>{p.name}</span>
                {p.tags.map((tag) => (
                  <span key={tag} className="font-inter text-xs px-2 py-0.5 rounded-sm bg-gray-200 text-gray-600 border border-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="font-inter text-sm text-gray-600 leading-relaxed">{p.description}</p>
            </div>
          </Link>
        ))}
        <Link
          to="/projects"
          className="btn-shimmer font-inter text-sm font-medium px-5 py-3 rounded-lg text-white border border-white/10 text-center"
          style={{ backgroundColor: "var(--primary)" }}
        >
          View All
        </Link>
      </div>

      {/* Desktop: Tab buttons + View All */}
      <div ref={desktopRef as React.RefObject<HTMLDivElement>} className={`hidden md:flex items-center justify-between mb-6 w-[70%] mx-auto scroll-reveal scroll-reveal-d1${desktopInView ? " in-view" : ""}`}>
        <div className="flex items-center gap-2 flex-wrap">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setCurrent(i)}
              className="font-inter text-sm px-4 py-1.5 rounded-md transition-all duration-200 relative overflow-hidden hover:brightness-95 hover:scale-[1.03] cursor-pointer"
              style={{
                backgroundColor: i === current ? "#e2e4e9" : "#eef0f3",
                color: "var(--primary)",
              }}
            >
              {i === current && (
                <span
                  key={current}
                  className="absolute inset-0 origin-left"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.06)",
                    animation: "fill-progress 10s linear forwards",
                  }}
                />
              )}
              <span className="relative z-10">{p.name}</span>
            </button>
          ))}
        </div>
        <Link
          to="/projects"
          className="btn-shimmer font-inter text-sm font-medium px-5 py-2.5 rounded-lg text-white border border-white/10"
          style={{ backgroundColor: "var(--primary)" }}
        >
          View All
        </Link>
      </div>

      {/* Desktop slider */}
      <div
        className={`hidden md:block w-[70%] mx-auto relative select-none scroll-reveal scroll-reveal-d2${desktopInView ? " in-view" : ""}`}
      >
        {/* Track — slides are 70vw each, translate by (70vw + gap) per step */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ gap: "2rem", transform: `translateX(calc(-${current} * (70vw + 2rem)))` }}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={() => setDragging(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="relative rounded-lg overflow-hidden cursor-grab active:cursor-grabbing shadow-xl shrink-0"
              style={{ width: "70vw", aspectRatio: "16/9" }}
            >
              <Link
                to={p.href}
                className="absolute inset-0 z-20"
                onClick={(e) => { if (didDrag.current) e.preventDefault() }}
                draggable={false}
              />
              <img
                src={p.image}
                alt={p.name}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />

              {/* Overlay — only on active slide */}
              {i === current && (
                <>
                  {/* Glass info card */}
                  <div className="absolute bottom-6 left-6 z-10 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg px-5 py-4 max-w-md shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-inter text-white text-2xl font-semibold">{p.name}</span>
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                        className="font-inter text-xs px-2 py-0.5 rounded-sm bg-white/20 text-white border border-white/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="font-inter text-sm text-white/80 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  {/* Dot indicators */}
                  <div className="absolute bottom-6 right-6 flex items-center gap-1.5">
                    {projects.map((_, j) => (
                      <button
                        key={j}
                        onClick={(e) => { e.stopPropagation(); setCurrent(j) }}
                        className="rounded-full transition-all duration-200"
                        style={{
                          width: j === current ? "20px" : "6px",
                          height: "6px",
                          backgroundColor: j === current ? "#fff" : "rgba(255,255,255,0.4)",
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Nav arrows — positioned relative to track wrapper */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg backdrop-blur-md bg-white/20 border border-white/30 shadow-md flex items-center justify-center hover:bg-white/30 transition-colors z-10 cursor-pointer"
        >
          <img src={chevronLeft} alt="Previous" width={18} height={18} />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg backdrop-blur-md bg-white/20 border border-white/30 shadow-md flex items-center justify-center hover:bg-white/30 transition-colors z-10"
        >
          <img src={chevronRight} alt="Next" width={18} height={18} />
        </button>
      </div>
    </section>
  )
}
