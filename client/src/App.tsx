import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

// Contexts
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AIProvider } from '@/contexts/AIContext';

// Components
import { Layout } from '@/components/layout/Layout';
import { LoginPage } from '@/pages/auth/LoginPage';
import { Dashboard } from '@/pages/dashboard/Dashboard';

// Pages
import { HRDashboard } from '@/pages/hr/HRDashboard';
import { CRMDashboard } from '@/pages/crm/CRMDashboard';
import { ProjectsDashboard } from '@/pages/projects/ProjectsDashboard';
import { FinanceDashboard } from '@/pages/finance/FinanceDashboard';
import { RSEDashboard } from '@/pages/rse/RSEDashboard';

// Hooks
import { useAuth } from '@/hooks/useAuth';

// Configuration React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Composant de protection des routes
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Composant de redirection pour les utilisateurs connectés
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AIProvider>
            <Router>
              <div className="min-h-screen bg-background">
                <Routes>
                  {/* Routes publiques */}
                  <Route
                    path="/login"
                    element={
                      <PublicRoute>
                        <LoginPage />
                      </PublicRoute>
                    }
                  />

                  {/* Routes protégées */}
                  <Route
                    path="/*"
                    element={
                      <ProtectedRoute>
                        <Layout>
                          <Routes>
                            {/* Dashboard principal */}
                            <Route path="/dashboard" element={<Dashboard />} />
                            
                            {/* Module RH */}
                            <Route path="/hr/*" element={<HRDashboard />} />
                            
                            {/* Module CRM */}
                            <Route path="/crm/*" element={<CRMDashboard />} />
                            
                            {/* Module Projets */}
                            <Route path="/projects/*" element={<ProjectsDashboard />} />
                            
                            {/* Module Finance */}
                            <Route path="/finance/*" element={<FinanceDashboard />} />
                            
                            {/* Module RSE */}
                            <Route path="/rse/*" element={<RSEDashboard />} />
                            
                            {/* Redirection par défaut */}
                            <Route path="/" element={<Navigate to="/dashboard" replace />} />
                            
                            {/* Route 404 */}
                            <Route
                              path="*"
                              element={
                                <div className="flex items-center justify-center min-h-[400px]">
                                  <div className="text-center">
                                    <h1 className="text-4xl font-bold text-muted-foreground mb-4">404</h1>
                                    <p className="text-lg text-muted-foreground mb-4">Page non trouvée</p>
                                    <button
                                      onClick={() => window.history.back()}
                                      className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                                    >
                                      Retour
                                    </button>
                                  </div>
                                </div>
                              }
                            />
                          </Routes>
                        </Layout>
                      </ProtectedRoute>
                    }
                  />
                </Routes>

                {/* Notifications toast */}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    className: 'bg-card text-card-foreground border',
                    success: {
                      iconTheme: {
                        primary: 'hsl(var(--primary))',
                        secondary: 'hsl(var(--primary-foreground))',
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: 'hsl(var(--destructive))',
                        secondary: 'hsl(var(--destructive-foreground))',
                      },
                    },
                  }}
                />
              </div>
            </Router>
          </AIProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;