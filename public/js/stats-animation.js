// Animated Counter for Stats
function animateValue(element, start, end, duration) {
  if (!element) return;
  
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(timer);
    }
    
    // Format based on content
    if (element.textContent.includes('GH₵') || element.textContent.includes('₵')) {
      element.textContent = formatCurrency(current);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Observe elements and animate when visible
function setupStatsAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        
        const text = entry.target.textContent;
        const value = parseFloat(text.replace(/[^0-9.]/g, ''));
        
        if (!isNaN(value)) {
          animateValue(entry.target, 0, value, 1000);
        }
      }
    });
  }, { threshold: 0.5 });

  // Observe all stat values
  document.querySelectorAll('.stat-value').forEach(el => {
    observer.observe(el);
  });
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupStatsAnimation);
} else {
  setupStatsAnimation();
}
