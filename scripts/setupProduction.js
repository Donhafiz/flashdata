const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Models
const User = require('../models/User');
const Network = require('../models/Network');
const Bundle = require('../models/Bundle');

const setupProduction = async () => {
  try {
    console.log('🚀 Setting up FlashData for Production...\n');

    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/flashdata';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB\n');

    // Create Admin User
    console.log('👤 Creating admin user...');
    const existingAdmin = await User.findOne({ email: 'iddrisuhafiz568@gmail.com' });
    
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      await User.create({
        fullName: 'Admin User',
        email: 'iddrisuhafiz568@gmail.com',
        phone: '0000000000',
        password: hashedPassword,
        role: 'Admin',
        wallet: 0,
        referralCode: 'ADMIN' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        totalEarnings: 0,
        isActive: true,
      });
      
      console.log('✅ Admin user created');
    } else {
      existingAdmin.role = 'Admin';
      await existingAdmin.save();
      console.log('✅ Admin user already exists (role updated)');
    }

    // Create Networks
    console.log('\n📱 Setting up networks...');
    const networks = [
      { name: 'MTN', isActive: true },
      { name: 'Telecel', isActive: true },
      { name: 'AirtelTigo', isActive: true },
    ];

    for (const networkData of networks) {
      const existing = await Network.findOne({ name: networkData.name });
      if (!existing) {
        await Network.create(networkData);
        console.log(`✅ Created network: ${networkData.name}`);
      } else {
        console.log(`✅ Network exists: ${networkData.name}`);
      }
    }

    // Create Production Bundles
    console.log('\n📦 Setting up data bundles...');
    const mtn = await Network.findOne({ name: 'MTN' });
    const telecel = await Network.findOne({ name: 'Telecel' });
    const airtelTigo = await Network.findOne({ name: 'AirtelTigo' });

    const bundles = [
      // MTN Bundles
      { network: mtn._id, name: 'Daily Bundle', dataAmount: '1GB', validity: '24 Hours', price: 5, customerPrice: 4.5, agentPrice: 4, agentProPrice: 3.8, isActive: true },
      { network: mtn._id, name: 'Weekly Bundle', dataAmount: '5GB', validity: '7 Days', price: 20, customerPrice: 18, agentPrice: 16, agentProPrice: 15, isActive: true },
      { network: mtn._id, name: 'Monthly Bundle', dataAmount: '20GB', validity: '30 Days', price: 70, customerPrice: 65, agentPrice: 60, agentProPrice: 55, isActive: true },
      { network: mtn._id, name: 'Mega Bundle', dataAmount: '50GB', validity: '30 Days', price: 150, customerPrice: 140, agentPrice: 130, agentProPrice: 120, isActive: true },
      
      // Telecel Bundles
      { network: telecel._id, name: 'Daily Bundle', dataAmount: '1GB', validity: '24 Hours', price: 5, customerPrice: 4.5, agentPrice: 4, agentProPrice: 3.8, isActive: true },
      { network: telecel._id, name: 'Weekly Bundle', dataAmount: '5GB', validity: '7 Days', price: 20, customerPrice: 18, agentPrice: 16, agentProPrice: 15, isActive: true },
      { network: telecel._id, name: 'Monthly Bundle', dataAmount: '20GB', validity: '30 Days', price: 70, customerPrice: 65, agentPrice: 60, agentProPrice: 55, isActive: true },
      { network: telecel._id, name: 'Mega Bundle', dataAmount: '50GB', validity: '30 Days', price: 150, customerPrice: 140, agentPrice: 130, agentProPrice: 120, isActive: true },
      
      // AirtelTigo Bundles
      { network: airtelTigo._id, name: 'Daily Bundle', dataAmount: '1GB', validity: '24 Hours', price: 5, customerPrice: 4.5, agentPrice: 4, agentProPrice: 3.8, isActive: true },
      { network: airtelTigo._id, name: 'Weekly Bundle', dataAmount: '5GB', validity: '7 Days', price: 20, customerPrice: 18, agentPrice: 16, agentProPrice: 15, isActive: true },
      { network: airtelTigo._id, name: 'Monthly Bundle', dataAmount: '20GB', validity: '30 Days', price: 70, customerPrice: 65, agentPrice: 60, agentProPrice: 55, isActive: true },
      { network: airtelTigo._id, name: 'Mega Bundle', dataAmount: '50GB', validity: '30 Days', price: 150, customerPrice: 140, agentPrice: 130, agentProPrice: 120, isActive: true },
    ];

    let bundleCount = 0;
    for (const bundleData of bundles) {
      const existing = await Bundle.findOne({ 
        network: bundleData.network, 
        name: bundleData.name,
        dataAmount: bundleData.dataAmount 
      });
      
      if (!existing) {
        await Bundle.create(bundleData);
        bundleCount++;
      }
    }
    
    console.log(`✅ Created ${bundleCount} bundles`);

    console.log('\n========================================');
    console.log('🎉 Production Setup Complete!');
    console.log('========================================');
    console.log('\n📋 Admin Credentials:');
    console.log('Email: iddrisuhafiz568@gmail.com');
    console.log('Password: admin123');
    console.log('\n⚠️  IMPORTANT: Change admin password after first login!');
    console.log('\n📱 Networks: MTN, Telecel, AirtelTigo');
    console.log('📦 Bundles: 12 bundles created');
    console.log('\n🔐 Next Steps:');
    console.log('1. Update .env with production values');
    console.log('2. Set up Paystack live keys');
    console.log('3. Configure domain and SSL');
    console.log('4. Set up webhook URL');
    console.log('5. Test payment flow');
    console.log('6. Change admin password');
    console.log('\n========================================\n');
    
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

setupProduction();
