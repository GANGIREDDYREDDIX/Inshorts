const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const announcementRoutes = require('./routes/announcements');
const User = require('./models/User');
const { hashPassword } = require('./utils/security');

const app = express();
const PORT = process.env.PORT || 5001;

// If running behind a proxy (e.g., in production), trust the proxy so req.ip is
// populated from X-Forwarded-For. Configure via environment when needed.
if (process.env.TRUST_PROXY === 'true' || process.env.NODE_ENV === 'production') {
  app.set('trust proxy', true);
}

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow serving uploaded files
}));

// CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging (only in development)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });
}

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Database Connection (improved diagnostics)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/inshorts-uni';

// Mask URI for logs (do not print credentials)
const maskUri = (uri) => {
  try {
    // keep protocol and host, hide auth
    return uri.replace(/:(.*)@/, ':****@');
  } catch (e) {
    return 'mongodb://<masked>';
  }
};

console.log('Connecting to MongoDB at', maskUri(MONGO_URI));

// Recommended options; increase serverSelectionTimeoutMS for slower networks
// Connection event listeners for diagnostics
mongoose.connection.on('connected', () => console.log('Mongoose event: connected'));
mongoose.connection.on('error', (err) => console.error('Mongoose event: error', err && err.message));
mongoose.connection.on('disconnected', () => console.warn('Mongoose event: disconnected'));

// Seed Users (development only)
const seedUsers = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      console.log('Skipping user seeding in production');
      return;
    }

    const count = await User.countDocuments();
    if (count === 0) {
      // Hash seeded passwords before inserting
      const seedPassword = process.env.SEED_PASSWORD || 'pass123';
      const users = [
        { regId: 'teacher1', password: await hashPassword(seedPassword), role: 'teacher' },
        { regId: 'student1', password: await hashPassword(seedPassword), role: 'student' }
      ];
      await User.insertMany(users);
      console.log('Users Seeded (passwords hashed)');
    } else {
      console.log('Users already exist, skipping seed');
    }
  } catch (err) {
    console.error('Error seeding users:', err.message);
  }
};

// Connect to MongoDB and start server only after connection is established
const startServer = async () => {
  try {
    // Wait for MongoDB connection with proper options
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // 30s timeout for server selection
      socketTimeoutMS: 45000,
      // Disable buffering - fail fast if not connected
      bufferCommands: false
    });
    
    console.log('MongoDB Connected successfully');
    
    // Seed users after connection is confirmed
    await seedUsers();
    
    // Setup routes after DB is ready
    app.use('/api/auth', authRoutes);
    app.use('/api/announcements', announcementRoutes);
    
    app.get('/', (req, res) => {
      res.send('Server is running');
    });
    
    // Start server only after DB connection is confirmed
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    }).on('error', (err) => {
      console.error('Server failed to start:', err);
      process.exit(1);
    });
    
  } catch (err) {
    console.error('Failed to connect to MongoDB:');
    console.error('Error message:', err.message);
    console.error('Full error:', err);
    console.error('\nPlease check:');
    console.error('1. MongoDB Atlas IP whitelist includes your current IP');
    console.error('2. Database credentials are correct in .env file');
    console.error('3. Network connection is stable');
    process.exit(1);
  }
};

// Start the server
startServer();
