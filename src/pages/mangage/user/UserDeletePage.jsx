import React from "react";
import DashboardLayout from "@module/dasboard/DashboardLayout";
import UserDelete from "@module/user/UserDelete";

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
