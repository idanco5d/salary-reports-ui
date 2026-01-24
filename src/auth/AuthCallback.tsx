import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from './AuthContext.tsx';
import {CircularProgress} from "@mui/material";


import {UserRole} from "../model/user.ts";

export const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        const userId = searchParams.get('userId');
        const userRole = searchParams.get('role');

        if (token && userId && userRole && (userRole === UserRole.USER || userRole === UserRole.ADMIN)) {
            login(token, userId, userRole);
            navigate('/home');
        } else {
            navigate('/login');
        }
    }, [searchParams, login, navigate]);

    return <CircularProgress/>;
};