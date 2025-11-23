# 🚀 Deploy FlashData to Render NOW!

## ⚡ Super Quick Guide (Follow These Steps)

### 1️⃣ MongoDB Atlas (3 minutes)

**Go to:** https://mongodb.com/cloud/atlas

1. Click "Try Free" → Sign up
2. Create FREE cluster (M0)
3. Database Access → Add User:
   - Username: `flashdata_user`
   - Password: Click "Autogenerate Secure Password" → **COPY & SAVE IT!**
4. Network Access → Add IP Address → "Allow Access from Anywhere"
5. Database → Connect → "Connect your application"
6. Copy connection string, replace `<password>` with your saved password
7. Add `/flashdata` before the `?`:
   ```
   mongodb+srv://flashdata_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/flashdata?retryWrites=true&w=majority
   ```
   **SAVE THIS STRING!**

---

### 2️⃣ Paystack (2 minutes)

**Go to:** https://dashboard.paystack.com

1. Sign up (FREE)
2. Verify your email
3. Settings → API Keys & Webhooks
4. Copy both keys:
   - **Secret Key**: `sk_test_...` **SAVE IT!**
   - **Public Key**: `pk_test_...` **SAVE IT!**

---

### 3️⃣ GitHub (2 minutes)

**In your terminal:**

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Deploy FlashData to Render"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/flashdata-platform.git
git branch -M main
git push -u origin main
```

---

### 4️⃣ Render (5 minutes)

**Go to:** https://render.com

1. **Sign up** with GitHub
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect"** next to your `flashdata-platform` repo
4. Fill in:
   - **Name**: `flashdata-platform`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Select **"Free"**

5. Click **"Advanced"** → Add Environment Variables:

   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `MONGODB_URI` | Your MongoDB connection string from Step 1 |
   | `JWT_SECRET` | Any random 32+ character string (e.g., `flashdata_jwt_secret_2024_super_secure_key_12345`) |
   | `PAYSTACK_SECRET_KEY` | Your Paystack secret key from Step 2 |
   | `PAYSTACK_PUBLIC_KEY` | Your Paystack public key from Step 2 |
   | `FRONTEND_URL` | `https://flashdata-platform.onrender.com` |

6. Click **"Create Web Service"**
7. **Wait 5-10 minutes** for deployment

---

### 5️⃣ Seed Database (2 minutes)

**After deployment completes:**

1. In Render dashboard, click **"Shell"** tab
2. Type and press Enter:
   ```bash
   npm run seed
   ```
3. Wait for "Database seeded successfully!"
4. Type `exit` and press Enter

---

### 6️⃣ Configure Webhook (1 minute)

**Go back to:** https://dashboard.paystack.com

1. Settings → Webhooks
2. Click "Add Webhook"
3. Webhook URL: `https://flashdata-platform.onrender.com/api/payment/webhook`
4. Click "Save"

---

## 🎉 YOU'RE LIVE!

**Your Platform:** https://flashdata-platform.onrender.com

**Admin Login:**
- Email: `iddrisuhafiz568@gmail.com`
- Password: `admin123`

**⚠️ IMPORTANT: Change admin password immediately after first login!**

---

## 🧪 Test It!

1. **Login** as admin
2. **Top Up Wallet** with test card:
   ```
   Card: 4084 0840 8408 4081
   CVV: 408
   Expiry: 12/25
   PIN: 0000
   OTP: 123456
   ```
3. **Buy Data** bundle
4. **Check** order status

---

## 📝 Save These URLs

- **Your App**: https://flashdata-platform.onrender.com
- **Render Dashboard**: https://dashboard.render.com
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Paystack Dashboard**: https://dashboard.paystack.com

---

## 🆘 Having Issues?

### App not loading?
- Check Render logs (Dashboard → Logs)
- Verify all environment variables are set
- Wait 30-60 seconds (free tier wakes up)

### Can't login?
- Make sure you ran `npm run seed`
- Check MongoDB connection in Render logs

### Payment not working?
- Verify Paystack keys are correct
- Check webhook is configured
- Use test card details above

---

## 📚 Need More Help?

- **Detailed Guide**: See `RENDER_DEPLOYMENT.md`
- **Checklist**: See `DEPLOYMENT_CHECKLIST.md`
- **Quick Reference**: See `RENDER_QUICK_START.txt`

---

## 🎊 Congratulations!

Your FlashData platform is now **LIVE** and accessible worldwide! 🌍

**Share your URL and start selling data!** 🚀

---

**Built with ❤️ by StarMedia**
