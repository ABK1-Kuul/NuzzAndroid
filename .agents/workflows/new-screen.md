---
description: Build one screen from its spec and reference screenshot
---
1. Ask which screen to build. Read its section in `docs/SPEC.md` and open the matching screenshot in `docs/screenshots/`.
2. Read `.agents/rules/theme.md` and `.agents/rules/data-layer.md`.
3. Write a short plan: files to create or edit, components to reuse, repository functions needed, and the mobile adaptation of the web layout. Wait for approval.
4. Implement. Reuse components from `src/components/`; create new shared components there, not inside the screen.
5. Add loading, empty and error states.
6. Run the `/verify` workflow and fix any failures.
7. Commit with the message `feat(<screen>): <summary>`.
8. Report: what was built, which acceptance criteria pass, and anything deferred.
