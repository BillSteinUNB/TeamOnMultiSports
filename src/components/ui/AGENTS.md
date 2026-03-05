# UI Components Knowledge Base

**Generated:** 2026-03-04  

## OVERVIEW
53 shadcn/ui components built on Radix UI primitives with Tailwind CSS styling.

## STRUCTURE
All components follow the shadcn/ui pattern: Radix primitive + Tailwind + cva variants.

## CONVENTIONS

**File Pattern**
```tsx
import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const variants = cva("base-classes", {
  variants: { variant: { default: "..." } },
  defaultVariants: { variant: "default" }
})

export function Component({ className, variant, ...props }) {
  return <div className={cn(variants({ variant, className }))} {...props} />
}
```

**Key Dependencies**
- `@radix-ui/react-*` - Headless UI primitives
- `class-variance-authority` - Variant management
- `lucide-react` - Icons

## WHERE TO LOOK

| Task | Pattern | Example |
|------|---------|---------|
| Add new component | Copy existing pattern | `button.tsx` is cleanest |
| Update styles | Edit component file | Direct Tailwind classes |
| Add variant | Extend cva config | See button variants |

## ANTI-PATTERNS

- Don't import from barrel (`@/components/ui`)
- Don't inline styles - use Tailwind
- Don't skip `cn()` - handles class merging

## NOTES

- Components are client-side only (rsc: false)
- All use `data-slot` attributes for styling hooks
- Accessible by default (Radix handles a11y)
