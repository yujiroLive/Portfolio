// Performance utilities
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768 || /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
};

export const isLowEndDevice = () => {
  if (typeof window === 'undefined') return false;
  const hardwareConcurrency = navigator.hardwareConcurrency || 2;
  const deviceMemory = navigator.deviceMemory || 4;
  return hardwareConcurrency <= 2 || deviceMemory <= 2 || isMobile();
};

export const getOptimalResolution = (baseResolution = 1) => {
  if (isLowEndDevice()) return Math.min(baseResolution, 0.5);
  if (isMobile()) return Math.min(baseResolution, 0.7);
  return baseResolution;
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

