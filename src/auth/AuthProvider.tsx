import {type ReactNode, useEffect, useState} from "react";
import {clearAuthToken, getAuthToken, setAuthToken} from "../api/apiClient.ts";
import type {UserRoleType} from "../model/user.ts";
import {logoutCall} from "../api/auth.ts";
import {AuthContext} from "./AuthContext.tsx";

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
