import React from "react";
import DashboardLayout from "@module/Dashboard/DashboardLayout";
import CategoryView from "@module/Category/CategoryView";

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
