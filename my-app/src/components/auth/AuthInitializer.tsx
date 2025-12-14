"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "../../lib/hook";
import { verifyToken } from "../../lib/features/authSlice";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const queryClient = new QueryClient();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Access localStorage only in useEffect (client-side)
        const token = localStorage.getItem("token");

        // No token found - redirect to login
        if (!token) {
          router.push("/login");
          setIsLoading(false);
          return;
        }

        // Token exists - verify it
        await dispatch(verifyToken()).unwrap();

        // Verification successful
        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        // Verification failed - redirect to login
        console.error("Auth verification failed:", error);
        localStorage.removeItem("token"); // Clear invalid token
        router.push("/login");
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [dispatch, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Only render children if authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
