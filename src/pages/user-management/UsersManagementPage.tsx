import {
    Button,
    Chip,
    CircularProgress,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import {findAllUsers, makeUserAdmin, type User, UserRole} from "../../api/user.ts";

export const UsersManagementPage = () => {
    const queryClient = useQueryClient();

    const {data: users = [], isLoading} = useQuery({
        queryKey: ['users'],
        queryFn: findAllUsers
    });

    const makeAdminMutation = useMutation({
        mutationFn: makeUserAdmin,
        onSuccess: (user) => {
            queryClient.setQueryData<User[]>(['users'], (oldUsers) => {
                return oldUsers?.map(u => u.id === user.id ? user : u) || [user];
            });
        }
    });

    const handleMakeAdmin = (userId: string) => {
        makeAdminMutation.mutate(userId);
    };

    if (isLoading) {
        return (
            <Container maxWidth="lg" sx={{mt: 4, mb: 4, textAlign: 'center'}}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Typography variant="h3" gutterBottom>
                Users Management
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>User ID</strong></TableCell>
                            <TableCell><strong>Role</strong></TableCell>
                            <TableCell align="right"><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>
                                    {user.role === UserRole.ADMIN ? (
                                        <Chip
                                            icon={<AdminPanelSettingsIcon />}
                                            label="Admin"
                                            color="primary"
                                        />
                                    ) : (
                                        <Chip
                                            icon={<PersonIcon />}
                                            label="User"
                                            color="default"
                                        />
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {user.role !== UserRole.ADMIN && (
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => handleMakeAdmin(user.id)}
                                            disabled={makeAdminMutation.isPending}
                                            startIcon={<AdminPanelSettingsIcon />}
                                        >
                                            Make Admin
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {users.length === 0 && (
                <Paper sx={{p: 4, textAlign: 'center', mt: 2}}>
                    <Typography variant="h6" color="text.secondary">
                        No users found.
                    </Typography>
                </Paper>
            )}
        </Container>
    );
};