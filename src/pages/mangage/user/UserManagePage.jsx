import React from "react";
import DashboardLayout from "@module/dasboard/DashboardLayout";
import UserManage from "@module/user/UserManage";

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
