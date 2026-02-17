/**
 * Dashboard Page
 * Main dashboard for admins and students
 */

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your payment activities
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Payment Plans</CardTitle>
            <CardDescription>Manage payment plans</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/payment-plans')}>
              View Plans
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
            <CardDescription>View and manage invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/invoices')}>View Invoices</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>Payment transaction history</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/transactions')}>
              View Transactions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
