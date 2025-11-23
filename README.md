# ⚡ FlashData - Automated Data Delivery Platform

**By StarMedia**

A complete, production-ready automated data delivery platform with user authentication, wallet management via Paystack, referral system, commission tracking, and comprehensive admin dashboard.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)

---

## Features

### User Features
- ✅ User Authentication (Login, Register, Forgot Password)
- ✅ User Dashboard with Wallet Balance
- ✅ Buy Data Bundles (MTN, Telecel, AirtelTigo)
- ✅ Real-time Order Tracking
- ✅ Transaction History
- ✅ Referral System (2% bonus on referral purchases)
- ✅ Commission System (Agent: 50%, Agent Pro: 70%)
- ✅ Weekly Sales Chart
- ✅ Wallet Top-up via Paystack
- ✅ User Roles (Customer, Agent, Agent Pro, Admin)

### Admin Features
- ✅ Admin Dashboard with Analytics
- ✅ Manage Networks (MTN, Telecel, AirtelTigo)
- ✅ Manage Data Bundles
- ✅ Manage Users (Edit roles, wallet, status)
- ✅ View All Orders
- ✅ Manage Announcements
- ✅ Monthly Sales Charts
- ✅ Revenue Analytics

## Tech Stack

### Frontend
- HTML5
- CSS3 (Modern, Responsive Design)
- Vanilla JavaScript
- Smooth Animations

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Paystack Payment Integration

## 🚀 Quick Start

### Prerequisites
- Node.js v14+ ([Download](https://nodejs.org/))
- MongoDB ([Download](https://www.mongodb.com/try/download/community))
- Paystack Account ([Sign up](https://paystack.com))

### Installation Steps

1. **Clone & Install**
```bash
git clone <repository-url>
cd flashdata-platform
npm install
```

2. **Configure Environment**
```bash
# Copy example env file
cp .env.example .env

# Edit .env with your values
```

Required environment variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/flashdata
JWT_SECRET=your_secure_random_secret_here
PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret
PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public
NODE_ENV=development
FRONTEND_URL=http://localhost:5000
```

3. **Start MongoDB**
```bash
# Windows
mongod

# Linux/Mac
sudo systemctl start mongod
```

4. **Seed Database**
```bash
npm run seed
```

This creates:
- Admin account (iddrisuhafiz568@gmail.com / admin123)
- All 3 networks (MTN, Telecel, AirtelTigo)
- Sample data bundles

5. **Start Application**
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

6. **Access Application**
- Frontend: http://localhost:5000
- Admin: http://localhost:5000/admin/dashboard.html
- Login: iddrisuhafiz568@gmail.com / admin123

## 📱 Available Scripts

```bash
npm start              # Start production server
npm run dev            # Start development server with nodemon
npm run seed           # Seed database with initial data
npm run create-admin   # Create admin user only
npm run setup-production  # Complete production setup
```

## Project Structure

```
flashdata-platform/
├── config/
│   ├── db.js              # MongoDB connection
│   └── paystack.js        # Paystack configuration
├── middleware/
│   ├── auth.js            # Authentication middleware
│   └── admin.js           # Admin authorization
├── models/
│   ├── User.js            # User model
│   ├── Order.js           # Order model
│   ├── Transaction.js     # Transaction model
│   ├── Bundle.js          # Bundle model
│   ├── Network.js         # Network model
│   ├── Referral.js        # Referral model
│   └── Announcement.js    # Announcement model
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── user.js            # User routes
│   ├── order.js           # Order routes
│   ├── payment.js         # Payment routes
│   ├── admin.js           # Admin routes
│   └── referral.js        # Referral routes
├── utils/
│   ├── commission.js      # Commission calculations
│   └── delivery.js        # Data delivery simulation
├── public/
│   ├── index.html         # Landing page
│   ├── login.html         # Login page
│   ├── register.html      # Registration page
│   ├── dashboard.html     # User dashboard
│   ├── buy-data.html      # Buy data page
│   ├── orders.html        # Orders page
│   ├── transactions.html  # Transactions page
│   ├── referrals.html     # Referrals page
│   ├── alpha-register.html # Alpha registration
│   ├── admin/             # Admin pages
│   ├── css/
│   │   └── styles.css     # Global styles
│   └── js/
│       ├── main.js        # Main JavaScript
│       ├── auth.js        # Authentication logic
│       ├── dashboard.js   # Dashboard logic
│       ├── buy-data.js    # Buy data logic
│       └── admin.js       # Admin logic
├── server.js              # Express server
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### User
- `GET /api/user/transactions` - Get user transactions
- `GET /api/user/stats` - Get user statistics
- `PUT /api/user/profile` - Update user profile

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order

### Payment
- `POST /api/payment/initialize` - Initialize Paystack payment
- `GET /api/payment/verify/:reference` - Verify payment

### Referrals
- `GET /api/referrals` - Get user referrals

### Admin (Protected)
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/networks` - Get all networks
- `POST /api/admin/networks` - Create network
- `PUT /api/admin/networks/:id` - Update network
- `GET /api/admin/bundles` - Get all bundles
- `POST /api/admin/bundles` - Create bundle
- `PUT /api/admin/bundles/:id` - Update bundle
- `DELETE /api/admin/bundles/:id` - Delete bundle
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user
- `GET /api/admin/orders` - Get all orders
- `GET /api/admin/announcements` - Get announcements
- `POST /api/admin/announcements` - Create announcement
- `PUT /api/admin/announcements/:id` - Update announcement
- `DELETE /api/admin/announcements/:id` - Delete announcement

## User Roles & Commissions

### Customer
- Standard pricing
- No commission
- Can refer others for 2% bonus

### Agent
- Discounted pricing
- 50% commission on savings
- Can refer others for 2% bonus

### Agent Pro
- Best pricing
- 70% commission on savings
- Can refer others for 2% bonus

### Admin
- Full system access
- Manage all resources

## Payment Integration

The platform uses Paystack for secure payment processing:
1. User initiates wallet top-up
2. System generates Paystack payment link
3. User completes payment on Paystack
4. System verifies payment
5. Wallet is credited automatically

## Data Delivery

The system simulates data delivery with the following flow:
1. User places order
2. System validates wallet balance
3. Amount is deducted from wallet
4. Order status: Pending → Processing → Completed/Failed
5. If successful, commission is credited
6. Referral bonus is credited to referrer

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Role-based access control
- Input validation
- Secure payment processing

## Future Enhancements

- Email notifications
- SMS notifications
- Real network API integration
- Mobile app
- Advanced analytics
- Multi-currency support
- Automated commission payouts

## 🧪 Testing

### Test Payment with Paystack

Use these test cards in development:

**Successful Payment:**
```
Card: 4084 0840 8408 4081
CVV: 408
Expiry: 12/25
PIN: 0000
OTP: 123456
```

**Failed Payment:**
```
Card: 5060 6666 6666 6666 666
CVV: 123
Expiry: 12/25
```

See `TEST_PAYMENT.md` for complete testing guide.

## 📚 Documentation

- `README.md` - Main documentation (this file)
- `FEATURES.md` - Complete features list
- `PAYMENT_SETUP.md` - Payment integration guide
- `TEST_PAYMENT.md` - Payment testing guide
- `DEPLOYMENT.md` - Deployment instructions
- `project-structure.txt` - Project structure overview

## 🚀 Deployment

See `DEPLOYMENT.md` for detailed deployment instructions for:
- Heroku
- DigitalOcean
- Vercel
- Railway

Quick Heroku deployment:
```bash
heroku create flashdata-app
heroku addons:create mongolab:sandbox
git push heroku main
heroku run npm run seed
```

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Role-based access control
- Payment verification on backend
- Duplicate transaction prevention
- Input validation and sanitization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - Copyright (c) 2024 StarMedia

## 📞 Support

For support and inquiries:
- Email: support@flashdata.com
- Platform: FlashData by StarMedia

## 🙏 Acknowledgments

- Paystack for payment processing
- MongoDB for database
- Express.js for backend framework
- All contributors and users

---

**Built with ❤️ by StarMedia**

⚡ **FlashData** - Instant Data Delivery Platform
#   f l a s h d a t a  
 