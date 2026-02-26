import { Invoice } from '@/types/invoice';
import { InvoiceStatusBadge } from './InvoiceStatusBadge';
import { InvoiceActions } from './InvoiceActions';

interface InvoiceCardProps {
    invoice: Invoice;
    onMarkAsPaid?: (id: number) => Promise<void>;
    onViewDetails?: (id: number) => void;
}

/**
 * Invoice Card Component
 * Mobile-friendly card view for invoices
 */
export function InvoiceCard({
    invoice,
    onMarkAsPaid,
    onViewDetails,
}: InvoiceCardProps) {
    const isOverdue =
        (invoice.status === 'DUE' || invoice.status === 'OUTSTANDING') &&
        new Date(invoice.due_date) < new Date();

    const formatCurrency = (amount: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(parseFloat(amount));
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div
            className={`bg-white border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow ${
                isOverdue ? 'border-red-300 bg-red-50/30' : ''
            }`}
        >
            {/* Header: Student info + Status */}
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                        {invoice.user
                            ? `${invoice.user.first_name} ${invoice.user.last_name}`
                            : 'Unknown Student'}
                    </div>
                    {invoice.user && (
                        <div className="text-sm text-gray-500">{invoice.user.email}</div>
                    )}
                    <div className="text-xs text-gray-400 mt-1">
                        {invoice.invoice_number}
                    </div>
                </div>
                <InvoiceStatusBadge status={invoice.status} />
            </div>

            {/* Overdue Warning */}
            {isOverdue && (
                <div className="flex items-center gap-2 text-red-600 text-sm font-medium">
                    <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Overdue
                </div>
            )}

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                    <div className="text-gray-500">Amount</div>
                    <div className="font-semibold text-gray-900">
                        {formatCurrency(invoice.amount)}
                    </div>
                </div>
                <div>
                    <div className="text-gray-500">Paid</div>
                    <div className="font-semibold text-gray-900">
                        {formatCurrency(invoice.paid_amount)}
                    </div>
                </div>
                <div>
                    <div className="text-gray-500">Due Date</div>
                    <div className="font-medium text-gray-900">
                        {formatDate(invoice.due_date)}
                    </div>
                </div>
                <div>
                    <div className="text-gray-500">Created</div>
                    <div className="text-gray-600">
                        {formatDate(invoice.created_at)}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t">
                <InvoiceActions
                    invoice={invoice}
                    onMarkAsPaid={onMarkAsPaid}
                    onViewDetails={onViewDetails}
                />
            </div>
        </div>
    );
}
