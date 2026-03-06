import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Pastikan path import benar

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    
    return isAuthenticated ? children : <Navigate to="/login" />;
};