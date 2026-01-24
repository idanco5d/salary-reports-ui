import {apiClient} from "./client.ts";

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

export type CreateSalaryDto = {
    baseSalary: number;
    extras: number;
    roleId: string;
    experienceYears: number;
    education: TypeOfEducation;
    educationInRelevantField: boolean;
    vacationDays: number;
    employerType: TypeOfEmployerType;
    startYear?: number;
    endYear?: number;
}

export type SalaryDto = CreateSalaryDto & {
    id: string;
    likes: number;
    dislikes: number;
    isLikedByCurrentUser: boolean;
    isDislikedByCurrentUser: boolean;
}

export const Education = {
    NONE: 'NONE',
    HIGH_SCHOOL: 'HIGH_SCHOOL',
    COURSE: 'COURSE',
    BACHELOR: 'BACHELOR',
    MASTER: 'MASTER',
    PHD: 'PHD'
} as const;

export type TypeOfEducation = typeof Education[keyof typeof Education];

export const EmployerType = {
    SMALL_STARTUP: 'SMALL_STARTUP',
    MEDIUM_STARTUP: 'MEDIUM_STARTUP',
    LARGE_STARTUP: 'LARGE_STARTUP',
    INTERNATIONAL_NONTECH_CORP: 'INTERNATIONAL_NONTECH_CORP',
    INTERNATIONAL_TECH_CORP: 'INTERNATIONAL_TECH_CORP',
    ISRAELI_NONTECH_CORP: 'ISRAELI_NONTECH_CORP',
    ISRAELI_TECH_CORP: 'ISRAELI_TECH_CORP',
    DEFENSE_CORP: 'DEFENSE_CORP',
    OTHER: 'OTHER',
} as const;

export type TypeOfEmployerType = typeof EmployerType[keyof typeof EmployerType];

export const getDefaultSalary: () => CreateSalaryDto = () => ({
    baseSalary: 0,
    extras: 0,
    roleId: '',
    experienceYears: 0,
    education: Education.NONE,
    educationInRelevantField: true,
    vacationDays: 12,
    employerType: EmployerType.OTHER,
});