import React from "react";
import DashboardLayout from "@module/dasboard/DashboardLayout";
import PostManage from "@module/post/PostManage";

const PostManagePage = () => {
  return (
    <DashboardLayout>
      <div className="mt-8">
        <PostManage />
      </div>
    </DashboardLayout>
  );
};

export default PostManagePage;
