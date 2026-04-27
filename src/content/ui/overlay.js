const STYLE_ID = "brain-derotter-styles";
const STATUS_ID = "brain-derotter-status";
const BANNER_ID = "brain-derotter-banner";
const TOAST_ID = "brain-derotter-toast";

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) {
    return;
  }

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    :root {
      --bdr-ink: #0f172a;
      --bdr-panel: rgba(255, 248, 240, 0.94);
      --bdr-panel-strong: rgba(255, 255, 255, 0.98);
      --bdr-line: rgba(15, 23, 42, 0.1);
      --bdr-accent: #ff6b35;
      --bdr-accent-deep: #c2410c;
      --bdr-gold: #f4b400;
      --bdr-sage: #2f6f62;
      --bdr-muted: #5b6475;
      --bdr-shadow: 0 24px 80px rgba(15, 23, 42, 0.24);
      --bdr-radius: 22px;
    }

    @keyframes bdrFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes bdrRiseIn {
      from { opacity: 0; transform: translateY(14px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @keyframes bdrSlideDown {
      from { opacity: 0; transform: translate(-50%, -18px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    }

    .bdr-overlay {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background:
        radial-gradient(circle at top, rgba(255, 196, 118, 0.24), transparent 34%),
        linear-gradient(160deg, rgba(11, 15, 25, 0.86), rgba(20, 20, 33, 0.74));
      backdrop-filter: blur(18px);
      z-index: 999999;
      animation: bdrFadeIn 180ms ease-out;
    }

    .bdr-card {
      width: min(460px, calc(100vw - 32px));
      border: 1px solid rgba(255, 255, 255, 0.22);
      border-radius: var(--bdr-radius);
      padding: 28px;
      color: var(--bdr-ink);
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 248, 240, 0.94));
      box-shadow: var(--bdr-shadow);
      font-family: "Avenir Next", "Trebuchet MS", "Segoe UI", sans-serif;
      animation: bdrRiseIn 200ms ease-out;
    }

    .bdr-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 7px 11px;
      border-radius: 999px;
      background: rgba(255, 107, 53, 0.12);
      color: var(--bdr-accent-deep);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .bdr-title {
      margin: 18px 0 10px;
      font-size: clamp(28px, 3vw, 34px);
      line-height: 1.02;
      font-weight: 800;
    }

    .bdr-subtitle {
      margin: 0;
      color: var(--bdr-muted);
      font-size: 15px;
      line-height: 1.55;
    }

    .bdr-question {
      margin: 22px 0 0;
      padding: 18px 18px 20px;
      border-radius: 18px;
      background: rgba(15, 23, 42, 0.04);
      border: 1px solid rgba(15, 23, 42, 0.06);
      font-size: 20px;
      font-weight: 700;
      line-height: 1.35;
      text-wrap: balance;
    }

    .bdr-input {
      width: 100%;
      margin-top: 16px;
      padding: 15px 16px;
      border-radius: 16px;
      border: 1px solid rgba(15, 23, 42, 0.12);
      background: rgba(255, 255, 255, 0.92);
      color: var(--bdr-ink);
      font: inherit;
      font-size: 15px;
      outline: none;
      box-sizing: border-box;
      transition: border-color 150ms ease, box-shadow 150ms ease, transform 150ms ease;
    }

    .bdr-input:focus {
      border-color: rgba(255, 107, 53, 0.48);
      box-shadow: 0 0 0 4px rgba(255, 107, 53, 0.12);
      transform: translateY(-1px);
    }

    .bdr-actions {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      margin-top: 20px;
    }

    .bdr-actions-single {
      grid-template-columns: minmax(0, 1fr);
    }

    .bdr-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 48px;
      padding: 0 16px;
      border: 0;
      border-radius: 16px;
      cursor: pointer;
      font: inherit;
      font-size: 15px;
      font-weight: 700;
      transition: transform 150ms ease, box-shadow 150ms ease, opacity 150ms ease;
    }

    .bdr-button:hover {
      transform: translateY(-1px);
    }

    .bdr-button-primary {
      color: white;
      background: linear-gradient(135deg, var(--bdr-accent), var(--bdr-accent-deep));
      box-shadow: 0 16px 28px rgba(194, 65, 12, 0.28);
    }

    .bdr-button-secondary {
      color: var(--bdr-ink);
      background: rgba(15, 23, 42, 0.08);
    }

    .bdr-feedback {
      min-height: 22px;
      margin-top: 12px;
      color: var(--bdr-accent-deep);
      font-size: 14px;
      font-weight: 700;
    }

    .bdr-status {
      position: fixed;
      top: 18px;
      right: 18px;
      width: min(320px, calc(100vw - 36px));
      padding: 18px;
      border-radius: 20px;
      color: var(--bdr-ink);
      background:
        radial-gradient(circle at top right, rgba(255, 209, 102, 0.22), transparent 32%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 248, 240, 0.95));
      box-shadow: 0 18px 40px rgba(15, 23, 42, 0.28);
      font-family: "Avenir Next", "Trebuchet MS", "Segoe UI", sans-serif;
      z-index: 999998;
      backdrop-filter: blur(16px);
      border: 1px solid rgba(15, 23, 42, 0.08);
    }

    .bdr-status-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .bdr-status-title {
      font-size: 14px;
      font-weight: 700;
      opacity: 0.72;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .bdr-status-points {
      margin-top: 8px;
      font-size: 34px;
      font-weight: 800;
      line-height: 1;
    }

    .bdr-status-points span {
      font-size: 14px;
      font-weight: 700;
      opacity: 0.75;
      margin-left: 8px;
    }

    .bdr-progress {
      height: 10px;
      margin-top: 14px;
      border-radius: 999px;
      overflow: hidden;
      background: rgba(15, 23, 42, 0.08);
    }

    .bdr-progress > div {
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, #ff9a62, #ffd166);
      transition: width 240ms ease;
    }

    .bdr-status-copy {
      margin-top: 12px;
      font-size: 13px;
      line-height: 1.5;
      color: rgba(15, 23, 42, 0.72);
    }

    .bdr-status-code {
      margin-top: 14px;
      padding: 12px 14px;
      border-radius: 16px;
      background: rgba(15, 23, 42, 0.04);
      border: 1px solid rgba(15, 23, 42, 0.08);
      font-size: 13px;
      line-height: 1.5;
    }

    .bdr-status-code strong {
      display: block;
      margin-bottom: 4px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0.62;
    }

    .bdr-banner {
      position: fixed;
      top: 18px;
      left: 50%;
      transform: translateX(-50%);
      width: min(560px, calc(100vw - 36px));
      padding: 14px 18px;
      border-radius: 18px;
      color: #fffdf8;
      background: linear-gradient(135deg, rgba(194, 65, 12, 0.94), rgba(127, 29, 29, 0.92));
      box-shadow: 0 18px 40px rgba(120, 53, 15, 0.32);
      z-index: 999997;
      font-family: "Avenir Next", "Trebuchet MS", "Segoe UI", sans-serif;
      animation: bdrSlideDown 180ms ease-out;
    }

    .bdr-banner-title {
      font-size: 14px;
      font-weight: 800;
    }

    .bdr-banner-body {
      margin-top: 4px;
      font-size: 13px;
      line-height: 1.45;
      color: rgba(255, 253, 248, 0.82);
    }

    .bdr-toast {
      position: fixed;
      right: 18px;
      bottom: 18px;
      max-width: min(320px, calc(100vw - 36px));
      padding: 14px 16px;
      border-radius: 18px;
      background: rgba(47, 111, 98, 0.96);
      color: #f8fafc;
      box-shadow: 0 18px 40px rgba(15, 23, 42, 0.24);
      font-family: "Avenir Next", "Trebuchet MS", "Segoe UI", sans-serif;
      font-size: 14px;
      font-weight: 700;
      line-height: 1.45;
      z-index: 999998;
      animation: bdrRiseIn 180ms ease-out;
    }

    @media (max-width: 680px) {
      .bdr-status {
        top: auto;
        right: 12px;
        bottom: 12px;
        width: min(100vw - 24px, 320px);
      }

      .bdr-banner {
        top: 12px;
        width: calc(100vw - 24px);
      }

      .bdr-card {
        padding: 22px;
      }

      .bdr-title {
        font-size: 26px;
      }
    }
  `;

  document.head.appendChild(style);
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (typeof text === "string") {
    element.textContent = text;
  }

  return element;
}

function ensureContainer(id, className) {
  ensureStyles();

  let element = document.getElementById(id);

  if (!element) {
    element = document.createElement("div");
    element.id = id;
    element.className = className;
    document.body.appendChild(element);
  }

  return element;
}

export function updateStatusPanel({
  points,
  rewardProgress,
  discountCode,
  nextRewardText,
  footerText
}) {
  const panel = ensureContainer(STATUS_ID, "bdr-status");

  panel.innerHTML = "";

  const header = makeElement("div", "bdr-status-header");
  const title = makeElement("div", "bdr-status-title", "Rewards");
  const badge = makeElement("div", "bdr-eyebrow", discountCode ? "15% unlocked" : "Earn mode");
  header.append(title, badge);

  const pointsLine = makeElement("div", "bdr-status-points");
  pointsLine.textContent = String(points);
  const suffix = makeElement("span", "", "points");
  pointsLine.appendChild(suffix);

  const progress = makeElement("div", "bdr-progress");
  const progressBar = makeElement("div");
  progressBar.style.width = `${rewardProgress}%`;
  progress.appendChild(progressBar);

  const nextReward = makeElement("div", "bdr-status-copy", nextRewardText);
  const footer = makeElement("div", "bdr-status-copy", footerText);

  panel.append(header, pointsLine, progress, nextReward, footer);

  if (discountCode) {
    const codeBox = makeElement("div", "bdr-status-code");
    const label = makeElement("strong", "", "Lululemon 15% code");
    const code = makeElement("div", "", discountCode);
    codeBox.append(label, code);
    panel.appendChild(codeBox);
  }
}

export function updateBanner(config) {
  const existing = document.getElementById(BANNER_ID);

  if (!config) {
    existing?.remove();
    return;
  }

  const banner = ensureContainer(BANNER_ID, "bdr-banner");
  banner.innerHTML = "";
  banner.append(
    makeElement("div", "bdr-banner-title", config.title),
    makeElement("div", "bdr-banner-body", config.body)
  );
}

export function showToast(message) {
  const existing = document.getElementById(TOAST_ID);

  if (existing) {
    existing.remove();
  }

  const toast = ensureContainer(TOAST_ID, "bdr-toast");
  toast.textContent = message;

  window.setTimeout(() => {
    if (toast.isConnected) {
      toast.remove();
    }
  }, 2600);
}

export function createOverlay({ mode, question, category, promptLabel, title, subtitle, detail }) {
  ensureStyles();

  const overlay = makeElement("div", "bdr-overlay");
  const card = makeElement("div", "bdr-card");
  overlay.appendChild(card);
  document.body.appendChild(overlay);

  if (mode === "intent") {
    const eyebrow = makeElement("div", "bdr-eyebrow", "Intent check");
    const heading = makeElement("h2", "bdr-title", title || "Are you still here intentionally?");
    const copy = makeElement("p", "bdr-subtitle", "A quick pause before the next stretch of Shorts.");
    const actions = makeElement("div", "bdr-actions");
    const yesBtn = makeElement("button", "bdr-button bdr-button-primary", "Yes, continue");
    const noBtn = makeElement("button", "bdr-button bdr-button-secondary", "No, close it");

    actions.append(yesBtn, noBtn);
    card.append(eyebrow, heading, copy, actions);

    return {
      yesBtn,
      noBtn,
      destroy: () => overlay.remove()
    };
  }

  if (mode === "question") {
    const eyebrow = makeElement("div", "bdr-eyebrow", promptLabel || category || "Question");
    const heading = makeElement("h2", "bdr-title", category || "Question");
    const copy = makeElement("p", "bdr-subtitle", "One grounded answer, then you can keep moving.");
    const prompt = makeElement("div", "bdr-question", question);
    const input = makeElement("input", "bdr-input");
    input.type = "text";
    input.autocomplete = "off";
    input.spellcheck = false;
    input.placeholder = "Type your answer";

    const actions = makeElement("div", "bdr-actions bdr-actions-single");
    const submit = makeElement("button", "bdr-button bdr-button-primary", "Submit answer");
    const feedback = makeElement("div", "bdr-feedback");

    actions.appendChild(submit);
    card.append(eyebrow, heading, copy, prompt, input, actions, feedback);

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        submit.click();
      }
    });

    window.setTimeout(() => input.focus(), 60);

    return {
      input,
      submit,
      feedback,
      destroy: () => overlay.remove()
    };
  }

  if (mode === "cooldown") {
    const eyebrow = makeElement("div", "bdr-eyebrow", "Cooldown");
    const heading = makeElement("h2", "bdr-title", title || "Shorts locked");
    const copy = makeElement("p", "bdr-subtitle", subtitle || "");
    const note = makeElement("div", "bdr-question", detail || "");

    card.append(eyebrow, heading, copy, note);

    return {
      update(nextConfig) {
        heading.textContent = nextConfig.title || "";
        copy.textContent = nextConfig.subtitle || "";
        note.textContent = nextConfig.detail || "";
      },
      destroy: () => overlay.remove()
    };
  }

  return {
    destroy: () => overlay.remove()
  };
}
