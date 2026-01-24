import {apiClient} from "./apiClient.ts";
import type {CreateSalaryDto, SalaryDto} from "../model/salary.ts";

const baseUrl = '/salary';

export async function createSalary(createSalaryDto: CreateSalaryDto): Promise<void> {
    await apiClient.post(baseUrl + '/create', createSalaryDto);
}

export async function getSalariesByRole(roleId: string): Promise<SalaryDto[]> {
    const response = await apiClient.get<SalaryDto[]>(baseUrl + `/get-all-by-role/${roleId}`);
    return response.data;
}

export async function toggleLikeSalary(salaryId: string): Promise<SalaryDto> {
    const response = await apiClient.post<SalaryDto>(baseUrl + `/toggle-like/salary/${salaryId}`);
    return response.data;
}

export async function toggleDislikeSalary(salaryId: string): Promise<SalaryDto> {
    const response = await apiClient.post<SalaryDto>(baseUrl + `/toggle-dislike/salary/${salaryId}`);
    return response.data;
}
