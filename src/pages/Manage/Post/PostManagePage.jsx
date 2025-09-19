import React from "react";
import DashboardLayout from "@module/Dashboard/DashboardLayout";
import PostManage from "@module/dasddddd/PostManage";

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
