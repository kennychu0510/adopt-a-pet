"use client";

import useAdminToken from "@/hooks/useAdminToken";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminGuard() {
  const router = useRouter();
  const { adminToken } = useAdminToken();
  useEffect(() => {
    if (adminToken === null) {
      router.replace("/");
    }
  }, [adminToken]);
  return null;
}
