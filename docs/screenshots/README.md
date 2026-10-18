# Nuzz Screen Visual Captures

This directory stores visual verification screenshots and design reference assets for Nuzz Android.

## Naming Conventions
Every screenshot must be named after its corresponding screen and state from [`docs/SPEC.md`](file:///c:/NuzzAndroid/docs/SPEC.md):

| Screen | File Name Pattern | Example |
| :--- | :--- | :--- |
| **Focus Timer** | `timer-<state>.png` | `timer-idle.png`, `timer-running.png`, `timer-paused.png`, `timer-completed.png` |
| **Social Feed** | `feed-<state>.png` | `feed-default.png`, `feed-cheer-active.png` |
| **Study Rooms / Battle** | `rooms-<state>.png` | `rooms-lobby.png`, `rooms-active-battle.png` |
| **Profile & Analytics** | `profile-<state>.png` | `profile-stats.png`, `profile-badges.png` |
| **Settings** | `settings-<state>.png` | `settings-main.png`, `settings-tags.png` |

---

## How to Capture Screenshots
Use ADB to capture directly from a connected Android device or running emulator:

```powershell
$ADB = "C:\Users\admin\AppData\Local\Android\Sdk\platform-tools\adb.exe"
& $ADB exec-out screencap -p > "docs\screenshots\<screen-name>-<state>.png"
```

Refer to [`.agents/workflows/verify.md`](file:///c:/NuzzAndroid/.agents/workflows/verify.md) for full verification guidelines.
