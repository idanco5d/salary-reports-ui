import {useState} from 'react';
import {Box} from '@mui/material';
import {Outlet, useNavigate} from 'react-router-dom';

import {useAuth} from "../auth/UseAuth.ts";
import {ApplicationTopBar} from "./ApplicationTopBar.tsx";
import {NavigationDrawer} from "./NavigationDrawer.tsx";

export const Layout = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <Box sx={{display: 'flex'}}>
            <ApplicationTopBar handleDrawerToggle={handleDrawerToggle} handleLogout={handleLogout}/>
            <NavigationDrawer
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                handleDrawerToggle={handleDrawerToggle}
                handleLogout={handleLogout}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: '100%',
                    minHeight: '100vh',
                    mt: 8
                }}
            >
                <Outlet/>
            </Box>
        </Box>
    );
};