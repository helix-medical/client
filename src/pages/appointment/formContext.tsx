import { createFormContext } from '@mantine/form';

interface IFormValues {
    anamnesis: {
        reasons: string;
        symptoms: string;
        knownDiseases: string;
        knownMedications: string;
    };
    conclusion: {
        diagnosis: string;
        treatment: string;
        observations: string;
    };
    payment: {
        amount: number;
        method: string;
    };
}

export const [AppFormProvider, useAppFormContext, useAppForm] = createFormContext<IFormValues>();
