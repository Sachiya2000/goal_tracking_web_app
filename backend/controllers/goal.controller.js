// backend/controllers/goal.controller.js
const Goal = require('../models/Goal.model');
const Task = require('../models/Task.model');

// @desc    Get logged in user's goals
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .populate('tasks'); // This line populates the tasks for each goal
        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};


// @desc    Create a new goal
// @route   POST /api/goals
// @access  Private
const createGoal = async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const goal = new Goal({
      title,
      description,
      user: req.user._id, // Associate goal with the logged-in user
    });

    const createdGoal = await goal.save();
    res.status(201).json(createdGoal);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

// @desc    Update a goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, { new: true }).populate('tasks');
        if (!updatedGoal) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        res.json(updatedGoal);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update goal' });
    }
};

// @desc    Delete a goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    // Check if the goal belongs to the user
    if (goal.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Optional but good practice: Delete all tasks associated with this goal
    await Task.deleteMany({ goal: req.params.id });

    await goal.deleteOne();
    res.json({ id: req.params.id, message: 'Goal and associated tasks removed' });
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};


module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
