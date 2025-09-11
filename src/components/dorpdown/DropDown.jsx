import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { DropdownProvider } from "./dropdown-context";

// Animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const DropdownTrigger = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #e7ecf3;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 8px;
  z-index: 10;
  animation: ${fadeIn} 0.2s ease;
`;

const Icon = styled.svg`
  width: 20px;
  height: 20px;
  transition: transform 0.2s ease;
  transform: ${({ open }) => (open ? "rotate(180deg)" : "rotate(0)")};
`;

const Dropdown = ({ placeholder = "Please select an option", children }) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => setShow((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <DropdownProvider
      value={{
        show,
        setShow,
        selected,
        setSelected,
        searchTerm,
        setSearchTerm,
      }}
    >
      <DropdownWrapper ref={dropdownRef}>
        <DropdownTrigger onClick={handleToggleDropdown}>
          <span>{selected || placeholder}</span>
          <Icon
            open={show}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </Icon>
        </DropdownTrigger>

        {show && <DropdownMenu>{children}</DropdownMenu>}
      </DropdownWrapper>
    </DropdownProvider>
  );
};

export default Dropdown;
