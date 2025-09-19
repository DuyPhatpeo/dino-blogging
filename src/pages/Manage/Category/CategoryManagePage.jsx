import React from "react";
import DashboardLayout from "@module/Dashboard/DashboardLayout";
import CategoryManage from "@module/dasdas/CategoryManage";

const CategoryManagePage = () => {
  return (
    <DashboardLayout>
      <div className="mt-8">
        <CategoryManage />
      </div>
    </DashboardLayout>
  );
};

export default CategoryManagePage;
