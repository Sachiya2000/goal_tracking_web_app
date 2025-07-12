// frontend/src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import goalService from '../services/goalService';
import Spinner from '../components/Spinner';
import GoalItem from '../components/GoalItem';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardPage = () => {
    const [goals, setGoals] = useState([]);
    const [newGoalTitle, setNewGoalTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const data = await goalService.getGoals(user.token);
                setGoals(data);
            } catch {
                setError('Failed to fetch goals.');
            } finally {
                setLoading(false);
            }
        };
        fetchGoals();
    }, [user.token]);

    const handleCreateGoal = async (e) => {
        e.preventDefault();
        if (!newGoalTitle) return;
        try {
            const newGoalData = { title: newGoalTitle, tasks: [] }; // Assume new goal has empty tasks
            const newGoal = await goalService.createGoal(newGoalData, user.token);
            setGoals([newGoal, ...goals]);
            setNewGoalTitle('');
        } catch {
            setError('Failed to create goal.');
        }
    };

    const handleDeleteGoal = async (goalId) => {
        try {
            await goalService.deleteGoal(goalId, user.token);
            setGoals(goals.filter((goal) => goal._id !== goalId));
        } catch {
            setError('Failed to delete goal.');
        }
    };

    // Update handler for goal
    const handleUpdateGoal = async (goalId, updatedData) => {
        try {
            const updatedGoal = await goalService.updateGoal(goalId, updatedData, user.token);
            setGoals(goals.map(goal => goal._id === goalId ? updatedGoal : goal));
        } catch {
            setError('Failed to update goal.');
        }
    };

    

    if (loading) return <Spinner />;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <div>
            <section className="mb-8">
                {/* ... (The create goal form remains the same) ... */}
                 <h1 className="text-3xl font-bold mb-4">Create a New Goal</h1>
                    <form onSubmit={handleCreateGoal} className="flex gap-2">
                        <input
                            type="text"
                            value={newGoalTitle}
                            onChange={(e) => setNewGoalTitle(e.target.value)}
                            placeholder="e.g., Learn a new programming language"
                            className="flex-grow px-4 py-2 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                            Add Goal
                        </button>
                    </form>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Your Goals</h2>
                <div className="space-y-4">
                <AnimatePresence>
            {goals.length > 0 ? (
                goals.map((goal) => (
                    <motion.div
                        key={goal._id}
                        layout // Animates position changes
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <GoalItem
                            goal={goal}
                            onDeleteGoal={handleDeleteGoal}
                            
                            
                        />
                    </motion.div>
                ))
            ) : (
                <p>You have not set any goals yet.</p>
            )}
        </AnimatePresence>
                </div>
            </section>
        </div>
    );
};

export default DashboardPage;
