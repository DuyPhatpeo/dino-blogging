import React from "react";
import DashboardLayout from "@module/dasboard/DashboardLayout";
import CategoryView from "@/module/category/CategoryView";

const CategoryViewPage = () => {
  return (
    <DashboardLayout>
      <div className="mt-8">
        <CategoryView />
      </div>
    </DashboardLayout>
  );
};

export default CategoryViewPage;
