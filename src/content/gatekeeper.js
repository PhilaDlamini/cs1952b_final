import {
  createOverlay,
  showToast,
  updateBanner,
  updateStatusPanel
} from "./ui/overlay";
import { createQuestionEngine } from "./questionEngine";

const HARD_LIMIT = 30;
const GATE_FREQUENCY = 5;
const INTENT_PROMPTS = [
  "Are you still here intentionally?",
  "Did you mean to keep scrolling?",
  "Still choosing this on purpose?",
  "Is this next Short worth your attention?",
  "Are you watching with intention right now?"
];

export function createGatekeeper(counter) {
  let blocked = false;
  let cooldownOverlay = null;
  let countdownInterval = null;
  let intentPromptIndex = 0;
  const questionEngine = createQuestionEngine();

  function formatDuration(milliseconds) {
    const totalMinutes = Math.max(1, Math.ceil(milliseconds / 60000));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    }

    if (hours > 0) {
      return `${hours}h`;
    }

    return `${minutes}m`;
  }

  function syncQuestionLevel(state) {
    while (questionEngine.getLevel() !== state.questionLevel) {
      questionEngine.levelUp();
    }
  }

  function renderStatus(meta) {
    const { state, nextRewardAt, cooldownRemainingMs } = meta;
    const now = Date.now();
    const nextRewardInMs = Math.max(0, nextRewardAt - now);
    const hasDiscount = Boolean(state.discountCode);
    const rewardProgress = Math.min(100, Math.round((state.points / 1000) * 100));

    updateStatusPanel({
      points: state.points,
      rewardProgress,
      discountCode: state.discountCode,
      nextRewardText: cooldownRemainingMs > 0
        ? `Cooldown active for ${formatDuration(cooldownRemainingMs)}`
        : `Stay off Shorts for ${formatDuration(nextRewardInMs)} to earn +100`,
      footerText: hasDiscount
        ? "You unlocked a 15% lululemon code."
        : "Reach 1000 points to unlock a 15% lululemon code."
    });
  }

  function clearCooldownUi() {
    if (countdownInterval) {
      window.clearInterval(countdownInterval);
      countdownInterval = null;
    }

    if (cooldownOverlay) {
      cooldownOverlay.destroy();
      cooldownOverlay = null;
    }

    updateBanner(null);
  }

  function showCooldown(meta) {
    const renderCopy = () => {
      const stateNow = meta.state;
      const remainingMs = Math.max(0, stateNow.cooldownUntil - Date.now());
      const remainingText = formatDuration(remainingMs);

      updateBanner({
        tone: "warning",
        title: "Shorts locked for now",
        body: `You've exhausted your Shorts credit for today. Come back in ${remainingText}.`
      });

      return {
        title: "Shorts locked",
        subtitle: `You've exhausted your Shorts credit for today. Come back in ${remainingText}.`,
        detail: "Take a breath, do literally anything else, and let the points meter work for you."
      };
    };

    clearCooldownUi();

    cooldownOverlay = createOverlay({
      mode: "cooldown",
      ...renderCopy()
    });

    countdownInterval = window.setInterval(async () => {
      const latest = await counter.getState();
      renderStatus(latest);

      if (latest.cooldownRemainingMs <= 0) {
        clearCooldownUi();
        blocked = false;
        return;
      }

      meta = latest;
      cooldownOverlay.update(renderCopy());
    }, 1000);
  }

  function showIntentGate() {
    blocked = true;
    const prompt = INTENT_PROMPTS[intentPromptIndex];
    intentPromptIndex = (intentPromptIndex + 1) % INTENT_PROMPTS.length;

    const { yesBtn, noBtn, destroy } = createOverlay({
      mode: "intent",
      title: prompt
    });

    yesBtn.onclick = () => {
      destroy();
      showQuestionGate();
    };

    noBtn.onclick = async () => {
      destroy();
      const meta = await counter.startCooldown();
      renderStatus(meta);
      showCooldown(meta);

      chrome.runtime.sendMessage({
        type: "CLOSE_TAB"
      });
    };
  }

  function showQuestionGate() {
    const prompt = questionEngine.generateQuestion();

    const { input, submit, feedback, destroy } = createOverlay({
      mode: "question",
      question: prompt.question,
      category: prompt.category,
      promptLabel: prompt.promptLabel
    });

    submit.onclick = async () => {
      const isCorrect = questionEngine.validate(input.value, prompt.answers);

      if (isCorrect) {
        feedback.innerText = "Correct. You're back in control.";
        questionEngine.levelUp();
        await counter.levelUpQuestion();

        setTimeout(() => {
          destroy();
          blocked = false;
        }, 500);
      } else {
        feedback.innerText = "Not quite. Take another swing.";
      }
    };
  }

  return {
    async initialize() {
      const meta = await counter.getState();
      syncQuestionLevel(meta.state);
      renderStatus(meta);

      if (meta.cooldownRemainingMs > 0) {
        blocked = true;
        showCooldown(meta);
      }
    },

    async evaluate(meta) {
      syncQuestionLevel(meta.state);
      renderStatus(meta);

      if (meta.rewardDelta > 0) {
        showToast(`+${meta.rewardDelta} points for staying away from Shorts.`);
      }

      if (blocked && meta.cooldownRemainingMs <= 0) {
        blocked = false;
      }

      if (blocked) {
        return;
      }

      if (meta.cooldownRemainingMs > 0) {
        blocked = true;
        showCooldown(meta);
        return;
      }

      if (meta.state.sessionCount >= HARD_LIMIT) {
        console.log("[Brain De-rotter] " + HARD_LIMIT + " limit reached");
        const cooldownMeta = await counter.startCooldown();
        renderStatus(cooldownMeta);
        showCooldown(cooldownMeta);

        chrome.runtime.sendMessage({
          type: "CLOSE_TAB"
        });

        return;
      }

      if (meta.state.sessionCount % GATE_FREQUENCY === 0) {
        showIntentGate();
      }
    }
  };
}
