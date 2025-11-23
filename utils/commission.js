// Calculate commission based on user role
exports.calculateCommission = (userRole, bundlePrice, userPrice) => {
  const savings = bundlePrice - userPrice;
  
  switch(userRole) {
    case 'Agent':
      return savings * 0.5; // 50% of savings
    case 'Agent Pro':
      return savings * 0.7; // 70% of savings
    default:
      return 0;
  }
};

// Referral bonus calculation
exports.calculateReferralBonus = (orderAmount) => {
  return orderAmount * 0.02; // 2% referral bonus
};
