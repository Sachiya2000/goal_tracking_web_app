// frontend/src/pages/LoginPage.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useAuth();

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={onSubmit} className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-white text-2xl font-bold mb-6 text-center">Login</h2>
                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Email"
                        className="w-full px-3 py-2 bg-slate-700 text-white rounded focus:outline-none"
                        required
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Password"
                        className="w-full px-3 py-2 bg-slate-700 text-white rounded focus:outline-none"
                        required
                    />
                </div>
                <button type="submit" className="w-full transition-colors duration-300 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Login
                </button>
                <p className="text-slate-400 text-center mt-4">
                    Don't have an account? <Link to="/register" className="text-green-400 hover:underline">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
