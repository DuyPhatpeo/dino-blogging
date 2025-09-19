import React from "react";
import DashboardLayout from "@/module/Dasboard/DashboardLayout";
import CategoryAdd from "@/module/Category/CategoryAdd";

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
