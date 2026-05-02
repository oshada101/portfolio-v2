# oshada.dev — Personal Portfolio

Personal portfolio site for Oshada Bandara, live at [oshada.dev](https://oshada.dev).

## Stack

- **React 19** + **TypeScript**
- **Vite 8** — dev server & bundler
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **React Router v7** — client-side routing
- **@paper-design/shaders-react** — WebGL shader backgrounds
- **gh-pages** — GitHub Pages deployment

## Project Structure

```
src/
├── components/
│   ├── ContactSection.tsx   # Contact links with copy-to-clipboard
│   ├── MediaSlider.tsx      # Horizontal media/image slider
│   ├── Nav.tsx              # Top navigation bar
│   ├── ProjectsSlider.tsx   # Featured projects slider
│   └── ServicesSection.tsx  # Services/skills section
├── pages/
│   ├── AllProjectsPage.tsx  # Full project listing
│   ├── ContactPage.tsx      # Standalone contact page
│   └── ProjectPage.tsx      # Individual project detail
├── data/
│   └── projects.ts          # Project data
├── hooks/
│   └── useInView.ts         # Intersection observer hook for scroll reveals
└── App.tsx                  # Root with router setup
```

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Build and deploy to GitHub Pages |

## Deployment

Deployed to GitHub Pages via the `gh-pages` package. Push to `main`, then:

```bash
npm run deploy
```

The site is served from the `gh-pages` branch and mapped to the custom domain `oshada.dev` via a `CNAME` file in `dist/`.
