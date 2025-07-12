// frontend/src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import { showErrorAlert } from '../utils/alertUtils';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userInStorage = JSON.parse(localStorage.getItem('user'));
        if (userInStorage) {
            setUser(userInStorage);
        }
        setLoading(false);
    }, []);

    const login = async (userData) => {
        try {
            const loggedInUser = await authService.login(userData);
            setUser(loggedInUser);
            navigate('/dashboard');
        } catch (error) {
            showErrorAlert(error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message);
        }
    };

    const register = async (userData) => {
        try {
            const registeredUser = await authService.register(userData);
            setUser(registeredUser);
            navigate('/dashboard');
        } catch (error) {
            showErrorAlert(error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook for easy context access
export const useAuth = () => {
    return useContext(AuthContext);
};
