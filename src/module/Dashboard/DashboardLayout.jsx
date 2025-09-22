// DashboardLayout.jsx
import React, { useState } from "react";
import styled from "styled-components";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import FloatingWriteButton from "./FloatingWriteButton";

const LayoutStyles = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f1f5f9;
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

  .footer {
    background: #fff;
    border-top: 1px solid #e5e7eb;
    padding: 16px 24px;
    text-align: center;
    font-size: 0.9rem;
    color: #6b7280;
  }

  @media (min-width: 768px) {
    margin-left: ${(props) => (props.$isSidebarOpen ? "260px" : "0")};
  }
`;

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleMenu = () => setIsSidebarOpen((prev) => !prev);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  return (
    <LayoutStyles $isSidebarOpen={isSidebarOpen}>
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <div className="content">
        <DashboardHeader
          onToggleMenu={handleToggleMenu}
          isSidebarOpen={isSidebarOpen}
        />
        <main className="main">{children}</main>
        <footer className="footer">
          © {new Date().getFullYear()} Dino Dashboard. All rights reserved.
        </footer>
      </div>
      <FloatingWriteButton />
    </LayoutStyles>
  );
};

export default DashboardLayout;
