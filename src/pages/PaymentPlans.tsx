/**
 * Payment Plans Page
 * List and manage payment plans
 */

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export default function PaymentPlansPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment Plans</h1>
        <p className="text-muted-foreground">
          Create and manage payment plans for students
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Plans List</CardTitle>
          <CardDescription>
            This page will be implemented in Sprint 2
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
