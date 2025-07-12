// frontend/src/pages/RegisterPage.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const { register } = useAuth();

    const { username, email, password } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        register(formData);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={onSubmit} className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-white text-2xl font-bold mb-6 text-center">Register</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={onChange}
                        placeholder="Username"
                        className="w-full px-3 py-2 bg-slate-700 text-white rounded focus:outline-none"
                        required
                    />
                </div>
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
                <button type="submit" className="w-full transition-colors duration-300 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Register
                </button>
                <p className="text-slate-400 text-center mt-4">
                    Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;
