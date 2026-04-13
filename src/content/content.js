import { startObserver } from "./observer";
import { createCounter } from "./counter";
import { createGatekeeper } from "./gatekeeper";

console.log("[Brain De-rotter] Loaded");

const counter = createCounter();
const gatekeeper = createGatekeeper(counter);

startObserver((videoId) => {
  counter.registerView(videoId);
  gatekeeper.evaluate(counter.getState());
});