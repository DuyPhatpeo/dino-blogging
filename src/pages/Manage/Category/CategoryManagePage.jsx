import React from "react";
import DashboardLayout from "@/module/Dasboard/DashboardLayout";
import CategoryManage from "@/module/Category/CategoryManage";

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
