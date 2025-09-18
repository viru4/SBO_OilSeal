import { useEffect, useRef } from 'react';

// Performance metrics interface for future use
// interface PerformanceMetrics {
//   loadTime: number;
//   renderTime: number;
//   memoryUsage?: number;
// }

export function usePerformance() {
  const startTime = useRef<number>(Date.now());
  const renderStartTime = useRef<number>(0);

  useEffect(() => {
    // Measure initial load time
    const loadTime = Date.now() - startTime.current;
    
    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Metrics:', {
        loadTime: `${loadTime}ms`,
        memoryUsage: (performance as any).memory ? {
          used: `${Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)}MB`,
          total: `${Math.round((performance as any).memory.totalJSHeapSize / 1024 / 1024)}MB`,
          limit: `${Math.round((performance as any).memory.jsHeapSizeLimit / 1024 / 1024)}MB`,
        } : 'Not available',
      });
    }

    // Report to analytics in production
    if (process.env.NODE_ENV === 'production' && loadTime > 3000) {
      // Report slow load times to analytics
      console.warn('Slow page load detected:', loadTime);
    }
  }, []);

  const measureRender = (componentName: string) => {
    renderStartTime.current = performance.now();
    
    return () => {
      const renderTime = performance.now() - renderStartTime.current;
      
      if (process.env.NODE_ENV === 'development' && renderTime > 16) {
        console.warn(`Slow render detected in ${componentName}:`, `${renderTime.toFixed(2)}ms`);
      }
    };
  };

  return { measureRender };
}
