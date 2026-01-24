import {createSalary} from "../../../api/salary.ts";
import {useState} from "react";
import {Button} from "@mui/material";
import {type CreateSalaryDto, getDefaultSalary} from "../../../model/salary.ts";

export type SubmitButtonProps = {
    newSalary: CreateSalaryDto;
    setNewSalary: (newSalary: CreateSalaryDto) => void;
    setSelectedCategoryId: (categoryId: string | undefined) => void;
    salaryHasErrors: boolean;
}

export const SubmitButton = ({newSalary, setNewSalary, setSelectedCategoryId, salaryHasErrors}: SubmitButtonProps) => {
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const handleSubmit = async () => {
        await createSalary(newSalary);
        setNewSalary(getDefaultSalary());
        setSelectedCategoryId(undefined);
        setSubmitSuccess(true);

        setTimeout(() => {
            setSubmitSuccess(false);
        }, 2000);
    };

    return <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        disabled={salaryHasErrors}
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
}

