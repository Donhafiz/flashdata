# ✅ Render Deployment Checklist

Use this checklist to ensure smooth deployment to Render.

---

## 📋 Pre-Deployment

### MongoDB Atlas Setup
- [ ] Created MongoDB Atlas account
- [ ] Created free cluster
- [ ] Created database user with password
- [ ] Whitelisted IP address (0.0.0.0/0)
- [ ] Copied connection string
- [ ] Tested connection string locally

### Paystack Setup
- [ ] Created Paystack account
- [ ] Verified email
- [ ] Got test API keys (Secret & Public)
- [ ] Saved keys securely
- [ ] (Optional) Got live keys for production

### GitHub Setup
- [ ] Created GitHub repository
- [ ] Pushed code to GitHub
- [ ] Verified all files are committed
- [ ] Checked .gitignore excludes .env

---

## 🚀 Deployment Steps

### Render Account
- [ ] Created Render account
- [ ] Connected GitHub account
- [ ] Verified email

### Web Service Configuration
- [ ] Created new Web Service
- [ ] Connected GitHub repository
- [ ] Selected correct branch (main)
- [ ] Set Build Command: `npm install`
- [ ] Set Start Command: `npm start`
- [ ] Selected Free plan

### Environment Variables
- [ ] Added NODE_ENV = production
- [ ] Added MONGODB_URI (from Atlas)
- [ ] Added JWT_SECRET (32+ characters)
- [ ] Added PAYSTACK_SECRET_KEY
- [ ] Added PAYSTACK_PUBLIC_KEY
- [ ] Added FRONTEND_URL (Render URL)

### Deployment
- [ ] Clicked "Create Web Service"
- [ ] Waited for build to complete
- [ ] Checked logs for errors
- [ ] Verified deployment success

---

## 🗄️ Database Setup

### Seed Database
- [ ] Opened Render Shell
- [ ] Ran `npm run seed`
- [ ] Verified admin account created
- [ ] Verified networks created
- [ ] Verified bundles created
- [ ] Exited shell

### Test Database
- [ ] Logged in as admin
- [ ] Checked dashboard loads
- [ ] Verified data displays correctly

---

## 💳 Payment Configuration

### Paystack Webhook
- [ ] Copied Render app URL
- [ ] Logged into Paystack dashboard
- [ ] Navigated to Settings → Webhooks
- [ ] Added webhook URL: `https://your-app.onrender.com/api/payment/webhook`
- [ ] Saved webhook configuration

### Test Payment
- [ ] Logged into platform
- [ ] Clicked "Top Up Wallet"
- [ ] Entered test amount
- [ ] Used Paystack test card
- [ ] Verified payment success
- [ ] Checked wallet updated
- [ ] Verified transaction logged

---

## 🔒 Security

### Admin Account
- [ ] Logged in with default credentials
- [ ] Changed admin password immediately
- [ ] Saved new password securely
- [ ] Tested login with new password

### Environment Variables
- [ ] Verified .env not in GitHub
- [ ] Confirmed all secrets in Render only
- [ ] Checked JWT_SECRET is strong
- [ ] Verified MongoDB password is secure

---

## 🧪 Testing

### Basic Functionality
- [ ] Landing page loads
- [ ] Login works
- [ ] Registration works
- [ ] Dashboard displays correctly
- [ ] Buy data page works
- [ ] Orders page loads
- [ ] Transactions page loads
- [ ] Referrals page loads
- [ ] Admin dashboard accessible

### User Flow
- [ ] Created test customer account
- [ ] Topped up wallet (test payment)
- [ ] Purchased data bundle
- [ ] Checked order status
- [ ] Verified transaction recorded
- [ ] Tested referral link

### Admin Functions
- [ ] Logged in as admin
- [ ] Viewed all users
- [ ] Created new bundle
- [ ] Edited network
- [ ] Created announcement
- [ ] Viewed analytics

### Mobile Testing
- [ ] Tested on mobile browser
- [ ] Checked responsive design
- [ ] Verified all features work
- [ ] Tested payment on mobile

---

## 📊 Monitoring

### Render Dashboard
- [ ] Bookmarked Render dashboard
- [ ] Checked deployment logs
- [ ] Verified no errors
- [ ] Noted app URL

### MongoDB Atlas
- [ ] Checked database metrics
- [ ] Verified connections
- [ ] Checked storage usage
- [ ] Set up alerts (optional)

### Paystack Dashboard
- [ ] Checked test transactions
- [ ] Verified webhook working
- [ ] Reviewed transaction logs

---

## 📝 Documentation

### Update URLs
- [ ] Updated FRONTEND_URL in Render
- [ ] Updated README with live URL
- [ ] Shared URL with team
- [ ] Documented admin credentials (securely)

### Backup Information
- [ ] Saved MongoDB connection string
- [ ] Saved Paystack keys
- [ ] Saved admin credentials
- [ ] Saved Render app URL
- [ ] Documented deployment date

---

## 🎯 Post-Deployment

### Immediate Tasks
- [ ] Announced platform launch
- [ ] Shared URL with users
- [ ] Monitored for first 24 hours
- [ ] Checked for errors in logs
- [ ] Responded to user feedback

### Within First Week
- [ ] Monitored performance
- [ ] Checked database growth
- [ ] Reviewed transaction logs
- [ ] Gathered user feedback
- [ ] Fixed any issues

### Ongoing
- [ ] Regular backups
- [ ] Monitor uptime
- [ ] Check logs weekly
- [ ] Update dependencies
- [ ] Scale as needed

---

## 🚨 Troubleshooting

### If Deployment Fails
- [ ] Check Render logs
- [ ] Verify all environment variables
- [ ] Check MongoDB connection
- [ ] Verify package.json scripts
- [ ] Check Node.js version

### If App Doesn't Load
- [ ] Check Render status
- [ ] Verify deployment completed
- [ ] Check for errors in logs
- [ ] Test MongoDB connection
- [ ] Verify environment variables

### If Payment Fails
- [ ] Check Paystack keys
- [ ] Verify webhook URL
- [ ] Test with different card
- [ ] Check transaction logs
- [ ] Contact Paystack support

---

## 🎊 Success Criteria

Your deployment is successful when:
- ✅ App loads at Render URL
- ✅ Admin can login
- ✅ Database is seeded
- ✅ Payment works (test mode)
- ✅ Orders can be placed
- ✅ Transactions are logged
- ✅ No errors in logs
- ✅ Mobile responsive
- ✅ Webhook configured
- ✅ Admin password changed

---

## 📞 Support Resources

### Render
- Dashboard: https://dashboard.render.com
- Docs: https://render.com/docs
- Status: https://status.render.com

### MongoDB Atlas
- Dashboard: https://cloud.mongodb.com
- Docs: https://docs.mongodb.com
- Support: https://support.mongodb.com

### Paystack
- Dashboard: https://dashboard.paystack.com
- Docs: https://paystack.com/docs
- Support: support@paystack.com

---

## 🎉 Congratulations!

Once all items are checked, your FlashData platform is successfully deployed!

**Live URL**: https://flashdata-platform.onrender.com

**Next Steps**:
1. Share with users
2. Monitor performance
3. Gather feedback
4. Plan improvements
5. Scale as needed

---

**Deployment Date**: _________________

**Deployed By**: _________________

**Notes**: _________________

---

**Built with ❤️ by StarMedia**
