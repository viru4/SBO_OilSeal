import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./components/site/Layout";
import ErrorBoundary from "@/components/ErrorBoundary";
import LoadingSpinner from "@/components/LoadingSpinner";
import PerformanceMonitor from "@/components/PerformanceMonitor";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Products = lazy(() => import("./pages/Products"));
const Industries = lazy(() => import("./pages/Industries"));
const Quality = lazy(() => import("./pages/Quality"));
const Contact = lazy(() => import("./pages/Contact"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (
          error instanceof Error &&
          "status" in error &&
          typeof error.status === "number"
        ) {
          if (error.status >= 400 && error.status < 500) {
            return false;
          }
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <PerformanceMonitor>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Index />
                    </Suspense>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Products />
                    </Suspense>
                  }
                />
                <Route
                  path="/industries"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Industries />
                    </Suspense>
                  }
                />
                <Route
                  path="/quality"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Quality />
                    </Suspense>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Contact />
                    </Suspense>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Admin />
                    </Suspense>
                  }
                />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route
                path="*"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <NotFound />
                  </Suspense>
                }
              />
            </Routes>
          </BrowserRouter>
          {/* {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />} */}
        </TooltipProvider>
      </QueryClientProvider>
    </PerformanceMonitor>
  </ErrorBoundary>
);

export default App;
