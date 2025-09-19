import React from "react";
import DashboardLayout from "@/module/Dasboard/DashboardLayout";
import CategoryDelete from "@/module/Category/CategoryDelete";

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
