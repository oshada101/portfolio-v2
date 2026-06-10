import { useState, useEffect, useRef } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { Warp } from "@paper-design/shaders-react"

const BASE_HSL: [number, number, number][] = [
  [220, 90, 10],
  [195, 100, 50],
  [200, 30, 85],
  [0, 0, 95],
]
const toHsl = ([h, s, l]: [number, number, number]) => `hsl(${h}, ${s}%, ${l}%)`
const DEFAULT_COLORS = BASE_HSL.map(toHsl)
import chevronsDown from "./assets/chevrons-down.svg"
import Nav from "./components/Nav"
import ProjectsSlider from "./components/ProjectsSlider"
import ProjectPage from "./pages/ProjectPage"
import ContactPage from "./pages/ContactPage"
import AllProjectsPage from "./pages/AllProjectsPage"
import ContactSection from "./components/ContactSection"
import ServicesSection from "./components/ServicesSection"
import LoadingScreen from "./components/ui/LoadingScreen"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }) }, [pathname])
  return null
}

function LandingPage() {
  const [shaderActive, setShaderActive] = useState(true)
  const targetRef = useRef({ x: 0.5, y: 0.5 })
  const currentRef = useRef({ x: 0.5, y: 0.5 })
  const filterWrapRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const setTarget = (cx: number, cy: number) => {
      targetRef.current.x = Math.max(0, Math.min(1, cx / window.innerWidth))
      targetRef.current.y = Math.max(0, Math.min(1, cy / window.innerHeight))
    }
    const onMouse = (e: MouseEvent) => setTarget(e.clientX, e.clientY)
    const onTouch = (e: TouchEvent) => { if (e.touches[0]) setTarget(e.touches[0].clientX, e.touches[0].clientY) }
    window.addEventListener("mousemove", onMouse, { passive: true })
    window.addEventListener("touchmove", onTouch, { passive: true })

    let raf = 0
    let last = 0
    const tick = (now: number) => {
      if (now - last >= 33) {
        last = now
        currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.08
        currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.08
        const { x, y } = currentRef.current
        const hue = (x - 0.5) * 360
        const sat = 1 + (y - 0.5) * 1.6
        if (filterWrapRef.current) {
          filterWrapRef.current.style.filter = `hue-rotate(${hue.toFixed(1)}deg) saturate(${sat.toFixed(2)})`
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMouse)
      window.removeEventListener("touchmove", onTouch)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setShaderActive(entry.isIntersecting),
      { threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <main>
      <div style={{ height: "100vh", position: "relative" }} aria-hidden="true">
        <div ref={sentinelRef} style={{ position: "absolute", top: "80vh", height: "1px", width: "1px" }} />
      </div>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <Nav />
      </div>

      <section
        className="relative overflow-hidden h-screen"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 0,
          opacity: shaderActive ? 1 : 0,
          transition: "opacity 0.6s ease",
          pointerEvents: shaderActive ? "auto" : "none",
          background: "linear-gradient(135deg, hsl(220,90%,10%) 0%, hsl(195,100%,50%) 60%, hsl(200,30%,85%) 100%)",
        }}
      >
        <div ref={filterWrapRef} className="absolute inset-0" style={{ willChange: "filter", transition: "filter 0.4s ease-out" }}>
          <Warp
            style={{ height: "100%", width: "100%" }}
            proportion={0.45}
            softness={1}
            distortion={0.25}
            swirl={0.8}
            swirlIterations={10}
            shape="checks"
            shapeScale={0.1}
            scale={1}
            rotation={0}
            speed={shaderActive ? 1 : 0}
            colors={DEFAULT_COLORS}
          />
        </div>

        <div
          className="relative z-10 flex items-center justify-center px-8"
          style={{ height: "100vh" }}
        >
          <h1 className="font-inter text-3xl md:text-7xl lg:text-[5rem] text-white text-center leading-tight uppercase" style={{ fontWeight: 900, textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
            Turning{" "}
            <span className="font-fraunces normal-case italic" style={{ fontWeight: 700 }}>Ideas</span>
            {" "}Into Reality
          </h1>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 group cursor-pointer">
          <span
            className="font-montserrat-alt text-xs tracking-[0.2em] uppercase transition-opacity duration-300 group-hover:opacity-60"
            style={{ color: "var(--primary)" }}
          >
            Scroll
          </span>
          <img
            src={chevronsDown}
            alt=""
            width={28}
            height={28}
            className="transition-transform duration-300 group-hover:translate-y-1.5"
          />
        </div>
      </section>

      <section className="bg-white min-h-screen rounded-t-lg" style={{ position: "relative", zIndex: 1 }}>
        <ProjectsSlider />
      </section>

      <div style={{ position: "relative", zIndex: 1 }}>
        <ServicesSection />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <ContactSection />
      </div>
    </main>
  )
}

export default function App() {
  const [progress, setProgress] = useState(() => (window as any).__loaderProgress ?? 0)
  const [exiting,  setExiting]  = useState(false)
  const [gone,     setGone]     = useState(false)

  function handleLoadComplete() {
    setExiting(true)
    setTimeout(() => setGone(true), 780)
  }

  useEffect(() => {
    const htmlLoader = document.getElementById('html-loader')
    if (htmlLoader) htmlLoader.remove()

    if (document.readyState === 'complete') {
      setProgress(1)
      return
    }

    const startP = (window as any).__loaderProgress ?? 0
    const remaining = Math.max((0.9 - startP) / 0.9, 0.05) * 2500
    let raf: number
    let start: number | null = null

    const tick = (now: number) => {
      if (start === null) start = now
      const t = Math.min((now - start) / remaining, 1)
      const ease = t * t * (3 - 2 * t)
      const p = startP + (0.9 - startP) * ease
      setProgress(p)
      ;(window as any).__loaderProgress = p
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onLoad = () => {
      cancelAnimationFrame(raf)
      const pAtLoad = (window as any).__loaderProgress ?? 0
      let finalStart: number | null = null
      const finalTick = (now: number) => {
        if (finalStart === null) finalStart = now
        const ft = Math.min((now - finalStart) / 1000, 1)
        const ease = ft * ft * (3 - 2 * ft)
        const p = pAtLoad + (1 - pAtLoad) * ease
        setProgress(p)
        ;(window as any).__loaderProgress = p
        if (ft < 1) requestAnimationFrame(finalTick)
      }
      requestAnimationFrame(finalTick)
    }
    window.addEventListener('load', onLoad)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  useEffect(() => {
    if (progress >= 1) {
      const t = setTimeout(handleLoadComplete, 500)
      return () => clearTimeout(t)
    }
  }, [progress])

  return (
    <>
      {!gone && (
        <div
          className={exiting ? "loading-overlay-exit" : ""}
          style={{
            position: "fixed",
            inset: 0,
            background: "hsl(0, 0%, 98%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <LoadingScreen progress={progress} autoPlay={false} />
        </div>
      )}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/projects" element={<AllProjectsPage />} />
      </Routes>
    </>
  )
}
