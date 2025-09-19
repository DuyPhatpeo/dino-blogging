import React from "react";
import DashboardLayout from "@module/Dashboard/DashboardLayout";
import UserEdit from "@module/dada/UserEdit";

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
