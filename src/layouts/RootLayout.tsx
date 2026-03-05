import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import { useEffect } from 'react';
import { ScrollTrigger } from '@/lib/gsap';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

function ScrollTriggerRefresh() {
  const location = useLocation();
  
  useEffect(() => {
    // Small delay to ensure DOM is ready after route change
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [location.pathname]);
  
  return null;
}

export default function RootLayout() {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
      <ScrollTriggerRefresh />
    </>
  );
}
