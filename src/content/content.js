import { startObserver } from "./observer";
import { createCounter } from "./counter";
import { createGatekeeper } from "./gatekeeper";

console.log("[Brain De-rotter] Loaded");

const counter = createCounter();
const gatekeeper = createGatekeeper(counter);

(async () => {
  await counter.ready;
  await gatekeeper.initialize();

  startObserver(async (videoId) => {
    const meta = await counter.registerView(videoId);

    if (!meta.changed) {
      return;
    }

    await gatekeeper.evaluate(meta);
  });
})();
