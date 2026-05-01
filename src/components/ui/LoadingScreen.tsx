import * as React from "react"

const C_NAVY = "hsl(220, 90%, 10%)"
const C_CYAN = "hsl(195, 100%, 50%)"
const C_PALE = "hsl(200, 30%, 85%)"

const STAGES = [
  { from: 0,    label: "Initializing" },
  { from: 0.18, label: "Loading assets" },
  { from: 0.45, label: "Connecting" },
  { from: 0.72, label: "Rendering" },
  { from: 0.92, label: "Complete" },
]

function getStage(p: number) {
  return [...STAGES].reverse().find(s => p >= s.from)!
}

interface LoadingScreenProps {
  progress?: number
  autoPlay?: boolean
  duration?: number
  onComplete?: () => void
}

export default function LoadingScreen({
  progress: ext,
  autoPlay = true,
  duration = 2800,
  onComplete,
}: LoadingScreenProps) {
  const [auto, setAuto] = React.useState(0)
  const raf = React.useRef<number>()
  const t0  = React.useRef<number>()
  const progress = ext ?? auto

  React.useEffect(() => {
    if (!autoPlay || ext !== undefined) return
    const tick = (now: number) => {
      if (!t0.current) t0.current = now
      const t = Math.min((now - t0.current) / duration, 1)
      const p = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      setAuto(p)
      if (t < 1) raf.current = requestAnimationFrame(tick)
      else setTimeout(() => onComplete?.(), 500)
    }
    raf.current = requestAnimationFrame(tick)
    return () => { raf.current && cancelAnimationFrame(raf.current) }
  }, [autoPlay, ext, duration, onComplete])

  const pct   = Math.round(progress * 100)
  const stage = getStage(progress)

  return (
    <div
      role="status"
      aria-label="Loading"
      style={{
        display:       "flex",
        flexDirection: "column",
        alignItems:    "center",
        gap:           "28px",
      }}
    >
      {/* Gooey SVG filter */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="gooey-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation={12} result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 48 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <style>{`
        .gooey-wrap {
          width: 12em;
          height: 3em;
          position: relative;
          overflow: hidden;
          border-bottom: 8px solid ${C_PALE};
          filter: url(#gooey-filter);
          font-size: 16px;
        }
        .gooey-wrap::before,
        .gooey-wrap::after {
          content: '';
          position: absolute;
          border-radius: 50%;
        }
        .gooey-wrap::before {
          width: 22em;
          height: 18em;
          background-color: ${C_CYAN};
          left: -2em;
          bottom: -18em;
          animation: goo-wee1 2s linear infinite;
        }
        .gooey-wrap::after {
          width: 16em;
          height: 12em;
          background-color: ${C_NAVY};
          left: -4em;
          bottom: -12em;
          animation: goo-wee2 2s linear infinite 0.75s;
        }
        @keyframes goo-wee1 {
          0%   { transform: translateX(-10em) rotate(0deg); }
          100% { transform: translateX(7em) rotate(180deg); }
        }
        @keyframes goo-wee2 {
          0%   { transform: translateX(-8em) rotate(0deg); }
          100% { transform: translateX(8em) rotate(180deg); }
        }
      `}</style>

      <div className="gooey-wrap" />

      {/* Status */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        gap:            "24px",
        fontFamily:     "'Space Mono', monospace",
      }}>
        <div className="loading-dot" />
        <span style={{
          color:         C_NAVY,
          fontSize:      "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}>
          {stage.label}
        </span>
        <span style={{
          color:              C_NAVY,
          fontSize:           "10px",
          letterSpacing:      "0.1em",
          opacity:            0.4,
          fontVariantNumeric: "tabular-nums",
        }}>
          {pct}%
        </span>
      </div>
    </div>
  )
}
