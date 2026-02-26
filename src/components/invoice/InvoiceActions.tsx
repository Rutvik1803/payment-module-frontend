import { useState } from 'react';
import { Invoice } from '@/types/invoice';
import { Button } from '@/components/ui/button';

interface InvoiceActionsProps {
  invoice: Invoice;
  onMarkAsPaid?: (id: number) => Promise<void>;
  onViewDetails?: (id: number) => void;
}

/**
 * Invoice Actions Component
 * Provides action menu for invoice operations
 */
export function InvoiceActions({
  invoice,
  onMarkAsPaid,
  onViewDetails,
}: InvoiceActionsProps) {
  const [showMarkAsPaidConfirm, setShowMarkAsPaidConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMarkAsPaid = async () => {
    if (!onMarkAsPaid) return;

    setIsProcessing(true);
    try {
      await onMarkAsPaid(invoice.id);
      setShowMarkAsPaidConfirm(false);
    } catch (error) {
      // Error handled by hook
    } finally {
      setIsProcessing(false);
    }
  };

  const canMarkAsPaid = invoice.status !== 'PAID';

  return (
    <>
      <div className="flex items-center gap-2">
        {/* View Details */}
        {onViewDetails && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(invoice.id)}
          >
            View
          </Button>
        )}

        {/* Mark as Paid */}
        {canMarkAsPaid && onMarkAsPaid && (
          <Button
            variant="default"
            size="sm"
            onClick={() => setShowMarkAsPaidConfirm(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            Mark as Paid
          </Button>
        )}
      </div>

      {/* Mark as Paid Confirmation Modal */}
      {showMarkAsPaidConfirm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => !isProcessing && setShowMarkAsPaidConfirm(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Mark Invoice as Paid?
            </h3>

            {/* Description */}
            <div className="text-sm text-gray-600 text-center mb-6 space-y-2">
              <p className="leading-relaxed">
                Are you sure you want to mark invoice
              </p>
              <p className="font-bold text-gray-900 text-base break-words px-4">
                {invoice.invoice_number}
              </p>
              <p className="leading-relaxed">
                as paid? This will update the invoice status to paid.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => setShowMarkAsPaidConfirm(false)}
                disabled={isProcessing}
                className="flex-1 order-2 sm:order-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleMarkAsPaid}
                disabled={isProcessing}
                className="flex-1 bg-green-600 hover:bg-green-700 order-1 sm:order-2"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Confirm & Mark as Paid'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
