import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useState} from "react";
import {createSalary, type CreateSalaryDto, Education, EmployerType} from "../../api/salary.ts";
import {getRolesByCategoryId} from "../../api/role.ts";
import {findAllCategories} from "../../api/roleCategory.ts";
import {useQuery} from "@tanstack/react-query";

export const ReportSalaryPage = () => {
    const [newSalary, setNewSalary] = useState<CreateSalaryDto>(getDefaultSalary());
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const { data: categories } = useQuery({
        queryKey: ['roleCategories'],
        queryFn: findAllCategories,
    })

    const { data: roles } = useQuery({
        queryKey: ['roles', selectedCategoryId],
        queryFn: () => getRolesByCategoryId(selectedCategoryId!),
        enabled: !!selectedCategoryId,
    });

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategoryId(categoryId);
        setNewSalary({...newSalary, roleId: ''});
    };

    const handleSubmit = async () => {
        await createSalary(newSalary);
        setNewSalary(getDefaultSalary());
        setSelectedCategoryId(undefined);
        setSubmitSuccess(true);

        setTimeout(() => {
            setSubmitSuccess(false);
        }, 2000);
    };

    // TODO validations, refactor to different components
    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Typography variant="h3" gutterBottom>
                Report Salary Anonymously
            </Typography>

            <Paper sx={{p: 3, mb: 3}}>
                <Stack spacing={3}>
                    {/* Base Salary */}
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Monthly Base Salary (ILS)
                        </Typography>
                        <TextField
                            label="Base Salary"
                            type="number"
                            value={newSalary.baseSalary}
                            onChange={(e) => setNewSalary({...newSalary, baseSalary: Number(e.target.value)})}
                            fullWidth
                        />
                    </Box>

                    {/* Extras */}
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Monthly Extras (ILS: RSU, bonuses, travel reimbursement, etc.)
                        </Typography>
                        <TextField
                            label="Extras"
                            type="number"
                            value={newSalary.extras}
                            onChange={(e) => setNewSalary({...newSalary, extras: Number(e.target.value)})}
                            fullWidth
                        />
                    </Box>

                    {/* Role Category */}
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Role Category
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel>Select Category</InputLabel>
                            <Select
                                value={selectedCategoryId}
                                label="Select Category"
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

                    {/* Role */}
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Role
                        </Typography>
                        <FormControl fullWidth disabled={!selectedCategoryId}>
                            <InputLabel>Select Role</InputLabel>
                            <Select
                                value={newSalary.roleId}
                                label="Select Role"
                                onChange={(e) => setNewSalary({...newSalary, roleId: e.target.value})}
                            >
                                {roles && roles.map((role) => (
                                    <MenuItem key={role.id} value={role.id}>
                                        {role.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Experience Years */}
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Years of Experience
                        </Typography>
                        <TextField
                            label="Experience Years"
                            type="number"
                            value={newSalary.experienceYears}
                            onChange={(e) => setNewSalary({...newSalary, experienceYears: Number(e.target.value)})}
                            fullWidth
                        />
                    </Box>

                    {/* Education */}
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Education Level
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel>Education</InputLabel>
                            <Select
                                value={newSalary.education}
                                label="Education"
                                onChange={(e) => setNewSalary({...newSalary, education: e.target.value as typeof Education[keyof typeof Education]})}
                            >
                                <MenuItem value={Education.NONE}>None</MenuItem>
                                <MenuItem value={Education.HIGH_SCHOOL}>High School</MenuItem>
                                <MenuItem value={Education.COURSE}>Course</MenuItem>
                                <MenuItem value={Education.BACHELOR}>Bachelor's Degree</MenuItem>
                                <MenuItem value={Education.MASTER}>Master's Degree</MenuItem>
                                <MenuItem value={Education.PHD}>PhD</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Education in Relevant Field */}
                    <Box>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={newSalary.educationInRelevantField}
                                    onChange={(e) => setNewSalary({...newSalary, educationInRelevantField: e.target.checked})}
                                />
                            }
                            label="Education in relevant field"
                        />
                    </Box>

                    {/* Vacation Days */}
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Annual Vacation Days
                        </Typography>
                        <TextField
                            label="Vacation Days"
                            type="number"
                            value={newSalary.vacationDays}
                            onChange={(e) => setNewSalary({...newSalary, vacationDays: Number(e.target.value)})}
                            fullWidth
                        />
                    </Box>

                    {/* Employer Type */}
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Employer Type
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel>Employer Type</InputLabel>
                            <Select
                                value={newSalary.employerType}
                                label="Employer Type"
                                onChange={(e) => setNewSalary({...newSalary, employerType: e.target.value as typeof EmployerType[keyof typeof EmployerType]})}
                            >
                                <MenuItem value={EmployerType.INTERNATIONAL_TECH_CORP}>International Tech Corporation</MenuItem>
                                <MenuItem value={EmployerType.ISRAELI_TECH_CORP}>Israeli Tech Corporation</MenuItem>
                                <MenuItem value={EmployerType.SMALL_STARTUP}>Small Startup (1-19 employees)</MenuItem>
                                <MenuItem value={EmployerType.MEDIUM_STARTUP}>Medium Startup (20-100 employees)</MenuItem>
                                <MenuItem value={EmployerType.LARGE_STARTUP}>Large Startup (over 100 employees)</MenuItem>
                                <MenuItem value={EmployerType.DEFENSE_CORP}>Defense Corporation</MenuItem>
                                <MenuItem value={EmployerType.INTERNATIONAL_NONTECH_CORP}>International Non-Tech Corporation</MenuItem>
                                <MenuItem value={EmployerType.ISRAELI_NONTECH_CORP}>Israeli Non-Tech Corporation</MenuItem>
                                <MenuItem value={EmployerType.OTHER}>Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Start Year (Optional) */}
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Start Year (Optional)
                        </Typography>
                        <TextField
                            label="Start Year"
                            type="number"
                            value={newSalary.startYear || ''}
                            onChange={(e) => setNewSalary({...newSalary, startYear: e.target.value ? Number(e.target.value) : undefined})}
                            fullWidth
                        />
                    </Box>

                    {/* End Year (Optional) */}
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            End Year (Optional)
                        </Typography>
                        <TextField
                            label="End Year"
                            type="number"
                            value={newSalary.endYear || ''}
                            onChange={(e) => setNewSalary({...newSalary, endYear: e.target.value ? Number(e.target.value) : undefined})}
                            fullWidth
                        />
                    </Box>

                    {/* Submit Button */}
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleSubmit}
                        sx={{
                            mt: 2,
                            backgroundColor: submitSuccess ? 'green' : undefined,
                            '&:hover': {
                                backgroundColor: submitSuccess ? 'green' : undefined,
                            }
                        }}
                    >
                        {submitSuccess ? '✓ Submitted!' : 'Submit Salary Report'}
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
};

const getDefaultSalary: () => CreateSalaryDto = () => ({
    baseSalary: 0,
    extras: 0,
    roleId: '',
    experienceYears: 0,
    education: Education.NONE,
    educationInRelevantField: true,
    vacationDays: 0,
    employerType: EmployerType.OTHER,
});