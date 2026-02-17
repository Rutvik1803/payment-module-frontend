/**
 * Invoices Page
 * List and manage invoices
 */

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Invoices</h1>
        <p className="text-muted-foreground">
          View and manage payment invoices
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoices List</CardTitle>
          <CardDescription>
            This page will be implemented in Sprint 2
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
