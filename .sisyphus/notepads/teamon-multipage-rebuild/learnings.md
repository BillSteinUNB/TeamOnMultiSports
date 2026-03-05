# TeamOn MultiPage Rebuild - Learnings

## Wave 1: Foundation Setup

### Task 1: Create develop branch + install routing dependencies ✓

**Status**: COMPLETE

**What worked**:
- React Router v7 uses consolidated `react-router` package (NOT `react-router-dom`)
- Dependencies installed cleanly: react-router@7.13.1, react-helmet-async@3.0.0, @gsap/react@2.1.2
- Build passes with new dependencies (no breaking changes)
- Branch creation at specific commit works seamlessly

**Key versions**:
- react-router: 7.13.1 (consolidated package for v7)
- react-helmet-async: 3.0.0 (for SEO meta tag management)
- @gsap/react: 2.1.2 (provides useGSAP hook for animations)

**Development branch established**: `develop` created from `main` at d59fa12
- Commit: ed03df0
- Ready for multipage implementation

## Task 3: Router Structure Complete

### What was accomplished:
1. Created `src/layouts/RootLayout.tsx` with ScrollRestoration + ScrollTriggerRefresh component
2. Created 9 placeholder page files in `src/pages/`:
   - HomePage, AboutPage, CoachingPage, YouthPathwayPage, CampsPage
   - CoachMentorshipPage, ResultsPage, ApplyPage, NotFoundPage
3. Rewrote `src/main.tsx` to use `createBrowserRouter` (Data Mode) + `RouterProvider`
4. Deleted `src/App.tsx`
5. Build passes, dev server starts without errors

### Key Patterns:
- **React Router v7**: Import from `react-router` (not `react-router-dom`)
- **ScrollRestoration**: Used in RootLayout to restore scroll position on navigation
- **ScrollTriggerRefresh**: Custom component that calls `ScrollTrigger.refresh()` on route change
- **Data Mode**: `createBrowserRouter` enables enhanced data loading capabilities

### Files Changed:
- main.tsx: Rewrote with RouterProvider + createBrowserRouter
- layouts/RootLayout.tsx: New file with layout wrapper
- pages/*.tsx: 9 new placeholder page files
- App.tsx: Deleted

### Status:
✅ All verification passed:
- `npm run build` ✓
- `npm run dev` ✓ (starts in 269ms)
- LSP diagnostics: No errors


## T4 Card Components - Completed

### ProgramCard Component
- Displays program offerings with title, description, feature list, optional icon
- Props: `title`, `description`, `features` (string[]), `linkTo`, `linkLabel`, `icon`, `className`
- Uses Router `Link` for navigation instead of `<a>` tags
- Flex column layout with `flex-1` on description for responsive height
- CheckCircle icons from lucide-react for feature list
- `btn-primary` button styling from index.css
- Uses `.card-light` for consistent card styling

### CaseStudyCard Component
- Two variants: 'compact' (minimal) and 'full' (detailed)
- Props: `name`, `discipline`, `achievement`, `metrics`, `testimonialSnippet`, `image`, `variant`, `className`
- Compact variant: name, achievement, discipline tag only
- Full variant: adds image thumbnail, metrics grid (before/after), optional testimonial quote
- Trophy icon from lucide-react for achievement display
- `.feature-tag` class for discipline badge
- Metrics displayed in 2-column grid with before/after styling

### Key Patterns Used
- `cn()` utility for conditional class merging
- `.card-light` for consistent card styling with shadow and border
- `.font-display` (Bebas Neue) for headings
- `.font-mono-label` (IBM Plex Mono) for labels
- Brand color `#C41E3A` for accent elements
- Tailwind responsive classes for layout

### Build Verification
- `npm run build` passes ✓
- No TypeScript diagnostics ✓
- Ready for section integration


## Task 4: Reusable Components (PageHero, CTABanner, CredentialsList)

### Successfully Created Components

**1. PageHero** (`src/components/PageHero.tsx`)
- Standardized page header with title, optional subtitle, optional breadcrumb
- Uses `#F8F8F8` background with accent rule
- Full-width container with max-w-7xl inner constraint
- Responsive sizing: text-4xl → text-6xl
- Props: `title` (required), `subtitle`, `breadcrumb`, `className` (optional)

**2. CTABanner** (`src/components/CTABanner.tsx`)
- Full-width section with brand red background (#C41E3A)
- Variant-based button rendering: 'apply' | 'call' | 'both' (default)
- "Apply for Coaching" → Router Link to `/apply` (white btn on red)
- "Schedule a Strategy Call" → mailto link (outline btn with white border)
- Responsive flex layout: stacks on mobile, horizontal on tablet+
- Props: `variant`, `heading`, `subheading`, `className`

**3. CredentialsList** (`src/components/CredentialsList.tsx`)
- Co-located CREDENTIALS data array with 5 key qualifications
- Compact variant: horizontal row of feature tags
- Full variant: 2-column grid with white cards and descriptions
- Uses red mono-label for credential labels
- Props: `variant` ('compact' | 'full', default 'compact'), `className`

### Key Patterns Applied

- All use `cn()` utility from `@/lib/utils` for class merging
- All follow component naming (PascalCase) and export default
- All use existing custom CSS classes: `.font-display`, `.font-mono-label`, `.accent-rule`, `.feature-tag`
- React Router `Link` component for internal navigation (CTABanner)
- TypeScript interfaces for prop types
- Tailwind responsive prefixes (md:, lg:, sm:)

### Build Verification
- `npm run build` passes with 0 errors
- No TypeScript diagnostics on any of the three files
- Committed: 3 files, 119 insertions

### Design Consistency Maintained
- Spacing: py-16 md:py-24 for PageHero, py-16 md:py-20 for CTABanner
- Typography: Bebas Neue for display headings, IBM Plex Mono for labels
- Colors: Brand red (#C41E3A), light gray (#F8F8F8), dark text (#1A1A1A)
- Buttons: Existing `.btn-primary` and `.btn-outline` classes reused
