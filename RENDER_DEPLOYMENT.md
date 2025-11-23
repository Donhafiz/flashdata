# 🚀 Deploy FlashData to Render

Complete guide to deploy your FlashData platform to Render for FREE!

---

## 📋 Prerequisites

1. **GitHub Account** - To host your code
2. **Render Account** - Sign up at https://render.com (FREE)
3. **MongoDB Atlas Account** - For database (FREE)
4. **Paystack Account** - For payments (FREE)

---

## 🎯 Step-by-Step Deployment

### Step 1: Set Up MongoDB Atlas (5 minutes)

1. **Go to MongoDB Atlas**
   - Visit: https://www.mongodb.com/cloud/atlas
   - Click "Try Free"
   - Sign up with Google/Email

2. **Create a Cluster**
   - Choose "FREE" tier (M0)
   - Select region closest to you (e.g., AWS - Frankfurt)
   - Cluster Name: `flashdata-cluster`
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Username: `flashdata_user`
   - Password: Generate a secure password (SAVE THIS!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Addresses**
   - Go to "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" (left sidebar)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://flashdata_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<password>` with your actual password
   - Add database name: `mongodb+srv://flashdata_user:yourpassword@cluster0.xxxxx.mongodb.net/flashdata?retryWrites=true&w=majority`
   - **SAVE THIS CONNECTION STRING!**

---

### Step 2: Push Code to GitHub (3 minutes)

1. **Initialize Git** (if not already done)
```bash
git init
git add .
git commit -m "Initial commit - FlashData Platform"
```

2. **Create GitHub Repository**
   - Go to https://github.com/new
   - Repository name: `flashdata-platform`
   - Description: "Automated Data Delivery Platform"
   - Choose "Public" or "Private"
   - Click "Create repository"

3. **Push to GitHub**
```bash
git remote add origin https://github.com/YOUR_USERNAME/flashdata-platform.git
git branch -M main
git push -u origin main
```

---

### Step 3: Deploy to Render (5 minutes)

1. **Sign Up for Render**
   - Go to https://render.com
   - Click "Get Started"
   - Sign up with GitHub (recommended)

2. **Create New Web Service**
   - Click "New +" button (top right)
   - Select "Web Service"
   - Click "Connect" next to your GitHub repository
   - If you don't see it, click "Configure account" and grant access

3. **Configure Web Service**
   - **Name**: `flashdata-platform`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: Leave empty
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Select "Free"

4. **Add Environment Variables**
   Click "Advanced" and add these environment variables:

   ```
   NODE_ENV = production
   
   MONGODB_URI = mongodb+srv://flashdata_user:yourpassword@cluster0.xxxxx.mongodb.net/flashdata?retryWrites=true&w=majority
   
   JWT_SECRET = your_super_secret_jwt_key_minimum_32_characters_long_random_string
   
   PAYSTACK_SECRET_KEY = sk_test_your_paystack_secret_key
   
   PAYSTACK_PUBLIC_KEY = pk_test_your_paystack_public_key
   
   FRONTEND_URL = https://flashdata-platform.onrender.com
   ```

   **Important Notes:**
   - Replace MongoDB URI with YOUR connection string from Step 1
   - Generate a strong JWT_SECRET (32+ characters)
   - Get Paystack keys from https://dashboard.paystack.com/settings/developer
   - FRONTEND_URL will be your Render URL (update after deployment)

5. **Create Web Service**
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - Render will build and deploy your app

---

### Step 4: Seed Database (2 minutes)

After deployment completes:

1. **Go to Shell**
   - In Render dashboard, click on your service
   - Click "Shell" tab (top right)
   - Wait for shell to connect

2. **Run Seed Command**
```bash
npm run seed
```

This creates:
- Admin account (iddrisuhafiz568@gmail.com / admin123)
- Networks (MTN, Telecel, AirtelTigo)
- Sample bundles

3. **Exit Shell**
```bash
exit
```

---

### Step 5: Update Paystack Webhook (2 minutes)

1. **Get Your Render URL**
   - Your app URL: `https://flashdata-platform.onrender.com`
   - Copy this URL

2. **Configure Paystack Webhook**
   - Go to https://dashboard.paystack.com
   - Navigate to Settings → Webhooks
   - Click "Add Webhook"
   - Webhook URL: `https://flashdata-platform.onrender.com/api/payment/webhook`
   - Click "Save"

---

### Step 6: Test Your Deployment (3 minutes)

1. **Visit Your Site**
   - Go to: `https://flashdata-platform.onrender.com`
   - You should see the landing page

2. **Login as Admin**
   - Click "Login"
   - Email: `iddrisuhafiz568@gmail.com`
   - Password: `admin123`
   - You should be redirected to admin dashboard

3. **Change Admin Password**
   - Go to profile settings
   - Change password immediately!

4. **Test Payment** (Optional)
   - Top up wallet
   - Use Paystack test card:
     ```
     Card: 4084 0840 8408 4081
     CVV: 408
     Expiry: 12/25
     PIN: 0000
     OTP: 123456
     ```

---

## 🎉 Deployment Complete!

Your FlashData platform is now live at:
**https://flashdata-platform.onrender.com**

---

## 📝 Important Notes

### Free Tier Limitations
- **Render Free Tier**:
  - App sleeps after 15 minutes of inactivity
  - First request after sleep takes 30-60 seconds
  - 750 hours/month (enough for 1 app)
  - Automatic HTTPS

- **MongoDB Atlas Free Tier**:
  - 512 MB storage
  - Shared CPU
  - Enough for thousands of users

### Upgrading to Paid Plans
When you're ready to scale:
- **Render**: $7/month (no sleep, better performance)
- **MongoDB Atlas**: $9/month (more storage, dedicated resources)

---

## 🔧 Post-Deployment Tasks

### 1. Custom Domain (Optional)
1. Buy domain from Namecheap, GoDaddy, etc.
2. In Render dashboard, go to Settings → Custom Domain
3. Add your domain
4. Update DNS records as instructed
5. Update FRONTEND_URL environment variable

### 2. Enable Live Payments
1. Get Paystack live keys from dashboard
2. Update environment variables:
   - `PAYSTACK_SECRET_KEY` = sk_live_...
   - `PAYSTACK_PUBLIC_KEY` = pk_live_...
3. Test with real card (small amount)

### 3. Set Up Monitoring
1. Enable Render notifications
2. Set up uptime monitoring (UptimeRobot, Pingdom)
3. Monitor MongoDB Atlas metrics

### 4. Backup Database
1. In MongoDB Atlas, go to Clusters
2. Click "..." → "Backup"
3. Enable Cloud Backup (free tier available)

---

## 🐛 Troubleshooting

### App Not Loading?
- Check Render logs: Dashboard → Logs tab
- Verify all environment variables are set
- Check MongoDB connection string

### Database Connection Error?
- Verify MongoDB Atlas IP whitelist (0.0.0.0/0)
- Check connection string format
- Ensure password doesn't have special characters (or URL encode them)

### Payment Not Working?
- Verify Paystack keys are correct
- Check webhook URL is set
- Test with Paystack test cards first

### App Sleeping?
- Free tier sleeps after 15 minutes
- First request wakes it up (30-60 seconds)
- Upgrade to paid plan to prevent sleeping

---

## 🔄 Updating Your App

When you make changes:

1. **Commit and Push**
```bash
git add .
git commit -m "Update description"
git push origin main
```

2. **Auto-Deploy**
   - Render automatically detects changes
   - Rebuilds and redeploys
   - Takes 5-10 minutes

3. **Manual Deploy**
   - In Render dashboard
   - Click "Manual Deploy" → "Deploy latest commit"

---

## 📊 Monitoring

### Render Dashboard
- View logs in real-time
- Monitor CPU and memory usage
- Check deployment history
- View metrics

### MongoDB Atlas
- Monitor database performance
- View connection metrics
- Check storage usage
- Set up alerts

---

## 🔒 Security Checklist

- [x] HTTPS enabled (automatic on Render)
- [x] Environment variables secured
- [x] MongoDB IP whitelist configured
- [x] Strong JWT secret
- [x] Admin password changed
- [x] Paystack webhook configured
- [ ] Custom domain with SSL (optional)
- [ ] Regular backups enabled
- [ ] Monitoring set up

---

## 💰 Cost Breakdown

### Free Tier (Perfect for Starting)
- Render: FREE
- MongoDB Atlas: FREE
- Paystack: FREE (pay per transaction)
- **Total: FREE** (only pay Paystack transaction fees)

### Paid Tier (For Growth)
- Render: $7/month
- MongoDB Atlas: $9/month
- Paystack: Transaction fees only
- **Total: ~$16/month**

---

## 📞 Support

### Render Support
- Docs: https://render.com/docs
- Community: https://community.render.com
- Status: https://status.render.com

### MongoDB Support
- Docs: https://docs.mongodb.com
- University: https://university.mongodb.com
- Support: https://support.mongodb.com

### Paystack Support
- Docs: https://paystack.com/docs
- Email: support@paystack.com
- Phone: +234 1 888 3888

---

## 🎊 Congratulations!

Your FlashData platform is now live and accessible worldwide!

### What's Next?
1. ✅ Share your platform URL
2. ✅ Start onboarding users
3. ✅ Monitor performance
4. ✅ Gather feedback
5. ✅ Scale as needed

---

**Your Live URL**: https://flashdata-platform.onrender.com

**Built with ❤️ by StarMedia**

**Happy Selling! 🚀**
