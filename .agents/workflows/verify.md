# Workflow: /verify — Typecheck, Lint, Run, Screenshot

Execute this workflow to validate code health, static rules, and visual correctness before considering any task done.

---

## The 4-Stage Verification Pipeline

```
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│ 1. Typecheck     │───▶│ 2. Static Rules  │───▶│ 3. Run & Test    │───▶│ 4. Screenshot    │
│ (tsc --noEmit)   │    │ (ESLint + Grep)  │    │ (Jest / Metro)   │    │ (adb screencap)  │
└──────────────────┘    └──────────────────┘    └──────────────────┘    └──────────────────┘
```

---

## Stage 1: TypeScript Type Checking
Verify all types across the workspace with zero tolerance for errors:

```bash
# Command:
npx tsc --noEmit
```
- **Exit Requirement**: Must exit with code `0`.
- **Zero Suppressions**: No newly introduced `@ts-ignore` or `any` escape hatches.

---

## Stage 2: Static Rules & Anti-Pattern Audit

### 2.1 ESLint
```bash
npm run lint
```

### 2.2 Theme Rule Audit (No Hardcoded Colors)
Verify that no hardcoded colors exist in UI components:
```powershell
# PowerShell static grep:
Select-String -Path "src\components\*.tsx", "src\screens\*.tsx" -Pattern '#[0-9a-fA-F]{3,6}|rgba?\(' -AllMatches
```
- **Exit Requirement**: Must produce **0 matches**. All colors must come from `useTheme().colors`.

### 2.3 Data Layer Audit (No Direct Mock Imports)
Verify that no component imports mock data directly:
```powershell
Select-String -Path "src\components\*.tsx", "src\screens\*.tsx" -Pattern 'from.*mock' -AllMatches
```
- **Exit Requirement**: Must produce **0 matches**. All data must flow through hooks/repositories.

---

## Stage 3: Run & Automated Tests
Execute test suites (if defined):
```bash
npm test -- --passWithNoTests
```

---

## Stage 4: Visual Screenshot Verification
When running on an Android emulator or device, capture a visual screenshot for proof of visual fidelity:

```powershell
# Path to ADB on this machine:
$ADB = "C:\Users\admin\AppData\Local\Android\Sdk\platform-tools\adb.exe"

# Capture current device screen and save to docs/screenshots:
& $ADB exec-out screencap -p > "docs\screenshots\<screen_name>-<state>.png"
```

### Screenshot Naming Standard:
- `timer-idle.png`
- `timer-running.png`
- `timer-paused.png`
- `social-feed.png`
- `room-battle.png`
- `profile-stats.png`

---

## Final Verification Checklist
- [ ] TypeScript check passed (`tsc --noEmit` -> 0 errors)
- [ ] No hardcoded colors found in components
- [ ] No direct mock imports found in components
- [ ] Unit tests passed
- [ ] Visual screenshot captured and inspected in `docs/screenshots/`
- [ ] Corresponding criteria in `docs/SPEC.md` verified
