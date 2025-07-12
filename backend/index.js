// backend/index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes.js'); // Import user routes
const goalRoutes = require('./routes/goal.routes.js'); // Import goal routes

// Load environment variables and connect to the database
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse incoming JSON payloads
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded payloads

// --- API Routes ---

// Root route for API status check
app.get('/', (req, res) => {
  res.send('GoalTracker API is running!');
});

// Use the imported routes
app.use('/api/users', userRoutes); // All user-related routes (register, login)
app.use('/api/goals', goalRoutes); // All goal and task-related routes

// --- Server Initialization ---
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
