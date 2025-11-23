const API_URL = 'http://localhost:5000/api';

checkAuth();

// Check if user is admin
const user = JSON.parse(localStorage.getItem('user'));
if (user.role !== 'Admin') {
  window.location.href = '/dashboard.html';
}

// Load dashboard data
async function loadDashboard() {
  try {
    const response = await fetch(`${API_URL}/admin/dashboard`, {
      headers: getAuthHeaders(),
    });
    
    const data = await response.json();
    
    if (data.success) {
      document.getElementById('totalUsers').textContent = data.stats.totalUsers;
      document.getElementById('totalOrders').textContent = data.stats.totalOrders;
      document.getElementById('totalRevenue').textContent = formatCurrency(data.stats.totalRevenue);
      document.getElementById('activeUsers').textContent = data.stats.totalUsers;
      
      displayRecentOrders(data.stats.recentOrders);
      renderSalesChart(data.stats.monthlySales);
    }
  } catch (error) {
    console.error('Error loading dashboard:', error);
  }
}

// Display recent orders
function displayRecentOrders(orders) {
  const container = document.getElementById('recentOrdersContainer');
  
  if (orders.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--gray); padding: 2rem;">No orders yet</p>';
    return;
  }
  
  container.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Order #</th>
          <th>User</th>
          <th>Network</th>
          <th>Bundle</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        ${orders.map(order => `
          <tr>
            <td><strong>${order.orderNumber}</strong></td>
            <td>${order.user.fullName}</td>
            <td>${order.network.name}</td>
            <td>${order.bundle.dataAmount}</td>
            <td>${formatCurrency(order.amount)}</td>
            <td><span class="badge badge-${getStatusClass(order.status)}">${order.status}</span></td>
            <td>${formatDate(order.createdAt)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// Render sales chart
function renderSalesChart(data) {
  const canvas = document.getElementById('salesChart');
  const ctx = canvas.getContext('2d');
  
  if (data.length === 0) return;
  
  const maxValue = Math.max(...data.map(d => d.revenue), 1);
  const barWidth = canvas.width / data.length - 20;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  data.forEach((item, index) => {
    const barHeight = (item.revenue / maxValue) * (canvas.height - 60);
    const x = index * (barWidth + 20) + 10;
    const y = canvas.height - barHeight - 40;
    
    // Draw bar
    ctx.fillStyle = '#6366f1';
    ctx.fillRect(x, y, barWidth, barHeight);
    
    // Draw label
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Inter';
    ctx.fillText(item._id, x, canvas.height - 25);
    
    // Draw value
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 12px Inter';
    ctx.fillText(`GH₵${item.revenue.toFixed(0)}`, x, y - 5);
  });
}

function getStatusClass(status) {
  switch(status) {
    case 'Completed': return 'success';
    case 'Processing': return 'warning';
    case 'Failed': return 'danger';
    default: return 'primary';
  }
}

loadDashboard();
