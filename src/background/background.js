// Brain De-rotter background worker

console.log("[Brain De-rotter] Background running");

chrome.runtime.onMessage.addListener((message, sender) => {
  console.log("[Brain De-rotter] Message received:", message);

  if (message.type === "CLOSE_TAB") {
    if (sender.tab && sender.tab.id) {
      chrome.tabs.remove(sender.tab.id);
    }
  }
});