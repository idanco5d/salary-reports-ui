import {apiClient} from "./client.ts";

const baseUrl = '/salary';

export async function createSalary(createSalaryDto: CreateSalaryDto): Promise<void> {
    await apiClient.post(baseUrl + '/create', createSalaryDto);
}

export type CreateSalaryDto = {
    id?: string;
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

export const Education = {
    NONE: 'NONE',
    HIGH_SCHOOL: 'HIGH_SCHOOL',
    COURSE: 'COURSE',
    BACHELOR: 'BACHELOR',
    MASTER: 'MASTER',
    PHD: 'PHD'
} as const;

type TypeOfEducation = typeof Education[keyof typeof Education];

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

type TypeOfEmployerType = typeof EmployerType[keyof typeof EmployerType];