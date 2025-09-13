import React, { Suspense, lazy } from "react";
import { AuthProvider } from "@contexts/authContext";
import { Route, Routes } from "react-router-dom";
import LoadingSpinner from "@components/loading/LoadingSpinner";

const HomePage = lazy(() => import("@pages/HomePage"));
const SignUpPage = lazy(() => import("@pages/SignUpPage"));
const SignInPage = lazy(() => import("@pages/SignInPage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage"));

const PostDetailsPage = lazy(() => import("@pages/PostDetailsPage"));
const DashboardPage = lazy(() => import("@pages/mangage/DashboardPage"));
const PostManagePage = lazy(() => import("@pages/mangage/post/PostManagePage"));
const PostAddPage = lazy(() => import("@/pages/mangage/post/PostAddPage"));

const CategoryManagePage = lazy(() =>
  import("@pages/mangage/category/CategoryManagePage")
);
const CategoryAddPage = lazy(() =>
  import("@pages/mangage/category/CategoryAddPage")
);
const CategoryEditPage = lazy(() =>
  import("@pages/mangage/category/CategoryEditPage")
);

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

          <Route path="/manage/post" element={<PostManagePage />} />
          <Route path="/manage/add-post" element={<PostAddPage />} />

          <Route path="/manage/category" element={<CategoryManagePage />} />
          <Route path="/manage/add-category" element={<CategoryAddPage />} />
          <Route
            path="/manage/update-category/:id"
            element={<CategoryEditPage />}
          />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
