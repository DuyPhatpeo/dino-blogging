import React from "react";
import DashboardLayout from "@module/dasboard/DashboardLayout";
import CategoryDelete from "@/module/category/CategoryDelete";

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
