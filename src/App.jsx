import React, { Suspense, lazy } from "react";
import { AuthProvider } from "@contexts/authContext";
import { Route, Routes } from "react-router-dom";

// ✅ Lazy import pages
const HomePage = lazy(() => import("@pages/HomePage"));
const SignUpPage = lazy(() => import("@pages/SignUpPage"));
const SignInPage = lazy(() => import("@pages/SignInPage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage"));

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
