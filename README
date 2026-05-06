# Brain De-rotter

Brain De-rotter is a Chrome extension that adds intentional friction to YouTube Shorts. Instead of letting a user fall into an endless swipe loop, it interrupts the flow with intent checks, general-knowledge questions, cooldowns, and a lightweight rewards system.

## What it does

- Watches YouTube Shorts navigation and tracks each new Short in the current session.
- Shows an intent check every 5 Shorts.
- Rotates through 5 general-knowledge question categories:
  - History
  - Science
  - Geography
  - Arts and Culture
  - Technology
- Enforces a hard limit after 30 Shorts.
- Starts a 2-hour cooldown if the user clicks `No` on the intent check or hits the hard limit.
- Awards 100 points for every 5 hours a user stays away from Shorts.
- Unlocks a simulated 15% lululemon code once the user reaches 1000 points.
- Shows a persistent rewards panel with current points and the next reward milestone.

## Project structure

- `src/content/content.js`: boots the content script and connects the observer, state, and gatekeeper.
- `src/content/observer.js`: detects YouTube Shorts URL changes in the SPA flow.
- `src/content/counter.js`: persistent state for session count, cooldown, points, and testing toggles.
- `src/content/gatekeeper.js`: intent checks, question gating, cooldown enforcement, and rewards UI updates.
- `src/content/questionEngine.js`: rotating bank of general-knowledge questions.
- `src/content/ui/overlay.js`: overlays, banners, toasts, and rewards panel UI.
- `src/background/background.js`: background worker used for tab closing.
- `dist/`: built extension assets produced by Vite.

## Local development

### Install dependencies

```bash
npm install
```

### Build the extension

```bash
npm run build
```

### Load in Chrome

1. Open `chrome://extensions`.
2. Turn on Developer Mode.
3. Click `Load unpacked`.
4. Select this repository's `dist/` folder.

When you make source changes, run `npm run build` again and reload the extension in Chrome.

## Testing toggles

The main testing toggles live in `src/content/counter.js`.

- `DISABLE_COOLDOWN_FOR_TESTING`
  - When `true`, cooldowns are bypassed.
- `UNLOCK_REWARD_FOR_TESTING`
  - When `true`, the rewards panel behaves as if the user has already unlocked the 1000-point reward state.

These are intended for local manual testing only.

## Notes

- This project currently targets `https://www.youtube.com/shorts/*`.
- State is stored with `chrome.storage.local`.
- The built extension bundle is checked in under `dist/`.
