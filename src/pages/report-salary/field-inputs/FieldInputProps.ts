import type {CreateSalaryDto} from "../../../model/salary.ts";

export type FieldInputProps = {
    newSalary: CreateSalaryDto;
    setNewSalary: (salary: CreateSalaryDto) => void;
    error?: string | undefined;
}