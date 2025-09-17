import React from "react";
import styled from "styled-components";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

const LayoutStyles = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f1f5f9; /* slate-100 */
  margin-left: 260px;
  transition: margin-left 0.3s ease;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .main {
    flex: 1;
    padding: 24px;
  }

  /* Responsive */
  @media (max-width: 767px) {
    margin-left: 0; /* sidebar ẩn thì bỏ chừa chỗ */
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
