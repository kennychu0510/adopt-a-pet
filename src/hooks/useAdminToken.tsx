'use client';
import { ADMIN_TOKEN } from '@/constants';
import { useEffect, useState } from 'react';

export default function useAdminToken() {
  const [adminToken, setAdminToken] = useState<string | null>('');

  useEffect(() => {
    if (typeof window !== undefined) {
      setAdminToken(localStorage.getItem(ADMIN_TOKEN))
    }
  }, [])

  return { adminToken };
}
