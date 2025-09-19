import React from "react";
import DashboardLayout from "@module/dasboard/DashboardLayout";
import UserDetail from "@module/User/UserDetail";

const UserDetailPage = () => {
  return (
    <DashboardLayout>
      <div className="mt-8">
        <UserDetail />
      </div>
    </DashboardLayout>
  );
};

export default UserDetailPage;
