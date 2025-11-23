# FlashData Deployment Guide

## 🚀 Deployment Options

### Option 1: Heroku (Recommended for Beginners)

#### Prerequisites
- Heroku account
- Heroku CLI installed
- Git installed

#### Steps

1. **Install Heroku CLI**
```bash
# Windows
choco install heroku-cli

# Mac
brew tap heroku/brew && brew install heroku

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Heroku App**
```bash
heroku create flashdata-platform
```

4. **Set Environment Variables**
```bash
heroku config:set MONGODB_URI="your_mongodb_atlas_uri"
heroku config:set JWT_SECRET="your_jwt_secret"
heroku config:set PAYSTACK_SECRET_KEY="your_paystack_secret"
heroku config:set PAYSTACK_PUBLIC_KEY="your_paystack_public"
heroku config:set NODE_ENV="production"
heroku config:set FRONTEND_URL="https://flashdata-platform.herokuapp.com"
```

5. **Deploy**
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

6. **Open App**
```bash
heroku open
```

### Option 2: DigitalOcean

#### Prerequisites
- DigitalOcean account
- Domain name (optional)

#### Steps

1. **Create Droplet**
   - Choose Ubuntu 22.04
   - Select plan ($6/month minimum)
   - Add SSH key

2. **SSH into Server**
```bash
ssh root@your_server_ip
```

3. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. **Install MongoDB**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

5. **Install PM2**
```bash
sudo npm install -g pm2
```

6. **Clone Repository**
```bash
cd /var/www
git clone your_repository_url flashdata
cd flashdata
```

7. **Install Dependencies**
```bash
npm install
```

8. **Create .env File**
```bash
nano .env
```
Add your environment variables

9. **Start Application**
```bash
pm2 start server.js --name flashdata
pm2 save
pm2 startup
```

10. **Install Nginx**
```bash
sudo apt install nginx
```

11. **Configure Nginx**
```bash
sudo nano /etc/nginx/sites-available/flashdata
```

Add:
```nginx
server {
    listen 80;
    server_name your_domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

12. **Enable Site**
```bash
sudo ln -s /etc/nginx/sites-available/flashdata /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

13. **Install SSL (Optional but Recommended)**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your_domain.com
```

### Option 3: Vercel (Frontend) + MongoDB Atlas (Database)

#### Prerequisites
- Vercel account
- MongoDB Atlas account

#### Steps

1. **Set up MongoDB Atlas**
   - Create cluster at mongodb.com/cloud/atlas
   - Create database user
   - Whitelist IP (0.0.0.0/0 for all)
   - Get connection string

2. **Deploy to Vercel**
```bash
npm install -g vercel
vercel login
vercel
```

3. **Set Environment Variables in Vercel**
   - Go to Vercel dashboard
   - Select project
   - Settings → Environment Variables
   - Add all variables from .env

### Option 4: Railway

#### Steps

1. **Sign up at Railway.app**

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository

3. **Add MongoDB**
   - Click "New"
   - Select "Database"
   - Choose "MongoDB"

4. **Set Environment Variables**
   - Go to project settings
   - Add variables tab
   - Add all environment variables

5. **Deploy**
   - Railway auto-deploys on push

## 📊 MongoDB Atlas Setup

1. **Create Account**
   - Go to mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region closest to users
   - Create cluster

3. **Create Database User**
   - Database Access → Add New User
   - Choose password authentication
   - Save credentials

4. **Whitelist IP**
   - Network Access → Add IP Address
   - Add 0.0.0.0/0 (allow from anywhere)
   - Or add specific IPs

5. **Get Connection String**
   - Clusters → Connect
   - Connect your application
   - Copy connection string
   - Replace <password> with your password

## 🔐 Environment Variables

Required variables for production:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flashdata
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
PAYSTACK_SECRET_KEY=sk_live_your_live_secret_key
PAYSTACK_PUBLIC_KEY=pk_live_your_live_public_key
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

## ✅ Pre-Deployment Checklist

- [ ] Test all features locally
- [ ] Set up production MongoDB
- [ ] Get Paystack live keys
- [ ] Update environment variables
- [ ] Test payment with real card (small amount)
- [ ] Set up domain name
- [ ] Configure SSL certificate
- [ ] Set up webhook URL in Paystack
- [ ] Test webhook
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Test on mobile devices
- [ ] Check all API endpoints
- [ ] Verify security measures
- [ ] Set up error logging

## 🔧 Post-Deployment

### 1. Seed Database
```bash
npm run seed
```

### 2. Test Admin Login
- Email: iddrisuhafiz568@gmail.com
- Password: admin123
- Change password immediately!

### 3. Configure Paystack Webhook
- Go to Paystack Dashboard
- Settings → Webhooks
- Add: https://yourdomain.com/api/payment/webhook

### 4. Test Payment
- Use real card with small amount
- Verify wallet updates
- Check transaction logs

### 5. Monitor Logs
```bash
# PM2
pm2 logs flashdata

# Heroku
heroku logs --tail
```

## 📈 Monitoring

### Set up Monitoring Tools

1. **PM2 Monitoring** (DigitalOcean)
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
```

2. **Heroku Monitoring**
   - Use Heroku metrics
   - Add New Relic addon

3. **Error Tracking**
   - Set up Sentry
   - Configure error logging

## 🔄 Updates

### Update Application

**Heroku:**
```bash
git add .
git commit -m "Update"
git push heroku main
```

**DigitalOcean:**
```bash
cd /var/www/flashdata
git pull
npm install
pm2 restart flashdata
```

## 🛡️ Security Best Practices

1. **Use HTTPS** - Always use SSL in production
2. **Strong JWT Secret** - Minimum 32 characters
3. **Secure MongoDB** - Use strong passwords, whitelist IPs
4. **Environment Variables** - Never commit .env file
5. **Rate Limiting** - Implement API rate limiting
6. **Input Validation** - Validate all user inputs
7. **Regular Updates** - Keep dependencies updated
8. **Backup Database** - Regular automated backups
9. **Monitor Logs** - Check logs regularly
10. **Webhook Security** - Verify Paystack signatures

## 📞 Support

Deployment issues?
- Check logs first
- Verify environment variables
- Test database connection
- Check Paystack configuration
- Review security settings

## 🎉 Success!

Your FlashData platform is now live! 🚀

Next steps:
1. Test all features
2. Monitor performance
3. Gather user feedback
4. Plan improvements
5. Scale as needed

---

**Built with ❤️ by StarMedia**
