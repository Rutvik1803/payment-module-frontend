/**
 * Transactions Page
 * View transaction history
 */

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="text-muted-foreground">
          Payment transaction history and details
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            This page will be implemented in Sprint 5
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
