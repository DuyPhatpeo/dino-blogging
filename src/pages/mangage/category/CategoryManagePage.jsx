import React from "react";
import DashboardLayout from "@module/dasboard/DashboardLayout";
import CategoryManage from "@module/category/CategoryManage";

const PostManagePage = () => {
  return (
    <DashboardLayout>
      <div className="mt-8">
        <CategoryManage />
      </div>
    </DashboardLayout>
  );
};

export default PostManagePage;
