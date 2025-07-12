// backend/models/Task.model.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  goal: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Goal', // Reference to the Goal model
  },
  text: {
    type: String,
    required: [true, 'Please add task text'],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
