import { useState, useCallback, useEffect, useRef } from "react"
import { createPortal } from "react-dom"

export type MediaItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string }

interface Props {
  items: MediaItem[]
}

export default function MediaSlider({ items }: Props) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const [animating, setAnimating] = useState(false)
  const [lightbox, setLightbox] = useState<MediaItem | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const total = items.length

  const go = useCallback(
    (next: number, dir: "left" | "right") => {
      if (animating || next === current) return
      setDirection(dir)
      setAnimating(true)
      setTimeout(() => {
        setCurrent(next)
        setAnimating(false)
        setDirection(null)
      }, 380)
    },
    [animating, current]
  )

  const prev = useCallback(() => go((current - 1 + total) % total, "right"), [current, go, total])
  const next = useCallback(() => go((current + 1) % total, "left"), [current, go, total])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    el.addEventListener("keydown", onKey)
    return () => el.removeEventListener("keydown", onKey)
  }, [prev, next])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null)
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [lightbox])

  const slideStyle = (i: number): React.CSSProperties => {
    if (!animating) {
      return {
        transform: i === current ? "translateX(0%)" : i < current ? "translateX(-100%)" : "translateX(100%)",
        transition: "none",
        opacity: i === current ? 1 : 0,
      }
    }
    if (i === current) {
      return {
        transform: direction === "left" ? "translateX(-100%)" : "translateX(100%)",
        transition: "transform 380ms cubic-bezier(0.76,0,0.24,1), opacity 380ms ease",
        opacity: 0,
      }
    }
    const isIncoming =
      (direction === "left" && i === (current + 1) % total) ||
      (direction === "right" && i === (current - 1 + total) % total)
    if (isIncoming) {
      return {
        transform: "translateX(0%)",
        transition: "transform 380ms cubic-bezier(0.76,0,0.24,1), opacity 380ms ease",
        opacity: 1,
      }
    }
    return {
      transform: i < current ? "translateX(-100%)" : "translateX(100%)",
      transition: "none",
      opacity: 0,
    }
  }

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm"
      style={{ position: "relative" }}
    >
      {/* Slide track */}
      <div
        className="relative overflow-hidden rounded-sm"
        style={{ aspectRatio: "16/9", background: "#08060d" }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{ ...slideStyle(i), pointerEvents: i === current ? "auto" : "none" }}
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.alt ?? ""}
                className="w-full h-full object-cover"
                draggable={false}
                style={{ cursor: "zoom-in" }}
                onClick={() => setLightbox(item)}
              />
            ) : (
              <div
                className="w-full h-full relative"
                style={{ background: "#000", cursor: "zoom-in" }}
                onClick={() => setLightbox(item)}
              >
                <video
                  src={item.src}
                  poster={item.poster}
                  className="w-full h-full object-cover"
                  style={{ background: "#000", pointerEvents: "none" }}
                />
              </div>
            )}
          </div>
        ))}

        {/* Counter */}
        <div
          className="absolute top-4 right-4 z-20 font-space-mono text-xs tracking-[0.18em] px-2 py-1 rounded-sm"
          style={{ background: "rgba(8,6,13,0.72)", color: "rgba(255,255,255,0.65)", backdropFilter: "blur(6px)" }}
        >
          {pad(current + 1)} / {pad(total)}
        </div>

        {/* Prev arrow */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="group absolute left-0 top-0 h-full z-10 flex items-center px-4"
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          <span
            className="flex items-center justify-center transition-all duration-200"
            style={{
              width: 40,
              height: 40,
              background: "rgba(8,6,13,0.55)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 2,
              backdropFilter: "blur(8px)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7L9 12" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>

        {/* Next arrow */}
        <button
          onClick={next}
          aria-label="Next"
          className="group absolute right-0 top-0 h-full z-10 flex items-center px-4"
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          <span
            className="flex items-center justify-center transition-all duration-200"
            style={{
              width: 40,
              height: 40,
              background: "rgba(8,6,13,0.55)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 2,
              backdropFilter: "blur(8px)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2L10 7L5 12" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i, i > current ? "left" : "right")}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? 24 : 6,
              height: 6,
              borderRadius: 3,
              background: i === current ? "var(--accent)" : "#d4d2d8",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "width 300ms cubic-bezier(0.76,0,0.24,1), background 200ms ease",
            }}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && createPortal(
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(8,6,13,0.92)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
            animation: "lb-in 220ms cubic-bezier(0.22,1,0.36,1) both",
          }}
        >
          <style>{`@keyframes lb-in{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}`}</style>
          {lightbox.type === "image" ? (
            <img
              src={lightbox.src}
              alt={lightbox.alt ?? ""}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "92vw",
                maxHeight: "90vh",
                objectFit: "contain",
                borderRadius: 2,
                boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
                cursor: "default",
              }}
            />
          ) : (
            <video
              src={lightbox.src}
              poster={lightbox.poster}
              controls
              autoPlay
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "92vw",
                maxHeight: "90vh",
                borderRadius: 2,
                boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
                background: "#000",
                cursor: "default",
              }}
            />
          )}
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            style={{
              position: "absolute",
              top: 20,
              right: 24,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 2,
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>,
        document.body
      )}
    </div>
  )
}
