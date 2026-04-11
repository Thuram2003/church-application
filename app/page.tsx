"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // TODO: Check if user is authenticated, if yes redirect to /home, else to /login
    router.push("/login");
  }, [router]);

  return null;
}
