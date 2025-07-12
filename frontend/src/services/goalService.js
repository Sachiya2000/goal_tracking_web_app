// frontend/src/services/goalService.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/goals/';

const getAuthHeaders = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// --- Goal Functions ---

// Get user goals
const getGoals = async (token) => {
    const response = await axios.get(API_URL, getAuthHeaders(token));
    return response.data;
};

// Create a new goal
const createGoal = async (goalData, token) => {
    const response = await axios.post(API_URL, goalData, getAuthHeaders(token));
    return response.data;
};

// Delete a goal
const deleteGoal = async (goalId, token) => {
    const response = await axios.delete(API_URL + goalId, getAuthHeaders(token));
    return response.data;
};


// --- Task Functions ---

// Create a new task for a goal
const createTask = async (goalId, taskData, token) => {
    const response = await axios.post(API_URL + `${goalId}/tasks`, taskData, getAuthHeaders(token));
    return response.data;
};

// Update a task
const updateTask = async (goalId, taskId, updatedData, token) => {
    const response = await axios.put(API_URL + `${goalId}/tasks/${taskId}`, updatedData, getAuthHeaders(token));
    return response.data;
};

// Delete a task
const deleteTask = async (goalId, taskId, token) => {
    const response = await axios.delete(API_URL + `${goalId}/tasks/${taskId}`, getAuthHeaders(token));
    return response.data;
};


const updateGoal = async (goalId, updatedData, token) => {
    const response = await axios.put(API_URL + goalId, updatedData, getAuthHeaders(token));
    return response.data;
};

const getTasks = async (goalId, token, filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await axios.get(API_URL + `${goalId}/tasks?${params.toString()}`, getAuthHeaders(token));
    return response.data;
};

const goalService = {
    getGoals,
    createGoal,
    deleteGoal,
    createTask,
    updateTask,
    deleteTask,
    updateGoal,
    getTasks,
};

export default goalService;
