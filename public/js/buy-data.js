const API_URL = 'http://localhost:5000/api';

checkAuth();

let networks = [];
let bundles = [];
let selectedBundle = null;
let userRole = '';

// Load initial data
async function loadData() {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    userRole = user.role;
    
    document.getElementById('walletBalance').textContent = formatCurrency(user.wallet);
    document.getElementById('userRole').textContent = user.role;
    
    // Set commission rate
    let commissionRate = '0%';
    if (user.role === 'Agent') commissionRate = '50%';
    if (user.role === 'Agent Pro') commissionRate = '70%';
    document.getElementById('commissionRate').textContent = commissionRate;
    
    // Load networks
    const networksResponse = await fetch(`${API_URL}/admin/networks`, {
      headers: getAuthHeaders(),
    });
    const networksData = await networksResponse.json();
    
    if (networksData.success) {
      networks = networksData.networks.filter(n => n.isActive);
      populateNetworks();
    }
    
    // Load bundles
    const bundlesResponse = await fetch(`${API_URL}/admin/bundles`, {
      headers: getAuthHeaders(),
    });
    const bundlesData = await bundlesResponse.json();
    
    if (bundlesData.success) {
      bundles = bundlesData.bundles.filter(b => b.isActive);
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Populate networks dropdown
function populateNetworks() {
  const networkSelect = document.getElementById('network');
  networkSelect.innerHTML = '<option value="">Select Network</option>';
  
  networks.forEach(network => {
    const option = document.createElement('option');
    option.value = network._id;
    option.textContent = network.name;
    networkSelect.appendChild(option);
  });
}

// Handle network selection
document.getElementById('network').addEventListener('change', (e) => {
  const networkId = e.target.value;
  const bundleSelect = document.getElementById('bundle');
  
  if (!networkId) {
    bundleSelect.disabled = true;
    bundleSelect.innerHTML = '<option value="">Select a network first</option>';
    return;
  }
  
  bundleSelect.disabled = false;
  bundleSelect.innerHTML = '<option value="">Select Bundle</option>';
  
  const networkBundles = bundles.filter(b => b.network._id === networkId);
  
  networkBundles.forEach(bundle => {
    const option = document.createElement('option');
    option.value = bundle._id;
    option.textContent = `${bundle.dataAmount} - ${bundle.validity}`;
    bundleSelect.appendChild(option);
  });
});

// Handle bundle selection
document.getElementById('bundle').addEventListener('change', (e) => {
  const bundleId = e.target.value;
  
  if (!bundleId) {
    selectedBundle = null;
    updateSummary();
    return;
  }
  
  selectedBundle = bundles.find(b => b._id === bundleId);
  updateSummary();
});

// Update order summary
function updateSummary() {
  if (!selectedBundle) {
    document.getElementById('summaryBundle').textContent = '-';
    document.getElementById('summaryPrice').textContent = 'GH₵ 0.00';
    document.getElementById('summaryCommission').textContent = 'GH₵ 0.00';
    document.getElementById('summaryTotal').textContent = 'GH₵ 0.00';
    return;
  }
  
  let price;
  switch(userRole) {
    case 'Agent':
      price = selectedBundle.agentPrice;
      break;
    case 'Agent Pro':
      price = selectedBundle.agentProPrice;
      break;
    default:
      price = selectedBundle.customerPrice;
  }
  
  const commission = calculateCommission(selectedBundle.price, price);
  
  document.getElementById('summaryBundle').textContent = `${selectedBundle.dataAmount} - ${selectedBundle.validity}`;
  document.getElementById('summaryPrice').textContent = formatCurrency(price);
  document.getElementById('summaryCommission').textContent = formatCurrency(commission);
  document.getElementById('summaryTotal').textContent = formatCurrency(price);
}

// Calculate commission
function calculateCommission(bundlePrice, userPrice) {
  const savings = bundlePrice - userPrice;
  
  switch(userRole) {
    case 'Agent':
      return savings * 0.5;
    case 'Agent Pro':
      return savings * 0.7;
    default:
      return 0;
  }
}

// Handle form submission
document.getElementById('buyDataForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if (!selectedBundle) {
    showAlert('Please select a bundle');
    return;
  }
  
  const phoneNumber = document.getElementById('phoneNumber').value;
  
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        bundleId: selectedBundle._id,
        phoneNumber,
      }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      showAlert('Order placed successfully! Processing delivery...', 'success');
      setTimeout(() => {
        window.location.href = '/orders.html';
      }, 2000);
    } else {
      showAlert(data.message);
    }
  } catch (error) {
    showAlert('An error occurred. Please try again.');
  }
});

// Load data on page load
loadData();
