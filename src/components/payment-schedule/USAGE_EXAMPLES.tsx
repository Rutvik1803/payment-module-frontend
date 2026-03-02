/**
 * Example: How to use PaymentScheduleDisplay Component
 *
 * This file demonstrates how to integrate the PaymentScheduleDisplay component
 * into your payment plan detail pages.
 *
 * All examples are provided as comments for reference.
 */

/*

Example 1: Basic Usage in a Payment Plan Details Page

import { PaymentScheduleDisplay } from '@/components/payment-schedule/PaymentScheduleDisplay';
import { useParams, useNavigate } from 'react-router-dom';

export function PaymentPlanDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const planId = parseInt(id || '0');

    const handleViewInvoice = (invoiceId: number) => {
        navigate(`/invoices/${invoiceId}`);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Payment Plan Details</h1>
            
            <PaymentScheduleDisplay
                paymentPlanId={planId}
                onViewInvoice={handleViewInvoice}
            />
        </div>
    );
}

---

Example 2: In a Modal/Dialog

import { PaymentScheduleDisplay } from '@/components/payment-schedule/PaymentScheduleDisplay';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function PaymentScheduleModal({ 
    planId, 
    isOpen, 
    onClose 
}: { 
    planId: number; 
    isOpen: boolean; 
    onClose: () => void; 
}) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Payment Schedule</DialogTitle>
                </DialogHeader>
                <PaymentScheduleDisplay 
                    paymentPlanId={planId} 
                />
            </DialogContent>     
        </Dialog>
    );
}

---

Example 3: Standalone Page

import { PaymentScheduleDisplay } from '@/components/payment-schedule/PaymentScheduleDisplay';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

export function PaymentSchedulePage() {
    const { planId } = useParams<{ planId: string }>();
    const id = parseInt(planId || '0');

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Payment Schedule</h1>
                <p className="text-gray-600 mt-2">
                    View your payment plan installment schedule
                </p>
            </div>

            <Card className="shadow-lg">
                <CardContent className="pt-6">
                    <PaymentScheduleDisplay 
                        paymentPlanId={id}
                        onViewInvoice={(invoiceId) => {
                            window.location.href = `/invoices/${invoiceId}`;
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    );
}

---

Example 4: With Custom Styling

import { PaymentScheduleDisplay } from '@/components/payment-schedule/PaymentScheduleDisplay';

export function CustomStyledSchedule({ planId }: { planId: number }) {
    return (
        <div className="bg-gray-50 p-8 rounded-xl">
            <PaymentScheduleDisplay 
                paymentPlanId={planId}
                className="max-w-6xl mx-auto"
                onViewInvoice={(invoiceId) => {
                    console.log('View invoice:', invoiceId);
                }}
            />
        </div>
    );
}

---

Example 5: Student Payment Portal Integration

import { PaymentScheduleDisplay } from '@/components/payment-schedule/PaymentScheduleDisplay';
import { useAuth } from '@/hooks/useAuth';
import { usePaymentPlans } from '@/hooks/usePaymentPlans';

export function StudentPortal() {
    const { user } = useAuth();
    const { paymentPlans } = usePaymentPlans({ 
        filters: { user_id: user?.id },
        pagination: { page: 1, limit: 1 } 
    });

    const activePlan = paymentPlans.find(p => p.status === 'ACTIVE');

    if (!activePlan) {
        return <div>No active payment plan</div>;
    }

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold">My Payment Schedule</h2>
            
            <PaymentScheduleDisplay 
                paymentPlanId={activePlan.id}
                onViewInvoice={(invoiceId) => {
                    // Navigate to invoice or open invoice dialog
                }}
            />
        </div>
    );
}

*/

export {};
