import React from 'react';
import { createBrowserRouter, RouterProvider, Routes, Route, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import store from './store/store';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

// Context Providers
import NotificationProvider from './contexts/NotificationContext';
import ThemeProvider from './contexts/ThemeContext';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';

// Page Components
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ClientDashboard from './pages/ClientDashboard';
import FreelancerDashboard from './pages/FreelancerDashboard';
import JobsPage from './pages/JobsPage';
import ContractsPage from './pages/ContractsPage';
import ProfilePage from './pages/ProfilePage';
import ConnectionTest from './pages/ConnectionTest';
import MyProposalsPage from './pages/MyProposalsPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import FreelancersPage from './pages/FreelancersPage';
import PortfolioPage from './pages/PortfolioPage';

// Job Components
import CreateJob from './components/jobs/CreateJob';
import JobDetails from './components/jobs/JobDetails';

// Contract Components
import ContractList from './components/contracts/ContractList';
import CreateContract from './components/contracts/CreateContract';
import ContractDetails from './components/contracts/ContractDetails';
import CompleteContract from './components/contracts/CompleteContract';
import FundEscrow from './components/contracts/FundEscrow';

// Proposal & Payment Components
import CreateProposal from './components/proposals/CreateProposal';
import ProposalDetails from './pages/ProposalDetails';
import EscrowPayment from './components/payments/EscrowPayment';

// Layout component to wrap routes with Header and Footer
function RootLayout() {
  return (
    <div className="App" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
    }}>
      <Header />
      <main style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Router configuration with future flags enabled
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        // Public Routes
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/forgot-password', element: <ForgotPassword /> },
        { path: '/connection-test', element: <ConnectionTest /> },
        
        // Protected Routes
        { 
          path: '/', 
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ) 
        },
        { 
          path: '/admin', 
          element: (
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          ) 
        },
        { 
          path: '/client', 
          element: (
            <ProtectedRoute allowedRoles={['CLIENT']}>
              <ClientDashboard />
            </ProtectedRoute>
          ) 
        },
        { 
          path: '/my-proposals', 
          element: (
            <ProtectedRoute>
              <MyProposalsPage />
            </ProtectedRoute>
          ) 
        },
        { 
          path: '/proposals/:proposalId', 
          element: (
            <ProtectedRoute>
              <ProposalDetails />
            </ProtectedRoute>
          ) 
        },
        { 
          path: '/freelancer', 
          element: (
            <ProtectedRoute allowedRoles={['FREELANCER']}>
              <FreelancerDashboard />
            </ProtectedRoute>
          ) 
        },
        { 
          path: '/freelancer/proposals', 
          element: (
            <ProtectedRoute allowedRoles={['FREELANCER']}>
              <MyProposalsPage />
            </ProtectedRoute>
          ) 
        },
        { 
          path: '/jobs', 
          element: (
            <ProtectedRoute>
              <JobsPage />
            </ProtectedRoute>
          ) 
        },
        { 
          path: '/jobs/create', 
          element: (
            <ProtectedRoute allowedRoles={['CLIENT']}>
              <CreateJob />
            </ProtectedRoute>
          ) 
        },
        { 
          path: '/jobs/:id', 
          element: (
            <ProtectedRoute>
              <JobDetails />
            </ProtectedRoute>
          ) 
        },
        { 
          path: '/contracts/:id/fund', 
          element: (
            <ProtectedRoute>
              <FundEscrow />
            </ProtectedRoute>
          ) 
        },
        { 
          path: '/contracts/:id/complete', 
          element: (
            <ProtectedRoute>
              <CompleteContract />
            </ProtectedRoute>
          ) 
        },
        { 
          path: '/contracts', 
          element: (
            <ProtectedRoute>
              <ContractsPage />
            </ProtectedRoute>
          ) 
        },
        { 
          path: '/jobs/:jobId/propose', 
          element: (
            <ProtectedRoute allowedRoles={['FREELANCER']}>
              <CreateProposal />
            </ProtectedRoute>
          ) 
        },
        { 
          path: '/proposals/:proposalId/create-contract', 
          element: (
            <ProtectedRoute allowedRoles={['CLIENT']}>
              <CreateContract />
            </ProtectedRoute>
          ) 
        },
        { 
          path: '/contracts/:contractId/fund-escrow', 
          element: (
            <ProtectedRoute allowedRoles={['CLIENT']}>
              <EscrowPayment />
            </ProtectedRoute>
          ) 
        },
        { 
          path: '/contracts/:id', 
          element: (
            <ProtectedRoute>
              <ContractDetails />
            </ProtectedRoute>
          ) 
        },
        { 
          path: '/profile', 
          element: (
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          ) 
        },
        { 
          path: '/settings', 
          element: (
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          ) 
        },
        { 
          path: '/portfolio', 
          element: (
            <ProtectedRoute>
              <PortfolioPage />
            </ProtectedRoute>
          ) 
        },
        { 
          path: '/freelancers', 
          element: (
            <ProtectedRoute>
              <FreelancersPage />
            </ProtectedRoute>
          ) 
        },
        { 
          path: '/help', 
          element: (
            <ProtectedRoute>
              <HelpPage />
            </ProtectedRoute>
          ) 
        },
        { path: '/terms', element: <TermsPage /> },
        { path: '/privacy', element: <PrivacyPage /> },
        
        // 404 Route
        { 
          path: '*', 
          element: (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <h1>404 - Page Not Found</h1>
              <p>The page you are looking for does not exist.</p>
            </div>
          ) 
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 5 * 60 * 1000,
      },
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider>
        <NotificationProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </NotificationProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;