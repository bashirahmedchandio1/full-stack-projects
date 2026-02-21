import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Homepage from "./components/homepage-ui";
import LoginPage from "./components/login-page";
import SignupPage from "./components/signup-page";
import Dashboard from "./components/dashboard";
import TransactionsPage from "./components/transactions-page";
import SettingsPage from "./components/settings-page";
import ChatbotPage from "./components/chatbot-page";
import FloatingCalculator from "./components/floating-calculator";
import { useAuthStore } from "./store/auth-store";

// Loading Screen Component
const LoadingScreen = () => (
  <div className="min-h-screen bg-bg-warm flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

// Redirect if Authenticated
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) return <LoadingScreen />;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
};

export const App = () => {
  const { checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route
          path="/login"
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <AuthRoute>
              <SignupPage />
            </AuthRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <TransactionsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-assistant"
          element={
            <ProtectedRoute>
              <ChatbotPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <FloatingCalculator />
    </>
  );
};
