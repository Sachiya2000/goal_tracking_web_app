// backend/routes/task.routes.js
const express = require('express');
// { mergeParams: true } allows us to get the :goalId from the parent router (goal.routes.js)
const router = express.Router({ mergeParams: true });

const taskController = require('../controllers/task.controller');
const { protect } = require('../middleware/auth.middleware');
const auth = require('../middleware/auth.middleware');

// Apply protection to all task routes
router.route('/').post(protect, taskController.createTask).get(protect, taskController.getTasks);
router.put('/:id', auth.protect, taskController.updateTask);
router.route('/:taskId').put(protect, taskController.updateTask).delete(protect, taskController.deleteTask);

module.exports = router;
