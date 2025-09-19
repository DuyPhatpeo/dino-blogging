import React from "react";
import DashboardLayout from "@module/Dashboard/DashboardLayout";
import CategoryDelete from "@module/dasdas/CategoryDelete";

const CategoryDeletePage = () => {
  return (
    <DashboardLayout>
      <div className="mt-8">
        <CategoryDelete />
      </div>
    </DashboardLayout>
  );
};

export default CategoryDeletePage;
