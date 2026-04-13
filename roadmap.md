# Brain De-rotter — Chrome Extension Implementation Plan

## Overview

A Chrome extension (Manifest V3) that introduces friction into YouTube Shorts to reduce passive scrolling and enforce intentional engagement.

---

## High-Level Architecture

* **Content Script**: Injected into YouTube Shorts pages; controls UI overlays, tracking, and interaction logic.
* **Background Service Worker**: Handles persistent state, messaging, and future analytics.
* **Storage Layer**: Chrome storage API for counters, streaks, and difficulty progression.
* **UI Layer**: Overlays (blur screen, prompts, math challenges).

---

## File Structure

```
brain-de-rotter/
│
├── manifest.json
├── background.js
├── content/
│   ├── content.js
│   ├── observer.js
│   ├── counter.js
│   ├── gatekeeper.js
│   ├── mathEngine.js
│   └── ui/
│       ├── overlay.js
│       ├── styles.css
│       └── components.js
│
├── utils/
│   ├── storage.js
│   └── constants.js
│
├── assets/
│   └── icons/
│
└── README.md
```

---

## Core Components

### 1. manifest.json

Defines:

* Manifest V3
* Permissions:

  * `storage`
  * `tabs`
  * `activeTab`
* Host permissions:

  * `https://www.youtube.com/*`
* Content script injection:

  * Matches: `/shorts/*`

---

### 2. Content Script (content.js)

Main orchestrator.

Responsibilities:

* Initialize modules
* Start observer
* Track current video
* Trigger gates and overlays

---

### 3. Shorts Detection (observer.js)

Key problem: YouTube Shorts is a SPA.

Approach:

* Use `MutationObserver` to detect DOM changes
* Detect URL changes (`/shorts/{id}`)
* Identify active video container

Exports:

* `onShortChange(callback)`

---

### 4. Counter Logic (counter.js)

Tracks:

* Total posts viewed
* Posts since last gate (mod 5)

Rules:

* Every 5 posts → trigger gate
* At 30 posts → close tab

---

### 5. Gatekeeper (gatekeeper.js)

Controls flow:

```
if (count % 5 === 0):
    showIntentPrompt()

if (count >= 30):
    closeTab()
```

Handles:

* Yes/No logic
* Blocking progression until solved

---

### 6. Math Engine (mathEngine.js)

Generates problems with increasing difficulty.

Difficulty progression:

1. Addition/Subtraction
2. Multiplication
3. Division
4. Multi-step expressions

API:

* `generateProblem(level)`
* `validateAnswer(problem, input)`

---

### 7. UI Layer

#### overlay.js

Creates:

* Blur screen
* Prompt modal
* Input fields

#### styles.css

* Blur effect
* Centered modal
* Minimal intrusive design

#### components.js

Reusable UI builders:

* Button
* Modal
* Input

---

### 8. Storage (storage.js)

Uses `chrome.storage.local`.

Stores:

* Total posts viewed
* Current session count
* Difficulty level
* Streaks (future feature)

---

### 9. Background Worker (background.js)

Minimal initially.

Future use:

* Analytics collection
* Reward system integration
* Cross-tab tracking

---

## Core Logic Flow

1. User opens YouTube Shorts
2. Content script initializes
3. Observer detects first video
4. Each new video:

   * Increment counter
   * Check rules
5. Every 5 videos:

   * Blur screen
   * Ask: “Are you still here intentionally?”
6. If YES:

   * Show math problem
   * Block until correct
7. If NO:

   * Close tab
8. At 30 videos:

   * Force close tab

---

## Key Technical Challenges

### 1. Detecting video transitions

* Must rely on DOM mutations or URL changes

### 2. Preventing bypass

* Ensure overlay blocks interaction
* Disable scrolling/input beneath overlay

### 3. Smooth UX

* Avoid laggy overlays
* Keep prompts fast and responsive

---

## MVP Scope (Build First)

* Detect Shorts video changes
* Track count
* Blur + prompt every 5 videos
* Simple math problem (fixed difficulty)
* Hard stop at 30 videos

---

## Phase 2 Enhancements

* Difficulty scaling
* Streak tracking
* Rewards system (e.g., discounts)
* Analytics dashboard

---

## Step-by-Step Implementation Plan

1. Setup manifest.json
2. Inject content script
3. Detect Shorts video changes
4. Implement counter
5. Build basic overlay UI
6. Add prompt logic
7. Add math challenge
8. Enforce blocking behavior
9. Add 30-video cutoff
10. Polish UI/UX

---

## Notes

* Start with everything inside `content.js`, then refactor into modules
* Optimize for correctness first, not architecture
* YouTube DOM may change — keep selectors flexible
