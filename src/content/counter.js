const STORAGE_KEY = "brainDeRotterState";
const FIVE_HOURS_MS = 5 * 60 * 60 * 1000;
const COOLDOWN_MS = 2 * 60 * 60 * 1000;
export const DISABLE_COOLDOWN_FOR_TESTING = true;

const DEFAULT_STATE = {
  sessionCount: 0,
  lastVideoId: null,
  questionLevel: 0,
  cooldownUntil: 0,
  lastShortOpenedAt: 0,
  points: 0,
  discountCode: null
};

function cloneState(state) {
  return {
    sessionCount: state.sessionCount,
    lastVideoId: state.lastVideoId,
    questionLevel: state.questionLevel,
    cooldownUntil: state.cooldownUntil,
    lastShortOpenedAt: state.lastShortOpenedAt,
    points: state.points,
    discountCode: state.discountCode
  };
}

function getStorageArea() {
  return chrome.storage.local;
}

function readStorage() {
  return new Promise((resolve) => {
    getStorageArea().get([STORAGE_KEY], (result) => {
      resolve(result[STORAGE_KEY] || {});
    });
  });
}

function writeStorage(state) {
  return new Promise((resolve) => {
    getStorageArea().set({ [STORAGE_KEY]: state }, resolve);
  });
}

function generateDiscountCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let token = "";

  for (let index = 0; index < 8; index += 1) {
    token += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return `LULU-15-${token}`;
}

export function createCounter() {
  let state = cloneState(DEFAULT_STATE);

  const ready = (async () => {
    const storedState = await readStorage();
    state = {
      ...cloneState(DEFAULT_STATE),
      ...storedState
    };
    await persist();
  })();

  async function persist() {
    if (state.points >= 1000 && !state.discountCode) {
      state.discountCode = generateDiscountCode();
    }

    if (DISABLE_COOLDOWN_FOR_TESTING) {
      state.cooldownUntil = 0;
    }

    if (state.cooldownUntil && state.cooldownUntil <= Date.now()) {
      state.cooldownUntil = 0;
    }

    await writeStorage(cloneState(state));
  }

  function buildMeta(rewardDelta = 0) {
    const now = Date.now();
    const nextRewardAt = state.lastShortOpenedAt
      ? state.lastShortOpenedAt + FIVE_HOURS_MS
      : now + FIVE_HOURS_MS;

    return {
      state: cloneState(state),
      rewardDelta,
      cooldownRemainingMs: Math.max(0, state.cooldownUntil - now),
      nextRewardAt
    };
  }

  return {
    ready,

    async registerView(videoId) {
      await ready;

      if (!DISABLE_COOLDOWN_FOR_TESTING && state.cooldownUntil && state.cooldownUntil > Date.now()) {
        return {
          changed: false,
          ...buildMeta(0)
        };
      }

      if (videoId === state.lastVideoId) {
        return {
          changed: false,
          ...buildMeta(0)
        };
      }

      const now = Date.now();
      const elapsedSinceLastOpen = state.lastShortOpenedAt ? now - state.lastShortOpenedAt : 0;
      const rewardSteps = elapsedSinceLastOpen >= FIVE_HOURS_MS
        ? Math.floor(elapsedSinceLastOpen / FIVE_HOURS_MS)
        : 0;
      const rewardDelta = rewardSteps * 100;

      if (rewardDelta > 0) {
        state.points += rewardDelta;
      }

      state.lastVideoId = videoId;
      state.lastShortOpenedAt = now;
      state.sessionCount += 1;

      await persist();

      console.log(`[Brain De-rotter] Viewed #${state.sessionCount}: ${videoId}`);

      return {
        changed: true,
        ...buildMeta(rewardDelta)
      };
    },

    async getState() {
      await ready;
      await persist();
      return buildMeta(0);
    },

    async startCooldown() {
      await ready;

      state.cooldownUntil = DISABLE_COOLDOWN_FOR_TESTING
        ? 0
        : Date.now() + COOLDOWN_MS;
      state.sessionCount = 0;
      state.lastVideoId = null;

      await persist();

      return buildMeta(0);
    },

    async levelUpQuestion() {
      await ready;
      state.questionLevel = (state.questionLevel + 1) % 5;
      await persist();
      return cloneState(state);
    }
  };
}
