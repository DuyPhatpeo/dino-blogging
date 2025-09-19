import React from "react";
import DashboardLayout from "@module/Dashboard/DashboardLayout";
import CategoryAdd from "@module/dasdas/CategoryAdd";

const CategoryAddPage = () => {
  return (
    <DashboardLayout>
      <div className="mt-8">
        <CategoryAdd />
      </div>
    </DashboardLayout>
  );
};

export default CategoryAddPage;
