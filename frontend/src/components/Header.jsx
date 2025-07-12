// frontend/src/components/Header.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-slate-800 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link to={user ? "/dashboard" : "/login"} className="text-xl font-bold">
                    GoalTracker
                </Link>
                <nav>
                    <ul className="flex items-center space-x-4">
                        {user ? (
                            <>
                               <li className="font-medium hidden sm:block">Hello, {user.username}</li>
                                <li>
                                    <button
                                        onClick={logout}
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login" className="hover:text-blue-400">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register" className="hover:text-green-400">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
