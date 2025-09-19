import React from "react";
import DashboardLayout from "@module/Dashboard/DashboardLayout";
import UserDelete from "@module/dada/UserDelete";

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
