// backend/models/Goal.model.js
const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // This creates a reference to the User model
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started',
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true }, // This is important to include virtuals in JSON response
    toObject: { virtuals: true }
});
goalSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'goal'
});
const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
