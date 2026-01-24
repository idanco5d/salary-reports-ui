import type {CreateSalaryDto} from "../../api/salary.ts";

export function validateSalary(salary: CreateSalaryDto): Record<string, string> {
    const errors: Record<string, string> = {};
    if (salary.baseSalary < 0) {
        errors.baseSalary = 'Base salary must be positive';
    }
    if (salary.extras < 0) {
        errors.extras = 'Extras must be positive';
    }
    if (salary.experienceYears < 0) {
        errors.experienceYears = 'Experience years must be positive';
    }
    if (salary.experienceYears > 70) {
        errors.experienceYears = 'Experience years seems too high';
    }
    if (salary.vacationDays < 12) {
        errors.vacationDays = 'Vacation days are at least 12 by Israeli law';
    }
    if (salary.vacationDays > 100) {
        errors.vacationDays = 'Vacation days seems too high';
    }
    const currentYear = new Date().getFullYear();
    if (salary.startYear !== undefined && (salary.startYear < 1970 || salary.startYear > currentYear)) {
        errors.startYear = `Start year must be between 1970 and ${currentYear}`;
    }
    if (salary.endYear !== undefined && (salary.endYear < 1970 || salary.endYear > currentYear)) {
        errors.endYear = `End year must be greater than 1970 and less than ${currentYear + 1}`;
    }
    if (salary.endYear !== undefined && salary.startYear == undefined) {
        errors.startYear = 'Start year must be filled if end year was filled';
    }
    return errors;
}