import React, { Suspense, lazy } from "react";
import { AuthProvider } from "@contexts/authContext";
import { Route, Routes } from "react-router-dom";
import LoadingSpinner from "@components/loading/LoadingSpinner";

const HomePage = lazy(() => import("@pages/HomePage"));
const SignUpPage = lazy(() => import("@pages/SignUpPage"));
const SignInPage = lazy(() => import("@pages/SignInPage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage"));

const PostDetailsPage = lazy(() => import("@pages/PostDetailsPage"));
const DashboardPage = lazy(() => import("@pages/DashboardPage"));

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #f0f4ff, #e0f7fa)",
            }}
          >
            <LoadingSpinner size="70px" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/:slug" element={<PostDetailsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
