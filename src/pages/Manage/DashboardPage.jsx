// DashboardPage.jsx
import React from "react";
import DashboardLayout from "@module/Dashboard/DashboardLayout";
import DashboardAdmin from "@module/Dashboard/DashboardAdmin";

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <DashboardAdmin />
    </DashboardLayout>
  );
};

export default DashboardPage;
