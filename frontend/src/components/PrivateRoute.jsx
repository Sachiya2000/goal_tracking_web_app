// frontend/src/components/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
    const { user } = useAuth();
    // Outlet will render the child route element (e.g., DashboardPage)
    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
