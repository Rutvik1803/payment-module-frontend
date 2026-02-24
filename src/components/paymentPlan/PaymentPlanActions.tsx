import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PaymentPlan } from '@/types/paymentPlan';

interface PaymentPlanActionsProps {
  plan: PaymentPlan;
  onCancel: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onViewDetails?: (id: number) => void;
}

export function PaymentPlanActions({
  plan,
  onCancel,
  onDelete,
  onViewDetails,
}: PaymentPlanActionsProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCancel = async () => {
    setIsProcessing(true);
    try {
      await onCancel(plan.id);
      setShowCancelConfirm(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    setIsProcessing(true);
    try {
      await onDelete(plan.id);
      setShowDeleteConfirm(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const canCancel = plan.status === 'ACTIVE';
  const canDelete = plan.status === 'CANCELLED';

  return (
    <>
      <div className="flex items-center gap-2">
        {/* View Details */}
        {onViewDetails && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(plan.id)}
          >
            View
          </Button>
        )}

        {/* Cancel */}
        {canCancel && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCancelConfirm(true)}
            className="text-orange-600 hover:text-orange-700"
          >
            Cancel
          </Button>
        )}

        {/* Delete */}
        {canDelete && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeleteConfirm(true)}
            className="text-red-600 hover:text-red-700"
          >
            Delete
          </Button>
        )}
      </div>

      {/* Cancel Confirmation Dialog */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Cancel Payment Plan?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to cancel this payment plan? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowCancelConfirm(false)}
                disabled={isProcessing}
              >
                No, Keep It
              </Button>
              <Button
                onClick={handleCancel}
                disabled={isProcessing}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {isProcessing ? 'Cancelling...' : 'Yes, Cancel Plan'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Delete Payment Plan?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to permanently delete this payment plan?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                disabled={isProcessing}
                className="bg-red-600 hover:bg-red-700"
              >
                {isProcessing ? 'Deleting...' : 'Yes, Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
