"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from './ui/skeleton';
import Header from './header';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'user')[];
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace('/');
      return;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.replace('/dashboard');
    }
  }, [user, loading, router, allowedRoles]);

  if (loading || !user || (allowedRoles && user && !allowedRoles.includes(user.role))) {
    return (
        <div className="flex flex-col min-h-screen">
             <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
                <Skeleton className="h-6 w-32" />
                <div className="flex-grow" />
                <Skeleton className="h-10 w-10 rounded-full" />
             </div>
            <div className="flex-1 p-8">
                <Skeleton className="h-full w-full" />
            </div>
        </div>
    );
  }

  return <>{children}</>;
}
