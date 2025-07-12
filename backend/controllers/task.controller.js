// backend/controllers/task.controller.js
const Task = require('../models/Task.model');
const Goal = require('../models/Goal.model');

// @desc    Create a new task for a goal
// @route   POST /api/goals/:goalId/tasks
// @access  Private
const createTask = async (req, res) => {
  const { text } = req.body;
  const { goalId } = req.params;

  if (!text) {
    return res.status(400).json({ message: 'Task text is required' });
  }

  try {
    const goal = await Goal.findById(goalId);

    // Authorization check: Make sure the goal belongs to the logged-in user
    if (!goal || goal.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Goal not found or you are not authorized' });
    }

    const task = new Task({
      text,
      goal: goalId,
      completed: false, // Default to false
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

// @desc    Get tasks for a specific goal
// @route   GET /api/goals/:goalId/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const { goalId } = req.params;
    const { completed, sortBy, sortOrder } = req.query; // Query parameters for filtering and sorting

    const goal = await Goal.findById(goalId);

    // Authorization check
    if (!goal || goal.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Goal not found or you are not authorized' });
    }

    let query = { goal: goalId };

    // Filtering by completion status
    if (completed !== undefined) {
      console.log(`Received completed filter: ${completed}, type: ${typeof completed}`);
      query.completed = JSON.parse(completed);
      console.log(`Parsed completed filter: ${query.completed}, type: ${typeof query.completed}`);
    }

    let sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    } else {
      // Default sort
      sortOptions.createdAt = -1;
    }

    const tasks = await Task.find(query).sort(sortOptions);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params; // task id
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task' });
    }
};


// @desc    Delete a task
// @route   DELETE /api/goals/:goalId/tasks/:taskId
// @access  Private
const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId).populate('goal');

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Authorization check
        if (task.goal.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await task.deleteOne();
        res.json({ id: taskId, message: 'Task removed' });
    } catch (error) {
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};

module.exports = { createTask, updateTask, deleteTask, getTasks };
