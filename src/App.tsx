import { useState, useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { Warp } from "@paper-design/shaders-react"
import chevronsDown from "./assets/chevrons-down.svg"
import Nav from "./components/Nav"
import ProjectsSlider from "./components/ProjectsSlider"
import ProjectPage from "./pages/ProjectPage"
import ContactPage from "./pages/ContactPage"
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
      <section className="relative min-h-screen overflow-hidden">
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

        <Nav />

        <div
          className="relative z-10 min-h-screen flex items-center justify-center px-8"
          style={{ mixBlendMode: "difference" }}
        >
          <h1 className="font-space-mono text-6xl md:text-7xl lg:text-[5rem] text-white text-center leading-tight">
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

      <section className="bg-white min-h-screen">
        <ProjectsSlider />
      </section>

      <ServicesSection />

      <ContactSection />
    </main>
  )
}

export default function App() {
  const [exiting, setExiting] = useState(false)
  const [gone,    setGone]    = useState(false)

  function handleLoadComplete() {
    setExiting(true)
    setTimeout(() => setGone(true), 780)
  }

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
          <LoadingScreen onComplete={handleLoadComplete} />
        </div>
      )}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  )
}
