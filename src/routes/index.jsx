import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// @routes
import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';
import PagesRoutes from './PagesRoutes';

// @project
import Loadable from '@/components/Loadable';
import { AuthProvider } from '@/contexts/AuthContext';
import AuthGuard from '@/utils/route-guard/AuthGuard';

// Standalone pages (no AdminLayout)
const FbAdsCallbackPage = Loadable(lazy(() => import('@/views/admin/fb-connect-callback')));
const GoogleAdsCallbackPage = Loadable(lazy(() => import('@/views/admin/google-ads-callback')));
const LegalPage = Loadable(lazy(() => import('@/views/legal')));

/***************************  ROUTING RENDER  ***************************/

const OnboardingRoutes = [
  {
    path: '/oauth/facebook-ads',
    element: (
      <AuthProvider>
        <AuthGuard>
          <FbAdsCallbackPage />
        </AuthGuard>
      </AuthProvider>
    )
  },
  {
    path: '/oauth/google-ads',
    element: (
      <AuthProvider>
        <AuthGuard>
          <GoogleAdsCallbackPage />
        </AuthGuard>
      </AuthProvider>
    )
  }
];

// Public legal pages (no auth required — accessible by Google)
const LegalRoutes = [
  { path: '/privacy-policy', element: <LegalPage /> },
  { path: '/terms-policy', element: <LegalPage /> },
  { path: '/cookie-policy', element: <LegalPage /> },
  { path: '/trust-verification', element: <LegalPage /> },
  { path: '/delete-account', element: <LegalPage /> },
];

const router = createBrowserRouter([...AuthRoutes, ...OnboardingRoutes, ...LegalRoutes, MainRoutes, PagesRoutes], {
  basename: import.meta.env.VITE_APP_BASE_URL
});

export default router;
