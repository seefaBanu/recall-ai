"use client";

import { useSession } from "next-auth/react";

export default function useAuth() {
  const { data: session, status } = useSession();

  return {
    session,
    status,
    token: session?.user?.token || null,
    user: session?.user || null,
    isAuthenticated: !!session,
  };
}