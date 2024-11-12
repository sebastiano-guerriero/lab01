// Utility function for linear interpolation
const lerp = (start, end, factor) => start * (1 - factor) + end * factor;

// Throttle function to limit update frequency
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/*
 * Responsive Scale Adjustment
 * Adjusts the scale of elements based on viewport width
 * Uses CSS custom property for scaling
 */
const initZoomExperiment = () => {
  const scaleElements = document.querySelectorAll('[data-js-experiment-scale]');
  if (!scaleElements.length) return;

  // Constants for scale calculation
  const MIN_WIDTH = 320;
  const MAX_WIDTH = 588;
  const MIN_SCALE = 0.5;
  const MAX_SCALE = 1;

  // Calculate and apply scale
  const updateScale = () => {
    const viewportWidth = document.documentElement.clientWidth;
    
    // Clamp viewport width between min and max
    const clampedWidth = Math.min(Math.max(viewportWidth, MIN_WIDTH), MAX_WIDTH);
    
    // Calculate scale factor (0 to 1)
    const factor = (clampedWidth - MIN_WIDTH) / (MAX_WIDTH - MIN_WIDTH);
    
    // Calculate scale level
    const scaleLevel = lerp(MIN_SCALE, MAX_SCALE, factor);
    
    // Apply scale to all matching elements
    scaleElements.forEach(element => {
      element.style.setProperty('--scale', scaleLevel);
    });
  };

  // Create throttled update function
  const throttledUpdate = throttle(updateScale, 16); // ~60fps

  // Initialize ResizeObserver
  const resizeObserver = new ResizeObserver(throttledUpdate);
  resizeObserver.observe(document.documentElement);

  // Initial update
  updateScale();
};

/*
 * Color Clipboard Copy
 * Copies the background color of clicked elements to clipboard
 */
const initColorCopy = () => {
  const colorButtons = document.querySelectorAll('[data-js-copy-color-to-clip]');
  if (!colorButtons.length) return;

  colorButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const computedStyle = window.getComputedStyle(button);
      const bgColor = computedStyle.backgroundColor;
      
      // Convert RGB to HEX
      const rgb = bgColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      const hex = '#' + rgb.slice(1).map(n => {
        const hex = parseInt(n).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('').toUpperCase();

      try {
        await navigator.clipboard.writeText(hex);
      } catch (err) {
        console.error('Failed to copy color:', err);
      }
    });
  });
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initZoomExperiment();
  initColorCopy();
});