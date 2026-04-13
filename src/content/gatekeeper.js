import { createOverlay } from "./ui/overlay";
import { createMathEngine } from "./mathEngine";

export function createGatekeeper(counter) {
  let blocked = false;
  const math = createMathEngine();

  function showIntentGate() {
    blocked = true;

    const { yesBtn, noBtn, destroy } = createOverlay({
      mode: "intent"
    });

    yesBtn.onclick = () => {
      destroy();
      showMathGate();
    };

    noBtn.onclick = () => {
      destroy();
    
      chrome.runtime.sendMessage({
        type: "CLOSE_TAB"
      });
    };
  }

  function showMathGate() {
    const problem = math.generateProblem();

    const { input, submit, feedback, destroy } = createOverlay({
      mode: "math",
      question: problem.question
    });

    submit.onclick = () => {
      const isCorrect = math.validate(input.value, problem.answer);

      if (isCorrect) {
        feedback.innerText = "Correct";
        math.levelUp();

        setTimeout(() => {
          destroy();
          blocked = false;
        }, 500);
      } else {
        feedback.innerText = "Try again";
      }
    };
  }

  return {
    evaluate(state) {
      if (blocked) return;
    
      // HARD LIMIT
      if (state.count >= 30) {
        console.log("[Brain De-rotter] 30 limit reached");
    
        chrome.runtime.sendMessage({
          type: "CLOSE_TAB"
        });
    
        return;
      }
    
      // GATE EVERY 5
      if (state.count % 5 === 0) {
        showIntentGate();
      }
    }
  };
}