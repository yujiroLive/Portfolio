// Scroll performance optimizer - pauses heavy animations during scroll
let isScrolling = false;
let scrollTimeout = null;
let scrollListeners = new Set();

export const pauseOnScroll = (callback) => {
  scrollListeners.add(callback);
  return () => scrollListeners.delete(callback);
};

export const isCurrentlyScrolling = () => isScrolling;

// Throttled scroll handler
let ticking = false;
const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      isScrolling = true;
      scrollListeners.forEach(cb => cb(true));
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        scrollListeners.forEach(cb => cb(false));
      }, 150);
      
      ticking = false;
    });
    ticking = true;
  }
};

// Initialize scroll listener
if (typeof window !== 'undefined') {
  let scrollListenerAdded = false;
  export const initScrollOptimizer = () => {
    if (!scrollListenerAdded) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      scrollListenerAdded = true;
    }
  };
  
  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollOptimizer);
  } else {
    initScrollOptimizer();
  }
}

