import { InvoiceStatus } from '@/types/invoice';
import { cn } from '@/lib/utils';

interface InvoiceStatusBadgeProps {
    status: InvoiceStatus;
    className?: string;
}

/**
 * Invoice Status Badge Component
 * Displays a colored badge based on invoice status
 */
export function InvoiceStatusBadge({
    status,
    className,
}: InvoiceStatusBadgeProps) {
    const statusConfig = {
        UPCOMING: {
            label: 'Upcoming',
            className: 'bg-blue-100 text-blue-800 border-blue-200',
            dotColor: 'bg-blue-500',
        },
        DUE: {
            label: 'Due',
            className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            dotColor: 'bg-yellow-500',
        },
        OUTSTANDING: {
            label: 'Outstanding',
            className: 'bg-orange-100 text-orange-800 border-orange-200',
            dotColor: 'bg-orange-500',
        },
        PARTIAL: {
            label: 'Partial',
            className: 'bg-purple-100 text-purple-800 border-purple-200',
            dotColor: 'bg-purple-500',
        },
        PAID: {
            label: 'Paid',
            className: 'bg-green-100 text-green-800 border-green-200',
            dotColor: 'bg-green-500',
        },
    };

    const config = statusConfig[status];

    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
                config.className,
                className
            )}
        >
            <span
                className={cn('w-1.5 h-1.5 rounded-full', config.dotColor)}
                aria-hidden="true"
            />
            {config.label}
        </span>
    );
}
