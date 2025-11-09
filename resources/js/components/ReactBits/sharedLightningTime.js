// Shared time reference for Lightning animations
let sharedStartTime = null;

export const getSharedTime = () => {
  if (sharedStartTime === null) {
    sharedStartTime = performance.now();
  }
  return sharedStartTime;
};

export const resetSharedTime = () => {
  sharedStartTime = null;
};

