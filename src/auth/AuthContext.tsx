import {createContext} from 'react';

import type {UserRoleType} from "../model/user.ts";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string, userId: string, userRole: UserRoleType) => void;
    logout: () => Promise<void>;
    userId: string | null;
    userRole: UserRoleType;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
