import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Pages
const HomePage = lazy(() => import("@pages/HomePage"));
const SignUpPage = lazy(() => import("@pages/SignUpPage"));
const SignInPage = lazy(() => import("@pages/SignInPage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage"));
const PostByCategory = lazy(() => import("@pages/PostByCategoryPage"));

const PostDetailsPage = lazy(() => import("@pages/PostDetailsPage"));
const DashboardPage = lazy(() => import("@pages/Manage/DashboardPage"));
const MyPost = lazy(() => import("@pages/Manage/Post/MyPostPage"));
const PostManagePage = lazy(() => import("@pages/Manage/Post/PostManagePage"));
const PostAddPage = lazy(() => import("@pages/Manage/Post/PostAddPage"));

const CategoryManagePage = lazy(() =>
  import("@pages/Manage/Category/CategoryManagePage")
);
const CategoryAddPage = lazy(() =>
  import("@pages/Manage/Category/CategoryAddPage")
);
const CategoryEditPage = lazy(() =>
  import("@pages/Manage/Category/CategoryEditPage")
);
const CategoryDeletePage = lazy(() =>
  import("@pages/Manage/Category/CategoryDeletePage")
);
const CategoryViewPage = lazy(() =>
  import("@pages/Manage/Category/CategoryViewPage")
);

const UserManagePage = lazy(() => import("@pages/Manage/User/UserManagePage"));
const UserEditPage = lazy(() => import("@pages/Manage/User/UserEditPage"));
const UserDeletePage = lazy(() => import("@pages/Manage/User/UserDeletePage"));
const UserDetailPage = lazy(() => import("@pages/Manage/User/UserDetailPage"));

const ProfilePage = lazy(() => import("@pages/ProfilePage"));

export default function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/:slug" element={<PostDetailsPage />} />
        <Route path="/category/:slug" element={<PostByCategory />} />

        {/* Dashboard */}
        <Route path="/manage/dashboard" element={<DashboardPage />} />

        {/* Posts */}
        <Route path="/manage/post" element={<PostManagePage />} />
        <Route path="/manage/add-post" element={<PostAddPage />} />
        <Route path="/manage/my-posts" element={<MyPost />} />

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
        <Route
          path="/manage/detail-category/:id"
          element={<CategoryViewPage />}
        />

        {/* Users */}
        <Route path="/manage/user" element={<UserManagePage />} />
        <Route path="/manage/update-user/:id" element={<UserEditPage />} />
        <Route path="/manage/delete-user/:id" element={<UserDeletePage />} />
        <Route path="/manage/detail-user/:id" element={<UserDetailPage />} />

        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Suspense>
  );
}
