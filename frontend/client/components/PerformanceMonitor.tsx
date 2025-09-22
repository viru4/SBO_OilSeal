import { useEffect } from 'react';
// import { usePerformance } from '@/hooks/use-performance'; // Available for future use

interface PerformanceMonitorProps {
  children: React.ReactNode;
}

export default function PerformanceMonitor({ children }: PerformanceMonitorProps) {
  // const { measureRender } = usePerformance(); // Available for future use

  useEffect(() => {
    // Only monitor in development or when explicitly enabled
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          const fid = entry.processingStart - entry.startTime;
          console.log('FID:', fid);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS) - Only log once per session
      let clsValue = 0;
      let clsLogged = false;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        if (!clsLogged && clsValue > 0.1) {
          console.log('CLS:', clsValue);
          clsLogged = true;
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // First Contentful Paint (FCP) - Only log once
      let fcpLogged = false;
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!fcpLogged) {
            console.log('FCP:', entry.startTime);
            fcpLogged = true;
          }
        });
      });
      fcpObserver.observe({ entryTypes: ['paint'] });

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
        fcpObserver.disconnect();
      };
    }
  }, []);

  return <>{children}</>;
}
