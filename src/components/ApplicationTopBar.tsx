import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import {useNavigate} from "react-router-dom";

type ApplicationTopBarProps = {
    handleDrawerToggle: () => void;
    handleLogout: () => void;
}

export const ApplicationTopBar = ({handleDrawerToggle, handleLogout}: ApplicationTopBarProps) => {
    const navigate = useNavigate();

    return <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
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
}