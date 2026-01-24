import {createContext, type ReactNode, useContext, useEffect, useState} from 'react';
import {clearAuthToken, getAuthToken, setAuthToken} from '../api/apiClient.ts';
import {logoutCall} from "../api/auth.ts";

import type {UserRoleType} from "../model/user.ts";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string, userId: string, userRole: UserRoleType) => void;
    logout: () => Promise<void>;
    userId: string | null;
    userRole: UserRoleType;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(!!getAuthToken());
    const [userId, setUserId] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<UserRoleType | null>(null);

    const logout = async () => {
        logoutCall().finally(() => {
                clearAuthToken();
                setIsAuthenticated(false);
                setUserId(null);
                setUserRole(null);
            }
        )
    };

    const login = (token: string, userId: string, userRole: UserRoleType) => {
        setUserId(userId);
        setAuthToken(token);
        setUserRole(userRole);
        setIsAuthenticated(true);
    };

    useEffect(() => {
        const handleUnauthorized = () => logout();
        window.addEventListener('unauthorized', handleUnauthorized);
        return () => window.removeEventListener('unauthorized', handleUnauthorized);
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, userId, userRole}}>
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