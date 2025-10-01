"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/lib/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const session = localStorage.getItem('user-session');
      if (session) {
        setUser(JSON.parse(session));
      }
    } catch (error) {
      console.error("Failed to parse user session from localStorage", error);
      localStorage.removeItem('user-session');
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user-session');
    setUser(null);
    router.push('/');
  };

  return { user, loading, logout };
}
