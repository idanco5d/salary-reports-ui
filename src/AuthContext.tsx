import {createContext, type ReactNode, useContext, useEffect, useState} from 'react';
import {clearAuthToken, getAuthToken, setAuthToken} from './api/client';
import {logoutCall} from "./api/auth.ts";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string, userId: string) => void;
    logout: () => Promise<void>;
    userId: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(!!getAuthToken());
    const [userId, setUserId] = useState<string | null>(null);

    const logout = async () => {
        await logoutCall();
        clearAuthToken();
        setIsAuthenticated(false);
    };

    const login = (token: string, userId: string) => {
        setUserId(userId);
        setAuthToken(token);
        setIsAuthenticated(true);
    };

    useEffect(() => {
        const handleUnauthorized = () => logout();
        window.addEventListener('unauthorized', handleUnauthorized);
        return () => window.removeEventListener('unauthorized', handleUnauthorized);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, userId }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}