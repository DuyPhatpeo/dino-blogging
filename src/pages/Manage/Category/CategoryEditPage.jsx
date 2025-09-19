import React from "react";
import DashboardLayout from "@module/Dashboard/DashboardLayout";
import CategoryEdit from "@module/Category/CategoryEdit";

const CategoryEditPage = () => {
  return (
    <DashboardLayout>
      <div className="mt-8">
        <CategoryEdit />
      </div>
    </DashboardLayout>
  );
};

export default CategoryEditPage;
