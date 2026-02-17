/**
 * Payment Portal Page
 * Student-facing page for making payments
 */

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export default function PaymentPortalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment Portal</h1>
        <p className="text-muted-foreground">Make payments on your invoices</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Form</CardTitle>
          <CardDescription>
            This page will be implemented in Sprint 3
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
