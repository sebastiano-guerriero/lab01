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
 * Responsive Zoom Scaling
 * Adjusts the zoom level of elements based on viewport width
 * Uses CSS zoom property for better text rendering
 */
const initZoomExperiment = () => {
  const zoomElements = document.querySelectorAll('[data-js-experiment-zoom]');
  if (!zoomElements.length) return;

  // Constants for zoom calculation
  const MIN_WIDTH = 320;
  const MAX_WIDTH = 588;
  const MIN_ZOOM = 50;
  const MAX_ZOOM = 100;

  // Calculate and apply zoom
  const updateZoom = () => {
    const viewportWidth = document.documentElement.clientWidth;
    
    // Clamp viewport width between min and max
    const clampedWidth = Math.min(Math.max(viewportWidth, MIN_WIDTH), MAX_WIDTH);
    
    // Calculate zoom factor (0 to 1)
    const factor = (clampedWidth - MIN_WIDTH) / (MAX_WIDTH - MIN_WIDTH);
    
    // Calculate zoom level
    const zoomLevel = lerp(MIN_ZOOM, MAX_ZOOM, factor);
    
    // Apply zoom to all matching elements
    zoomElements.forEach(element => {
      element.style.zoom = `${zoomLevel}%`;
    });
  };

  // Create throttled update function
  const throttledUpdate = throttle(updateZoom, 16); // ~60fps

  // Initialize ResizeObserver
  const resizeObserver = new ResizeObserver(throttledUpdate);
  resizeObserver.observe(document.documentElement);

  // Initial update
  updateZoom();
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initZoomExperiment);