import {useAuth} from "../auth/UseAuth.ts";
import {Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import {useNavigate} from "react-router-dom";

type NavigationDrawerProps = {
    drawerOpen: boolean;
    setDrawerOpen: (open: boolean) => void;
    handleDrawerToggle: () => void;
    handleLogout: () => void;
}

export const NavigationDrawer = ({
                                     drawerOpen,
                                     setDrawerOpen,
                                     handleDrawerToggle,
                                     handleLogout
                                 }: NavigationDrawerProps) => {
    const {userRole} = useAuth();
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
        setDrawerOpen(false);
    };

    const adminMenuItems = [
        {label: 'Users Management', path: '/users-management'},
        {label: 'Roles', path: '/role'},
        {label: 'Role Categories', path: '/role-category'},
    ];
    const menuItems = [
        {label: 'Home', path: '/home'},
        {label: 'View Salaries', path: '/view-salaries'},
        {label: 'Report Salary', path: '/create-salary'},
        ...(userRole === 'ADMIN' ? adminMenuItems : []),
    ];
    const drawerWidth = 250;

    return <Drawer
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
}