const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// User Schema (simplified for seeding)
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

const User = mongoose.model('User', userSchema);

const createAdmin = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/flashdata';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'iddrisuhafiz568@gmail.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Updating to Admin role...');
      
      existingAdmin.role = 'Admin';
      await existingAdmin.save();
      
      console.log('✅ User updated to Admin role successfully!');
    } else {
      console.log('Creating new admin user...');
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      // Create admin user
      const admin = await User.create({
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
      
      console.log('✅ Admin user created successfully!');
      console.log('Email: iddrisuhafiz568@gmail.com');
      console.log('Password: admin123');
      console.log('⚠️  Please change the password after first login!');
    }
    
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
