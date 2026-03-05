# TeamON Multisports — Multi-Page SPA Rebuild

## TL;DR

> **Quick Summary**: Transform the existing single-page scroll landing site into a multi-page SPA with 9 homepage sections, 7 new page routes, rebuilt navigation with mobile support, and a multi-step Apply form. All work on `develop` branch with draft content where client info is unavailable.
> 
> **Deliverables**:
> - Restructured homepage with 9 sections (was 6)
> - 7 new page routes: About, Coaching, Youth Pathway, Camps, Coach Mentorship, Results, Apply
> - Rebuilt Navigation with mobile hamburger menu (shadcn Sheet)
> - Multi-step Apply form (react-hook-form + zod)
> - 5 reusable components: PageHero, CredentialsList, ProgramCard, CaseStudyCard, CTABanner
> - Updated Footer with page links
> - Per-page SEO meta tags
> - All on `develop` branch — `main` untouched
> 
> **Estimated Effort**: Large
> **Parallel Execution**: YES — 6 waves + final verification
> **Critical Path**: T1 (branch+deps) → T3 (router) → T8 (nav) → T10-T15 (homepage sections) → T16-T20 (content pages) → T21-T22 (results+apply) → T23-T25 (polish) → Final

---

## Context

### Original Request
Client provided a wireframe for restructuring TeamON Multisports from an individual endurance coach site to a "performance pathway architect" ecosystem. The wireframe defines messaging architecture, page structure, section content, and navigation hierarchy. User requested full implementation on a `develop` branch with draft content where real client data isn't available.

### Interview Summary
**Key Discussions**:
- Full codebase audit completed — every source file read and analyzed
- Client wireframe mapped against current site — gap analysis produced
- Technical approach agreed: React Router v7, RootLayout pattern, shadcn Sheet mobile nav
- Draft content strategy: use wireframe copy as starting point, mark sections needing client input
- Test strategy: No unit tests. QA via Playwright browser verification.

**Research Findings**:
- 53 shadcn/ui components installed but ZERO used — all available for new pages
- react-hook-form, zod, recharts installed but unused — ready for Apply page
- No mobile navigation exists (links are `hidden md:flex`)
- App.css is unused Vite boilerplate — safe to delete
- No tests, no CI/CD — nothing will break from restructuring

### Metis Review
**Identified Gaps** (addressed):
- React Router v7 uses `react-router` package (not `react-router-dom`) — `createBrowserRouter` + `RouterProvider` required for Data Mode (enables built-in `ScrollRestoration`)
- shadcn CSS variables need mapping to brand colors in `index.css` — without this, all 53 shadcn components render with wrong colors
- `vite.config.ts` `base: './'` must change to `base: '/'` for BrowserRouter direct URL access
- `scroll-behavior: smooth` in `index.css` causes sluggish route transitions — must be removed
- `ScrollTrigger.refresh()` needed on route changes to prevent misaligned GSAP triggers
- `gsap.registerPlugin(ScrollTrigger)` duplicated in 6 files — centralize to one
- No 404 route planned — added
- Homepage dual-nav behavior (scroll-within-page vs navigate-to-route) needs clear rules — defined in plan
- Form submission is frontend-only (no backend) — forms log to console / show success state
- HeroSection is the only section missing an `id` attribute — will be fixed
- `@gsap/react` provides `useGSAP` hook for auto-cleanup — recommended but optional (existing `ctx.revert()` pattern works)

---

## Work Objectives

### Core Objective
Convert TeamOnMultiSports from a single-page scroll site into a full multi-page SPA with React Router, restructured homepage, 7 new content pages, mobile navigation, and a multi-step coaching application form — all on a protected `develop` branch.

### Concrete Deliverables
- `develop` branch created from `main` at `d59fa12`
- `src/main.tsx` rewritten with `createBrowserRouter` + route definitions
- `src/layouts/RootLayout.tsx` — shared Nav + ScrollRestoration + Outlet + Footer
- `src/pages/HomePage.tsx` — 9 sections in order
- `src/pages/AboutPage.tsx`, `CoachingPage.tsx`, `YouthPathwayPage.tsx`, `CampsPage.tsx`, `CoachMentorshipPage.tsx`, `ResultsPage.tsx`, `ApplyPage.tsx`
- `src/pages/NotFoundPage.tsx` — 404 route
- `src/components/Navigation.tsx` — rebuilt with page links + mobile Sheet menu
- `src/components/Footer.tsx` — updated with Router Links
- `src/components/PageHero.tsx`, `CredentialsList.tsx`, `ProgramCard.tsx`, `CaseStudyCard.tsx`, `CTABanner.tsx`
- `src/sections/` — new and modified homepage sections
- `src/lib/gsap.ts` — centralized GSAP plugin registration

### Definition of Done
- [ ] `npm run build` passes with zero errors on `develop` branch
- [ ] All 8 routes render without console errors
- [ ] Navigation links work on desktop and mobile (Sheet hamburger menu)
- [ ] Homepage scroll-to-section works for all 9 sections
- [ ] Cross-page links navigate correctly
- [ ] Apply form validates all steps with zod
- [ ] All animations play on scroll (GSAP ScrollTrigger)
- [ ] `main` branch is completely untouched

### Must Have
- All work on `develop` branch — `main` untouched
- React Router v7 with `createBrowserRouter` (Data Mode)
- Mobile navigation via shadcn Sheet
- Multi-step Apply form with react-hook-form + zod validation
- ScrollRestoration on route changes
- ScrollTrigger.refresh() on route changes
- Draft content clearly marked where client input needed (use `{/* DRAFT: ... */}` comments or visible `[DRAFT]` badges)
- Brand colors preserved: `#C41E3A` (red), `#1A1A1A` (dark), `#FAFAFA` (light)
- Fonts preserved: Bebas Neue, IBM Plex Mono, Inter
- All existing images reused appropriately
- GSAP cleanup on component unmount (existing `ctx.revert()` pattern OR `useGSAP` hook)
- Consistent section IDs for all homepage sections
- Every page has a CTABanner at the bottom

### Must NOT Have (Guardrails)
- NO changes to `main` branch — all work on `develop`
- NO backend/API implementation — forms are frontend-only (console.log + success state)
- NO inline styles — Tailwind classes only
- NO barrel imports from `@/components/ui` — import specific files
- NO skipping `cn()` utility for conditional classes
- NO GSAP without cleanup (useEffect return must call `ctx.revert()`)
- NO new npm packages beyond `react-router` and optionally `react-helmet-async` and `@gsap/react` — everything else is already installed
- NO over-abstracting components — keep it practical, not enterprise-pattern
- NO placeholder "Lorem ipsum" text — use wireframe copy or realistic draft content
- NO removing existing working functionality — if current sections work, preserve their logic when refactoring
- NO premature optimization (code splitting, lazy loading) — keep it simple for now

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.
> Acceptance criteria requiring "user manually tests/confirms" are FORBIDDEN.

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: None
- **Framework**: None
- **Primary QA**: Agent-executed Playwright browser verification + build checks

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright (playwright skill) — Navigate, interact, assert DOM, screenshot
- **Build verification**: Use Bash — `npm run build`, check for errors
- **Navigation**: Use Playwright — Click links, verify URL changes, check content renders
- **Forms**: Use Playwright — Fill inputs, submit, verify validation errors and success states
- **Mobile**: Use Playwright with viewport override — Verify responsive layout, hamburger menu

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — branch, deps, config, scaffolding):
├── Task 1: Create develop branch + install dependencies [quick]
├── Task 2: Fix config files (vite.config, index.css) + centralize GSAP [quick]
├── Task 3: Create router structure (main.tsx, RootLayout, route defs) [quick]
├── Task 4: Create reusable components (PageHero, CTABanner, CredentialsList) [quick]
├── Task 5: Create ProgramCard + CaseStudyCard components [quick]

Wave 2 (Navigation + Homepage Shell):
├── Task 6: HomePage.tsx shell (imports all sections, orders them) [quick]
├── Task 7: NotFoundPage.tsx (404 route) [quick]
├── Task 8: Rebuild Navigation.tsx (page links + mobile Sheet) [visual-engineering]
├── Task 9: Update Footer.tsx (Router Links + page nav) [quick]

Wave 3 (Homepage Sections — MAX PARALLEL):
├── Task 10: Rewrite HeroSection (new headline, authority strip, CTAs) [visual-engineering]
├── Task 11: New CredibilityBar section (trust signals strip) [visual-engineering]
├── Task 12: New WhoWeServeSection (3 audience cards) [visual-engineering]
├── Task 13: New DifferentiationSection (3 pillars) [visual-engineering]
├── Task 14: Rewrite ProgramsSection (4 programs with Router links) [visual-engineering]
├── Task 15: Rewrite PhilosophySection (SDT framework) [visual-engineering]

Wave 4 (Content Pages — MAX PARALLEL):
├── Task 16: AboutPage (full bio, credentials, philosophy) [visual-engineering]
├── Task 17: CoachingPage (methodology, what you get, FAQs) [visual-engineering]
├── Task 18: YouthPathwayPage (LTAD development, pathways) [visual-engineering]
├── Task 19: CampsPage (training blocks, scheduling) [visual-engineering]
├── Task 20: CoachMentorshipPage (sport science, leadership) [visual-engineering]

Wave 5 (Results + Apply — these are the most complex pages):
├── Task 21: ResultsPage (case studies, athlete metrics) [visual-engineering]
├── Task 22: ApplyPage (multi-step form with react-hook-form + zod) [deep]

Wave 6 (Polish + Integration):
├── Task 23: Add react-helmet-async for per-page SEO meta [quick]
├── Task 24: Homepage section refinement (AboutSection short ver, ResultsSection short ver, CTASection) [visual-engineering]
├── Task 25: Mobile QA pass + responsive fixes [visual-engineering]

Wave FINAL (Verification — 4 parallel reviewers):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA via Playwright (unspecified-high)
├── Task F4: Scope fidelity check (deep)

Critical Path: T1 → T3 → T6 → T8 → T10-T15 → T16-T22 → T23-T25 → F1-F4
Parallel Speedup: ~65% faster than sequential
Max Concurrent: 6 (Waves 3 & 4)
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| T1 | — | T2-T25 | 1 |
| T2 | T1 | T3-T25 | 1 |
| T3 | T2 | T6-T9 | 1 |
| T4 | T1 | T10-T25 (uses PageHero, CTABanner) | 1 |
| T5 | T1 | T14, T21, T24 (uses ProgramCard, CaseStudyCard) | 1 |
| T6 | T3 | T10-T15 (sections mount here) | 2 |
| T7 | T3 | — | 2 |
| T8 | T3, T4 | — (standalone but needs routes) | 2 |
| T9 | T3 | — | 2 |
| T10-T15 | T4, T6 | T24 | 3 |
| T16-T20 | T3, T4 | — | 4 |
| T21 | T3, T4, T5 | — | 5 |
| T22 | T3 | — | 5 |
| T23 | T3 | — | 6 |
| T24 | T4, T5, T6, T10-T15 | — | 6 |
| T25 | T8, T10-T22 | — | 6 |

### Agent Dispatch Summary

| Wave | Tasks | Categories |
|------|-------|-----------|
| 1 | 5 | T1-T3 → `quick`, T4-T5 → `quick` |
| 2 | 4 | T6-T7 → `quick`, T8 → `visual-engineering`, T9 → `quick` |
| 3 | 6 | T10-T15 → `visual-engineering` |
| 4 | 5 | T16-T20 → `visual-engineering` |
| 5 | 2 | T21 → `visual-engineering`, T22 → `deep` |
| 6 | 3 | T23 → `quick`, T24 → `visual-engineering`, T25 → `visual-engineering` |
| FINAL | 4 | F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep` |

### Navigation Behavior Rules

These rules govern how navigation works across the site:

**On the Homepage:**
- Nav items for homepage sections (Hero, About, Programs, Results, Philosophy) → smooth scroll to section ID
- Nav items for separate pages (Coaching, Youth Pathway, Camps, Coach Mentorship, Apply) → Router navigate
- Logo → scroll to top

**On Subpages:**
- Nav items for homepage sections → Router navigate to `/#section-id`
- Nav items for separate pages → Router navigate to `/page`
- Logo → Router navigate to `/`

**Footer:**
- All links use Router `<Link>` components
- Quick Links section links to all pages
- Social links open in new tab

---

## TODOs


- [ ] 1. Create `develop` branch and install dependencies

  **What to do**:
  - Create `develop` branch from `main` at commit `d59fa12`
  - Run `npm install react-router` (v7 — consolidated package, NOT react-router-dom)
  - Run `npm install react-helmet-async` (for per-page SEO meta tags)
  - Optionally run `npm install @gsap/react` (provides `useGSAP` hook for auto-cleanup — recommended but existing `ctx.revert()` pattern also works)
  - Verify `npm run build` still passes after dependency installation
  - Verify `git branch` shows `develop` as current branch

  **Must NOT do**:
  - Do NOT install `react-router-dom` — it's deprecated in v7
  - Do NOT modify any source files yet — this task is ONLY branch creation + dependency installation
  - Do NOT touch `main` branch after creating `develop`

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple shell commands — branch creation and npm install
  - **Skills**: [`git-master`]
    - `git-master`: Branch creation requires git expertise
  - **Skills Evaluated but Omitted**:
    - `playwright`: No browser work needed
    - `frontend-ui-ux`: No UI work

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 1 — must run FIRST (all other tasks depend on this)
  - **Blocks**: T2, T3, T4, T5 (everything)
  - **Blocked By**: None

  **References**:
  - `package.json` — current dependency list, verify `react-router` is not already installed
  - `git log --oneline -1` — confirm starting point is `d59fa12`

  **Acceptance Criteria**:
  - [ ] `git branch --show-current` outputs `develop`
  - [ ] `git log main --oneline -1` still shows `d59fa12` (main untouched)
  - [ ] `node -e "require('./node_modules/react-router/package.json').version"` outputs v7.x
  - [ ] `npm run build` passes

  **QA Scenarios:**
  ```
  Scenario: Branch created correctly
    Tool: Bash
    Preconditions: On main branch at d59fa12
    Steps:
      1. Run `git branch --show-current` — expect output: `develop`
      2. Run `git log main --oneline -1` — expect output starts with `d59fa12`
      3. Run `git diff main` — expect empty (no changes yet)
    Expected Result: develop branch exists, main untouched
    Failure Indicators: git branch shows main, or main has new commits
    Evidence: .sisyphus/evidence/task-1-branch-created.txt

  Scenario: Dependencies installed
    Tool: Bash
    Preconditions: On develop branch
    Steps:
      1. Run `npm ls react-router` — expect react-router@7.x listed
      2. Run `npm ls react-helmet-async` — expect listed
      3. Run `npm run build` — expect exit code 0
    Expected Result: All deps installed, build passes
    Failure Indicators: npm ls shows missing, build fails
    Evidence: .sisyphus/evidence/task-1-deps-installed.txt
  ```

  **Commit**: YES
  - Message: `chore: create develop branch and install routing dependencies`
  - Files: `package.json`, `package-lock.json`
  - Pre-commit: `npm run build`

- [ ] 2. Fix config files, clean CSS, centralize GSAP registration

  **What to do**:
  - In `vite.config.ts`: Change `base: './'` to `base: '/'` — required for BrowserRouter to handle direct URL access (e.g., navigating directly to `/about`)
  - In `src/index.css`:
    - Remove `html { scroll-behavior: smooth; }` (causes sluggish route transitions — React Router's ScrollRestoration handles this)
    - Add shadcn CSS variable mappings to `:root` so the 53 installed shadcn components render with correct brand colors. Map the existing brand palette (`--red-primary: #C41E3A`, `--bg-primary: #FAFAFA`, etc.) to shadcn's expected variables (`--primary`, `--secondary`, `--background`, `--foreground`, `--accent`, `--muted`, `--card`, `--border`, `--input`, `--ring`, `--destructive`, `--popover` and their `-foreground` variants). Use HSL format as shadcn expects.
  - Create `src/lib/gsap.ts` — centralize GSAP plugin registration:
    ```typescript
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    gsap.registerPlugin(ScrollTrigger);
    export { gsap, ScrollTrigger };
    ```
  - Update all 6 section files to import `gsap` and `ScrollTrigger` from `@/lib/gsap` instead of directly from `gsap` and `gsap/ScrollTrigger` — remove their individual `gsap.registerPlugin(ScrollTrigger)` calls
  - Delete `src/App.css` (unused Vite boilerplate — contains `#root { max-width: 1280px }` that could cause layout conflicts)
  - Verify `npm run build` passes after all changes

  **Must NOT do**:
  - Do NOT change any section content/layout — only change import paths and remove registerPlugin calls
  - Do NOT modify brand colors or font declarations in index.css — only ADD shadcn variable mappings
  - Do NOT change any Tailwind utility classes

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Config edits and import path changes — straightforward mechanical work
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: No visual work, just config/imports

  **Parallelization**:
  - **Can Run In Parallel**: NO (T2 depends on T1, T3 depends on T2)
  - **Parallel Group**: Wave 1 — sequential after T1
  - **Blocks**: T3, T4, T5 and all subsequent tasks
  - **Blocked By**: T1 (need develop branch)

  **References**:
  - `vite.config.ts` — line with `base: './'` to change
  - `src/index.css:1-30` — root CSS variables section, and find `scroll-behavior: smooth` to remove
  - `src/sections/HeroSection.tsx` — example of current `gsap.registerPlugin(ScrollTrigger)` pattern to centralize
  - `src/sections/PhilosophySection.tsx`, `ProgramsSection.tsx`, `ResultsSection.tsx`, `AboutSection.tsx`, `ContactSection.tsx` — all have duplicate registerPlugin calls
  - `src/App.css` — file to delete (verify it contains only Vite boilerplate and nothing custom)
  - shadcn theming docs: CSS variables must be in HSL format in `:root` and `.dark` selectors. Required variables: `--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--destructive`, `--destructive-foreground`, `--border`, `--input`, `--ring`, `--radius`

  **Acceptance Criteria**:
  - [ ] `vite.config.ts` contains `base: '/'` (not `base: './'`)
  - [ ] `src/index.css` does NOT contain `scroll-behavior: smooth`
  - [ ] `src/index.css` contains shadcn CSS variables (`--primary`, `--background`, etc.) in `:root`
  - [ ] `src/lib/gsap.ts` exists and exports `gsap` and `ScrollTrigger`
  - [ ] No section file contains `gsap.registerPlugin` — all import from `@/lib/gsap`
  - [ ] `src/App.css` does not exist
  - [ ] `npm run build` passes

  **QA Scenarios:**
  ```
  Scenario: Config changes applied correctly
    Tool: Bash
    Preconditions: On develop branch, T1 complete
    Steps:
      1. Run `grep -c "base: '/'" vite.config.ts` — expect: 1
      2. Run `grep -c "scroll-behavior" src/index.css` — expect: 0
      3. Run `grep -c "\-\-primary" src/index.css` — expect: ≥1
      4. Run `test -f src/App.css && echo EXISTS || echo DELETED` — expect: DELETED
      5. Run `test -f src/lib/gsap.ts && echo EXISTS || echo MISSING` — expect: EXISTS
    Expected Result: All config changes verified
    Failure Indicators: Any grep count wrong, App.css still exists, gsap.ts missing
    Evidence: .sisyphus/evidence/task-2-config-verified.txt

  Scenario: GSAP centralized — no duplicate registrations
    Tool: Bash
    Preconditions: On develop branch, all section imports updated
    Steps:
      1. Run `grep -r "gsap.registerPlugin" src/sections/` — expect: no output (0 matches)
      2. Run `grep -r "from '@/lib/gsap'" src/sections/` — expect: 6 matches (one per section)
      3. Run `npm run build` — expect: exit code 0
    Expected Result: All sections import from centralized gsap.ts, build passes
    Failure Indicators: Any section still has registerPlugin, build fails
    Evidence: .sisyphus/evidence/task-2-gsap-centralized.txt
  ```

  **Commit**: YES
  - Message: `chore: fix vite config, clean up CSS, centralize GSAP registration`
  - Files: `vite.config.ts`, `src/index.css`, `src/lib/gsap.ts`, `src/sections/*.tsx`, `src/App.css` (deleted)
  - Pre-commit: `npm run build`

- [ ] 3. Create router structure (main.tsx, RootLayout, route definitions)

  **What to do**:
  - Create `src/layouts/RootLayout.tsx`:
    - Import `Outlet`, `ScrollRestoration`, `useLocation` from `react-router`
    - Import Navigation and Footer components
    - Create a `ScrollTriggerRefresh` internal component that calls `ScrollTrigger.refresh()` with 100ms delay whenever `location.pathname` changes (fixes GSAP trigger misalignment after route changes)
    - Render: Navigation → main wrapper → Outlet → Footer → ScrollRestoration → ScrollTriggerRefresh
  - Rewrite `src/main.tsx`:
    - Use `createBrowserRouter` from `react-router` (Data Mode — required for ScrollRestoration)
    - Define route tree: root layout wrapping all page routes
    - Routes: `/` (HomePage), `/about`, `/coaching`, `/youth-pathway`, `/camps`, `/coach-mentorship`, `/results`, `/apply`, `*` (NotFoundPage)
    - Use `RouterProvider` to render the router
    - Import GSAP registration from `@/lib/gsap` at the top level (ensures plugins registered once)
  - Create placeholder page files (minimal components that just render a `<div>Page Name</div>`) for ALL routes so the router compiles:
    - `src/pages/HomePage.tsx`, `AboutPage.tsx`, `CoachingPage.tsx`, `YouthPathwayPage.tsx`, `CampsPage.tsx`, `CoachMentorshipPage.tsx`, `ResultsPage.tsx`, `ApplyPage.tsx`, `NotFoundPage.tsx`
  - Rename/refactor `src/App.tsx` — its content (section imports + ordering) will move to `HomePage.tsx` in Task 6. For now, App.tsx can be deleted or emptied since main.tsx no longer imports it.
  - Verify `npm run dev` starts and all routes render their placeholder content

  **Must NOT do**:
  - Do NOT implement full page content yet — just placeholders
  - Do NOT use `<BrowserRouter>` component — use `createBrowserRouter` (Data Mode) for ScrollRestoration support
  - Do NOT import from `react-router-dom` — import from `react-router` (v7 consolidated package)
  - Do NOT add page content beyond a simple heading — that's for later tasks

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Scaffolding work — creating files with minimal content, routing setup
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: No visual design work

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on T2)
  - **Parallel Group**: Wave 1 — sequential after T2
  - **Blocks**: T6-T9 (Wave 2), and indirectly all page tasks
  - **Blocked By**: T2 (needs centralized GSAP, fixed config)

  **References**:
  - `src/main.tsx` — current entry point to rewrite (currently: StrictMode + createRoot + App)
  - `src/App.tsx` — current section ordering to eventually move to HomePage (Hero → Philosophy → Programs → Results → About → Contact)
  - `src/components/Navigation.tsx` — imported by RootLayout
  - `src/components/Footer.tsx` — imported by RootLayout
  - `src/lib/gsap.ts` — import in main.tsx to trigger plugin registration
  - React Router v7 docs: `createBrowserRouter` creates router in Data Mode. Import from `react-router`. `ScrollRestoration` component auto-restores scroll position on navigation. `Outlet` renders child routes.

  **Acceptance Criteria**:
  - [ ] `src/layouts/RootLayout.tsx` exists with Navigation, Outlet, Footer, ScrollRestoration, ScrollTriggerRefresh
  - [ ] `src/main.tsx` uses `createBrowserRouter` + `RouterProvider` (NOT `<BrowserRouter>`)
  - [ ] All 9 page files exist in `src/pages/`
  - [ ] `src/App.tsx` is deleted or emptied (no longer the entry component)
  - [ ] `npm run dev` starts without errors
  - [ ] Navigating to `/`, `/about`, `/coaching`, `/youth-pathway`, `/camps`, `/coach-mentorship`, `/results`, `/apply` all render without errors
  - [ ] Navigating to `/nonexistent` renders NotFoundPage

  **QA Scenarios:**
  ```
  Scenario: All routes render
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running on localhost:5173
    Steps:
      1. Navigate to http://localhost:5173/ — expect page renders without console errors
      2. Navigate to http://localhost:5173/about — expect heading text visible
      3. Navigate to http://localhost:5173/coaching — expect heading text visible
      4. Navigate to http://localhost:5173/youth-pathway — expect heading text visible
      5. Navigate to http://localhost:5173/camps — expect heading text visible
      6. Navigate to http://localhost:5173/coach-mentorship — expect heading text visible
      7. Navigate to http://localhost:5173/results — expect heading text visible
      8. Navigate to http://localhost:5173/apply — expect heading text visible
      9. Navigate to http://localhost:5173/nonexistent — expect 404 content visible
    Expected Result: All 9 routes render placeholder content, no JS errors in console
    Failure Indicators: Blank page, console errors, 404 on valid routes
    Evidence: .sisyphus/evidence/task-3-routes-render.png (screenshot of last route)

  Scenario: Navigation and Footer present on all pages
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/about
      2. Assert `nav` element exists on page
      3. Assert `footer` element exists on page
      4. Navigate to http://localhost:5173/apply
      5. Assert `nav` element exists on page
      6. Assert `footer` element exists on page
    Expected Result: Navigation and Footer render on every page via RootLayout
    Failure Indicators: Missing nav or footer on any route
    Evidence: .sisyphus/evidence/task-3-layout-present.png
  ```

  **Commit**: YES
  - Message: `feat(router): add React Router with layout and route definitions`
  - Files: `src/main.tsx`, `src/layouts/RootLayout.tsx`, `src/pages/*.tsx`, delete `src/App.tsx`
  - Pre-commit: `npm run build`

---

- [ ] 4. Create reusable components: PageHero, CTABanner, CredentialsList

  **What to do**:
  - Create `src/components/PageHero.tsx` — standardized page header component:
    - Props: `title` (string), `subtitle` (string, optional), `breadcrumb` (string, optional — e.g., "Home / About")
    - Renders a full-width banner with brand styling: large Bebas Neue heading, optional subtitle in Inter, accent rule underneath
    - Background uses `--bg-secondary` (#F8F8F8) or a subtle gradient
    - Use `cn()` for conditional classes
    - Used on: AboutPage, CoachingPage, YouthPathwayPage, CampsPage, CoachMentorshipPage, ResultsPage, ApplyPage
  - Create `src/components/CTABanner.tsx` — conversion banner for bottom of every page:
    - Props: `variant` ('apply' | 'call' | 'both', default 'both'), `heading` (string, optional, default "Ready to Elevate Your Performance?"), `subheading` (string, optional)
    - Renders a full-width section with brand red background (#C41E3A), white text, 1-2 CTA buttons
    - "Apply for Coaching" button links to `/apply` (Router Link)
    - "Schedule a Strategy Call" button links to `mailto:coachmikeon@gmail.com` or a booking URL (use mailto for now)
    - Use `cn()` for variant styling
  - Create `src/components/CredentialsList.tsx` — Mike's credentials display:
    - Props: `variant` ('compact' | 'full', default 'compact')
    - Compact: horizontal row of key credentials (for homepage AboutSection)
    - Full: detailed list with descriptions (for AboutPage)
    - Credentials data: CSEP-CEP, NCCP Competition Development, Triathlon Canada HP Coach, 7× Kona Qualifier Coach, Exercise Physiology Researcher
    - Import credential data from a `const` array at the top of the file (no separate data file needed)

  **Must NOT do**:
  - Do NOT over-abstract — these are simple presentational components, not complex stateful ones
  - Do NOT add GSAP animations to these components — animations are handled by the parent sections/pages
  - Do NOT create a separate data/constants file — keep credential data co-located in CredentialsList.tsx

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Three small presentational components with no complex logic
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: These are visual components that need to match the brand design system
  - **Skills Evaluated but Omitted**:
    - `playwright`: No browser verification needed at this stage

  **Parallelization**:
  - **Can Run In Parallel**: YES — can run parallel with T5 (both depend only on T1)
  - **Parallel Group**: Wave 1 (with T5)
  - **Blocks**: T8 (nav uses PageHero indirectly), T10-T15 (homepage sections use CTABanner), T16-T20 (pages use PageHero + CTABanner + CredentialsList)
  - **Blocked By**: T1 (need develop branch)

  **References**:
  - `src/sections/AboutSection.tsx:68-87` — current credentials display pattern (4 items with label + description)
  - `src/sections/HeroSection.tsx:35-55` — CTA button styling pattern (`.btn-primary`, `.btn-outline` classes)
  - `src/index.css` — custom classes to use: `.btn-primary`, `.btn-outline`, `.accent-rule`, `.font-display`, `.font-mono-label`, `.text-section`, `.section-spacing`
  - `src/lib/utils.ts` — `cn()` utility for conditional class merging
  - Brand colors: `#C41E3A` (red for CTABanner background), `#FAFAFA` (light background for PageHero), `#1A1A1A` (headings)

  **Acceptance Criteria**:
  - [ ] `src/components/PageHero.tsx` exists and exports a default function component
  - [ ] `src/components/CTABanner.tsx` exists with `variant`, `heading`, `subheading` props
  - [ ] `src/components/CredentialsList.tsx` exists with `variant` prop ('compact' | 'full')
  - [ ] All three components use `cn()` from `@/lib/utils`
  - [ ] CTABanner uses Router `Link` for the Apply button (import from `react-router`)
  - [ ] `npm run build` passes (no TypeScript errors)

  **QA Scenarios:**
  ```
  Scenario: Components compile and export correctly
    Tool: Bash
    Preconditions: On develop branch, T1 complete
    Steps:
      1. Run `npm run build` — expect exit code 0
      2. Run `grep -c "export default\|export function" src/components/PageHero.tsx` — expect: ≥1
      3. Run `grep -c "export default\|export function" src/components/CTABanner.tsx` — expect: ≥1
      4. Run `grep -c "export default\|export function" src/components/CredentialsList.tsx` — expect: ≥1
    Expected Result: All components export and project builds
    Failure Indicators: Build fails, missing exports
    Evidence: .sisyphus/evidence/task-4-components-compile.txt

  Scenario: CTABanner uses Router Link (not anchor tag) for Apply
    Tool: Bash
    Preconditions: CTABanner.tsx created
    Steps:
      1. Run `grep -c "from 'react-router'\|from \"react-router\"" src/components/CTABanner.tsx` — expect: ≥1
      2. Run `grep -c "<Link" src/components/CTABanner.tsx` — expect: ≥1
      3. Run `grep -c "<a " src/components/CTABanner.tsx` — expect: 0 or only for mailto links
    Expected Result: Router Link used for internal navigation
    Failure Indicators: Using <a> tags for /apply route
    Evidence: .sisyphus/evidence/task-4-cta-router-link.txt
  ```

  **Commit**: YES (groups with T5)
  - Message: `feat(components): add reusable PageHero, CTABanner, and card components`
  - Files: `src/components/PageHero.tsx`, `src/components/CTABanner.tsx`, `src/components/CredentialsList.tsx`
  - Pre-commit: `npm run build`

- [ ] 5. Create reusable card components: ProgramCard, CaseStudyCard

  **What to do**:
  - Create `src/components/ProgramCard.tsx` — program display card:
    - Props: `title` (string), `description` (string), `features` (string[]), `linkTo` (string — Router path), `linkLabel` (string, default "Learn More"), `icon` (ReactNode, optional — lucide icon)
    - Renders a card with: icon area, title (Bebas Neue), description (Inter), feature list with checkmarks, CTA link button
    - Uses `.card-light` class from index.css for base styling
    - Link button uses Router `Link` component
    - Used on: ProgramsSection (homepage), CoachingPage
  - Create `src/components/CaseStudyCard.tsx` — athlete results card:
    - Props: `name` (string), `discipline` (string — e.g., "Marathon", "Triathlon"), `achievement` (string — e.g., "Sub-3:00 Marathon"), `metrics` (object with before/after or key stats), `testimonialSnippet` (string, optional), `image` (string, optional — photo path)
    - Renders a card with: athlete name, discipline tag (`.feature-tag` class), achievement headline, metrics display, optional quote
    - Used on: ResultsSection (homepage — compact), ResultsPage (full)
    - Has a `variant` prop ('compact' | 'full') — compact shows name + achievement + discipline, full adds metrics + testimonial

  **Must NOT do**:
  - Do NOT add GSAP animations — parent handles animation
  - Do NOT fetch data — all data passed via props
  - Do NOT create complex state — pure presentational components

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Two presentational card components with clear prop interfaces
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Visual card design needs to match brand system
  - **Skills Evaluated but Omitted**:
    - `playwright`: No browser testing at this stage

  **Parallelization**:
  - **Can Run In Parallel**: YES — parallel with T4 (both depend only on T1)
  - **Parallel Group**: Wave 1 (with T4)
  - **Blocks**: T14 (ProgramsSection uses ProgramCard), T21 (ResultsPage uses CaseStudyCard), T24 (ResultsSection short uses CaseStudyCard)
  - **Blocked By**: T1 (need develop branch)

  **References**:
  - `src/sections/ProgramsSection.tsx:34-85` — current program card pattern (3 hardcoded cards with title, features list, description)
  - `src/sections/ResultsSection.tsx:42-82` — current stat cards + testimonial pattern
  - `src/index.css` — `.card-light`, `.feature-tag`, `.btn-primary`, `.accent-rule` classes
  - `src/lib/utils.ts` — `cn()` utility
  - `lucide-react` — already installed, use for card icons (CheckCircle for features, Trophy for achievements, etc.)

  **Acceptance Criteria**:
  - [ ] `src/components/ProgramCard.tsx` exists with `title`, `description`, `features`, `linkTo` props
  - [ ] `src/components/CaseStudyCard.tsx` exists with `name`, `discipline`, `achievement`, `metrics`, `variant` props
  - [ ] ProgramCard uses Router `Link` for navigation
  - [ ] CaseStudyCard has 'compact' and 'full' variants
  - [ ] Both use `cn()` from `@/lib/utils`
  - [ ] `npm run build` passes

  **QA Scenarios:**
  ```
  Scenario: Card components compile and have correct prop types
    Tool: Bash
    Preconditions: On develop branch
    Steps:
      1. Run `npm run build` — expect exit code 0
      2. Run `npx tsc --noEmit` — expect exit code 0 (no type errors)
      3. Run `grep -c "linkTo" src/components/ProgramCard.tsx` — expect: ≥1
      4. Run `grep -c "variant" src/components/CaseStudyCard.tsx` — expect: ≥1
    Expected Result: Both card components compile with correct prop interfaces
    Failure Indicators: Type errors, missing props
    Evidence: .sisyphus/evidence/task-5-cards-compile.txt
  ```

  **Commit**: YES (groups with T4)
  - Message: `feat(components): add reusable PageHero, CTABanner, and card components`
  - Files: `src/components/ProgramCard.tsx`, `src/components/CaseStudyCard.tsx`
  - Pre-commit: `npm run build`

- [ ] 6. Create HomePage shell

  **What to do**:
  - Create `src/pages/HomePage.tsx` (replace the placeholder from T3):
    - Import all homepage section components in order: HeroSection, CredibilityBar, WhoWeServeSection, DifferentiationSection, AboutSection, ProgramsSection, ResultsSection, PhilosophySection, CTASection
    - For sections not yet built (CredibilityBar, WhoWeServeSection, DifferentiationSection, CTASection), create minimal placeholder components in `src/sections/` that render a `<section id="section-name"><h2>Section Name</h2><p>Coming soon</p></section>`
    - Render all 9 sections in order inside a `<main>` wrapper
    - Ensure each section has a unique `id` attribute for scroll-to-section navigation
    - Section IDs: `hero`, `credibility`, `who-we-serve`, `differentiation`, `about`, `programs`, `results`, `philosophy`, `cta`
    - Add `id="hero"` to HeroSection (currently missing — it's the only section without an id)

  **Must NOT do**:
  - Do NOT implement full section content yet — new sections are placeholders
  - Do NOT change existing section content — just import and arrange them
  - Do NOT remove existing section IDs

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Importing components and creating minimal placeholders
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T7, T8, T9 — all depend on T3)
  - **Parallel Group**: Wave 2
  - **Blocks**: T10-T15 (sections mount in HomePage)
  - **Blocked By**: T3 (needs router)

  **References**:
  - `src/App.tsx` — current section ordering: Hero → Philosophy → Programs → Results → About → Contact. New order per wireframe: Hero → Credibility → WhoWeServe → Differentiation → About → Programs → Results → Philosophy → CTA
  - `src/sections/HeroSection.tsx` — note: missing `id` attribute (line ~37, the outer div has no id)
  - `src/sections/AboutSection.tsx` — has `id="about"`
  - `src/sections/ProgramsSection.tsx` — has `id="programs"`
  - `src/sections/ResultsSection.tsx` — has `id="results"`
  - `src/sections/PhilosophySection.tsx` — has `id="philosophy"`

  **Acceptance Criteria**:
  - [ ] `src/pages/HomePage.tsx` imports and renders 9 sections in correct order
  - [ ] Placeholder sections exist for: CredibilityBar, WhoWeServeSection, DifferentiationSection, CTASection
  - [ ] HeroSection has `id="hero"` attribute
  - [ ] All 9 sections have unique `id` attributes
  - [ ] `npm run build` passes

  **QA Scenarios:**
  ```
  Scenario: Homepage renders all 9 sections in order
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/
      2. Assert `#hero` element exists on page
      3. Assert `#credibility` element exists
      4. Assert `#who-we-serve` element exists
      5. Assert `#differentiation` element exists
      6. Assert `#about` element exists
      7. Assert `#programs` element exists
      8. Assert `#results` element exists
      9. Assert `#philosophy` element exists
      10. Assert `#cta` element exists
      11. Verify `#hero` appears before `#credibility` in DOM (correct ordering)
    Expected Result: All 9 sections present in correct order
    Failure Indicators: Missing section IDs, wrong order, console errors
    Evidence: .sisyphus/evidence/task-6-homepage-sections.png
  ```

  **Commit**: YES (groups with T7)
  - Message: `feat(pages): add HomePage shell and 404 page`
  - Files: `src/pages/HomePage.tsx`, `src/pages/NotFoundPage.tsx`, `src/sections/CredibilityBar.tsx`, `src/sections/WhoWeServeSection.tsx`, `src/sections/DifferentiationSection.tsx`, `src/sections/CTASection.tsx`
  - Pre-commit: `npm run build`

- [ ] 7. Create NotFoundPage (404)

  **What to do**:
  - Replace the placeholder `src/pages/NotFoundPage.tsx` with a proper 404 page:
    - Large "404" heading in Bebas Neue
    - Friendly message: "Page not found. Let’s get you back on track."
    - Router `Link` button to go back to homepage (`/`)
    - Clean, centered layout matching brand styling
    - No GSAP animations needed (simple static page)

  **Must NOT do**:
  - Do NOT add complex animations or interactions
  - Do NOT add navigation breadcrumbs

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single static page with minimal content
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T6, T8, T9)
  - **Parallel Group**: Wave 2
  - **Blocks**: None (standalone)
  - **Blocked By**: T3 (needs router for Link component)

  **References**:
  - `src/index.css` — `.font-display` (Bebas Neue), `.btn-primary`, `.section-spacing`
  - `src/lib/utils.ts` — `cn()`

  **Acceptance Criteria**:
  - [ ] `src/pages/NotFoundPage.tsx` renders 404 heading and link to home
  - [ ] Link uses Router `<Link to="/">` not `<a href>`
  - [ ] Page matches brand styling (fonts, colors)

  **QA Scenarios:**
  ```
  Scenario: 404 page renders correctly
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/this-page-does-not-exist
      2. Assert text "404" is visible on page
      3. Assert a link element with href="/" exists
      4. Click the home link
      5. Assert URL is now http://localhost:5173/
    Expected Result: 404 page shows, home link works
    Failure Indicators: Blank page, no home link, broken navigation
    Evidence: .sisyphus/evidence/task-7-404-page.png
  ```

  **Commit**: YES (groups with T6)
  - Message: `feat(pages): add HomePage shell and 404 page`
  - Files: `src/pages/NotFoundPage.tsx`
  - Pre-commit: `npm run build`

- [ ] 8. Rebuild Navigation with mobile hamburger menu

  **What to do**:
  - Rewrite `src/components/Navigation.tsx` completely:
    - **Desktop nav** (md+ breakpoint):
      - Logo/brand ("TEAM ON" or "TeamON") links to `/` via Router Link
      - Page links: HOME | ABOUT | COACHING | YOUTH PATHWAY | CAMPS | COACH MENTORSHIP | RESULTS
      - Each link uses Router `<Link>` or `<NavLink>` with active state styling
      - "APPLY" CTA button (styled differently from nav links — uses `.btn-primary` or brand red background)
      - Keep existing scroll-aware transparency behavior (transparent at top, white bg on scroll)
    - **Mobile nav** (below md breakpoint):
      - Logo on left
      - Hamburger icon button on right (use lucide `Menu` icon)
      - Clicking hamburger opens shadcn `Sheet` component (slides from right)
      - Sheet contains all page links stacked vertically + APPLY button at bottom
      - Clicking any link closes the Sheet and navigates
      - Sheet also has a close button (X icon)
    - **Smart linking behavior** (see Navigation Behavior Rules in Execution Strategy):
      - On homepage: links to homepage sections (About, Programs, Results, Philosophy) scroll to section ID
      - On subpages: those same links navigate to `/#section-id`
      - Links to separate pages always use Router navigate
      - Use `useLocation` to detect current page
    - Preserve fixed positioning (`fixed top-0 w-full z-50`)

  **Must NOT do**:
  - Do NOT remove the scroll-aware transparency behavior
  - Do NOT use a custom mobile menu implementation — use shadcn `Sheet`
  - Do NOT hardcode nav items — define them in an array and map over them

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Complex responsive navigation with animations, mobile Sheet interaction, scroll-aware behavior
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Navigation is the primary UX component — needs careful responsive design
  - **Skills Evaluated but Omitted**:
    - `playwright`: Testing is separate (T25 mobile QA)

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T6, T7, T9)
  - **Parallel Group**: Wave 2
  - **Blocks**: T25 (mobile QA depends on nav working)
  - **Blocked By**: T3 (needs router), T4 (may use PageHero indirectly through pages)

  **References**:
  - `src/components/Navigation.tsx` — ENTIRE FILE — current implementation to understand and rebuild. Key patterns: `isScrolled` state, `scrollToSection` function, fixed positioning, `hidden md:flex` for desktop links
  - `src/components/ui/sheet.tsx` — shadcn Sheet component for mobile menu. Uses `Sheet`, `SheetTrigger`, `SheetContent`, `SheetClose` exports
  - `src/index.css` — `.nav-link` class for styling, `.btn-primary` for APPLY button
  - Navigation Behavior Rules in this plan's Execution Strategy section — smart linking logic
  - `lucide-react` — `Menu` icon for hamburger, `X` icon for close (or use SheetClose)

  **Acceptance Criteria**:
  - [ ] Desktop: All page links visible at md+ breakpoint
  - [ ] Desktop: Logo links to `/`
  - [ ] Desktop: APPLY button styled as CTA (not regular nav link)
  - [ ] Desktop: Active page link has distinct styling
  - [ ] Desktop: Scroll-aware transparency preserved (transparent at top, solid on scroll)
  - [ ] Mobile: Hamburger icon visible below md breakpoint
  - [ ] Mobile: Sheet opens on hamburger click with all links
  - [ ] Mobile: Clicking a link closes Sheet and navigates
  - [ ] Smart linking: On homepage, "About" scrolls to #about; on /coaching, "About" navigates to /#about
  - [ ] `npm run build` passes

  **QA Scenarios:**
  ```
  Scenario: Desktop navigation works
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running, viewport 1280x720
    Steps:
      1. Navigate to http://localhost:5173/
      2. Assert nav element contains links: HOME, ABOUT, COACHING, YOUTH PATHWAY, CAMPS, COACH MENTORSHIP, RESULTS, APPLY
      3. Click "ABOUT" link while on homepage — expect smooth scroll to #about section (URL stays /)
      4. Click "COACHING" link — expect navigation to /coaching (URL changes)
      5. On /coaching page, click "ABOUT" link — expect navigation to /#about
      6. Click logo — expect navigation to /
      7. Click "APPLY" button — expect navigation to /apply
    Expected Result: All navigation paths work correctly with smart linking
    Failure Indicators: Broken links, wrong URLs, no scroll behavior
    Evidence: .sisyphus/evidence/task-8-desktop-nav.png

  Scenario: Mobile hamburger menu works
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running, viewport 375x812 (iPhone)
    Steps:
      1. Navigate to http://localhost:5173/
      2. Assert hamburger menu icon is visible (Menu icon button)
      3. Assert desktop nav links are NOT visible
      4. Click hamburger icon — expect Sheet slides open from right
      5. Assert all nav links are visible in Sheet
      6. Click "COACHING" link in Sheet — expect Sheet closes AND navigates to /coaching
      7. Assert URL is /coaching and page content renders
    Expected Result: Mobile Sheet nav opens, links work, closes on navigation
    Failure Indicators: Sheet doesn't open, links don't close Sheet, navigation fails
    Evidence: .sisyphus/evidence/task-8-mobile-nav.png

  Scenario: Scroll-aware transparency on desktop
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running, viewport 1280x720, on homepage
    Steps:
      1. Navigate to http://localhost:5173/
      2. Assert nav background is transparent (at top of page)
      3. Scroll down 200px
      4. Assert nav background has changed (white/solid)
    Expected Result: Nav transitions from transparent to solid on scroll
    Failure Indicators: Nav always solid or always transparent
    Evidence: .sisyphus/evidence/task-8-scroll-nav.png
  ```

  **Commit**: YES
  - Message: `feat(nav): rebuild navigation with mobile menu and page routing`
  - Files: `src/components/Navigation.tsx`
  - Pre-commit: `npm run build`

- [ ] 9. Update Footer with Router Links

  **What to do**:
  - Update `src/components/Footer.tsx`:
    - Replace all `scrollToSection()` button calls with Router `<Link>` components
    - Quick Links section: link to all 8 pages (Home, About, Coaching, Youth Pathway, Camps, Coach Mentorship, Results, Apply)
    - Keep social media links as external `<a>` tags with `target="_blank"` and `rel="noopener noreferrer"`
    - Keep contact info section (email, phone, location)
    - Update copyright year if needed
    - Preserve overall layout and styling

  **Must NOT do**:
  - Do NOT change the footer layout/design — only swap scroll buttons for Router Links
  - Do NOT remove social media links or contact info
  - Do NOT add new sections to the footer

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Straightforward find-and-replace of button elements with Link components
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T6, T7, T8)
  - **Parallel Group**: Wave 2
  - **Blocks**: None (standalone)
  - **Blocked By**: T3 (needs router for Link component)

  **References**:
  - `src/components/Footer.tsx` — ENTIRE FILE — current implementation. Lines 33-50 have the Quick Links section with `scrollToSection` buttons to replace. Lines 52-75 have social links (keep as-is). Lines 77-90 have contact info (keep as-is).
  - `react-router` — import `Link` from `react-router`

  **Acceptance Criteria**:
  - [ ] No `scrollToSection` calls remain in Footer
  - [ ] All Quick Links use Router `<Link>` components
  - [ ] Social links still use `<a>` with `target="_blank"`
  - [ ] Contact info preserved (email, phone, location)
  - [ ] `npm run build` passes

  **QA Scenarios:**
  ```
  Scenario: Footer links navigate correctly
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/
      2. Scroll to footer
      3. Click "About" link in footer Quick Links — expect URL changes to /about or /#about
      4. Click "Apply" link — expect URL changes to /apply
      5. Verify Instagram link opens in new tab (target="_blank")
    Expected Result: Footer links use Router navigation, external links open new tab
    Failure Indicators: scroll-to-section behavior instead of navigation, external links same tab
    Evidence: .sisyphus/evidence/task-9-footer-links.png
  ```

  **Commit**: YES (groups with T8)
  - Message: `feat(nav): rebuild navigation with mobile menu and update footer`
  - Files: `src/components/Footer.tsx`
  - Pre-commit: `npm run build`

- [ ] 10. Rewrite HeroSection (new headline, authority strip, CTAs)

  **What to do**:
  - Rewrite `src/sections/HeroSection.tsx` per wireframe:
    - Add `id="hero"` to the section wrapper (currently missing)
    - New headline: "Developing Athletes. Designing Pathways." (Bebas Neue, `.text-hero` class)
    - Subheadline: "Science-backed endurance coaching for athletes who want to be developed — not just trained." (Inter)
    - Authority strip: a horizontal row of key credentials below the headline (e.g., "CSEP-CEP | 20+ Years | 7× Kona Qualifier Coach | NCCP Competition Development")
    - Two CTA buttons:
      - Primary: "Apply for Coaching" → Router Link to `/apply`
      - Secondary: "Explore Programs" → scroll to `#programs` section (or Router Link to `/#programs` if on subpage)
    - Keep the headshot image (`/images/MikeProfessionalHeadshot.jpg`) but allow layout to flex — image on right, text on left (desktop) or stacked (mobile)
    - Preserve GSAP entrance animation but update selectors for new elements
    - Import gsap from `@/lib/gsap` (centralized)
    - Mark any content that needs client review with `{/* DRAFT CONTENT */}` comment

  **Must NOT do**:
  - Do NOT remove the headshot image
  - Do NOT skip GSAP animation — update it for new layout
  - Do NOT import gsap directly — use `@/lib/gsap`

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Hero is the most visually impactful section — needs careful layout, typography, and animation
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Visual design expertise for the hero section
  - **Skills Evaluated but Omitted**:
    - `playwright`: Testing done in final QA

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T11-T15 — all homepage sections)
  - **Parallel Group**: Wave 3
  - **Blocks**: T25 (mobile QA)
  - **Blocked By**: T4 (may use CTABanner pattern), T6 (mounts in HomePage)

  **References**:
  - `src/sections/HeroSection.tsx` — ENTIRE FILE (104 lines) — current implementation to rewrite. Key patterns: GSAP useRef + useEffect with ctx.revert(), `.text-hero` class for headline, two CTA buttons with `.btn-primary` and `.btn-outline`, headshot image
  - `src/index.css` — `.text-hero`, `.font-display`, `.font-mono-label`, `.btn-primary`, `.btn-outline`, `.accent-rule` classes
  - `src/lib/gsap.ts` — import gsap and ScrollTrigger from here
  - Client wireframe hero section: headline "Developing Athletes. Designing Pathways.", authority strip with credentials, reframed CTAs
  - `public/images/MikeProfessionalHeadshot.jpg` — existing hero image to keep

  **Acceptance Criteria**:
  - [ ] Section has `id="hero"` attribute
  - [ ] Headline text is "Developing Athletes. Designing Pathways."
  - [ ] Authority strip displays credentials in horizontal row
  - [ ] Primary CTA links to `/apply` via Router Link
  - [ ] Secondary CTA scrolls to or links to `#programs`
  - [ ] Headshot image still renders
  - [ ] GSAP entrance animation works on page load
  - [ ] Mobile layout stacks properly (no horizontal overflow)
  - [ ] `npm run build` passes

  **QA Scenarios:**
  ```
  Scenario: Hero section renders new content
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running, viewport 1280x720
    Steps:
      1. Navigate to http://localhost:5173/
      2. Assert text "Developing Athletes" is visible in #hero section
      3. Assert text "Designing Pathways" is visible
      4. Assert img element with src containing "MikeProfessionalHeadshot" exists
      5. Assert link/button with text containing "Apply" links to /apply
      6. Assert authority strip contains "CSEP-CEP" text
    Expected Result: New hero content renders with image and CTAs
    Failure Indicators: Old hero text showing, missing image, broken links
    Evidence: .sisyphus/evidence/task-10-hero-desktop.png

  Scenario: Hero section mobile layout
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running, viewport 375x812
    Steps:
      1. Navigate to http://localhost:5173/
      2. Assert #hero section is visible
      3. Assert no horizontal scrollbar (document.documentElement.scrollWidth <= window.innerWidth)
      4. Take screenshot
    Expected Result: Hero stacks vertically on mobile, no overflow
    Failure Indicators: Horizontal overflow, overlapping elements
    Evidence: .sisyphus/evidence/task-10-hero-mobile.png
  ```

  **Commit**: YES (groups with T11-T15)
  - Message: `feat(homepage): restructure homepage with 9 sections`
  - Files: `src/sections/HeroSection.tsx`
  - Pre-commit: `npm run build`

- [ ] 11. Create CredibilityBar section

  **What to do**:
  - Replace the placeholder `src/sections/CredibilityBar.tsx` with a full implementation:
    - Horizontal strip of trust signals / key metrics
    - Items: "7× Kona Qualifier Coach", "Sub-3:00 Marathon Athletes", "20+ Years Experience", "CSEP-CEP Certified", "NCCP Competition Development"
    - Layout: horizontal row on desktop, 2-column grid or scrolling on mobile
    - Use `.font-mono-label` (IBM Plex Mono) for metric numbers/labels
    - Subtle background differentiation from hero (e.g., `--bg-secondary` #F8F8F8 or brand red strip)
    - GSAP stagger animation: items fade/slide in sequentially on scroll
    - Section ID: `credibility`
    - Mark specific numbers as `[DRAFT]` if they need client verification

  **Must NOT do**:
  - Do NOT make this section too tall — it's a thin strip, not a full section
  - Do NOT use complex card layouts — keep it minimal and scannable

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Visual trust signal strip with animation
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T10, T12-T15)
  - **Parallel Group**: Wave 3
  - **Blocks**: T25 (mobile QA)
  - **Blocked By**: T6 (mounts in HomePage)

  **References**:
  - `src/sections/ResultsSection.tsx:42-82` — existing stat card pattern with numbers (stat-number class, feature-tag), use as inspiration for metric display
  - `src/index.css` — `.stat-number`, `.font-mono-label`, `.feature-tag` classes
  - `src/lib/gsap.ts` — centralized GSAP import
  - `src/sections/PhilosophySection.tsx` — GSAP stagger animation pattern to follow (lines 30-55)

  **Acceptance Criteria**:
  - [ ] Section has `id="credibility"` attribute
  - [ ] Displays 5 trust signal items
  - [ ] GSAP stagger animation on scroll
  - [ ] Responsive: horizontal on desktop, stacked/grid on mobile
  - [ ] `npm run build` passes

  **QA Scenarios:**
  ```
  Scenario: CredibilityBar renders trust signals
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/
      2. Assert #credibility section exists
      3. Assert text "Kona" is visible within #credibility
      4. Assert at least 4 child elements (trust signal items) within #credibility
    Expected Result: Trust signals strip visible with multiple items
    Failure Indicators: Section empty or missing, fewer than 4 items
    Evidence: .sisyphus/evidence/task-11-credibility-bar.png
  ```

  **Commit**: YES (groups with T10, T12-T15)
  - Message: `feat(homepage): restructure homepage with 9 sections`
  - Files: `src/sections/CredibilityBar.tsx`
  - Pre-commit: `npm run build`

- [ ] 12. Create WhoWeServeSection

  **What to do**:
  - Replace the placeholder `src/sections/WhoWeServeSection.tsx` with full implementation:
    - Section heading: "Who We Serve" (Bebas Neue, with accent rule)
    - 3 audience segment cards:
      1. **High-Performance Athletes** — triathletes and runners pursuing competitive goals (Kona, Boston, podium)
      2. **Youth Athletes** — developing athletes through LTAD-aligned pathways (provincial/national)
      3. **Coaches** — mentorship and applied sport science for coaching professionals
    - Each card has: icon (lucide), title, brief description (2-3 sentences), CTA button linking to the relevant page (/coaching, /youth-pathway, /coach-mentorship)
    - Cards use Router `Link` for CTAs
    - Layout: 3 cards in a row (desktop), stacked (mobile)
    - GSAP stagger animation on scroll
    - Section ID: `who-we-serve`
    - Use draft content based on wireframe descriptions

  **Must NOT do**:
  - Do NOT use real athlete names — keep descriptions generic
  - Do NOT add more than 3 cards

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Card-based section with responsive layout and animation
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T10, T11, T13-T15)
  - **Parallel Group**: Wave 3
  - **Blocks**: T25
  - **Blocked By**: T6 (mounts in HomePage)

  **References**:
  - `src/sections/ProgramsSection.tsx` — existing 3-card layout pattern with GSAP stagger (lines 34-85 for cards, lines 90-120 for GSAP)
  - `src/index.css` — `.card-light`, `.accent-rule`, `.text-section`, `.section-spacing`
  - `src/lib/gsap.ts` — GSAP import
  - `lucide-react` — icons: `Target` (HP athletes), `Users` (Youth), `GraduationCap` (Coaches) or similar
  - Client wireframe: Three audience segments with distinct positioning and CTA per segment

  **Acceptance Criteria**:
  - [ ] Section has `id="who-we-serve"` attribute
  - [ ] 3 audience cards with titles, descriptions, and CTA links
  - [ ] CTAs link to /coaching, /youth-pathway, /coach-mentorship via Router Link
  - [ ] GSAP stagger animation on scroll
  - [ ] Responsive layout (3 columns desktop, stacked mobile)
  - [ ] `npm run build` passes

  **QA Scenarios:**
  ```
  Scenario: WhoWeServe section with 3 audience cards
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/
      2. Scroll to #who-we-serve section
      3. Assert 3 card elements visible
      4. Assert first card contains link to /coaching
      5. Assert second card contains link to /youth-pathway
      6. Assert third card contains link to /coach-mentorship
    Expected Result: 3 audience cards with correct links
    Failure Indicators: Missing cards, wrong links, no section
    Evidence: .sisyphus/evidence/task-12-who-we-serve.png
  ```

  **Commit**: YES (groups with T10-T11, T13-T15)
  - Message: `feat(homepage): restructure homepage with 9 sections`
  - Files: `src/sections/WhoWeServeSection.tsx`
  - Pre-commit: `npm run build`

- [ ] 13. Create DifferentiationSection

  **What to do**:
  - Replace the placeholder `src/sections/DifferentiationSection.tsx` with full implementation:
    - Section heading: "Performance Architecture" or "What Makes Us Different" (Bebas Neue)
    - 3 pillars displayed as columns:
      1. **Physiological Precision** — Periodized, metric-driven programming that adapts to your body's responses
      2. **Psychological Readiness** — Mental performance integration — not afterthought coaching, but embedded resilience training
      3. **Long-Term Development** — Progression frameworks that prevent burnout and build sustainable performance over years
    - Each pillar: icon (lucide), heading, description paragraph
    - Visual treatment: clean columns with subtle dividers or cards
    - GSAP stagger animation on scroll
    - Section ID: `differentiation`
    - All content is from the wireframe — mark as `[DRAFT]` where appropriate

  **Must NOT do**:
  - Do NOT add more than 3 pillars
  - Do NOT make this an overly complex section — clean and scannable

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: 3-column visual section with animation
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T10-T12, T14-T15)
  - **Parallel Group**: Wave 3
  - **Blocks**: T25
  - **Blocked By**: T6 (mounts in HomePage)

  **References**:
  - `src/sections/PhilosophySection.tsx` — similar 3-4 column layout pattern with icons and descriptions (lines 24-66), GSAP stagger (lines 68-95)
  - `src/index.css` — `.card-light`, `.accent-rule`, `.text-section`, `.section-spacing`
  - `src/lib/gsap.ts` — GSAP import
  - `lucide-react` — icons: `Activity` (Physiological), `Brain` (Psychological), `TrendingUp` (Long-Term) or similar
  - Client wireframe: "Performance Architecture" section with 3 evidence-based differentiators

  **Acceptance Criteria**:
  - [ ] Section has `id="differentiation"` attribute
  - [ ] 3 pillars with icon, heading, description
  - [ ] GSAP stagger animation on scroll
  - [ ] Responsive (3 columns desktop, stacked mobile)
  - [ ] `npm run build` passes

  **QA Scenarios:**
  ```
  Scenario: Differentiation section renders 3 pillars
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/
      2. Scroll to #differentiation section
      3. Assert 3 pillar elements visible
      4. Assert text "Physiological" appears within the section
      5. Assert text "Psychological" appears within the section
      6. Assert text "Long-Term" or "Development" appears within the section
    Expected Result: 3 differentiation pillars with correct content
    Failure Indicators: Missing pillars, placeholder text still showing
    Evidence: .sisyphus/evidence/task-13-differentiation.png
  ```

  **Commit**: YES (groups with T10-T12, T14-T15)
  - Message: `feat(homepage): restructure homepage with 9 sections`
  - Files: `src/sections/DifferentiationSection.tsx`
  - Pre-commit: `npm run build`

- [ ] 14. Rewrite ProgramsSection (4 programs with Router links)

  **What to do**:
  - Rewrite `src/sections/ProgramsSection.tsx` per wireframe:
    - Section heading: "Programs" or "Our Programs" (Bebas Neue, accent rule)
    - 4 program cards using the `ProgramCard` component (from T5):
      1. **High-Performance Coaching** — 1-on-1 endurance coaching for competitive triathletes and runners. Link: `/coaching`
      2. **Youth Pathway** — LTAD-aligned development for young athletes pursuing provincial/national goals. Link: `/youth-pathway`
      3. **Training Camps** — Intensive training blocks for focused performance gains. Link: `/camps`
      4. **Coach Mentorship** — Applied sport science and leadership development for coaching professionals. Link: `/coach-mentorship`
    - Each card: title, description (2-3 sentences from wireframe), 3-4 feature bullet points, "Learn More" CTA
    - Layout: 2×2 grid (desktop), stacked (mobile)
    - Remove the training group photo from current layout (or move to a different position)
    - GSAP stagger animation on scroll
    - Section ID: `programs` (preserved from current)
    - Import and use `ProgramCard` component
    - Mark descriptions as `[DRAFT]` where they need client review

  **Must NOT do**:
  - Do NOT keep the old 3-program layout — wireframe specifies 4 programs
  - Do NOT hardcode card content inline — use ProgramCard component with props
  - Do NOT remove the section ID `programs`

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Card grid layout with responsive design and animation
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T10-T13, T15)
  - **Parallel Group**: Wave 3
  - **Blocks**: T25
  - **Blocked By**: T5 (uses ProgramCard), T6 (mounts in HomePage)

  **References**:
  - `src/sections/ProgramsSection.tsx` — ENTIRE FILE (129 lines) — current 3-card implementation. Keep GSAP pattern, replace content and layout
  - `src/components/ProgramCard.tsx` — reusable card component from T5
  - `src/index.css` — `.section-spacing`, `.text-section`, `.accent-rule`
  - `src/lib/gsap.ts` — centralized GSAP
  - `public/images/MikeWithTrainingGroup.jpg` — currently used in ProgramsSection, decide whether to keep or relocate
  - Client wireframe: 4 programs with distinct positioning and CTAs

  **Acceptance Criteria**:
  - [ ] Section has `id="programs"` (preserved)
  - [ ] 4 ProgramCard components rendered (not 3)
  - [ ] Each card links to correct page via Router Link
  - [ ] GSAP stagger animation on scroll
  - [ ] Responsive: 2×2 grid desktop, stacked mobile
  - [ ] `npm run build` passes

  **QA Scenarios:**
  ```
  Scenario: ProgramsSection shows 4 program cards with links
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/
      2. Scroll to #programs section
      3. Count card elements within #programs — expect exactly 4
      4. Assert link to /coaching exists within #programs
      5. Assert link to /youth-pathway exists within #programs
      6. Assert link to /camps exists within #programs
      7. Assert link to /coach-mentorship exists within #programs
      8. Click the /coaching link — expect URL changes to /coaching
    Expected Result: 4 program cards with correct navigation links
    Failure Indicators: Only 3 cards, missing links, wrong URLs
    Evidence: .sisyphus/evidence/task-14-programs.png
  ```

  **Commit**: YES (groups with T10-T13, T15)
  - Message: `feat(homepage): restructure homepage with 9 sections`
  - Files: `src/sections/ProgramsSection.tsx`
  - Pre-commit: `npm run build`

- [ ] 15. Rewrite PhilosophySection (SDT framework)

  **What to do**:
  - Rewrite `src/sections/PhilosophySection.tsx` per wireframe:
    - Section heading: "Our Philosophy" or "The Science Behind the System" (Bebas Neue)
    - Reframe around Self-Determination Theory (SDT) framework:
      1. **Competence** — Structured progression that builds confidence through measurable growth
      2. **Connection** — Community and coach relationship that sustains motivation
      3. **Choice** — Athlete autonomy in their development journey
    - Each element: icon, heading, description paragraph
    - Keep the inspirational quote section but update the quote to align with SDT messaging
    - Layout: 3 columns with quote block below (or 3 columns + side quote)
    - GSAP stagger animation (preserve existing pattern)
    - Section ID: `philosophy` (preserved from current)
    - Use draft content from wireframe, mark as `[DRAFT]`

  **Must NOT do**:
  - Do NOT keep the old 4-pillar layout — wireframe specifies 3 SDT elements
  - Do NOT remove the quote section entirely
  - Do NOT remove section ID `philosophy`

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Philosophical content section with columns and quote block
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T10-T14)
  - **Parallel Group**: Wave 3
  - **Blocks**: T25
  - **Blocked By**: T6 (mounts in HomePage)

  **References**:
  - `src/sections/PhilosophySection.tsx` — ENTIRE FILE (121 lines) — current 4-pillar implementation with quote block. Reuse GSAP pattern (lines 30-55 for stagger, lines 57-75 for quote animation)
  - `src/index.css` — `.quote-mark`, `.text-section`, `.accent-rule`, `.section-spacing`
  - `src/lib/gsap.ts` — centralized GSAP
  - Client wireframe: SDT framework (Competence, Connection, Choice) as the philosophical backbone

  **Acceptance Criteria**:
  - [ ] Section has `id="philosophy"` (preserved)
  - [ ] 3 SDT elements displayed (Competence, Connection, Choice)
  - [ ] Quote section present with updated content
  - [ ] GSAP stagger animation on scroll
  - [ ] Responsive layout
  - [ ] `npm run build` passes

  **QA Scenarios:**
  ```
  Scenario: PhilosophySection shows SDT framework
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/
      2. Scroll to #philosophy section
      3. Assert text "Competence" visible within #philosophy
      4. Assert text "Connection" visible within #philosophy
      5. Assert text "Choice" visible within #philosophy
      6. Assert a blockquote or quote element exists
    Expected Result: 3 SDT pillars with quote section
    Failure Indicators: Old 4-pillar content, missing quote
    Evidence: .sisyphus/evidence/task-15-philosophy.png
  ```

  **Commit**: YES (groups with T10-T14)
  - Message: `feat(homepage): restructure homepage with 9 sections`
  - Files: `src/sections/PhilosophySection.tsx`
  - Pre-commit: `npm run build`

- [ ] 16. Create AboutPage (full biography + credentials)

  **What to do**:
  - Create `src/pages/AboutPage.tsx` replacing the placeholder from T6:
    - Use `PageHero` component with:
      - Heading: "About Coach Mike On" (or "The Coach Behind the System")
      - Subheading: Background summary — from sprint athlete to endurance performance architect
      - Image: `MikeWithTeamNB.jpg`
    - **Personal Journey Section**: Expand on the current AboutSection narrative:
      - Sprint background → endurance transition story
      - Academic foundation (Kinesiology degree, sport science)
      - Evolution from personal athlete to systematic coach
      - Key turning point: realizing most coaching ignores evidence base
      - Mark narrative content as `[DRAFT]` where client needs to provide personal details
    - **Academic Foundation Section**: Formal education and certifications
      - Use `CredentialsList` component (full variant from T4) showing:
        - BKin Kinesiology — University of New Brunswick
        - NCCP Competition Development — Triathlon
        - NCCP Competition Development — Athletics (Middle/Long Distance)
        - Triathlon NB High-Performance Director
        - Additional certifications/workshops as `[DRAFT — Client to provide full list]`
    - **Leadership Roles Section**:
      - Triathlon New Brunswick — High-Performance Director
      - Provincial team coaching history
      - Any other organizational roles `[DRAFT]`
    - **Coaching Philosophy Section**: Expanded version of SDT framework:
      - Competence, Connection, Choice — with deeper explanations than homepage
      - How this philosophy translates to daily coaching practice
      - Quote or athlete testimonial supporting the philosophy
    - **Outcomes Section**: Quick stats or highlights
      - Number of athletes coached, provincial team placements, notable results
      - Mark with `[DRAFT — Specific numbers to be confirmed by client]`
    - End with `CTABanner` component: "Ready to Train with Purpose?" → link to /apply
    - GSAP scroll-triggered animations for section reveals
  - Route already defined in T3 as `/about`

  **Must NOT do**:
  - Do NOT duplicate full results data — that belongs on ResultsPage
  - Do NOT include contact form — that's the Apply page
  - Do NOT fabricate specific statistics — use `[DRAFT]` placeholders
  - Do NOT use inline styles — Tailwind only

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Long-form content page with multiple visual sections, hero, credentials list
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Layout composition for multi-section biography page

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T17-T20)
  - **Parallel Group**: Wave 4
  - **Blocks**: T24 (homepage about teaser references this page), T25
  - **Blocked By**: T4 (PageHero, CTABanner, CredentialsList), T3 (route defined)

  **References**:
  - `src/sections/AboutSection.tsx` — ENTIRE FILE — current about content to expand. Contains: credentials (NCCP certs, BKin), coaching stats, philosophy text. Lines 25-48 have credential data, lines 52-75 have philosophy, lines 80-105 have personal story
  - `src/components/PageHero.tsx` — hero component from T4
  - `src/components/CTABanner.tsx` — CTA banner from T4
  - `src/components/CredentialsList.tsx` — credentials display from T4 (full variant)
  - `src/index.css` — `.section-spacing`, `.text-section`, `.card-light`, `.accent-rule`
  - `src/lib/gsap.ts` — centralized GSAP import
  - `public/images/MikeWithTeamNB.jpg` — team/leadership photo for hero
  - `public/images/MikeProfessionalHeadshot.jpg` — alternate headshot for bio section
  - Client wireframe: About page with personal journey, credentials, leadership, philosophy, outcomes

  **Acceptance Criteria**:
  - [ ] Page renders at `/about` route
  - [ ] PageHero component visible at top with correct image
  - [ ] CredentialsList displays at least 4 credentials (BKin, 2x NCCP, HP Director)
  - [ ] SDT philosophy section present (Competence, Connection, Choice)
  - [ ] CTABanner at bottom links to /apply
  - [ ] Draft content marked with `[DRAFT]`
  - [ ] GSAP animations on scroll
  - [ ] `npm run build` passes

  **QA Scenarios:**
  ```
  Scenario: AboutPage renders complete biography
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/about
      2. Assert PageHero visible with heading containing "Coach Mike" or "About"
      3. Assert image element with src containing "MikeWithTeamNB" or "Headshot"
      4. Assert text "Kinesiology" appears on page (academic foundation)
      5. Assert text "NCCP" appears on page (credentials)
      6. Assert text "Competence" and "Connection" and "Choice" appear (philosophy)
      7. Scroll to bottom — assert CTABanner with link to /apply
      8. Click CTABanner link — expect URL changes to /apply
    Expected Result: Full biography page with all sections, navigable CTA
    Failure Indicators: Missing sections, placeholder component still showing, broken image
    Evidence: .sisyphus/evidence/task-16-about-page.png

  Scenario: AboutPage shows draft markers where client content needed
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/about
      2. Search page content for text "DRAFT" (case-insensitive)
      3. Assert at least 1 [DRAFT] marker exists on page
    Expected Result: Draft markers visible for client-review content
    Failure Indicators: No draft markers (either all content finalized without client, or markers missing)
    Evidence: .sisyphus/evidence/task-16-about-drafts.png
  ```

  **Commit**: YES (groups with T17-T20)
  - Message: `feat(pages): add About, Coaching, Youth, Camps, Mentorship pages`
  - Files: `src/pages/AboutPage.tsx`
  - Pre-commit: `npm run build`

- [ ] 17. Create CoachingPage (high-performance coaching details)

  **What to do**:
  - Create `src/pages/CoachingPage.tsx` replacing the placeholder from T6:
    - Use `PageHero` component with:
      - Heading: "High-Performance Coaching" (or "1-on-1 Endurance Coaching")
      - Subheading: For competitive triathletes and runners seeking structured, evidence-based performance gains
    - **Who It's For Section**:
      - Target audience bullets:
        - Competitive triathletes targeting podium finishes or personal records
        - Distance runners (10K to ultra) pursuing ambitious time goals
        - Motivated athletes willing to commit to structured, data-driven training
        - Athletes transitioning from self-coached to professionally guided programs
      - Use a 2-column or icon-list layout
    - **Methodology Section**:
      - Training philosophy for 1-on-1 coaching:
        - Periodized programming based on physiological markers
        - Regular load monitoring and adaptation
        - Race-specific preparation with tapering protocols
        - Mental performance integration
      - Could use numbered steps or timeline visual
    - **What You Get Section** (tangible deliverables):
      - Personalized training plan (updated weekly/monthly)
      - Regular check-ins and plan adjustments
      - Race strategy and pacing guidance
      - Access to training resources and educational content
      - Data analysis (if athletes use TrainingPeaks, Garmin, etc.)
      - Mark specific deliverables as `[DRAFT]` where client needs to confirm
    - **Metrics/Evidence Section**: Brief showcase of coaching effectiveness
      - Reference results from ResultsPage: "X athletes coached, Y% PR improvement" etc.
      - Use `[DRAFT — Stats to be confirmed]` for specific numbers
    - **Pricing/Application Section**: No pricing displayed
      - Instead: "Coaching spots are limited. Apply to see if we're a good fit."
      - CTA button linking to /apply
    - **FAQ Section**: Using shadcn `Accordion` component (`@/components/ui/accordion`)
      - 4-6 common questions:
        - "How many athletes do you coach at one time?"
        - "What platforms do you use for training delivery?"
        - "How often do we communicate?"
        - "Do I need a certain fitness level to start?"
        - "What if I need to travel or take a break?"
      - Answers marked `[DRAFT — Client to provide detailed answers]`
    - End with `CTABanner`: "Ready to Elevate Your Performance?" → link to /apply
    - GSAP scroll animations for section reveals

  **Must NOT do**:
  - Do NOT display pricing — this is an application-based model
  - Do NOT duplicate full athlete results — link to /results instead
  - Do NOT create custom accordion — use shadcn Accordion component
  - Do NOT fabricate coaching statistics

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Content-rich page with multiple sections, FAQ accordion, responsive layout
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Page layout with varied section types (list, accordion, CTA)

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T16, T18-T20)
  - **Parallel Group**: Wave 4
  - **Blocks**: T25
  - **Blocked By**: T4 (PageHero, CTABanner), T3 (route defined)

  **References**:
  - `src/sections/ProgramsSection.tsx` — current coaching program description text (lines 35-55) — expand this into full page content
  - `src/components/PageHero.tsx` — hero component from T4
  - `src/components/CTABanner.tsx` — CTA banner from T4
  - `src/components/ui/accordion.tsx` — shadcn Accordion component (already installed, never used)
  - `src/index.css` — `.section-spacing`, `.text-section`, `.card-light`
  - `src/lib/gsap.ts` — centralized GSAP
  - Client wireframe: Coaching page with who-it's-for, methodology, deliverables, FAQ, application CTA

  **Acceptance Criteria**:
  - [ ] Page renders at `/coaching` route
  - [ ] PageHero visible at top
  - [ ] "Who It's For" section with at least 4 audience bullets
  - [ ] Methodology section with at least 4 training approach items
  - [ ] "What You Get" section with tangible deliverables list
  - [ ] FAQ section using shadcn Accordion with at least 4 questions
  - [ ] Accordion items expand/collapse correctly
  - [ ] CTABanner at bottom links to /apply
  - [ ] No pricing displayed anywhere
  - [ ] `[DRAFT]` markers where client content needed
  - [ ] `npm run build` passes

  **QA Scenarios:**
  ```
  Scenario: CoachingPage renders all sections with FAQ
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/coaching
      2. Assert PageHero with heading containing "Coaching" or "Performance"
      3. Scroll down — assert "Who It's For" or target audience section visible
      4. Continue scrolling — assert methodology section visible
      5. Find accordion elements — assert at least 4 accordion items exist
      6. Click first accordion item — assert it expands (content becomes visible)
      7. Click first accordion item again — assert it collapses
      8. Scroll to bottom — assert CTABanner with link to /apply
    Expected Result: Complete coaching page with functional FAQ accordion
    Failure Indicators: Missing sections, accordion not functional, no CTA
    Evidence: .sisyphus/evidence/task-17-coaching-page.png

  Scenario: CoachingPage has no pricing displayed
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/coaching
      2. Search full page text content for "$" (dollar sign)
      3. Search full page text for "price" or "pricing" or "cost" (case-insensitive)
      4. Assert NONE of these appear
    Expected Result: No pricing information displayed
    Failure Indicators: Dollar amounts, "pricing" section header
    Evidence: .sisyphus/evidence/task-17-coaching-no-pricing.png
  ```

  **Commit**: YES (groups with T16, T18-T20)
  - Message: `feat(pages): add About, Coaching, Youth, Camps, Mentorship pages`
  - Files: `src/pages/CoachingPage.tsx`
  - Pre-commit: `npm run build`

- [ ] 18. Create YouthPathwayPage (LTAD-aligned youth development)

  **What to do**:
  - Create `src/pages/YouthPathwayPage.tsx` replacing the placeholder from T6:
    - Use `PageHero` component with:
      - Heading: "Youth Pathway" (or "Building Tomorrow's Athletes")
      - Subheading: LTAD-aligned development for young athletes pursuing provincial and national goals
    - **LTAD Framework Section** (Long-Term Athlete Development):
      - Explain the developmental approach:
        - Age-appropriate training progressions
        - Physical literacy foundation before specialization
        - Periodization adapted for growing athletes
        - Multi-sport integration in early stages
      - Visual: Could use a timeline/progression graphic (Tailwind-built, not an image)
    - **Provincial Pathways Section**:
      - How young athletes progress through provincial development:
        - Provincial team selection process
        - Training block structure for developing athletes
        - Competition calendar alignment
        - Relationship between club, provincial, and national development
      - Mark with `[DRAFT — Specific provincial pathway details to be confirmed]`
    - **Age-Appropriate Programming Section**:
      - Breakdown by developmental stage (not strict ages):
        - Foundation stage: Physical literacy, movement skills, fun
        - Development stage: Introducing structured training, sport-specific skills
        - Performance stage: Competition preparation, advanced periodization
      - Each stage: icon or visual, title, description of focus areas
    - **Parent Information Section**:
      - What parents should know:
        - Safety and injury prevention focus
        - Communication approach with parents
        - How to support without over-pressuring
        - "We develop athletes AND people"
      - Mark as `[DRAFT — Client to review parent messaging]`
    - End with `CTABanner`: "Start Your Young Athlete's Journey" → link to /apply
    - GSAP scroll animations

  **Must NOT do**:
  - Do NOT include specific pricing for youth programs
  - Do NOT reference specific children by name
  - Do NOT make medical/health claims about youth development
  - Do NOT create overly complex timeline graphics — keep it Tailwind-achievable

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Content page with developmental stages visualization, multiple info sections
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Stage visualization and parent-facing design

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T16-T17, T19-T20)
  - **Parallel Group**: Wave 4
  - **Blocks**: T25
  - **Blocked By**: T4 (PageHero, CTABanner), T3 (route defined)

  **References**:
  - `src/components/PageHero.tsx` — hero component from T4
  - `src/components/CTABanner.tsx` — CTA banner from T4
  - `src/index.css` — `.section-spacing`, `.text-section`, `.card-light`, `.accent-rule`
  - `src/lib/gsap.ts` — centralized GSAP
  - Client wireframe: Youth Pathway page with LTAD framework, provincial pathways, age-appropriate programming
  - External reference: Canadian Sport for Life LTAD model — https://sportforlife.ca/long-term-development/

  **Acceptance Criteria**:
  - [ ] Page renders at `/youth-pathway` route
  - [ ] PageHero visible at top
  - [ ] LTAD framework section explains developmental approach
  - [ ] At least 3 developmental stages displayed (Foundation, Development, Performance or similar)
  - [ ] Provincial pathways section present
  - [ ] Parent information section present
  - [ ] CTABanner at bottom links to /apply
  - [ ] `[DRAFT]` markers where client content needed
  - [ ] `npm run build` passes

  **QA Scenarios:**
  ```
  Scenario: YouthPathwayPage renders developmental stages
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/youth-pathway
      2. Assert PageHero with heading containing "Youth" or "Pathway"
      3. Assert text containing "LTAD" or "Long-Term" or "development" visible
      4. Assert at least 3 distinct stage sections visible (Foundation/Development/Performance or similar)
      5. Assert parent-focused section visible (text containing "parent" case-insensitive)
      6. Scroll to bottom — assert CTABanner with link to /apply
    Expected Result: Complete youth pathway page with stages and parent info
    Failure Indicators: Missing stages, no parent section, placeholder component
    Evidence: .sisyphus/evidence/task-18-youth-pathway.png

  Scenario: YouthPathwayPage has no pricing or medical claims
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/youth-pathway
      2. Search page text for "$" — assert not found
      3. Search page text for "guaranteed" or "cure" or "treat" — assert not found
    Expected Result: No pricing or medical claims
    Failure Indicators: Dollar amounts or medical language
    Evidence: .sisyphus/evidence/task-18-youth-no-pricing.png
  ```

  **Commit**: YES (groups with T16-T17, T19-T20)
  - Message: `feat(pages): add About, Coaching, Youth, Camps, Mentorship pages`
  - Files: `src/pages/YouthPathwayPage.tsx`
  - Pre-commit: `npm run build`

- [ ] 19. Create CampsPage (training camps and intensive blocks)

  **What to do**:
  - Create `src/pages/CampsPage.tsx` replacing the placeholder from T6:
    - Use `PageHero` component with:
      - Heading: "Training Camps" (or "Intensive Training Blocks")
      - Subheading: Focused performance gains through immersive training experiences
    - **Training Block Descriptions Section**:
      - Explain the camp model:
        - Multi-day intensive training blocks (not year-round)
        - Sport-specific focus periods (triathlon, running, or combined)
        - Structured schedule: morning sessions, technical work, recovery protocols
        - Group dynamics with individualized programming within the group
      - 2-3 camp types if applicable:
        - Pre-season base building camp
        - Race-specific sharpening camp
        - Youth development camp (cross-reference /youth-pathway)
      - Mark with `[DRAFT — Camp types and descriptions to be confirmed by client]`
    - **Scheduling Section**: Placeholder for upcoming camps
      - "Upcoming camps are announced periodically. Apply to be notified."
      - Could show a simple placeholder calendar/list with `[DRAFT — No camps currently scheduled]`
      - CTA: "Apply to join the waitlist" → /apply
    - **Location Section**:
      - Fredericton, NB, Canada (and any other training locations)
      - Brief description of training facilities/routes available
      - Mark as `[DRAFT — Specific venue details to be confirmed]`
    - **What to Expect Section**:
      - Daily schedule outline (morning, midday, evening)
      - Equipment/gear requirements
      - Fitness prerequisites
      - Accommodation info (if applicable) — `[DRAFT]`
    - End with `CTABanner`: "Join the Next Training Block" → link to /apply
    - GSAP scroll animations

  **Must NOT do**:
  - Do NOT display specific pricing for camps
  - Do NOT show specific dates unless confirmed — use `[DRAFT]` placeholders
  - Do NOT create complex calendar components — simple list/card is sufficient

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Content page with camp descriptions, scheduling placeholder, location info
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Information-dense page layout with cards and CTAs

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T16-T18, T20)
  - **Parallel Group**: Wave 4
  - **Blocks**: T25
  - **Blocked By**: T4 (PageHero, CTABanner), T3 (route defined)

  **References**:
  - `src/components/PageHero.tsx` — hero component from T4
  - `src/components/CTABanner.tsx` — CTA banner from T4
  - `src/index.css` — `.section-spacing`, `.text-section`, `.card-light`
  - `src/lib/gsap.ts` — centralized GSAP
  - `src/sections/ProgramsSection.tsx` — current "Training Camps" card content (lines 40-50 area) for baseline description
  - Client wireframe: Camps page with training block descriptions, scheduling, location

  **Acceptance Criteria**:
  - [ ] Page renders at `/camps` route
  - [ ] PageHero visible at top
  - [ ] At least 2 camp type descriptions present
  - [ ] Scheduling section present (even as placeholder)
  - [ ] Location section mentions Fredericton, NB
  - [ ] CTABanner at bottom links to /apply
  - [ ] `[DRAFT]` markers where client content needed
  - [ ] `npm run build` passes

  **QA Scenarios:**
  ```
  Scenario: CampsPage renders camp descriptions and location
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/camps
      2. Assert PageHero with heading containing "Camp" or "Training"
      3. Assert at least 2 camp type descriptions visible
      4. Assert text "Fredericton" appears on page (location)
      5. Scroll to bottom — assert CTABanner with link to /apply
    Expected Result: Complete camps page with descriptions and location
    Failure Indicators: Missing camp types, no location info, placeholder component
    Evidence: .sisyphus/evidence/task-19-camps-page.png

  Scenario: CampsPage has no confirmed dates or pricing
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/camps
      2. Search page text for "$" — assert not found
      3. Verify any dates shown are marked as [DRAFT] or are clearly placeholder
    Expected Result: No pricing, dates are placeholder
    Failure Indicators: Specific dollar amounts or firm dates without draft markers
    Evidence: .sisyphus/evidence/task-19-camps-no-pricing.png
  ```

  **Commit**: YES (groups with T16-T18, T20)
  - Message: `feat(pages): add About, Coaching, Youth, Camps, Mentorship pages`
  - Files: `src/pages/CampsPage.tsx`
  - Pre-commit: `npm run build`

- [ ] 20. Create CoachMentorshipPage (mentorship for coaching professionals)

  **What to do**:
  - Create `src/pages/CoachMentorshipPage.tsx` replacing the placeholder from T6:
    - Use `PageHero` component with:
      - Heading: "Coach Mentorship" (or "Elevate Your Coaching Practice")
      - Subheading: Applied sport science and leadership development for coaching professionals
    - **Applied Sport Science Section**:
      - How this mentorship bridges academic knowledge and practical coaching:
        - Translating research into actionable training prescriptions
        - Understanding periodization principles and their application
        - Data interpretation and athlete monitoring
        - Evidence-based decision making in coaching
      - Position this as what makes Coach Mike On different: academic rigor + practical experience
    - **Leadership Development Section**:
      - Growing as a coaching professional:
        - Building athlete-coach relationships
        - Managing training groups
        - Professional development pathways
        - Navigating sport system politics and structures
      - Mark with `[DRAFT — Specific leadership topics to be confirmed]`
    - **Who It's For Section**:
      - Target audience for mentorship:
        - New coaches seeking structured development
        - Experienced coaches wanting to incorporate sport science
        - Coaches preparing for NCCP certification advancement
        - University kinesiology graduates entering coaching
      - Use icon-list or card layout
    - **Mentorship Structure Section**: How the program works
      - Format: 1-on-1 mentorship, group workshops, or both `[DRAFT]`
      - Duration/frequency: `[DRAFT — Structure to be confirmed]`
      - Topics covered: programming, periodization, athlete management, business of coaching
      - Outcomes: What mentees walk away with
    - End with `CTABanner`: "Ready to Grow as a Coach?" → link to /apply
    - GSAP scroll animations

  **Must NOT do**:
  - Do NOT display specific pricing
  - Do NOT position this as a "certification" — it's mentorship, not accreditation
  - Do NOT create complex application flow — use shared /apply page
  - Do NOT make it sound like an online course — emphasize personal mentorship

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Professional-oriented content page with multiple information sections
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Professional audience layout design

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T16-T19)
  - **Parallel Group**: Wave 4
  - **Blocks**: T25
  - **Blocked By**: T4 (PageHero, CTABanner), T3 (route defined)

  **References**:
  - `src/components/PageHero.tsx` — hero component from T4
  - `src/components/CTABanner.tsx` — CTA banner from T4
  - `src/index.css` — `.section-spacing`, `.text-section`, `.card-light`
  - `src/lib/gsap.ts` — centralized GSAP
  - `src/sections/ProgramsSection.tsx` — if any current mentorship text exists
  - Client wireframe: Coach Mentorship page with sport science, leadership, structure

  **Acceptance Criteria**:
  - [ ] Page renders at `/coach-mentorship` route
  - [ ] PageHero visible at top
  - [ ] Applied sport science section present
  - [ ] Leadership development section present
  - [ ] "Who It's For" section with at least 3 audience types
  - [ ] Mentorship structure section present
  - [ ] CTABanner at bottom links to /apply
  - [ ] `[DRAFT]` markers where client content needed
  - [ ] `npm run build` passes

  **QA Scenarios:**
  ```
  Scenario: CoachMentorshipPage renders all sections
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/coach-mentorship
      2. Assert PageHero with heading containing "Mentorship" or "Coach"
      3. Assert text containing "sport science" (case-insensitive) visible
      4. Assert text containing "leadership" (case-insensitive) visible
      5. Assert "Who It's For" or target audience section with at least 3 items
      6. Scroll to bottom — assert CTABanner with link to /apply
    Expected Result: Complete mentorship page with all sections
    Failure Indicators: Missing sections, placeholder component, no CTA
    Evidence: .sisyphus/evidence/task-20-mentorship-page.png

  Scenario: CoachMentorshipPage does not claim certification
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/coach-mentorship
      2. Search page text for "certification" or "certified" or "accredited" (case-insensitive)
      3. Assert NONE of these appear (mentorship, not certification)
    Expected Result: No certification claims
    Failure Indicators: Language implying this is a certification program
    Evidence: .sisyphus/evidence/task-20-mentorship-no-cert.png
  ```

  **Commit**: YES (groups with T16-T19)
  - Message: `feat(pages): add About, Coaching, Youth, Camps, Mentorship pages`
  - Files: `src/pages/CoachMentorshipPage.tsx`
  - Pre-commit: `npm run build`

- [ ] 21. Create ResultsPage (full case studies and athlete outcomes)

  **What to do**:
  - Create `src/pages/ResultsPage.tsx` replacing the placeholder from T6:
    - Use `PageHero` component with:
      - Heading: "Results" (or "Athlete Outcomes" or "The Proof Is in the Performance")
      - Subheading: Real results from real athletes — data-driven coaching produces measurable outcomes
    - **Case Studies Section**: Full showcase using `CaseStudyCard` (full variant from T5)
      - Expand the current ResultsSection data into detailed case studies:
        - Each case study: athlete first name (or pseudonym), sport, goal, journey, outcome
        - Use CaseStudyCard component with full variant (shows detailed metrics)
        - At least 4-6 case studies from current data + expanded drafts
      - Current data from ResultsSection to expand:
        - Marathon runner: 3:45 to 3:12 PR (from current site)
        - Triathlete: First 70.3 podium finish (from current site)
        - Age-group athlete: Consistent top-10 finishes (from current site)
        - Additional case studies: `[DRAFT — Client to provide more athlete stories]`
    - **Aggregate Metrics Section**: Overview statistics
      - Total athletes coached, average PR improvement %, podium finishes, provincial team selections
      - Display as large stat numbers in a row (similar to credibility bar style)
      - Mark all numbers as `[DRAFT — Stats to be confirmed by client]`
    - **Testimonials Section**: Athlete quotes
      - 3-4 testimonials with:
        - Quote text
        - Athlete name (or initials) and discipline
        - Duration coached
      - Use current testimonial content from ResultsSection + `[DRAFT]` for new ones
    - End with `CTABanner`: "Ready to Write Your Own Success Story?" → link to /apply
    - GSAP scroll animations for card reveals and stat counter animations

  **Must NOT do**:
  - Do NOT use full real names without `[DRAFT — Confirm permission]` marker
  - Do NOT fabricate statistics — use `[DRAFT]` for all specific numbers
  - Do NOT include before/after photos (privacy concern) — data and text only
  - Do NOT create complex data visualization — simple stat display is sufficient

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Data-showcase page with case study cards, stat counters, testimonials
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Showcase layout with card grid and stat counters

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T22)
  - **Parallel Group**: Wave 5
  - **Blocks**: T24 (homepage results teaser references this page), T25
  - **Blocked By**: T5 (CaseStudyCard), T4 (PageHero, CTABanner), T3 (route defined)

  **References**:
  - `src/sections/ResultsSection.tsx` — ENTIRE FILE — current results data to expand. Contains: athlete testimonial cards (lines 20-55), stat numbers (lines 58-75), GSAP animations (lines 80-110). Extract all athlete data and testimonial text
  - `src/components/CaseStudyCard.tsx` — case study card from T5 (full variant)
  - `src/components/PageHero.tsx` — hero from T4
  - `src/components/CTABanner.tsx` — CTA banner from T4
  - `src/index.css` — `.section-spacing`, `.text-section`, `.card-light`, `.stat-value` (if created in T11)
  - `src/lib/gsap.ts` — centralized GSAP
  - Client wireframe: Results page with full case studies, metrics, testimonials

  **Acceptance Criteria**:
  - [ ] Page renders at `/results` route
  - [ ] PageHero visible at top
  - [ ] At least 4 CaseStudyCard components rendered
  - [ ] Aggregate metrics section with at least 3 stat numbers
  - [ ] Testimonials section with at least 3 quotes
  - [ ] CTABanner at bottom links to /apply
  - [ ] All specific stats marked `[DRAFT]` where unconfirmed
  - [ ] GSAP animations on scroll
  - [ ] `npm run build` passes

  **QA Scenarios:**
  ```
  Scenario: ResultsPage renders case studies and metrics
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/results
      2. Assert PageHero with heading containing "Results" or "Proof" or "Outcomes"
      3. Count case study card elements — assert at least 4
      4. Assert aggregate metrics section visible with at least 3 stat numbers
      5. Assert testimonials section with at least 3 quote elements
      6. Scroll to bottom — assert CTABanner with link to /apply
    Expected Result: Complete results page with case studies, metrics, testimonials
    Failure Indicators: Fewer than 4 case studies, missing metrics section, no testimonials
    Evidence: .sisyphus/evidence/task-21-results-page.png

  Scenario: ResultsPage has draft markers for unconfirmed data
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/results
      2. Search page content for text "DRAFT" (case-insensitive)
      3. Assert at least 1 [DRAFT] marker exists on page
    Expected Result: Draft markers for unconfirmed stats
    Failure Indicators: Specific numbers without draft markers that look fabricated
    Evidence: .sisyphus/evidence/task-21-results-drafts.png
  ```

  **Commit**: YES
  - Message: `feat(pages): add Results page with case studies`
  - Files: `src/pages/ResultsPage.tsx`
  - Pre-commit: `npm run build`

- [ ] 22. Create ApplyPage (multi-step intake form)

  **What to do**:
  - Create `src/pages/ApplyPage.tsx` replacing the placeholder from T6:
    - Use `PageHero` component with:
      - Heading: "Apply for Coaching" (or "Start Your Application")
      - Subheading: Tell us about yourself so we can determine if we're the right fit
    - **Multi-Step Form** using react-hook-form + zod + shadcn Form components:
      - **Step Indicator**: Visual progress bar/stepper showing current step (1 of 4, 2 of 4, etc.)
        - Build with Tailwind — simple circles + connecting lines
        - Highlight current step, show completed steps with checkmark
      - **Step 1: Personal Information**:
        - Full Name (text input, required)
        - Email (email input, required, zod email validation)
        - Phone (tel input, optional)
        - Location/City (text input, optional)
        - Age Range (select: Under 18, 18-25, 26-35, 36-45, 46-55, 55+)
      - **Step 2: Athletic Background**:
        - Primary Sport (select: Triathlon, Running, Both, Other)
        - Experience Level (select: Beginner, Intermediate, Competitive, Elite)
        - Current Training Volume (select: 0-5 hrs/week, 5-10, 10-15, 15-20, 20+)
        - Previous Coaching Experience (select: None, Self-Coached, Had a Coach, Currently Coached)
        - Key Races/Events Completed (textarea, optional)
      - **Step 3: Goals & Preferences**:
        - Program Interest (select: High-Performance Coaching, Youth Pathway, Training Camps, Coach Mentorship)
        - Primary Goal (textarea, required — "What's your #1 goal for the next 12 months?")
        - Biggest Challenge (textarea, optional — "What's been your biggest training challenge?")
        - How Did You Hear About Us (select: Google, Social Media, Referral, Event, Other)
      - **Step 4: Review & Submit**:
        - Display all entered data in a read-only summary
        - Group by step with labels
        - "Edit" button per section to go back to that step
        - Submit button: "Submit Application"
        - Checkbox: "I understand this is an application, not a guaranteed enrollment" (required)
    - **Form Behavior**:
      - Per-step validation: validate current step fields before allowing Next
      - Back button: navigate to previous step without losing data
      - Submit: `console.log('Application submitted:', formData)` + show success state
      - Success State: Replace form with confirmation message:
        - "Application Received!"
        - "We'll review your application and get back to you within [DRAFT] business days."
        - "In the meantime, check out our Results page to see what's possible." → /results link
    - **shadcn components to use**:
      - `@/components/ui/form` (Form, FormField, FormItem, FormLabel, FormControl, FormMessage)
      - `@/components/ui/input` (text, email, tel inputs)
      - `@/components/ui/select` (Select, SelectTrigger, SelectValue, SelectContent, SelectItem)
      - `@/components/ui/textarea` (multi-line text)
      - `@/components/ui/button` (Next, Back, Submit)
      - `@/components/ui/checkbox` (consent checkbox)
    - Zod schema: Define a complete schema for all fields with proper validation
    - Form layout: Single column, generous spacing, clear labels
    - GSAP: Subtle step transition animations (fade in/out or slide)

  **Must NOT do**:
  - Do NOT send data to any backend/API — frontend-only (console.log)
  - Do NOT store data in localStorage or sessionStorage
  - Do NOT display pricing anywhere on the form
  - Do NOT use more than 4 steps — keep it focused
  - Do NOT skip validation between steps — each step must validate before proceeding
  - Do NOT create custom form components — use shadcn Form + react-hook-form integration
  - Do NOT lose form data when navigating between steps

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Complex multi-step form with validation, state management, step transitions — requires careful logic
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Form UX design, step indicator, validation feedback

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T21)
  - **Parallel Group**: Wave 5
  - **Blocks**: T25
  - **Blocked By**: T4 (PageHero), T3 (route defined)

  **References**:
  - `src/components/ui/form.tsx` — shadcn Form component (react-hook-form integration, already installed)
  - `src/components/ui/input.tsx` — shadcn Input component
  - `src/components/ui/select.tsx` — shadcn Select component
  - `src/components/ui/textarea.tsx` — shadcn Textarea component
  - `src/components/ui/button.tsx` — shadcn Button component
  - `src/components/ui/checkbox.tsx` — shadcn Checkbox component
  - `src/components/PageHero.tsx` — hero from T4
  - `src/sections/ContactSection.tsx` — ENTIRE FILE — current contact form (simpler version). Lines 15-35 have form field patterns, lines 38-50 have submission handling. This form is much simpler but shows the existing React form pattern used in the project
  - `src/lib/gsap.ts` — centralized GSAP for step transitions
  - `src/index.css` — `.btn-primary`, form-related styles
  - react-hook-form docs: useForm, Controller, FormProvider pattern
  - zod docs: z.object(), z.string().email(), z.enum(), z.optional()

  **Acceptance Criteria**:
  - [ ] Page renders at `/apply` route
  - [ ] Step indicator shows 4 steps with current step highlighted
  - [ ] Step 1 fields render: name, email, phone, location, age range
  - [ ] Step 2 fields render: sport, experience, volume, coaching history, races
  - [ ] Step 3 fields render: program interest, goal, challenge, referral source
  - [ ] Step 4 shows read-only summary of all entered data
  - [ ] Per-step validation: cannot advance with invalid required fields
  - [ ] Email field rejects invalid email format
  - [ ] Back button preserves previously entered data
  - [ ] Submit logs form data to console
  - [ ] Success state shows confirmation message after submit
  - [ ] Consent checkbox required before submit
  - [ ] `npm run build` passes

  **QA Scenarios:**
  ```
  Scenario: Apply form happy path — complete 4-step submission
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running, browser console open
    Steps:
      1. Navigate to http://localhost:5173/apply
      2. Assert step indicator shows step 1 of 4 as active
      3. Fill name: "Jane Smith"
      4. Fill email: "jane@example.com"
      5. Select age range: "26-35"
      6. Click Next — assert step 2 becomes active
      7. Select primary sport: "Triathlon"
      8. Select experience: "Competitive"
      9. Select volume: "10-15"
      10. Select previous coaching: "Self-Coached"
      11. Click Next — assert step 3 becomes active
      12. Select program: "High-Performance Coaching"
      13. Fill primary goal: "Sub-5 hour Ironman 70.3"
      14. Select referral: "Google"
      15. Click Next — assert step 4 (review) shows
      16. Assert review shows "Jane Smith", "jane@example.com", "Triathlon", "Sub-5 hour Ironman 70.3"
      17. Check consent checkbox
      18. Click Submit
      19. Assert success message appears containing "Application Received" or "submitted"
    Expected Result: Full 4-step form completion with success confirmation
    Failure Indicators: Steps not advancing, data not preserved, no success state
    Evidence: .sisyphus/evidence/task-22-apply-happy-path.png

  Scenario: Apply form validation — prevent advancing with missing required fields
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/apply
      2. Leave all fields empty
      3. Click Next
      4. Assert validation error messages appear for required fields (name, email)
      5. Assert step does NOT advance to step 2
      6. Fill name: "Test User"
      7. Fill email: "not-an-email" (invalid format)
      8. Click Next
      9. Assert email validation error appears
      10. Fill email: "valid@example.com"
      11. Select age range
      12. Click Next — assert step 2 now accessible
    Expected Result: Validation prevents advancing with invalid/missing data
    Failure Indicators: Form advances without required fields, no error messages
    Evidence: .sisyphus/evidence/task-22-apply-validation.png

  Scenario: Apply form back navigation preserves data
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/apply
      2. Fill name: "Back Test User"
      3. Fill email: "back@test.com"
      4. Select age range: "36-45"
      5. Click Next to step 2
      6. Select primary sport: "Running"
      7. Click Back to step 1
      8. Assert name field still contains "Back Test User"
      9. Assert email field still contains "back@test.com"
      10. Click Next to step 2
      11. Assert sport field still shows "Running"
    Expected Result: Form data preserved when navigating between steps
    Failure Indicators: Fields reset to empty when going back
    Evidence: .sisyphus/evidence/task-22-apply-back-nav.png
  ```

  **Commit**: YES
  - Message: `feat(pages): add multi-step Apply form`
  - Files: `src/pages/ApplyPage.tsx`
  - Pre-commit: `npm run build`

- [ ] 23. Add SEO meta tags with react-helmet-async

  **What to do**:
  - Install `react-helmet-async`:
    - `npm install react-helmet-async`
  - Wrap app in `HelmetProvider` in `src/main.tsx` (inside RouterProvider setup)
  - Add `<Helmet>` to EVERY page component with:
    - `<title>`: Page-specific title (e.g., "About Coach Mike On | TeamON Multisports")
    - `<meta name="description">`: Page-specific description (unique per page, 150-160 chars)
    - `<meta property="og:title">`: Same as title
    - `<meta property="og:description">`: Same as description
    - `<meta property="og:type" content="website">`
    - `<meta property="og:url">`: Full page URL (e.g., `https://teamonmultisports.com/about`)
    - `<meta property="og:image">`: Default to MikeProfessionalHeadshot.jpg or page-specific image
  - Pages and their titles/descriptions:
    - `/` — "TeamON Multisports | Evidence-Based Endurance Coaching" / "Performance coaching for triathletes and runners..."
    - `/about` — "About Coach Mike On | TeamON Multisports" / "Meet Coach Mike On — Kinesiology degree, NCCP certified..."
    - `/coaching` — "High-Performance Coaching | TeamON Multisports" / "1-on-1 endurance coaching for competitive triathletes..."
    - `/youth-pathway` — "Youth Pathway | TeamON Multisports" / "LTAD-aligned development for young athletes..."
    - `/camps` — "Training Camps | TeamON Multisports" / "Intensive training blocks for focused performance..."
    - `/coach-mentorship` — "Coach Mentorship | TeamON Multisports" / "Applied sport science and leadership development..."
    - `/results` — "Results | TeamON Multisports" / "Real athlete outcomes from data-driven coaching..."
    - `/apply` — "Apply for Coaching | TeamON Multisports" / "Start your application for evidence-based coaching..."
    - 404 — "Page Not Found | TeamON Multisports"
  - Mark all descriptions as `[DRAFT — SEO descriptions to be refined]`

  **Must NOT do**:
  - Do NOT use react-helmet (deprecated) — use react-helmet-async
  - Do NOT duplicate titles — each page gets a unique title
  - Do NOT hardcode base URL — use relative paths or a config constant
  - Do NOT add structured data/JSON-LD (out of scope)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Repetitive task — add Helmet to each page with per-page data
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T24, T25)
  - **Parallel Group**: Wave 6
  - **Blocks**: None
  - **Blocked By**: T6-T7, T16-T22 (all pages must exist first)

  **References**:
  - `src/main.tsx` — wrap with HelmetProvider (inside createBrowserRouter setup from T3)
  - `src/pages/HomePage.tsx` — add Helmet
  - `src/pages/AboutPage.tsx` — add Helmet
  - `src/pages/CoachingPage.tsx` — add Helmet
  - `src/pages/YouthPathwayPage.tsx` — add Helmet
  - `src/pages/CampsPage.tsx` — add Helmet
  - `src/pages/CoachMentorshipPage.tsx` — add Helmet
  - `src/pages/ResultsPage.tsx` — add Helmet
  - `src/pages/ApplyPage.tsx` — add Helmet
  - `src/pages/NotFoundPage.tsx` — add Helmet
  - react-helmet-async docs: HelmetProvider, Helmet component usage

  **Acceptance Criteria**:
  - [ ] `react-helmet-async` in package.json dependencies
  - [ ] HelmetProvider wraps app in main.tsx
  - [ ] Every page component has a `<Helmet>` with unique title and description
  - [ ] `document.title` changes when navigating between pages
  - [ ] OG meta tags present in page head
  - [ ] `npm run build` passes

  **QA Scenarios:**
  ```
  Scenario: Page titles update on navigation
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/
      2. Assert document.title contains "TeamON"
      3. Navigate to http://localhost:5173/about
      4. Assert document.title contains "About"
      5. Navigate to http://localhost:5173/coaching
      6. Assert document.title contains "Coaching"
      7. Navigate to http://localhost:5173/results
      8. Assert document.title contains "Results"
      9. Navigate to http://localhost:5173/apply
      10. Assert document.title contains "Apply"
    Expected Result: Each page has a unique, descriptive title
    Failure Indicators: Same title on all pages, missing titles, generic "React App" title
    Evidence: .sisyphus/evidence/task-23-seo-titles.png

  Scenario: OG meta tags present
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/about
      2. Evaluate: document.querySelector('meta[property="og:title"]')?.content
      3. Assert og:title contains "About"
      4. Evaluate: document.querySelector('meta[property="og:description"]')?.content
      5. Assert og:description is non-empty
    Expected Result: OG meta tags populated for each page
    Failure Indicators: Missing og:title or og:description
    Evidence: .sisyphus/evidence/task-23-seo-og.png
  ```

  **Commit**: YES (groups with T24-T25)
  - Message: `feat(polish): add SEO meta, refine sections, mobile QA fixes`
  - Files: `package.json`, `src/main.tsx`, `src/pages/*.tsx`
  - Pre-commit: `npm run build`

- [ ] 24. Homepage section refinement (shortened about, results teasers, full CTA)

  **What to do**:
  - **Refine AboutSection (homepage version)**:
    - The current AboutSection is a full bio — now that `/about` exists, shorten the homepage version
    - Keep: Professional headshot, key credentials (CredentialsList compact variant), 2-3 sentence summary
    - Add: "View Full Bio" button/link → `/about` (React Router Link)
    - Remove: Detailed personal story, extended philosophy (now on /about page)
    - File: Either modify `src/sections/AboutSection.tsx` in place, or create a new shortened version
  - **Refine ResultsSection (homepage version)**:
    - Shorten from full results to a teaser:
    - Keep: 2-3 highlight case studies using CaseStudyCard (compact variant from T5), aggregate stats bar
    - Add: "See All Results" button/link → `/results` (React Router Link)
    - Remove: Full testimonials section (now on /results page)
    - File: Modify `src/sections/ResultsSection.tsx`
  - **Build CTASection (full implementation)**:
    - This is the conversion anchor section near the bottom of the homepage:
    - Heading: "Ready to Transform Your Performance?" (Bebas Neue)
    - Subheading: Brief compelling copy about taking the next step
    - Two CTA buttons side by side:
      1. "Apply for Coaching" → `/apply` (primary, brand red)
      2. "Schedule a Strategy Call" → external link or /apply with note `[DRAFT — Strategy call booking link TBD]`
    - Background: Dark/brand treatment to stand out from surrounding sections
    - GSAP fade-in animation
    - Section ID: `cta`
    - File: `src/sections/CTASection.tsx` (placeholder from T6)
  - Update `src/pages/HomePage.tsx` if any import changes needed

  **Must NOT do**:
  - Do NOT remove AboutSection or ResultsSection entirely — they stay on homepage as teasers
  - Do NOT duplicate full page content on homepage — keep teasers short with "View More" links
  - Do NOT add more than 2 CTA buttons in CTASection
  - Do NOT use `<a href>` for internal links — use React Router `<Link>`

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Section redesign requiring visual balance, CTA design, responsive layout
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Teaser design, CTA prominence, visual hierarchy

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T23, T25)
  - **Parallel Group**: Wave 6
  - **Blocks**: T25
  - **Blocked By**: T10-T15 (homepage sections built), T16 (about page exists to link to), T21 (results page exists to link to)

  **References**:
  - `src/sections/AboutSection.tsx` — ENTIRE FILE — current full about. Shorten to teaser + "View Full Bio" link
  - `src/sections/ResultsSection.tsx` — ENTIRE FILE — current results. Shorten to 2-3 highlights + "See All Results" link
  - `src/sections/CTASection.tsx` — placeholder from T6. Build full conversion section
  - `src/components/CaseStudyCard.tsx` — compact variant for homepage results teaser
  - `src/components/CredentialsList.tsx` — compact variant for homepage about teaser
  - `src/index.css` — `.btn-primary`, `.section-spacing`, `.accent-rule`
  - `src/lib/gsap.ts` — centralized GSAP
  - `react-router` — `Link` component for internal navigation

  **Acceptance Criteria**:
  - [ ] Homepage AboutSection is shortened with "View Full Bio" link to /about
  - [ ] Homepage ResultsSection is shortened with "See All Results" link to /results
  - [ ] CTASection has heading, subheading, and 2 CTA buttons
  - [ ] Primary CTA links to /apply
  - [ ] "View Full Bio" navigates to /about
  - [ ] "See All Results" navigates to /results
  - [ ] CTASection has dark/brand background treatment
  - [ ] `npm run build` passes

  **QA Scenarios:**
  ```
  Scenario: Homepage teasers link to full pages
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/
      2. Scroll to about section — assert "View Full Bio" or similar link exists
      3. Click "View Full Bio" link — assert URL changes to /about
      4. Navigate back to http://localhost:5173/
      5. Scroll to results section — assert "See All Results" or similar link exists
      6. Click "See All Results" link — assert URL changes to /results
    Expected Result: Teaser sections link to full content pages
    Failure Indicators: Missing links, wrong destinations, full content still on homepage
    Evidence: .sisyphus/evidence/task-24-homepage-teasers.png

  Scenario: CTASection renders with dual CTA buttons
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running
    Steps:
      1. Navigate to http://localhost:5173/
      2. Scroll to #cta section
      3. Assert heading containing "Transform" or "Ready" or "Performance"
      4. Assert at least 2 CTA buttons/links visible
      5. Assert one button links to /apply
      6. Assert section has distinct background (dark or branded)
    Expected Result: CTASection with dual CTA buttons and branded background
    Failure Indicators: Missing CTAs, no background treatment, only one button
    Evidence: .sisyphus/evidence/task-24-cta-section.png
  ```

  **Commit**: YES (groups with T23, T25)
  - Message: `feat(polish): add SEO meta, refine sections, mobile QA fixes`
  - Files: `src/sections/AboutSection.tsx`, `src/sections/ResultsSection.tsx`, `src/sections/CTASection.tsx`
  - Pre-commit: `npm run build`

- [ ] 25. Mobile QA pass and responsive fixes

  **What to do**:
  - Systematic mobile viewport testing of EVERY page using Playwright:
    - Test at viewport 375x812 (iPhone SE/small) and 768x1024 (iPad/tablet)
    - For EACH route (/, /about, /coaching, /youth-pathway, /camps, /coach-mentorship, /results, /apply, /404):
      1. Navigate to the page
      2. Check for horizontal overflow (no horizontal scroll)
      3. Check all text is readable (not overflowing containers)
      4. Check images are contained (not breaking layout)
      5. Check buttons/links are tappable size (min 44x44px touch targets)
      6. Check spacing is appropriate (not too cramped or too spread)
      7. Screenshot at both viewport sizes
  - **Mobile Navigation QA**:
    - Open hamburger menu → verify all links visible
    - Tap a link → verify menu closes and page navigates
    - Test on multiple pages to ensure consistent behavior
  - **Apply Form Mobile QA**:
    - Test all 4 steps at mobile viewport
    - Verify select dropdowns are usable on mobile
    - Verify step indicator doesn't overflow
    - Verify buttons are full-width or appropriately sized
  - **Fix any issues found**:
    - Common fixes: overflow-hidden on containers, responsive text sizes, flex-wrap, proper padding
    - Grid columns: Verify all 2-col and 3-col layouts collapse to 1-col on mobile
    - Images: max-w-full and object-cover
    - Update Tailwind classes as needed

  **Must NOT do**:
  - Do NOT change desktop layouts — only fix mobile/tablet issues
  - Do NOT add new features — this is QA and responsive fixes only
  - Do NOT skip any route — every single page must be tested

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Mobile responsive testing and CSS fixes require visual engineering
  - **Skills**: [`frontend-ui-ux`, `playwright`]
    - `frontend-ui-ux`: Responsive design patterns and CSS fixes
    - `playwright`: Automated viewport testing and screenshots

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on all pages being complete)
  - **Parallel Group**: Wave 6 (can run with T23-T24 but must follow T16-T22)
  - **Blocks**: Final Verification Wave
  - **Blocked By**: T8 (mobile nav), T16-T22 (all pages), T24 (section refinements)

  **References**:
  - ALL page files: `src/pages/*.tsx`
  - ALL section files: `src/sections/*.tsx`
  - `src/components/Navigation.tsx` — mobile menu behavior from T8
  - `src/pages/ApplyPage.tsx` — form mobile layout from T22
  - `src/index.css` — responsive utilities and custom classes
  - `tailwind.config.js` — breakpoint definitions (sm, md, lg, xl)
  - Tailwind responsive prefix docs: `sm:`, `md:`, `lg:` usage patterns

  **Acceptance Criteria**:
  - [ ] All 9 routes tested at 375x812 viewport — no horizontal overflow
  - [ ] All 9 routes tested at 768x1024 viewport — no layout breakage
  - [ ] Mobile nav hamburger menu opens, shows all links, closes on selection
  - [ ] Apply form usable on mobile (all 4 steps)
  - [ ] All multi-column layouts collapse to single column on mobile
  - [ ] All touch targets >= 44x44px
  - [ ] Screenshots captured for every page at both viewports
  - [ ] `npm run build` passes

  **QA Scenarios:**
  ```
  Scenario: All pages render without horizontal overflow on mobile
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running, viewport set to 375x812
    Steps:
      1. Set viewport to 375x812
      2. For EACH route in [/, /about, /coaching, /youth-pathway, /camps, /coach-mentorship, /results, /apply]:
         a. Navigate to the route
         b. Evaluate: document.documentElement.scrollWidth > document.documentElement.clientWidth
         c. Assert scrollWidth <= clientWidth (no horizontal overflow)
         d. Screenshot the full page
    Expected Result: No horizontal overflow on any page at mobile viewport
    Failure Indicators: Horizontal scroll present, content extending beyond viewport
    Evidence: .sisyphus/evidence/task-25-mobile-[pagename].png (one per page)

  Scenario: Mobile navigation works end-to-end
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running, viewport set to 375x812
    Steps:
      1. Set viewport to 375x812
      2. Navigate to http://localhost:5173/
      3. Assert hamburger/menu button is visible
      4. Click hamburger button — assert menu opens
      5. Assert menu contains links: About, Coaching, Youth Pathway, Camps, Coach Mentorship, Results, Apply (or similar)
      6. Click "About" link in mobile menu
      7. Assert URL changes to /about
      8. Assert mobile menu is closed
      9. Click hamburger again — assert menu opens again
    Expected Result: Mobile menu opens, navigates, closes correctly
    Failure Indicators: Menu doesn't open, links missing, menu stays open after navigation
    Evidence: .sisyphus/evidence/task-25-mobile-nav.png

  Scenario: Apply form usable on mobile viewport
    Tool: Playwright (playwright skill)
    Preconditions: `npm run dev` running, viewport set to 375x812
    Steps:
      1. Set viewport to 375x812
      2. Navigate to http://localhost:5173/apply
      3. Assert step indicator visible and not overflowing
      4. Fill name: "Mobile Test"
      5. Fill email: "mobile@test.com"
      6. Select age range
      7. Assert Next button is tappable (visible, not hidden behind other elements)
      8. Click Next — assert step 2 renders properly on mobile
      9. Screenshot each step at mobile viewport
    Expected Result: Form fully usable on mobile
    Failure Indicators: Fields overflow, buttons hidden, step indicator broken
    Evidence: .sisyphus/evidence/task-25-mobile-apply.png
  ```

  **Commit**: YES (groups with T23-T24)
  - Message: `feat(polish): add SEO meta, refine sections, mobile QA fixes`
  - Files: Various CSS/layout fixes across pages and sections
  - Pre-commit: `npm run build`

## Final Verification Wave

> 4 review agents run in PARALLEL. ALL must APPROVE. Rejection → fix → re-run.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `npx tsc --noEmit` + `npm run lint` + `npm run build`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod (except form submission logs), commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names (data/result/item/temp). Verify all imports use `@/` path aliases. Verify all shadcn imports are from specific files not barrels. Verify `cn()` used for conditional classes.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start from clean state (`npm run dev`). Navigate EVERY route (/, /about, /coaching, /youth-pathway, /camps, /coach-mentorship, /results, /apply, /nonexistent-page). On each page: verify content renders, no console errors, GSAP animations play, CTABanner present, navigation works (desktop + mobile viewport). Test Apply form: fill all steps, trigger validation errors, complete submission. Test homepage scroll-to-section. Test cross-page links. Save screenshots to `.sisyphus/evidence/final-qa/`.
  Output: `Routes [N/N pass] | Nav [desktop/mobile] | Forms [pass/fail] | Animations [pass/fail] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (`git diff main...develop`). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N touching Task M's files. Flag unaccounted changes. Verify `main` branch is completely untouched.
  Output: `Tasks [N/N compliant] | Main Branch [UNTOUCHED/MODIFIED] | Contamination [CLEAN/N issues] | VERDICT`

---

## Commit Strategy

Commits grouped by wave for clean git history:

| After | Message | Key Files |
|-------|---------|-----------|
| T1 | `chore: create develop branch and install routing dependencies` | package.json, package-lock.json |
| T2 | `chore: fix vite config, clean up index.css, centralize GSAP` | vite.config.ts, index.css, src/lib/gsap.ts |
| T3 | `feat(router): add React Router with layout and route definitions` | src/main.tsx, src/layouts/RootLayout.tsx |
| T4-T5 | `feat(components): add reusable PageHero, CTABanner, cards` | src/components/*.tsx |
| T6-T7 | `feat(pages): add HomePage shell and 404 page` | src/pages/HomePage.tsx, src/pages/NotFoundPage.tsx |
| T8-T9 | `feat(nav): rebuild navigation with mobile menu and update footer` | src/components/Navigation.tsx, src/components/Footer.tsx |
| T10-T15 | `feat(homepage): restructure homepage with 9 sections` | src/sections/*.tsx |
| T16-T20 | `feat(pages): add About, Coaching, Youth, Camps, Mentorship pages` | src/pages/*.tsx |
| T21 | `feat(pages): add Results page with case studies` | src/pages/ResultsPage.tsx |
| T22 | `feat(pages): add multi-step Apply form` | src/pages/ApplyPage.tsx |
| T23-T25 | `feat(polish): add SEO meta, refine sections, mobile QA fixes` | various |

Pre-commit for all: `npm run build`

---

## Success Criteria

### Verification Commands
```bash
npm run build          # Expected: Build succeeds with zero errors
npm run lint           # Expected: No lint errors
npx tsc --noEmit       # Expected: No TypeScript errors
npm run dev            # Expected: Dev server starts, all routes accessible
git log main --oneline # Expected: Still at d59fa12 (untouched)
```

### Final Checklist
- [ ] All 8 routes render (/, /about, /coaching, /youth-pathway, /camps, /coach-mentorship, /results, /apply)
- [ ] 404 page renders for unknown routes
- [ ] Mobile navigation (hamburger menu) works
- [ ] Homepage scroll-to-section works for all 9 sections
- [ ] Cross-page navigation works from any page
- [ ] Apply form multi-step flow works with validation
- [ ] All GSAP animations play on scroll
- [ ] ScrollRestoration works (navigating to a page scrolls to top)
- [ ] `npm run build` passes
- [ ] `main` branch untouched (still at `d59fa12`)
- [ ] Draft content marked with `[DRAFT]` where client input needed
- [ ] Brand colors and fonts consistent across all pages
