import React from "react";
import DashboardLayout from "@module/dasboard/DashboardLayout";
import PostManage from "@module/post/PostManage";

const PostManagePage = () => {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-semibold">Quản lý bài viết</h1>
        <p className="text-gray-600 mt-2">
          Trang này hiển thị danh sách bài viết, bạn có thể tìm kiếm, chỉnh sửa
          hoặc xoá.
        </p>

        {/* Table quản lý post */}
        <div className="mt-8">
          <PostManage />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PostManagePage;
