export function createOverlay({ mode, question }) {
  const overlay = document.createElement("div");
  overlay.style = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999999;
  `;

  const box = document.createElement("div");
  box.style = `
    background: white;
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    width: 300px;
  `;

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  // INTENT MODE
  if (mode === "intent") {
    const text = document.createElement("p");
    text.innerText = "Are you still here intentionally?";

    const yesBtn = document.createElement("button");
    yesBtn.innerText = "Yes";

    const noBtn = document.createElement("button");
    noBtn.innerText = "No";

    box.append(text, yesBtn, noBtn);

    return {
      yesBtn,
      noBtn,
      destroy: () => overlay.remove()
    };
  }

  // MATH MODE
  if (mode === "math") {
    const text = document.createElement("p");
    text.innerText = `Solve: ${question}`;

    const input = document.createElement("input");
    input.type = "number";

    const submit = document.createElement("button");
    submit.innerText = "Submit";

    const feedback = document.createElement("p");

    box.append(text, input, submit, feedback);

    return {
      input,
      submit,
      feedback,
      destroy: () => overlay.remove()
    };
  }
}