import {
    Box,
    Container,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {useState} from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import {
    Education,
    EmployerType,
    getSalariesByRole,
    type SalaryDto,
    toggleDislikeSalary,
    toggleLikeSalary
} from "../../api/salary.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {findAllCategories} from "../../api/roleCategory.ts";
import {getRolesByCategoryId} from "../../api/role.ts";

export const ViewSalariesPage = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
    const [selectedRoleId, setSelectedRoleId] = useState<string | undefined>(undefined);

    const { data: categories } = useQuery({
        queryKey: ['roleCategories'],
        queryFn: findAllCategories,
    })
    const { data: roles } = useQuery({
        queryKey: ['roles', selectedCategoryId],
        queryFn: () => getRolesByCategoryId(selectedCategoryId!),
        enabled: !!selectedCategoryId,
    });
    const { data: salaries } = useQuery({
        queryKey: ['salaries', selectedRoleId],
        queryFn: () => getSalariesByRole(selectedRoleId!),
        enabled: !!selectedRoleId,
    });

    const queryClient = useQueryClient();
    const toggleLikeMutation = useMutation({
        mutationFn: toggleLikeSalary,
        onSuccess: (salary: SalaryDto) => {
            queryClient.setQueryData<SalaryDto[]>(['salaries', selectedRoleId], (oldSalaries) => {
                const otherSalaries = oldSalaries?.filter(s => s.id !== salary.id) || [];
                return [...otherSalaries, salary];
            })
        }
    });
    const toggleDisLikeMutation = useMutation({
        mutationFn: toggleDislikeSalary,
        onSuccess: (salary: SalaryDto) => {
            queryClient.setQueryData<SalaryDto[]>(['salaries', selectedRoleId], (oldSalaries) => {
                const otherSalaries = oldSalaries?.filter(s => s.id !== salary.id) || [];
                return [...otherSalaries, salary];
            })
        }
    });

    const handleCategoryChange = async (categoryId: string) => {
        setSelectedCategoryId(categoryId);
        setSelectedRoleId(undefined);
    };

    const formatEducation = (education: string, educationInRelevantField: boolean) => {
        const educationMap: Record<string, string> = {
            [Education.NONE]: 'None',
            [Education.HIGH_SCHOOL]: 'High School',
            [Education.COURSE]: 'Course',
            [Education.BACHELOR]: "Bachelor's",
            [Education.MASTER]: "Master's",
            [Education.PHD]: 'PhD'
        };
        return (educationMap[education] || education) + (educationInRelevantField ? ' (Relevant Field)' : ' (Irrelevant Field)');
    };

    const formatEmployerType = (type: string) => {
        const typeMap: Record<string, string> = {
            [EmployerType.SMALL_STARTUP]: 'Small Startup',
            [EmployerType.MEDIUM_STARTUP]: 'Medium Startup',
            [EmployerType.LARGE_STARTUP]: 'Large Startup',
            [EmployerType.INTERNATIONAL_NONTECH_CORP]: 'International Non-Tech',
            [EmployerType.INTERNATIONAL_TECH_CORP]: 'International Tech',
            [EmployerType.ISRAELI_NONTECH_CORP]: 'Israeli Non-Tech',
            [EmployerType.ISRAELI_TECH_CORP]: 'Israeli Tech',
            [EmployerType.DEFENSE_CORP]: 'Defense',
            [EmployerType.OTHER]: 'Other'
        };
        return typeMap[type] || type;
    };

    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Typography variant="h3" gutterBottom>
                View Salary Reports
            </Typography>

            <Paper sx={{p: 3, mb: 3}}>
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Select Role Category
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={selectedCategoryId}
                                label="Category"
                                onChange={(e) => handleCategoryChange(e.target.value)}
                            >
                                {categories && categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Select Role
                        </Typography>
                        <FormControl fullWidth disabled={!selectedCategoryId}>
                            <InputLabel>Role</InputLabel>
                            <Select
                                value={selectedRoleId}
                                label="Role"
                                onChange={(e) => setSelectedRoleId(e.target.value)}
                            >
                                {roles && roles.map((role) => (
                                    <MenuItem key={role.id} value={role.id}>
                                        {role.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Stack>
            </Paper>

            {salaries && salaries.length > 0 && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Base Salary</strong></TableCell>
                                <TableCell><strong>Extras</strong></TableCell>
                                <TableCell><strong>Total</strong></TableCell>
                                <TableCell><strong>Experience</strong></TableCell>
                                <TableCell><strong>Education</strong></TableCell>
                                <TableCell><strong>Vacation Days</strong></TableCell>
                                <TableCell><strong>Employer Type</strong></TableCell>
                                <TableCell><strong>Period</strong></TableCell>
                                <TableCell align="center"><strong>Feedback</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {salaries.map((salary) => (
                                <TableRow key={salary.id}>
                                    <TableCell>₪{salary.baseSalary.toLocaleString()}</TableCell>
                                    <TableCell>₪{salary.extras.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <strong>₪{(salary.baseSalary + salary.extras).toLocaleString()}</strong>
                                    </TableCell>
                                    <TableCell>{salary.experienceYears} years</TableCell>
                                    <TableCell>
                                        <Stack spacing={0.5} direction="row">
                                            <span>{formatEducation(salary.education, salary.educationInRelevantField)}</span>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>{salary.vacationDays} days</TableCell>
                                    <TableCell>{formatEmployerType(salary.employerType)}</TableCell>
                                    <TableCell>
                                        {salary.startYear && salary.endYear
                                            ? `${salary.startYear}-${salary.endYear}`
                                            : salary.startYear
                                                ? `${salary.startYear}-Present`
                                                : 'N/A'}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1}}>
                                            <IconButton
                                                onClick={() => toggleLikeMutation.mutate(salary.id)}
                                                color={salary.isLikedByCurrentUser ? "primary" : "default"}
                                                size="small"
                                            >
                                                {salary.isLikedByCurrentUser ? <ThumbUpIcon/> : <ThumbUpOutlinedIcon/>}
                                            </IconButton>
                                            <Typography variant="body2">{salary.likes}</Typography>
                                            <IconButton
                                                onClick={() => toggleDisLikeMutation.mutate(salary.id)}
                                                color={salary.isDislikedByCurrentUser ? "error" : "default"}
                                                size="small"
                                            >
                                                {salary.isDislikedByCurrentUser ? <ThumbDownIcon/> : <ThumbDownOutlinedIcon/>}
                                            </IconButton>
                                            <Typography variant="body2">{salary.dislikes}</Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {selectedRoleId && salaries && salaries.length === 0 && (
                <Paper sx={{p: 4, textAlign: 'center'}}>
                    <Typography variant="h6" color="text.secondary">
                        No salary reports found for this role yet.
                    </Typography>
                </Paper>
            )}
        </Container>
    );
};