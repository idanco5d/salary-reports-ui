import {Container, Paper, Typography, Button, Box, Stack, Divider} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';

export const LoginPage = () => {
    const handleLogin = () => {
        window.location.href = 'http://localhost:3001/auth/login';
    };

    return (
        <Container maxWidth="sm" sx={{mt: 8, mb: 4}}>
            <Paper sx={{p: 4}}>
                <Box sx={{textAlign: 'center', mb: 4}}>
                    <Typography variant="h3" gutterBottom sx={{fontWeight: 'bold'}}>
                        Welcome
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Sign in to Anonymous Salary Reports
                    </Typography>
                </Box>

                <Paper sx={{p: 3, mb: 3, backgroundColor: '#f5f5f5'}}>
                    <Typography variant="h6" gutterBottom sx={{fontWeight: 'bold'}}>
                        Privacy First Authentication
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>
                        We use Google authentication, but we respect your privacy:
                    </Typography>

                    <Stack spacing={2}>
                        <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                            <VisibilityOffIcon sx={{mr: 1.5, mt: 0.5, color: 'primary.main'}}/>
                            <Box>
                                <Typography variant="body2" sx={{fontWeight: 'bold'}}>
                                    Your identity stays anonymous
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    We only store a unique identifier - your name, email, and other
                                    personal details are never saved or shared.
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                            <EditIcon sx={{mr: 1.5, mt: 0.5, color: 'primary.main'}}/>
                            <Box>
                                <Typography variant="body2" sx={{fontWeight: 'bold'}}>
                                    Manage your contributions
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Authentication allows you to edit or view your salary reports
                                    in the future while keeping them anonymous to everyone else.
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                            <LockIcon sx={{mr: 1.5, mt: 0.5, color: 'primary.main'}}/>
                            <Box>
                                <Typography variant="body2" sx={{fontWeight: 'bold'}}>
                                    Minimal permissions
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    We only request basic profile access from Google - just enough
                                    to create your unique identifier.
                                </Typography>
                            </Box>
                        </Box>
                    </Stack>
                </Paper>

                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleLogin}
                    startIcon={<GoogleIcon />}
                    sx={{
                        py: 1.5,
                        fontSize: '1.1rem',
                        textTransform: 'none'
                    }}
                >
                    Sign in with Google
                </Button>

                <Divider sx={{my: 3}} />

                <Typography variant="body2" color="text.secondary" sx={{textAlign: 'center'}}>
                    By signing in, you agree that your salary reports will remain anonymous
                    while you maintain the ability to manage your own contributions.
                </Typography>
            </Paper>
        </Container>
    );
};