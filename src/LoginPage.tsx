import {Button} from "@mui/material";

export const LoginPage = () => {
    const handleLogin = () => {
        window.location.href = 'http://localhost:3001/auth/login';
    };

    return <Button onClick={handleLogin}>Login</Button>
}