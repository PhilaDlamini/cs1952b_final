export function createCounter() {
    let lastVideoId = null;
    let count = 0;
  
    return {
      registerView(videoId) {
        if (videoId === lastVideoId) return;
  
        lastVideoId = videoId;
        count++;
  
        console.log(`[Brain De-rotter] Viewed #${count}: ${videoId}`);
      },
  
      getState() {
        return { count };
      }
    };
  }