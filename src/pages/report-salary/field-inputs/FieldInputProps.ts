import type {CreateSalaryDto} from "../../../api/salary.ts";

export type FieldInputProps = {
    newSalary: CreateSalaryDto;
    setNewSalary: (salary: CreateSalaryDto) => void;
    error?: string | undefined;
}