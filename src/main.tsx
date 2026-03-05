import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import '@/lib/gsap'; // Ensure GSAP plugins are registered

import RootLayout from '@/layouts/RootLayout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import CoachingPage from '@/pages/CoachingPage';
import YouthPathwayPage from '@/pages/YouthPathwayPage';
import CampsPage from '@/pages/CampsPage';
import CoachMentorshipPage from '@/pages/CoachMentorshipPage';
import ResultsPage from '@/pages/ResultsPage';
import ApplyPage from '@/pages/ApplyPage';
import NotFoundPage from '@/pages/NotFoundPage';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'coaching', element: <CoachingPage /> },
      { path: 'youth-pathway', element: <YouthPathwayPage /> },
      { path: 'camps', element: <CampsPage /> },
      { path: 'coach-mentorship', element: <CoachMentorshipPage /> },
      { path: 'results', element: <ResultsPage /> },
      { path: 'apply', element: <ApplyPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>
);
