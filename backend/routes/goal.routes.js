// backend/routes/goal.routes.js
const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goal.controller');
const auth = require('../middleware/auth.middleware');

// Import the task router
const taskRouter = require('./task.routes');

// Apply the 'protect' middleware to all main goal routes
router.route('/').get(auth.protect, goalController.getGoals).post(auth.protect, goalController.createGoal);
router.put('/:id', auth.protect, goalController.updateGoal);
router.delete('/:id', auth.protect, goalController.deleteGoal);

// Re-route requests like '/:goalId/tasks' to the task router
// This is the line that nests the task routes under goals
router.use('/:goalId/tasks', taskRouter);

module.exports = router;
