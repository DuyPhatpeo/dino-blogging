import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .dashboard-main {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 40px;
    padding: 20px 24px;
    flex: 1;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }

  .dashboard-children {
    background-color: #f9f9f9;
    border-radius: 16px;
    padding: 24px;
    min-height: 600px;
  }
`;

const DashboardLayout = () => {
  return (
    <DashboardStyles>
      <DashboardHeader />
      <div className="dashboard-main">
        <Sidebar />
        <div className="dashboard-children">
          <Outlet />
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashboardLayout;
