
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to TaskFlow API!'
  });
});

// Database health check
app.get('/api/health', async (req, res) => {
  try {
    await db.query('SELECT NOW()');

    res.status(200).json({
      success: true,
      message: 'Supabase PostgreSQL connected successfully!'
    });
  } catch (error) {
   console.error('DATABASE ERROR DETAILS:', error);

    res.status(500).json({
      success: false,
      message: 'Database connection failed'
    });
  }
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`TaskFlow API running on port ${PORT}`);
});
