# TeamOnMultiSports Knowledge Base

**Generated:** 2026-03-04  
**Commit:** d59fa12  
**Branch:** main  

## OVERVIEW
React + TypeScript + Vite landing page for Coach Mike On's triathlon/run coaching business. Uses shadcn/ui component library with Radix UI primitives and Tailwind CSS.

## STRUCTURE
```
./
├── src/
│   ├── components/
│   │   ├── ui/          # 53 shadcn/ui components (buttons, forms, dialogs)
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── sections/        # Page sections (Hero, Programs, Contact, etc.)
│   ├── lib/
│   │   └── utils.ts     # cn() utility for tailwind class merging
│   └── hooks/
│       └── use-mobile.ts
├── public/images/       # Static assets
├── index.html           # Vite entry HTML
└── *.config.{js,ts}     # Build tooling configs
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add new page section | `src/sections/` | Export default function components |
| Modify site nav | `src/components/Navigation.tsx` | Uses scroll-to-section |
| Change global styles | `src/index.css` | CSS variables for theming |
| Add UI component | `src/components/ui/` | shadcn/ui pattern |
| Add animation | Section file + GSAP | Uses ScrollTrigger plugin |
| Update meta/branding | `src/App.tsx` | Section order here |

## CONVENTIONS

**Imports**
- Path aliases: `@/components`, `@/lib/utils`, `@/hooks`
- UI components: `import { Button } from "@/components/ui/button"`
- Icons: `import { IconName } from "lucide-react"`

**Styling**
- Tailwind CSS with custom CSS variables (HSL format)
- Custom classes in `src/index.css`: `.btn-primary`, `.feature-tag`, `.accent-rule`
- Color palette: `#C41E3A` (brand red), `#1A1A1A`, `#FAFAFA`

**Component Pattern**
```tsx
import { cn } from "@/lib/utils"

function Component({ className, ...props }) {
  return <div className={cn("base", className)} {...props} />
}
```

**Animation Pattern**
- GSAP with ScrollTrigger for scroll-based animations
- Use `useRef` + `useEffect` with cleanup
- Register plugin once: `gsap.registerPlugin(ScrollTrigger)`

## ANTI-PATTERNS

- Don't use inline styles; use Tailwind classes
- Don't import from `@/components/ui` barrel; import specific files
- Don't skip `cn()` utility for conditional classes
- Don't forget GSAP context cleanup in useEffect return

## COMMANDS

```bash
npm run dev        # Start dev server (Vite)
npm run build      # Production build
npm run lint       # ESLint check
npm run preview    # Preview production build
```

## NOTES

- No test suite configured
- No CI/CD pipelines
- Single-page application with scroll-to-section navigation
- Uses `kimi-plugin-inspect-react` dev tool
- `rsc: false` in components.json - not using React Server Components
