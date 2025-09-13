import React from "react";
import DashboardLayout from "@module/dasboard/DashboardLayout";
import CategoryEdit from "@/module/category/CategoryEdit";

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
