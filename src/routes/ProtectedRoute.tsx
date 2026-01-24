import {Navigate, Outlet} from 'react-router-dom';

import {useAuth} from "../auth/UseAuth.ts";

export const ProtectedRoute = () => {
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};