import React from "react";
import DashboardLayout from "@/module/Dasboard/DashboardLayout";
import CategoryView from "@/module/Category/CategoryView";

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
