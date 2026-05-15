import React, { useMemo, useState } from "react"
import { useInView } from "../hooks/useInView"

// ─── Generative Visuals ───────────────────────────────────────────────────────

function NeuralMesh({ active }: { active: boolean }) {
  const { points, edges, tris } = useMemo(() => {
    let _s = 0
    const rng = () => { const x = Math.sin((_s++) * 7919 + 3571) * 233280; return x - Math.floor(x) }

    const outline: [number, number][] = [
      [162,300],[156,265],[163,230],[182,195],[210,167],
      [242,149],[280,141],[320,139],[360,143],[398,156],
      [430,178],[458,208],[480,246],[493,288],[493,333],
      [477,366],[456,388],[434,398],
      [414,406],[436,416],[463,426],[484,442],[468,462],
      [438,462],[410,452],[399,432],[412,410],
      [395,400],
      [366,418],[308,429],[248,422],[197,408],[167,383],[155,346],
    ]

    const inPoly = (px: number, py: number) => {
      let inside = false
      const n = outline.length
      for (let i = 0, j = n - 1; i < n; j = i++) {
        const [xi, yi] = outline[i], [xj, yj] = outline[j]
        if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) inside = !inside
      }
      return inside
    }

    const interior: [number, number][] = []
    for (let gx = 168; gx < 490; gx += 46) {
      for (let gy = 148; gy < 466; gy += 46) {
        if (inPoly(gx, gy)) interior.push([gx + (rng() - 0.5) * 18, gy + (rng() - 0.5) * 18])
      }
    }

    const pts = [...outline, ...interior]
    const edgeList: [number, number][] = []
    const adjSet = new Set<string>()
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i][0] - pts[j][0], dy = pts[i][1] - pts[j][1]
        if (dx * dx + dy * dy < 72 * 72) {
          edgeList.push([i, j])
          adjSet.add(i + '_' + j); adjSet.add(j + '_' + i)
        }
      }
    }

    const triList: [number, number, number][] = []
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (!adjSet.has(i + '_' + j)) continue
        for (let k = j + 1; k < pts.length; k++) {
          if (adjSet.has(j + '_' + k) && adjSet.has(i + '_' + k)) triList.push([i, j, k])
        }
      }
    }

    return { points: pts, edges: edgeList, tris: triList }
  }, [])

  const col = (mx: number, my: number) => {
    if (my < 195) return 'oklch(50% 0.28 338)'
    if (mx < 218 && my < 375) return 'oklch(52% 0.24 25)'
    if (my < 255) return 'oklch(46% 0.26 288)'
    if (my < 320) return 'oklch(48% 0.26 250)'
    if (my < 375) return 'oklch(50% 0.24 205)'
    if (mx > 418 && my > 395) return 'oklch(50% 0.22 120)'
    return 'oklch(50% 0.22 168)'
  }

  return (
    <svg viewBox="0 0 600 600" className="visual-svg" preserveAspectRatio="xMidYMid slice">
      {tris.map(([a, b, c], i) => {
        const [ax, ay] = points[a], [bx, by] = points[b], [cx2, cy2] = points[c]
        const mx = (ax + bx + cx2) / 3, my = (ay + by + cy2) / 3
        return <polygon key={i} points={`${ax},${ay} ${bx},${by} ${cx2},${cy2}`} fill={col(mx, my)} opacity="0.07" />
      })}
      {edges.map(([a, b], i) => {
        const [ax, ay] = points[a], [bx, by] = points[b]
        const mx = (ax + bx) / 2, my = (ay + by) / 2
        return <line key={i} x1={ax} y1={ay} x2={bx} y2={by} stroke={col(mx, my)} strokeWidth="0.85" opacity={active ? 0.88 : 0.68} />
      })}
      {points.map(([px, py], i) => (
        <circle key={i} cx={px} cy={py} r="1.6" fill={col(px, py)} opacity="0.9" />
      ))}
    </svg>
  )
}

function LayerStack(_: { active: boolean }) {
  return (
    <svg viewBox="0 0 600 600" className="visual-svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="svc-web-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(46% 0.20 222)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="oklch(46% 0.20 222)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="600" height="600" fill="url(#svc-web-grad)" />
      <g style={{ transformOrigin: '300px 300px', transform: 'rotateX(48deg) rotateZ(-22deg)' }}>
        {[0, 1, 2, 3, 4].map(i => (
          <g key={i}>
            <rect
              x={150 - i * 18} y={150 - i * 18} width={300 + i * 36} height={300 + i * 36} rx={20}
              fill="none" stroke={`oklch(${44 + i * 3}% ${0.18 - i * 0.02} 222)`}
              strokeWidth="1.8" opacity={0.82 - i * 0.1}
              style={{ animation: `svcWebPulse ${4 + i * 0.4}s ease-in-out ${i * 0.3}s infinite` }}
            />
            {i === 2 && (
              <g stroke="oklch(42% 0.17 222)" strokeWidth="1.2" opacity="0.92">
                <line x1={168} y1={208} x2={432} y2={208} />
                <line x1={168} y1={238} x2={380} y2={238} />
                <rect x={168} y={262} width={118} height={76} rx={6} fill="oklch(54% 0.16 222)" opacity="0.55" />
                <rect x={298} y={262} width={134} height={76} rx={6} fill="oklch(48% 0.18 222)" opacity="0.45" />
                <rect x={168} y={358} width={264} height={16} rx={4} fill="oklch(46% 0.14 222)" opacity="0.38" />
              </g>
            )}
          </g>
        ))}
      </g>
      <style>{`@keyframes svcWebPulse{0%,100%{opacity:0.72}50%{opacity:1}}`}</style>
    </svg>
  )
}

function IsoWindows(_: { active: boolean }) {
  const Win = ({ z, hue }: { z: number; hue: number }) => (
    <g style={{ transform: `translate(${z * 22}px,${-z * 32}px)`, transition: 'transform 0.7s ease' }}>
      <rect x={140} y={160} width={320} height={220} rx={10}
        fill={`oklch(${92 - z * 4}% 0.04 ${hue})`} stroke={`oklch(${54 - z * 3}% 0.14 ${hue})`} strokeWidth="1.3" />
      <rect x={140} y={160} width={320} height={26} rx={10} fill={`oklch(${78 - z * 6}% 0.10 ${hue})`} />
      <rect x={140} y={176} width={320} height={10} fill={`oklch(${78 - z * 6}% 0.10 ${hue})`} />
      <circle cx={156} cy={173} r="3.2" fill="oklch(58% 0.20 25)" />
      <circle cx={166} cy={173} r="3.2" fill="oklch(66% 0.20 80)" />
      <circle cx={176} cy={173} r="3.2" fill="oklch(56% 0.20 145)" />
      <rect x={158} y={204} width={70} height={6} rx={3} fill={`oklch(${50 - z * 3}% 0.12 ${hue})`} />
      <rect x={158} y={220} width={120} height={4} rx={2} fill={`oklch(${62 - z * 3}% 0.08 ${hue})`} />
      <rect x={158} y={232} width={90} height={4} rx={2} fill={`oklch(${62 - z * 3}% 0.08 ${hue})`} />
      <rect x={300} y={210} width={150} height={150} rx={6} fill={`oklch(${82 - z * 6}% 0.08 ${hue})`} />
      <rect x={158} y={250} width={130} height={110} rx={6} fill={`oklch(${86 - z * 5}% 0.05 ${hue})`} />
      <rect x={310} y={220} width={60} height={4} rx={2} fill={`oklch(48% 0.18 ${hue})`} />
      <rect x={310} y={232} width={80} height={3} rx={1.5} fill={`oklch(62% 0.12 ${hue})`} />
    </g>
  )
  return (
    <svg viewBox="0 0 600 600" className="visual-svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="svc-desk-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(46% 0.16 178)" stopOpacity="0.20" />
          <stop offset="100%" stopColor="oklch(46% 0.16 178)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="600" height="600" fill="url(#svc-desk-grad)" />
      <g style={{ transformOrigin: '300px 300px', transform: 'rotateX(55deg) rotateZ(-35deg) scale(0.95)' }}>
        <Win z={0} hue={178} /><Win z={1} hue={172} /><Win z={2} hue={185} />
      </g>
      <g stroke="oklch(50% 0.12 178)" strokeWidth="0.6" opacity="0.22">
        {Array.from({ length: 10 }).map((_, i) => <line key={i} x1={0} y1={400 + i * 22} x2={600} y2={400 + i * 22} />)}
      </g>
    </svg>
  )
}

function PhoneFrame(_: { active: boolean }) {
  const Phone = ({ z, hue }: { z: number; hue: number }) => (
    <g style={{ transform: `translate(${z * 20}px,${-z * 28}px)`, transition: 'transform 0.7s ease' }}>
      <rect x={220} y={110} width={160} height={280} rx={24}
        fill={`oklch(${91 - z * 4}% 0.05 ${hue})`} stroke={`oklch(${52 - z * 3}% 0.16 ${hue})`} strokeWidth="1.3" />
      <rect x={380} y={188} width={5} height={30} rx={2.5} fill={`oklch(${62 - z * 4}% 0.14 ${hue})`} />
      <rect x={215} y={178} width={5} height={22} rx={2.5} fill={`oklch(${62 - z * 4}% 0.14 ${hue})`} />
      <rect x={215} y={210} width={5} height={22} rx={2.5} fill={`oklch(${62 - z * 4}% 0.14 ${hue})`} />
      <rect x={230} y={138} width={140} height={224} rx={16} fill={`oklch(${82 - z * 6}% 0.08 ${hue})`} />
      <rect x={284} y={148} width={32} height={10} rx={5} fill={`oklch(${52 - z * 4}% 0.14 ${hue})`} />
      <rect x={275} y={350} width={50} height={4} rx={2} fill={`oklch(${56 - z * 4}% 0.12 ${hue})`} />
      {[0, 1, 2, 3].map(row => [0, 1, 2].map(col => (
        <rect key={`${row}-${col}`} x={238 + col * 38} y={176 + row * 46} width={28} height={28} rx={7}
          fill={`oklch(${60 + col * 5 - z * 4}% ${0.14 + col * 0.02} ${hue + col * 15})`} opacity={0.75} />
      )))}
      <rect x={238} y={156} width={20} height={4} rx={2} fill={`oklch(52% 0.12 ${hue})`} opacity="0.7" />
      <rect x={334} y={156} width={24} height={4} rx={2} fill={`oklch(52% 0.12 ${hue})`} opacity="0.7" />
    </g>
  )
  return (
    <svg viewBox="0 0 600 600" className="visual-svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="svc-mob-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(56% 0.20 32)" stopOpacity="0.20" />
          <stop offset="100%" stopColor="oklch(56% 0.20 32)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="600" height="600" fill="url(#svc-mob-grad)" />
      <g style={{ transformOrigin: '300px 300px', transform: 'rotateX(52deg) rotateZ(-32deg) scale(0.9)' }}>
        <Phone z={0} hue={32} /><Phone z={1} hue={28} /><Phone z={2} hue={36} />
      </g>
      <g stroke="oklch(52% 0.14 32)" strokeWidth="0.6" opacity="0.20">
        {Array.from({ length: 10 }).map((_, i) => <line key={i} x1={0} y1={400 + i * 22} x2={600} y2={400 + i * 22} />)}
      </g>
    </svg>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

type Visual = React.FC<{ active: boolean }>

interface Service {
  id: string
  title: string
  hue: number
  accent: string
  tags: string[]
  body: string
  Visual: Visual
  span: 'large' | 'tall' | 'wide'
  index: number
}

const SERVICES: Service[] = [
  {
    id: 'ai', title: 'AI / ML', hue: 282, accent: 'oklch(78% 0.18 282)', span: 'large', index: 0,
    tags: ['Machine Learning', 'LLMs', 'Data Pipelines', 'Computer Vision'],
    body: 'Custom-trained models, intelligent automation pipelines, and data-driven systems engineered for measurable real-world impact.',
    Visual: NeuralMesh,
  },
  {
    id: 'web', title: 'Web Development', hue: 222, accent: 'oklch(72% 0.18 222)', span: 'tall', index: 1,
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript'],
    body: 'Fast, accessible, production-grade web applications — from pixel-perfect UI to scalable, secure backend infrastructure.',
    Visual: LayerStack,
  },
  {
    id: 'desktop', title: 'Desktop Apps', hue: 178, accent: 'oklch(72% 0.16 178)', span: 'wide', index: 2,
    tags: ['Electron', 'Tauri', 'Cross-Platform', 'Native APIs'],
    body: 'Cross-platform desktop experiences that feel native — snappy, offline-capable, and deeply integrated with the operating system.',
    Visual: IsoWindows,
  },
  {
    id: 'mobile', title: 'Mobile Apps', hue: 32, accent: 'oklch(78% 0.18 32)', span: 'wide', index: 3,
    tags: ['React Native', 'iOS', 'Android', 'Expo'],
    body: 'iOS and Android apps that feel at home on-device — from rapid MVP to a polished, store-ready release.',
    Visual: PhoneFrame,
  },
]

// ─── Card ─────────────────────────────────────────────────────────────────────

function ServiceCard({ s }: { s: Service }) {
  const [ref, inView] = useInView()
  const [active, setActive] = useState(false)
  const Visual = s.Visual

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className={`svc-card svc-card--${s.span} svc-card--${s.id}${inView ? ' is-in' : ''}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      style={{ '--accent': s.accent, '--hue': s.hue, animationDelay: `${s.index * 90}ms` } as React.CSSProperties}
    >
      <div className="svc-visual" aria-hidden="true">
        <Visual active={active} />
        <div className="svc-visual-fade" />
      </div>

      <header className="svc-head">
        <span className="svc-idx">0{s.index + 1}</span>
        <h3 className="svc-title">{s.title}</h3>
      </header>

      <ul className="svc-tags">
        {s.tags.map(t => <li key={t}>{t}</li>)}
      </ul>

      <p className="svc-body">{s.body}</p>
    </article>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ServicesSection() {
  const [headerRef, headerInView] = useInView()

  return (
    <section
      id="services"
      className="relative overflow-hidden"
      style={{ background: '#fafaf6', padding: '140px 0 160px' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(14,11,58,0.055) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          zIndex: 0,
        }}
      />

      <div className="relative" style={{ zIndex: 2, maxWidth: '1340px', margin: '0 auto', padding: '0 48px' }}>
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`scroll-reveal${headerInView ? ' in-view' : ''}`}
          style={{ borderBottom: '1px solid rgba(14,11,58,0.10)', paddingBottom: '56px', marginBottom: '48px' }}
        >
          <p
            className="font-space-mono text-xs uppercase"
            style={{ color: '#8B5CF6', letterSpacing: '0.3em', display: 'block', marginBottom: '14px' }}
          >
            Expertise
          </p>
          <h2
            style={{
              fontFamily: "'Bricolage Grotesque', 'Montserrat Alternates', system-ui, sans-serif",
              fontSize: 'clamp(72px, 11vw, 160px)',
              fontWeight: 800,
              lineHeight: 0.90,
              letterSpacing: '-0.04em',
              margin: 0,
              color: '#0E0B3A',
            }}
          >
            Services
          </h2>
        </div>

        <div className="svc-bento">
          {SERVICES.map(s => <ServiceCard key={s.id} s={s} />)}
        </div>
      </div>
    </section>
  )
}
