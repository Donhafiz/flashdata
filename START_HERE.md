# 🚀 FlashData - Quick Start Guide

Welcome to **FlashData**, your automated data delivery platform!

## 📋 What You Have

A complete, production-ready data delivery platform with:
- ✅ User authentication & management
- ✅ Paystack payment integration
- ✅ Data bundle sales (MTN, Telecel, AirtelTigo)
- ✅ Commission system (Agent: 50%, Agent Pro: 70%)
- ✅ Referral system (2% bonus)
- ✅ Admin dashboard
- ✅ Modern, premium UI design
- ✅ Real-time order tracking
- ✅ Transaction logging

## 🎯 Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Environment
Your `.env` file is already created. Just update these:

```env
# Get from https://paystack.com (Sign up → Settings → API Keys)
PAYSTACK_SECRET_KEY=sk_test_your_key_here
PAYSTACK_PUBLIC_KEY=pk_test_your_key_here
```

### Step 3: Start MongoDB
```bash
mongod
```
(In a separate terminal)

### Step 4: Seed Database
```bash
npm run seed
```

This creates:
- Admin account (iddrisuhafiz568@gmail.com / admin123)
- 3 Networks (MTN, Telecel, AirtelTigo)
- Sample data bundles

### Step 5: Start Server
```bash
npm run dev
```

### Step 6: Open Browser
```
http://localhost:5000
```

## 🎉 You're Ready!

### Test the Platform:

1. **Login as Admin:**
   - Email: `iddrisuhafiz568@gmail.com`
   - Password: `admin123`
   - Go to: http://localhost:5000/login.html

2. **Explore Admin Dashboard:**
   - Manage users, networks, bundles
   - View orders and analytics
   - Create announcements

3. **Test Payment (Optional):**
   - Get Paystack test keys
   - Top up wallet
   - Use test card: `4084 0840 8408 4081`

4. **Buy Data:**
   - Select network and bundle
   - Enter phone number
   - Complete purchase

## 📚 Documentation

- **README.md** - Complete setup guide
- **FEATURES.md** - All features list
- **PAYMENT_SETUP.md** - Payment integration
- **TEST_PAYMENT.md** - Testing guide
- **DEPLOYMENT.md** - Deploy to production

## 🔑 Default Admin Credentials

```
Email: iddrisuhafiz568@gmail.com
Password: admin123
```

**⚠️ Change password after first login!**

## 🎨 What's Included

### Frontend Pages:
- Landing page (index.html)
- Login & Registration
- User Dashboard
- Buy Data
- Orders
- Transactions
- Referrals
- Admin Dashboard
- Admin Management Pages

### Backend Features:
- RESTful API
- JWT Authentication
- MongoDB Database
- Paystack Integration
- Commission System
- Referral System
- Order Processing
- Transaction Logging

## 🛠️ Common Commands

```bash
# Start development server
npm run dev

# Start production server
npm start

# Create admin account
npm run create-admin

# Seed database
npm run seed
```

## 🐛 Troubleshooting

### MongoDB Connection Error?
- Make sure MongoDB is running: `mongod`
- Check MONGODB_URI in .env

### Payment Not Working?
- Add Paystack keys to .env
- Use test keys from Paystack dashboard
- Check PAYMENT_SETUP.md

### Can't Login?
- Run: `npm run seed`
- Use: iddrisuhafiz568@gmail.com / admin123

## 📱 Test Cards (Paystack)

**Successful Payment:**
```
Card: 4084 0840 8408 4081
CVV: 408
Expiry: 12/25
PIN: 0000
OTP: 123456
```

## 🚀 Next Steps

1. ✅ Test all features locally
2. ✅ Customize branding
3. ✅ Add your Paystack keys
4. ✅ Test payments
5. ✅ Deploy to production (see DEPLOYMENT.md)
6. ✅ Configure domain and SSL
7. ✅ Set up Paystack webhook
8. ✅ Go live!

## 💡 Tips

- Change admin password immediately
- Test with small amounts first
- Set up webhook for reliability
- Monitor logs regularly
- Backup database frequently

## 📞 Need Help?

Check the documentation:
- Setup issues → README.md
- Payment issues → PAYMENT_SETUP.md
- Deployment → DEPLOYMENT.md
- Features → FEATURES.md

## 🎊 Congratulations!

You now have a complete, professional data delivery platform!

**Built with ❤️ by StarMedia**

---

## Quick Links

- 🏠 Home: http://localhost:5000
- 🔐 Login: http://localhost:5000/login.html
- 📝 Register: http://localhost:5000/register.html
- 📊 Dashboard: http://localhost:5000/dashboard.html
- 👑 Admin: http://localhost:5000/admin/dashboard.html

**Happy Selling! 🚀**
