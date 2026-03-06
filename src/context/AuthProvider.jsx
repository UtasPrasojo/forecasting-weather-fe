import { useState } from 'react';
import { AuthContext } from './AuthContext'; // Import context dari file terpisah
import { setAuthToken } from '../stores/useAuthStore';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    const login = (token) => {
        setAuthToken(token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setAuthToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};