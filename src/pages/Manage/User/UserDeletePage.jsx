import React from "react";
import DashboardLayout from "@/module/Dasboard/DashboardLayout";
import UserDelete from "@/module/User/UserDelete";

const UserDeletePage = () => {
  return (
    <DashboardLayout>
      <div className="mt-8">
        <UserDelete />
      </div>
    </DashboardLayout>
  );
};

export default UserDeletePage;
