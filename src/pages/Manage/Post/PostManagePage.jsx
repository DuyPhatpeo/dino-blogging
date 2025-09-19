import React from "react";
import DashboardLayout from "@/module/Dasboard/DashboardLayout";
import PostManage from "@/module/Post/PostManage";

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
