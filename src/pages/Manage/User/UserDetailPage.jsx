import React from "react";
import DashboardLayout from "@module/Dashboard/DashboardLayout";
import UserDetail from "@module/dada/UserDetail";

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
