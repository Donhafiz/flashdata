const API_URL = 'http://localhost:5000/api';

// Check authentication
checkAuth();

// Get greeting based on time
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

// Load dashboard data
async function loadDashboard() {
  try {
    // Fetch fresh user data
    const userResponse = await fetch(`${API_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });
    const userData = await userResponse.json();
    
    if (userData.success) {
      const user = userData.user;
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      // Update user info with greeting
      const greeting = getGreeting();
      document.getElementById('userName').textContent = `${greeting}, ${user.fullName}!`;
      document.getElementById('userRole').textContent = user.role;
      document.getElementById('walletBalance').textContent = formatCurrency(user.wallet);
      document.getElementById('totalEarnings').textContent = formatCurrency(user.totalEarnings || 0);
      
      // Set referral link
      const referralLink = `${window.location.origin}/register.html?ref=${user.referralCode}`;
      document.getElementById('referralLink').value = referralLink;
      document.getElementById('referralCode').textContent = user.referralCode;
    }
    
    // Load stats
    const statsResponse = await fetch(`${API_URL}/user/stats`, {
      headers: getAuthHeaders(),
    });
    const statsData = await statsResponse.json();
    
    if (statsData.success) {
      document.getElementById('totalOrders').textContent = statsData.stats.totalOrders;
      document.getElementById('completedOrders').textContent = statsData.stats.completedOrders;
      document.getElementById('totalSpent').textContent = formatCurrency(statsData.stats.totalSpent);
      
      // Render weekly chart
      renderWeeklyChart(statsData.stats.weeklySales);
    }
    
    // Load delivery status
    loadDeliveryStatus();
    
    // Load recent orders
    loadRecentOrders();
    
  } catch (error) {
    console.error('Error loading dashboard:', error);
    showToast('Error loading dashboard data', 'error');
  }
}

// Load delivery status
async function loadDeliveryStatus() {
  try {
    const response = await fetch(`${API_URL}/orders/delivery-status`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    
    if (data.success) {
      const statusElement = document.getElementById('deliveryStatus');
      const statusText = document.getElementById('deliveryStatusText');
      const statusIcon = document.getElementById('deliveryStatusIcon');
      
      if (data.status === 'fast') {
        statusElement.className = 'badge badge-success';
        statusText.textContent = 'Fast Delivery';
        statusIcon.textContent = '⚡';
      } else if (data.status === 'normal') {
        statusElement.className = 'badge badge-primary';
        statusText.textContent = 'Normal Speed';
        statusIcon.textContent = '✓';
      } else {
        statusElement.className = 'badge badge-warning';
        statusText.textContent = 'Slow Delivery';
        statusIcon.textContent = '⏱️';
      }
      
      document.getElementById('deliveryTime').textContent = data.estimatedTime;
    }
  } catch (error) {
    console.error('Error loading delivery status:', error);
  }
}

// Load recent orders
async function loadRecentOrders() {
  try {
    const response = await fetch(`${API_URL}/orders?limit=5`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    
    if (data.success && data.orders.length > 0) {
      displayRecentOrders(data.orders);
    }
  } catch (error) {
    console.error('Error loading recent orders:', error);
  }
}

// Display recent orders
function displayRecentOrders(orders) {
  const container = document.getElementById('recentOrdersContainer');
  
  if (!container) return;
  
  container.innerHTML = `
    <h4 style="font-weight: 700; margin-bottom: 1rem;">Recent Orders</h4>
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      ${orders.map(order => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: rgba(102, 126, 234, 0.05); border-radius: 12px; border-left: 4px solid ${getStatusColor(order.deliveryStatus)};">
          <div>
            <div style="font-weight: 600; margin-bottom: 0.25rem;">${order.bundle.dataAmount} - ${order.network.name}</div>
            <div style="font-size: 0.85rem; color: var(--gray);">${order.phoneNumber}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-weight: 700; color: var(--primary); margin-bottom: 0.25rem;">${formatCurrency(order.amount)}</div>
            <span class="badge badge-${getDeliveryBadgeClass(order.deliveryStatus)}" style="font-size: 0.75rem;">${order.deliveryStatus}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function getStatusColor(status) {
  switch(status) {
    case 'Delivered': return '#00d4aa';
    case 'Sending': return '#feca57';
    case 'Failed': return '#ff6b6b';
    default: return '#667eea';
  }
}

function getDeliveryBadgeClass(status) {
  switch(status) {
    case 'Delivered': return 'success';
    case 'Sending': return 'warning';
    case 'Failed': return 'danger';
    default: return 'primary';
  }
}

// Render weekly sales chart
function renderWeeklyChart(data) {
  const canvas = document.getElementById('salesChart');
  const ctx = canvas.getContext('2d');
  
  // Simple bar chart implementation
  const maxValue = Math.max(...data.map(d => d.amount), 1);
  const barWidth = canvas.width / data.length - 10;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  data.forEach((item, index) => {
    const barHeight = (item.amount / maxValue) * (canvas.height - 40);
    const x = index * (barWidth + 10);
    const y = canvas.height - barHeight - 20;
    
    // Draw bar
    ctx.fillStyle = '#6366f1';
    ctx.fillRect(x, y, barWidth, barHeight);
    
    // Draw label
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Inter';
    ctx.fillText(item._id, x, canvas.height - 5);
  });
}

// Copy referral link
function copyReferralLink() {
  const referralLink = document.getElementById('referralLink');
  referralLink.select();
  document.execCommand('copy');
  showToast('Referral link copied!', 'success');
}

// Top up modal
function showTopUpModal() {
  document.getElementById('topUpModal').classList.add('active');
}

function closeTopUpModal() {
  document.getElementById('topUpModal').classList.remove('active');
}

// Handle top up
document.getElementById('topUpForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const amount = parseFloat(document.getElementById('topUpAmount').value);
  
  if (amount < 1) {
    showToast('Minimum amount is GH₵ 1', 'error');
    return;
  }
  
  try {
    const response = await fetch(`${API_URL}/payment/initialize`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ amount }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Use Paystack Popup
      const handler = PaystackPop.setup({
        key: data.data.public_key || 'pk_test_your_key', // Paystack public key
        email: data.data.email,
        amount: data.data.amount,
        ref: data.data.reference,
        currency: 'GHS',
        callback: function(response) {
          // Payment successful
          verifyPayment(response.reference);
        },
        onClose: function() {
          showToast('Payment cancelled', 'error');
        }
      });
      
      handler.openIframe();
      closeTopUpModal();
    } else {
      showToast(data.message || 'Failed to initialize payment', 'error');
    }
  } catch (error) {
    console.error('Payment error:', error);
    showToast('An error occurred', 'error');
  }
});

// Verify payment
async function verifyPayment(reference) {
  try {
    const response = await fetch(`${API_URL}/payment/verify/${reference}`, {
      headers: getAuthHeaders(),
    });
    
    const data = await response.json();
    
    if (data.success) {
      showToast('Payment successful! Wallet credited.', 'success');
      
      // Update wallet balance
      const user = JSON.parse(localStorage.getItem('user'));
      user.wallet = data.wallet;
      localStorage.setItem('user', JSON.stringify(user));
      
      // Reload dashboard
      setTimeout(() => {
        location.reload();
      }, 1500);
    } else {
      showToast('Payment verification failed', 'error');
    }
  } catch (error) {
    showToast('Error verifying payment', 'error');
  }
}

// Check for payment callback
const urlParams = new URLSearchParams(window.location.search);
const reference = urlParams.get('reference');
if (reference) {
  verifyPayment(reference);
  // Clean URL
  window.history.replaceState({}, document.title, window.location.pathname);
}

// Load dashboard on page load
loadDashboard();
