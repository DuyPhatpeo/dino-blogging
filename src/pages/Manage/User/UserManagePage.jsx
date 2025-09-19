import React from "react";
import DashboardLayout from "@module/Dashboard/DashboardLayout";
import UserManage from "@module/User/UserManage";

const UserManagePage = () => {
  return (
    <DashboardLayout>
      <div className="mt-8">
        <UserManage />
      </div>
    </DashboardLayout>
  );
};

export default UserManagePage;
