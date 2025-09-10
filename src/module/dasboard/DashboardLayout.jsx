import React from "react";
import styled from "styled-components";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

const LayoutStyles = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f1f5f9; /* slate-100 */

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .main {
    flex: 1;
    padding: 24px;
  }
`;

const DashboardLayout = ({ children }) => {
  return (
    <LayoutStyles>
      <Sidebar />
      <div className="content">
        <DashboardHeader />
        <main className="main">{children}</main>
      </div>
    </LayoutStyles>
  );
};

export default DashboardLayout;
