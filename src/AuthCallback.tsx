import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from './AuthContext';
import {CircularProgress} from "@mui/material";

export const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        const userId = searchParams.get('userId');

        if (token && userId) {
            login(token, userId);
            navigate('/home');
        } else {
            navigate('/login');
        }
    }, [searchParams, login, navigate]);

    return <CircularProgress/>;
};