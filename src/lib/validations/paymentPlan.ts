import { z } from 'zod';

/**
 * Validation schema for payment plan creation form
 * Matches CreatePaymentPlanDTO structure with frontend-specific validations
 */
export const paymentPlanFormSchema = z
    .object({
        user_id: z
            .string()
            .min(1, 'Student is required')
            .transform((val) => parseInt(val, 10))
            .refine((val) => !isNaN(val) && val > 0, {
                message: 'Please select a valid student',
            }),

        total_amount: z
            .string()
            .min(1, 'Total amount is required')
            .refine(
                (val) => {
                    const num = parseFloat(val);
                    return !isNaN(num) && num >= 1 && num <= 999999.99;
                },
                {
                    message: 'Total amount must be between $1.00 and $999,999.99',
                }
            )
            .transform((val) => parseFloat(val)),

        type: z.enum(['ONE_TIME', 'INSTALLMENT']),

        number_of_installments: z
            .string()
            .optional()
            .transform((val) => (val ? parseInt(val, 10) : undefined)),

        start_date: z
            .string()
            .min(1, 'Start date is required')
            .refine(
                (val) => {
                    const selectedDate = new Date(val);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    return selectedDate >= today;
                },
                {
                    message: 'Start date cannot be in the past',
                }
            )
            .refine(
                (val) => {
                    const selectedDate = new Date(val);
                    const oneYearFromNow = new Date();
                    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

                    return selectedDate <= oneYearFromNow;
                },
                {
                    message: 'Start date must be within one year',
                }
            ),
    })
    .refine(
        (data) => {
            // Cross-field validation: installments required for INSTALLMENT type
            if (data.type === 'INSTALLMENT') {
                const installments = data.number_of_installments;
                return (
                    installments !== undefined &&
                    !isNaN(installments) &&
                    installments >= 2 &&
                    installments <= 12
                );
            }
            return true;
        },
        {
            message: 'Number of installments must be between 2 and 12',
            path: ['number_of_installments'],
        }
    );

export type PaymentPlanFormValues = z.infer<typeof paymentPlanFormSchema>;
