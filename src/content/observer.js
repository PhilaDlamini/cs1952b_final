export function startObserver(onChange) {
    let lastUrl = window.location.href;
  
    const getVideoId = (url) => {
      const match = url.match(/\/shorts\/([^/?]+)/);
      return match ? match[1] : null;
    };
  
    const observer = new MutationObserver(() => {
      if (window.location.href !== lastUrl) {
        lastUrl = window.location.href;
  
        const videoId = getVideoId(lastUrl);
        if (videoId) onChange(videoId);
      }
    });
  
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  
    // initial
    const initial = getVideoId(window.location.href);
    if (initial) onChange(initial);
  }