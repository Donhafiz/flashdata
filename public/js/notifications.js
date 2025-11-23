// Enhanced notification system

// Show toast with auto-dismiss
function showToast(message, type = 'info', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  }[type] || 'ℹ';
  
  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-message">${message}</div>
    <button class="toast-close" onclick="this.parentElement.remove()">×</button>
  `;
  
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    min-width: 300px;
    max-width: 500px;
    padding: 1rem 1.5rem;
    background: ${getToastColor(type)};
    color: white;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 1rem;
    animation: slideInRight 0.3s ease;
    backdrop-filter: blur(10px);
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function getToastColor(type) {
  const colors = {
    success: 'linear-gradient(135deg, #00d4aa, #00b894)',
    error: 'linear-gradient(135deg, #ff6b6b, #ee5a6f)',
    warning: 'linear-gradient(135deg, #feca57, #ff9ff3)',
    info: 'linear-gradient(135deg, #667eea, #764ba2)'
  };
  return colors[type] || colors.info;
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  
  .toast-icon {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .toast-message {
    flex: 1;
    font-weight: 500;
  }
  
  .toast-close {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
  }
  
  .toast-close:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;
document.head.appendChild(style);

// Confirmation dialog
function showConfirm(message, onConfirm, onCancel) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(10px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease;
  `;
  
  const dialog = document.createElement('div');
  dialog.style.cssText = `
    background: white;
    border-radius: 20px;
    padding: 2rem;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 30px 90px rgba(0, 0, 0, 0.3);
    animation: modalSlideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  `;
  
  dialog.innerHTML = `
    <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #0f172a;">Confirm Action</h3>
    <p style="color: #64748b; margin-bottom: 2rem;">${message}</p>
    <div style="display: flex; gap: 1rem;">
      <button class="btn-confirm" style="flex: 1; padding: 0.875rem; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; background: linear-gradient(135deg, #667eea, #764ba2); color: white;">Confirm</button>
      <button class="btn-cancel" style="flex: 1; padding: 0.875rem; border: 2px solid #e2e8f0; border-radius: 12px; font-weight: 600; cursor: pointer; background: white; color: #64748b;">Cancel</button>
    </div>
  `;
  
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);
  
  dialog.querySelector('.btn-confirm').onclick = () => {
    overlay.remove();
    if (onConfirm) onConfirm();
  };
  
  dialog.querySelector('.btn-cancel').onclick = () => {
    overlay.remove();
    if (onCancel) onCancel();
  };
  
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      overlay.remove();
      if (onCancel) onCancel();
    }
  };
}

// Loading overlay
function showLoading(message = 'Loading...') {
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
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease;
  `;
  
  overlay.innerHTML = `
    <div style="text-align: center; color: white;">
      <div class="spinner" style="border-color: rgba(255, 255, 255, 0.3); border-top-color: white; margin: 0 auto 1rem;"></div>
      <p style="font-size: 1.1rem; font-weight: 500;">${message}</p>
    </div>
  `;
  
  document.body.appendChild(overlay);
}

function hideLoading() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => overlay.remove(), 300);
  }
}

// Export functions
window.showToast = showToast;
window.showConfirm = showConfirm;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
