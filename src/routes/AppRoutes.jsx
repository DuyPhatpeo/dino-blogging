import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingSpinner from "@components/loading/LoadingSpinner";

// Pages
const HomePage = lazy(() => import("@pages/HomePage"));
const SignUpPage = lazy(() => import("@pages/SignUpPage"));
const SignInPage = lazy(() => import("@pages/SignInPage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage"));

const PostDetailsPage = lazy(() => import("@pages/PostDetailsPage"));
const DashboardPage = lazy(() => import("@pages/mangage/DashboardPage"));
const PostManagePage = lazy(() => import("@pages/mangage/post/PostManagePage"));
const PostAddPage = lazy(() => import("@pages/mangage/post/PostAddPage"));

const CategoryManagePage = lazy(() =>
  import("@pages/mangage/category/CategoryManagePage")
);
const CategoryAddPage = lazy(() =>
  import("@pages/mangage/category/CategoryAddPage")
);
const CategoryEditPage = lazy(() =>
  import("@pages/mangage/category/CategoryEditPage")
);
const CategoryDeletePage = lazy(() =>
  import("@pages/mangage/category/CategoryDeletePage")
);

const UserManagePage = lazy(() => import("@pages/mangage/user/UserManagePage"));
const UserEditPage = lazy(() => import("@pages/mangage/user/UserEditPage"));

export default function AppRoutes() {
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
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/:slug" element={<PostDetailsPage />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Posts */}
        <Route path="/manage/post" element={<PostManagePage />} />
        <Route path="/manage/add-post" element={<PostAddPage />} />

        {/* Categories */}
        <Route path="/manage/category" element={<CategoryManagePage />} />
        <Route path="/manage/add-category" element={<CategoryAddPage />} />
        <Route
          path="/manage/update-category/:id"
          element={<CategoryEditPage />}
        />
        <Route
          path="/manage/delete-category/:id"
          element={<CategoryDeletePage />}
        />

        {/* Users */}
        <Route path="/manage/user" element={<UserManagePage />} />
        <Route path="/manage/update-user/:id" element={<UserEditPage />} />
      </Routes>
    </Suspense>
  );
}
