// frontend/src/components/GoalItem.jsx
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext';
import goalService from '../services/goalService';
import { FaTrash, FaPlus } from 'react-icons/fa';

const GoalItem = ({ goal, onDeleteGoal, onUpdateGoal, onUpdateTask }) => {
    const [newTaskText, setNewTaskText] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(goal.title);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskText, setEditingTaskText] = useState('');
    const [tasks, setTasks] = useState(goal.tasks || []); // State to manage tasks locally
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'true', 'false'
    const [sortOrder, setSortOrder] = useState('newest'); // 'newest', 'oldest'
    const [filter, setFilter] = useState('All');
    const { user } = useAuth();

    // Fetch tasks based on filters and sort order
    useEffect(() => {
        const fetchTasks = async () => {
            if (!user || !goal._id) return;
            try {
                const filters = {};
                if (filterStatus !== 'all') {
                    filters.completed = filterStatus === 'true';
                }
                if (sortOrder === 'newest') {
                    filters.sortBy = 'createdAt';
                    filters.sortOrder = 'desc';
                } else if (sortOrder === 'oldest') {
                    filters.sortBy = 'createdAt';
                    filters.sortOrder = 'asc';
                }
                const fetchedTasks = await goalService.getTasks(goal._id, user.token, filters);
                setTasks(fetchedTasks);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };
        fetchTasks();
    }, [goal._id, filterStatus, sortOrder, user]);

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTaskText) return;
        try {
            await goalService.createTask(goal._id, { text: newTaskText, completed: false }, user.token);
            setNewTaskText('');
            // Re-fetch tasks to update the list with the new task and apply current filters/sort
            const filters = {};
            if (filterStatus !== 'all') {
                filters.completed = filterStatus;
            }
            if (sortOrder === 'newest') {
                filters.sortBy = 'createdAt';
                filters.sortOrder = 'desc';
            } else if (sortOrder === 'oldest') {
                filters.sortBy = 'createdAt';
                filters.sortOrder = 'asc';
            }
            const updatedTasks = await goalService.getTasks(goal._id, user.token, filters);
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Failed to add task', error);
        }
    };

    const handleToggleTask = async (taskId, isCompleted) => {
        try {
            await goalService.updateTask(goal._id, taskId, { completed: !isCompleted }, user.token);
            // Re-fetch tasks to update the list and apply current filters/sort
            const filters = {};
            if (filterStatus !== 'all') {
                filters.completed = filterStatus;
            }
            if (sortOrder === 'newest') {
                filters.sortBy = 'createdAt';
                filters.sortOrder = 'desc';
            } else if (sortOrder === 'oldest') {
                filters.sortBy = 'createdAt';
                filters.sortOrder = 'asc';
            }
            const updatedTasks = await goalService.getTasks(goal._id, user.token, filters);
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Failed to toggle task', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await goalService.deleteTask(goal._id, taskId, user.token);
            // Re-fetch tasks to update the list and apply current filters/sort
            const filters = {};
            if (filterStatus !== 'all') {
                filters.completed = filterStatus;
            }
            if (sortOrder === 'newest') {
                filters.sortBy = 'createdAt';
                filters.sortOrder = 'desc';
            } else if (sortOrder === 'oldest') {
                filters.sortBy = 'createdAt';
                filters.sortOrder = 'asc';
            }
            const updatedTasks = await goalService.getTasks(goal._id, user.token, filters);
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Failed to delete task', error);
        }
    };

    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => {
        setTitle(goal.title);
        setIsEditing(false);
    };
    const handleSave = async () => {
        if (title.trim() && title !== goal.title) {
            await onUpdateGoal(goal._id, { title });
        }
        setIsEditing(false);
    };

    // Edit task handlers
    const handleEditTask = (task) => {
        setEditingTaskId(task._id);
        setEditingTaskText(task.text);
    };
    const handleCancelEditTask = () => {
        setEditingTaskId(null);
        setEditingTaskText('');
    };
    const handleSaveEditTask = async (task) => {
        if (editingTaskText.trim() && editingTaskText !== task.text) {
            await goalService.updateTask(goal._id, task._id, { text: editingTaskText }, user.token);
            // Re-fetch tasks to update the list and apply current filters/sort
            const filters = {};
            if (filterStatus !== 'all') {
                filters.completed = filterStatus;
            }
            if (sortOrder === 'newest') {
                filters.sortBy = 'createdAt';
                filters.sortOrder = 'desc';
            } else if (sortOrder === 'oldest') {
                filters.sortBy = 'createdAt';
                filters.sortOrder = 'asc';
            }
            const updatedTasks = await goalService.getTasks(goal._id, user.token, filters);
            setTasks(updatedTasks);
        }
        setEditingTaskId(null);
        setEditingTaskText('');
    };

    // Filter tasks based on filter state
    const filteredTasks = goal.tasks ? goal.tasks.filter(task => {
        if (filter === 'All') return true;
        if (filter === 'Pending') return !task.completed;
        if (filter === 'Completed') return task.completed;
        return true;
    }) : [];


    return (
        <div className="bg-slate-800 p-5 rounded-lg shadow-md">
            <div className="flex items-center justify-between bg-slate-800 p-4 rounded-md shadow">
                {isEditing ? (
                    <div className="flex items-center gap-2 flex-grow">
                        <input
                            className="px-2 py-1 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            autoFocus
                        />
                        <button
                            onClick={handleSave}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <>
                        <span className="flex-grow text-lg">{goal.title}</span>
                        <button
                            onClick={handleEdit}
                            className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDeleteGoal(goal._id)}
                            className="ml-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>

            {/* Add Task Form */}
            <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="Add a new task"
                    className="flex-grow px-3 py-2 bg-slate-700 text-white rounded-md focus:outline-none"
                />
                <button type="submit" className="bg-primary hover:bg-primary-hover text-white font-bold p-3 rounded-md transition-colors duration-200">
    <FaPlus />
</button>
            </form>

            {/* Filter Dropdown */}


            {/* Filter and Sort Controls */}
            <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 mb-2">
                <label htmlFor="filter" className="text-white">Filter:</label>
                <select
                    id="filter"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    className="px-2 py-1 rounded bg-slate-700 text-white border border-slate-600"
                >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="text-white">Sort:</label>
                    <select
                        id="sort"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="px-2 py-1 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
            </div>

            {/* Task List */}
            <div className="space-y-2">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                       <div key={task._id} className="flex items-center justify-between bg-slate-700 p-2 rounded">
                           <div className="flex items-center gap-3">
                               <input
                                   type="checkbox"
                                   checked={task.completed}
                                   onChange={() => handleToggleTask(task._id, task.completed)}
                                   className="w-5 h-5"
                               />
                               {editingTaskId === task._id ? (
                                   <>
                                       <input
                                           className="px-2 py-1 rounded bg-slate-600 text-white border border-slate-500 focus:outline-none"
                                           value={editingTaskText}
                                           onChange={e => setEditingTaskText(e.target.value)}
                                           autoFocus
                                       />
                                       <button
                                           onClick={() => handleSaveEditTask(task)}
                                           className="ml-2 bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
                                       >
                                           Save
                                       </button>
                                       <button
                                           onClick={handleCancelEditTask}
                                           className="ml-2 bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded"
                                       >
                                           Cancel
                                       </button>
                                   </>
                               ) : (
                                   <>
                                       <span className={`${task.completed ? 'line-through text-slate-400' : ''}`}>
                                           {task.text}
                                       </span>
                                       <button
                                           onClick={() => handleEditTask(task)}
                                           className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                                       >
                                           Edit
                                       </button>
                                   </>
                               )}
                           </div>
                           <button onClick={() => handleDeleteTask(task._id)} className="text-red-400 hover:text-red-200 text-sm">
                               Remove
                           </button>
                       </div>
                    ))
                ) : (
                    <p className="text-slate-400 text-sm">No tasks for this goal yet.</p>
                )}
            </div>
        </div>
    );
};

export default GoalItem;
