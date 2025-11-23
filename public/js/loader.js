// Global Loading Overlay
class LoadingManager {
  constructor() {
    this.overlay = this.createOverlay();
    this.isLoading = false;
  }

  createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(10px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      animation: fadeIn 0.3s ease;
    `;

    overlay.innerHTML = `
      <div style="text-align: center;">
        <div style="width: 60px; height: 60px; border: 4px solid rgba(255, 255, 255, 0.2); border-top: 4px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
        <p style="color: white; font-size: 1.1rem; font-weight: 600;">Processing...</p>
      </div>
    `;

    document.body.appendChild(overlay);
    return overlay;
  }

  show(message = 'Processing...') {
    this.isLoading = true;
    this.overlay.querySelector('p').textContent = message;
    this.overlay.style.display = 'flex';
  }

  hide() {
    this.isLoading = false;
    this.overlay.style.display = 'none';
  }
}

// Add spin animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Global loader instance
window.loader = new LoadingManager();
