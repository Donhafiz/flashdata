const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Schemas
const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  password: String,
  role: String,
  wallet: Number,
  referralCode: String,
  totalEarnings: Number,
  isActive: Boolean,
}, { timestamps: true });

const networkSchema = new mongoose.Schema({
  name: String,
  isActive: Boolean,
}, { timestamps: true });

const bundleSchema = new mongoose.Schema({
  network: { type: mongoose.Schema.Types.ObjectId, ref: 'Network' },
  name: String,
  dataAmount: String,
  validity: String,
  price: Number,
  customerPrice: Number,
  agentPrice: Number,
  agentProPrice: Number,
  isActive: Boolean,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Network = mongoose.model('Network', networkSchema);
const Bundle = mongoose.model('Bundle', bundleSchema);

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/flashdata';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
    console.log('Seeding database...\n');

    // Create Admin User
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
      console.log('   Email: iddrisuhafiz568@gmail.com');
      console.log('   Password: admin123\n');
    } else {
      existingAdmin.role = 'Admin';
      await existingAdmin.save();
      console.log('✅ Admin user already exists (role updated)\n');
    }

    // Create Networks
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
      }
    }

    // Create Sample Bundles
    const mtn = await Network.findOne({ name: 'MTN' });
    const telecel = await Network.findOne({ name: 'Telecel' });
    const airtelTigo = await Network.findOne({ name: 'AirtelTigo' });

    const bundles = [
      // MTN Bundles
      { network: mtn._id, name: 'Daily Bundle', dataAmount: '1GB', validity: '24 Hours', price: 5, customerPrice: 4.5, agentPrice: 4, agentProPrice: 3.8, isActive: true },
      { network: mtn._id, name: 'Weekly Bundle', dataAmount: '5GB', validity: '7 Days', price: 20, customerPrice: 18, agentPrice: 16, agentProPrice: 15, isActive: true },
      { network: mtn._id, name: 'Monthly Bundle', dataAmount: '20GB', validity: '30 Days', price: 70, customerPrice: 65, agentPrice: 60, agentProPrice: 55, isActive: true },
      
      // Telecel Bundles
      { network: telecel._id, name: 'Daily Bundle', dataAmount: '1GB', validity: '24 Hours', price: 5, customerPrice: 4.5, agentPrice: 4, agentProPrice: 3.8, isActive: true },
      { network: telecel._id, name: 'Weekly Bundle', dataAmount: '5GB', validity: '7 Days', price: 20, customerPrice: 18, agentPrice: 16, agentProPrice: 15, isActive: true },
      { network: telecel._id, name: 'Monthly Bundle', dataAmount: '20GB', validity: '30 Days', price: 70, customerPrice: 65, agentPrice: 60, agentProPrice: 55, isActive: true },
      
      // AirtelTigo Bundles
      { network: airtelTigo._id, name: 'Daily Bundle', dataAmount: '1GB', validity: '24 Hours', price: 5, customerPrice: 4.5, agentPrice: 4, agentProPrice: 3.8, isActive: true },
      { network: airtelTigo._id, name: 'Weekly Bundle', dataAmount: '5GB', validity: '7 Days', price: 20, customerPrice: 18, agentPrice: 16, agentProPrice: 15, isActive: true },
      { network: airtelTigo._id, name: 'Monthly Bundle', dataAmount: '20GB', validity: '30 Days', price: 70, customerPrice: 65, agentPrice: 60, agentProPrice: 55, isActive: true },
    ];

    for (const bundleData of bundles) {
      const existing = await Bundle.findOne({ 
        network: bundleData.network, 
        name: bundleData.name,
        dataAmount: bundleData.dataAmount 
      });
      
      if (!existing) {
        await Bundle.create(bundleData);
      }
    }
    
    console.log('✅ Created sample bundles for all networks\n');

    console.log('========================================');
    console.log('Database seeded successfully!');
    console.log('========================================');
    console.log('Admin Login:');
    console.log('Email: iddrisuhafiz568@gmail.com');
    console.log('Password: admin123');
    console.log('========================================\n');
    
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
