import {Container, Typography} from "@mui/material";
import {useState} from "react";
import {getSalariesByRole, type SalaryDto, toggleDislikeSalary, toggleLikeSalary} from "../../api/salary.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getRolesByCategoryId} from "../../api/role.ts";
import {SelectCategoryAndRole} from "./SelectCategoryAndRole.tsx";
import {SalariesTable} from "./SalariesTable.tsx";

export const ViewSalariesPage = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
    const [selectedRoleId, setSelectedRoleId] = useState<string | undefined>(undefined);

    const {data: roles} = useQuery({
        queryKey: ['roles', selectedCategoryId],
        queryFn: () => getRolesByCategoryId(selectedCategoryId!),
        enabled: !!selectedCategoryId,
    });
    const {data: salaries, isLoading: areSalariesLoading} = useQuery({
        queryKey: ['salaries', selectedRoleId],
        queryFn: () => getSalariesByRole(selectedRoleId!),
        enabled: !!selectedRoleId,
    });

    const queryClient = useQueryClient();

    const updateSalaryInCache = (salary: SalaryDto) => {
        queryClient.setQueryData<SalaryDto[]>(['salaries', selectedRoleId], (oldSalaries) => {
            const otherSalaries = oldSalaries?.filter(s => s.id !== salary.id) || [];
            return [...otherSalaries, salary].sort((a, b) => a.id.localeCompare(b.id));
        });
    };

    const toggleLikeMutation = useMutation({
        mutationFn: toggleLikeSalary,
        onSuccess: updateSalaryInCache
    });

    const toggleDisLikeMutation = useMutation({
        mutationFn: toggleDislikeSalary,
        onSuccess: updateSalaryInCache
    });

    const handleCategoryChange = async (categoryId: string) => {
        setSelectedCategoryId(categoryId);
        setSelectedRoleId(undefined);
    };

    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Typography variant="h3" gutterBottom>
                View Salary Reports
            </Typography>
            <SelectCategoryAndRole selectedCategoryId={selectedCategoryId}
                                   handleCategoryChange={handleCategoryChange}
                                   roles={roles}
                                   selectedRoleId={selectedRoleId}
                                   setSelectedRoleId={setSelectedRoleId}/>
            <SalariesTable salaries={salaries}
                           selectedRoleId={selectedRoleId}
                           areSalariesLoading={areSalariesLoading}
                           toggleLikeMutation={toggleLikeMutation.mutate}
                           toggleDisLikeMutation={toggleDisLikeMutation.mutate}/>
        </Container>
    );
};