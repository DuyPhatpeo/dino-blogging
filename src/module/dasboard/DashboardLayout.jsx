import React, { useState } from "react";
import styled from "styled-components";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import FloatingWriteButton from "./FloatingWriteButton";

const LayoutStyles = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f1f5f9; /* slate-100 */
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
    margin-left: 0 !important; /* Trên mobile bỏ margin */
  }
`;

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleMenu = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <LayoutStyles style={{ marginLeft: isSidebarOpen ? 260 : 0 }}>
      <Sidebar isOpen={isSidebarOpen} />
      <div className="content">
        <DashboardHeader onToggleMenu={handleToggleMenu} />
        <main className="main">{children}</main>
      </div>
      <FloatingWriteButton />
    </LayoutStyles>
  );
};

export default DashboardLayout;
