import {Container, Typography, Paper, Box, Grid, Stack} from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LockIcon from '@mui/icons-material/Lock';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';

export const WelcomePage = () => {
    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Box sx={{textAlign: 'center', mb: 6}}>
                <Typography variant="h2" gutterBottom sx={{fontWeight: 'bold'}}>
                    Anonymous Salary Reports
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{mt: 2}}>
                    Empowering transparency in the workplace through anonymous salary sharing
                </Typography>
            </Box>

            <Paper sx={{p: 4, mb: 4, backgroundColor: '#f5f5f5'}}>
                <Typography variant="h4" gutterBottom>
                    About This Platform
                </Typography>
                <Typography variant="body1" sx={{fontSize: '1.1rem', lineHeight: 1.8, padding: 2}}>
                    Welcome to the Anonymous Salary Reports platform. Our mission is to create transparency
                    in salary information while protecting your privacy. By sharing salary data anonymously,
                    we help professionals understand market rates, make informed career decisions, and promote
                    fair compensation across industries.
                </Typography>
                <Typography variant="body1" sx={{fontSize: '1.1rem', lineHeight: 1.8, padding: 2}}>
                    Whether you're negotiating a new offer, curious about industry standards, or simply want
                    to contribute to workplace transparency, this platform provides the tools and data you need.
                </Typography>
            </Paper>

            <Grid container spacing={4} sx={{mb: 4}}>
                <Grid size={{ md: 12 }}>
                    <Paper sx={{p: 3, height: '100%'}}>
                        <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                            <LockIcon sx={{fontSize: 40, color: 'primary.main', mr: 2}}/>
                            <Typography variant="h5">
                                100% Anonymous
                            </Typography>
                        </Box>
                        <Typography variant="body1" color="text.secondary">
                            Your identity is never shared. All salary reports are completely anonymous,
                            ensuring you can share information freely without any concerns about privacy
                            or professional repercussions.
                        </Typography>
                    </Paper>
                </Grid>

                <Grid size={{ md: 12 }}>
                    <Paper sx={{p: 3, height: '100%'}}>
                        <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                            <PeopleIcon sx={{fontSize: 40, color: 'primary.main', mr: 2}}/>
                            <Typography variant="h5">
                                Community Driven
                            </Typography>
                        </Box>
                        <Typography variant="body1" color="text.secondary">
                            The more people contribute, the more accurate and useful our data becomes.
                            Join a growing community of professionals committed to salary transparency
                            and fair compensation.
                        </Typography>
                    </Paper>
                </Grid>

                <Grid size={{ md: 12 }}>
                    <Paper sx={{p: 3, height: '100%'}}>
                        <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                            <BarChartIcon sx={{fontSize: 40, color: 'primary.main', mr: 2}}/>
                            <Typography variant="h5">
                                Detailed Insights
                            </Typography>
                        </Box>
                        <Typography variant="body1" color="text.secondary">
                            View comprehensive salary data filtered by role, experience level, education,
                            employer type, and more. Get the insights you need to make informed decisions
                            about your career.
                        </Typography>
                    </Paper>
                </Grid>

                <Grid size={{ md: 12 }}>
                    <Paper sx={{p: 3, height: '100%'}}>
                        <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                            <TrendingUpIcon sx={{fontSize: 40, color: 'primary.main', mr: 2}}/>
                            <Typography variant="h5">
                                Market Trends
                            </Typography>
                        </Box>
                        <Typography variant="body1" color="text.secondary">
                            Track salary trends over time and understand how compensation evolves across
                            different roles and industries. Stay informed about market changes and
                            competitive rates.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Paper sx={{p: 4, backgroundColor: '#e3f2fd'}}>
                <Typography variant="h4" gutterBottom>
                    How It Works
                </Typography>
                <Stack spacing={3} sx={{mt: 3}}>
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{fontWeight: 'bold'}}>
                            1. Report Your Salary
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Share your salary information anonymously by filling out a simple form.
                            Include details like base salary, extras, years of experience, education,
                            and employer type.
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{fontWeight: 'bold'}}>
                            2. Browse Salary Data
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Explore salary reports from other professionals. Filter by role category,
                            specific positions, experience level, and other criteria to find relevant
                            information.
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{fontWeight: 'bold'}}>
                            3. Make Informed Decisions
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Use the insights to negotiate better offers, understand your market value,
                            or simply stay informed about compensation trends in your field.
                        </Typography>
                    </Box>
                </Stack>
            </Paper>
        </Container>
    );
};