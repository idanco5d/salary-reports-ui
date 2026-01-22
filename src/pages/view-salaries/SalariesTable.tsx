import {
    Box,
    CircularProgress,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import {Education, EmployerType, type SalaryDto} from "../../api/salary.ts";
import type {UseMutateFunction} from "@tanstack/react-query";

export type SalariesTableProps = {
    salaries: SalaryDto[] | undefined;
    selectedRoleId: string | undefined;
    areSalariesLoading: boolean;
    toggleLikeMutation: UseMutateFunction<SalaryDto, Error, string>;
    toggleDisLikeMutation: UseMutateFunction<SalaryDto, Error, string>;
}

export const SalariesTable = ({
                                  salaries,
                                  selectedRoleId,
                                  areSalariesLoading,
                                  toggleLikeMutation,
                                  toggleDisLikeMutation
                              }: SalariesTableProps) => {
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

    return <>
        {(!salaries || salaries.length === 0) && selectedRoleId && (
            areSalariesLoading ? <CircularProgress/> :
                <Typography>No salaries have been reported yet for this role.</Typography>)}
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
                            <TableCell align="center"><strong>Like/Dislike</strong></TableCell>
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
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 1
                                    }}>
                                        <IconButton
                                            onClick={() => toggleLikeMutation(salary.id)}
                                            color={salary.isLikedByCurrentUser ? "primary" : "default"}
                                            size="small"
                                        >
                                            {salary.isLikedByCurrentUser ? <ThumbUpIcon/> : <ThumbUpOutlinedIcon/>}
                                        </IconButton>
                                        <Typography variant="body2">{salary.likes}</Typography>
                                        <IconButton
                                            onClick={() => toggleDisLikeMutation(salary.id)}
                                            color={salary.isDislikedByCurrentUser ? "error" : "default"}
                                            size="small"
                                        >
                                            {salary.isDislikedByCurrentUser ? <ThumbDownIcon/> :
                                                <ThumbDownOutlinedIcon/>}
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
    </>
}