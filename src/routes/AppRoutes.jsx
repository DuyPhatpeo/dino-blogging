import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "@components/loading/LoadingSpinner";

// Lazy load pages
const HomePage = lazy(() => import("@pages/HomePage"));
const SignUpPage = lazy(() => import("@pages/SignUpPage"));
const SignInPage = lazy(() => import("@pages/SignInPage"));
const PostDetailsPage = lazy(() => import("@pages/PostDetailsPage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage"));

const AppRoutes = () => {
  return (
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
        <Route path="/:slug" element={<PostDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
