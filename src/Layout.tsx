import {useState} from 'react';
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
    Button,
    Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import {Outlet, useNavigate} from 'react-router-dom';
import {useAuth} from './AuthContext';

export const Layout = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        setDrawerOpen(false);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const menuItems = [
        {label: 'Home', path: '/home'},
        {label: 'Report Salary', path: '/create-salary'},
        {label: 'Role Categories', path: '/role-category'},
        {label: 'Roles', path: '/role'},
    ];

    const drawerWidth = 250;

    return (
        <Box sx={{display: 'flex'}}>
            <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Button
                        color="inherit"
                        onClick={() => navigate('/home')}
                        sx={{
                            flexGrow: 1,
                            textAlign: 'left',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                opacity: 0.8
                            }
                        }}
                    >
                        <Typography variant="h6">
                            Anonymous Salary Reports
                        </Typography>
                    </Button>
                    <Button
                        color="inherit"
                        onClick={handleLogout}
                        startIcon={<LogoutIcon/>}
                        sx={{textTransform: 'none'}}
                    >
                        Sign Out
                    </Button>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Toolbar/>
                <Box sx={{overflow: 'auto'}}>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem key={item.path} disablePadding>
                                <ListItemButton onClick={() => handleNavigation(item.path)}>
                                    <ListItemText primary={item.label}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleLogout}>
                                <LogoutIcon sx={{mr: 2}}/>
                                <ListItemText primary="Sign Out"/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

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