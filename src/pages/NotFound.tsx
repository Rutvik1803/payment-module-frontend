/**
 * 404 Not Found Page
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

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-6xl">404</CardTitle>
          <CardDescription className="text-xl">Page Not Found</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            The page you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate('/')}>Go to Dashboard</Button>
        </CardContent>
      </Card>
    </div>
  );
}
