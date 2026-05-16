import { useState, useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { Warp } from "@paper-design/shaders-react"
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
  return (
    <main>
      <div style={{ height: "100vh" }} aria-hidden="true" />
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <Nav />
      </div>

      <section className="relative overflow-hidden h-screen" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 0 }}>
        <div className="absolute inset-0">
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
            speed={1}
            colors={["hsl(220, 90%, 10%)", "hsl(195, 100%, 50%)", "hsl(200, 30%, 85%)", "hsl(0, 0%, 95%)"]}
          />
        </div>

        <div
          className="relative z-10 flex items-center justify-center px-8"
          style={{ height: "100vh", mixBlendMode: "overlay" }}
        >
          <h1 className="font-space-mono text-3xl md:text-7xl lg:text-[5rem] text-white text-center leading-tight uppercase">
            Turning Ideas Into Reality
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
