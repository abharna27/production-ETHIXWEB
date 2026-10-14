# AGENTS.md — Project Rules for Website Redesign

Place this file in your project ROOT (same level as package.json).
Antigravity reads this automatically before starting any task, in every session,
so these rules stay in force across all your prompts.

## Project context
- Stack: React , tailwind css
- There is no local codebase yet. The project starts from scratch in this workspace.
- There IS a live current website (CURRENT_SITE_URL below) whose content, pages,
  routes and functionality must be preserved/rebuilt.
- There is a finalized BASE site (BASE_SITE_URL below) whose visual design system
  (colors, typography, animations, scroll effects, layout) is the target look.
- Step 1 of this project: scaffold a new Next.js project, rebuild the current
  site's content/pages inside it, and apply the base site's design system
  (colors, typography, spacing, animations, scroll effects) to it.
- Step 2 onward: once specific extra elements are identified from OTHER reference
  sites (a navbar from one site, a hover effect from another, etc.), those are
  done one element at a time, each in its own prompt. Do not pre-emptively pull
  in elements from sites that haven't been specified yet.

## Non-negotiable rules

1. **Scope discipline** — Never touch, rewrite, or "improve" a file/component that
   wasn't explicitly part of the current task. If you notice something else that
   looks wrong, mention it in your report, don't fix it unprompted.

2. **Always inspect live, never guess from a screenshot** — Before copying any
   element from a reference site:
   - Open the real, live URL using your browser subagent.
   - Read the actual rendered HTML/DOM (via inspect/view-source), not just how it looks.
   - Read the real CSS: computed styles, class names, breakpoints, spacing units.
   - Check JS-driven behavior (scroll animations, hover states, mobile menu behavior)
     by actually interacting with the live page.
   - If your JavaScript execution policy is restricted and you can't test interaction,
     say so explicitly instead of guessing.

3. **Report before you code** — After inspecting a reference element, summarize in
   plain language what you found (structure, key CSS values, animation library if
   any, breakpoints) and flag anything ambiguous. Wait for my confirmation before
   writing code if anything is unclear.

4. **Adapt, don't clone** — Match the reference site's STRUCTURE and INTERACTION
   pattern. Use OUR existing brand colors, fonts, spacing scale, logo, and content.
   Never paste another site's branding wholesale unless I explicitly say so.

5. **Don't break what already works** — Keep all existing routes, functionality,
   and content intact. No silent deletions of existing code.

6. **One element per task** — Finish and report on the current element before
   moving to the next one, even if the next step seems obvious.

7. **Report after every change** — Tell me exactly: which files were created/changed,
   what was added or modified, and any assumptions you made along the way.

8. **Ask, don't assume** — If an instruction is unclear, or conflicts with the
   existing codebase, stop and ask me instead of guessing.

9. **No silent new dependencies** — Don't add a new npm package / library without
   asking first and telling me why it's needed.

10. **Match our existing code style** — Follow the naming conventions, component
    structure, and styling approach already used in this codebase (check it first
    in Phase 1) for any new code you write.

## Sites involved in this redesign

- Current site (content/pages/functionality to preserve):https://www.ethixweb.com/
- Base site (target design system — colors, typography, animations, scroll
  effects, layout): https://www.butter.video/
- Reference A — element to borrow later: [WHAT_ELEMENT] — [REFERENCE_SITE_1_URL]
- Reference B — element to borrow later: [WHAT_ELEMENT] — [REFERENCE_SITE_2_URL]
(Reference A/B rows get filled in once those elements are decided — leave blank
until then, don't guess at them.)

## Definition of "done" for each task

- The element visually and behaviorally matches the intent borrowed from the
  reference site, adapted to our brand.
- Responsive and checked at mobile / tablet / desktop widths.
- No console errors introduced.
- All existing pages/components still work.