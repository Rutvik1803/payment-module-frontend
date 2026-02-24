import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { paymentPlanFormSchema } from '@/lib/validations/paymentPlan';
import { createPaymentPlan } from '@/services/paymentPlanService';
import { getAllStudents } from '@/services/userService';
import { PaymentPlanType } from '@/types/paymentPlan';
import { StudentOption } from '@/types/user';

// Form data before validation/transformation
interface PaymentPlanFormData {
  user_id: string;
  total_amount: string;
  type: 'ONE_TIME' | 'INSTALLMENT';
  number_of_installments?: string;
  start_date: string;
}

interface PaymentPlanFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  onFormChange?: (values: any) => void;
}

export function PaymentPlanForm({
  onSuccess,
  onCancel,
  onFormChange,
}: PaymentPlanFormProps) {
  const [students, setStudents] = useState<StudentOption[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PaymentPlanFormData>({
    resolver: zodResolver(paymentPlanFormSchema) as any,
    defaultValues: {
      user_id: '',
      total_amount: '',
      type: 'ONE_TIME',
      number_of_installments: '',
      start_date: new Date().toISOString().split('T')[0],
    },
  });

  const paymentType = watch('type');
  const totalAmount = watch('total_amount');
  const numberOfInstallments = watch('number_of_installments');
  const startDate = watch('start_date');

  // Notify parent of form changes for preview
  useEffect(() => {
    if (onFormChange) {
      onFormChange({
        type: paymentType,
        total_amount: totalAmount,
        number_of_installments: numberOfInstallments,
        start_date: startDate,
      });
    }
  }, [paymentType, totalAmount, numberOfInstallments, startDate, onFormChange]);

  // Load students on mount
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const studentsList = await getAllStudents();
        setStudents(studentsList);
      } catch (error) {
        console.error('Failed to load students:', error);
        toast.error('Failed to load students. Please refresh the page.');
      } finally {
        setLoadingStudents(false);
      }
    };

    loadStudents();
  }, []);

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      // Data is already transformed by Zod schema (strings -> numbers)
      const payloadData = {
        user_id: data.user_id,
        total_amount: data.total_amount,
        type: data.type as PaymentPlanType,
        start_date: data.start_date,
        ...(data.type === 'INSTALLMENT' && data.number_of_installments
          ? { number_of_installments: data.number_of_installments }
          : {}),
      };

      await createPaymentPlan(payloadData);
      toast.success('Payment plan created successfully!');
      onSuccess?.();
    } catch (error: any) {
      console.error('Failed to create payment plan:', error);
      const errorMessage =
        error?.response?.data?.error ||
        'Failed to create payment plan. Please try again.';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingStudents) {
    return (
      <Card className="p-8">
        <div className="flex items-center justify-center">
          <Spinner className="h-8 w-8" />
          <span className="ml-3 text-sm text-muted-foreground">
            Loading form...
          </span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Create Payment Plan</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Set up a new payment plan for a student
          </p>
        </div>

        {/* Student Selection */}
        <div className="space-y-2">
          <Label htmlFor="user_id" required>
            Student
          </Label>
          <Select
            id="user_id"
            {...register('user_id')}
            error={errors.user_id?.message}
            disabled={submitting}
          >
            <option value="">Select a student...</option>
            {students.map((student) => (
              <option key={student.value} value={student.value}>
                {student.label} ({student.email})
              </option>
            ))}
          </Select>
        </div>

        {/* Total Amount */}
        <div className="space-y-2">
          <Label htmlFor="total_amount" required>
            Total Amount
          </Label>
          <Input
            id="total_amount"
            type="number"
            step="0.01"
            min="1"
            max="999999.99"
            placeholder="1000.00"
            {...register('total_amount')}
            error={errors.total_amount?.message}
            disabled={submitting}
          />
          <p className="text-xs text-muted-foreground">
            Enter the total amount for this payment plan
          </p>
        </div>

        {/* Payment Type */}
        <div className="space-y-2">
          <Label htmlFor="type" required>
            Payment Type
          </Label>
          <Select
            id="type"
            {...register('type')}
            error={errors.type?.message}
            disabled={submitting}
          >
            <option value="ONE_TIME">One-Time Payment</option>
            <option value="INSTALLMENT">Installment Plan</option>
          </Select>
        </div>

        {/* Number of Installments (conditional) */}
        {paymentType === 'INSTALLMENT' && (
          <div className="space-y-2">
            <Label htmlFor="number_of_installments" required>
              Number of Installments
            </Label>
            <Input
              id="number_of_installments"
              type="number"
              min="2"
              max="12"
              placeholder="6"
              {...register('number_of_installments')}
              error={errors.number_of_installments?.message}
              disabled={submitting}
            />
            <p className="text-xs text-muted-foreground">
              Choose between 2 and 12 installments
            </p>
          </div>
        )}

        {/* Start Date */}
        <div className="space-y-2">
          <Label htmlFor="start_date" required>
            Start Date
          </Label>
          <DatePicker
            id="start_date"
            {...register('start_date')}
            error={errors.start_date?.message}
            disabled={submitting}
            min={new Date().toISOString().split('T')[0]}
          />
          <p className="text-xs text-muted-foreground">
            The date when the first payment is due
          </p>
        </div>

        {/* Installment Preview (if applicable) */}
        {paymentType === 'INSTALLMENT' &&
          totalAmount &&
          numberOfInstallments &&
          parseInt(numberOfInstallments, 10) >= 2 && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <p className="text-sm font-medium text-blue-900">
                Installment Amount:{' '}
                <span className="text-lg">
                  $
                  {(
                    parseFloat(totalAmount) / parseInt(numberOfInstallments, 10)
                  ).toFixed(2)}
                </span>
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Each payment will be approximately this amount
              </p>
            </div>
          )}

        {/* Form Actions */}
        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={submitting} className="flex-1">
            {submitting ? (
              <>
                <Spinner className="h-4 w-4 mr-2" />
                Creating...
              </>
            ) : (
              'Create Payment Plan'
            )}
          </Button>
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={submitting}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
