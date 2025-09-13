import React from "react";
import DashboardLayout from "@module/dasboard/DashboardLayout";
import CategoryAdd from "@/module/category/CategoryAdd";

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
