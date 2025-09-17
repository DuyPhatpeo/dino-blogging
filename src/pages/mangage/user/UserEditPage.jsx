import React from "react";
import DashboardLayout from "@module/dasboard/DashboardLayout";
import UserEdit from "@module/User/UserEdit";

const UserEditPage = () => {
  return (
    <DashboardLayout>
      <div className="mt-8">
        <UserEdit />
      </div>
    </DashboardLayout>
  );
};

export default UserEditPage;
