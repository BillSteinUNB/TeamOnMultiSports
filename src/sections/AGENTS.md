# Sections Knowledge Base

**Generated:** 2026-03-04  

## OVERVIEW
Page sections for the landing page. Each is a self-contained vertical section with GSAP animations.

## STRUCTURE
```
sections/
├── HeroSection.tsx        # Above-fold hero
├── PhilosophySection.tsx  # Coaching philosophy
├── ProgramsSection.tsx    # Program offerings
├── ResultsSection.tsx     # Athlete results
├── AboutSection.tsx       # About Coach Mike
└── ContactSection.tsx     # Contact form
```

## CONVENTIONS

**Section Pattern**
```tsx
export default function SectionName() {
  const sectionRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animations here
    }, sectionRef)
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={sectionRef} id="section-name" className="...">
      {/* Content */}
    </section>
  )
}
```

**Styling**
- Each section is full-width, min-height for vertical rhythm
- Use `id` attribute for scroll-to-section navigation
- Brand colors: `#C41E3A` (red), `#1A1A1A` (dark), `#FAFAFA` (light)

## WHERE TO LOOK

| Task | File | Notes |
|------|------|-------|
| Modify hero | `HeroSection.tsx` | Contains CTA buttons |
| Update programs | `ProgramsSection.tsx` | Grid layout |
| Change contact | `ContactSection.tsx` | Form handling |
| Reorder sections | `App.tsx` | Import order there |

## ANTI-PATTERNS

- Don't forget `ctx.revert()` cleanup
- Don't skip `id` attribute - needed for navigation
- Don't use inline styles

## NOTES

- Sections render in order defined in App.tsx
- Navigation uses scroll-to-section via element IDs
- GSAP ScrollTrigger animates on scroll
