// Dropdown.js
import React, { createContext, useState } from "react";
import styled from "styled-components";
import { ChevronDown, ChevronUp } from "lucide-react";

const DropdownContext = createContext();

const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownToggle = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.radius.md};
  padding: 12px 16px;
  background: ${(props) => props.theme.colors.background};
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSize.sm};
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
  transition: all 0.2s linear;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const DropdownList = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.radius.md};
  box-shadow: ${(props) => props.theme.shadow.card};
  z-index: 20;
  max-height: 240px;
  overflow-y: auto;
`;

export function Dropdown({
  placeholder = "Select...",
  children,
  selected,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ onChange, setIsOpen }}>
      <DropdownWrapper>
        <DropdownToggle onClick={() => setIsOpen((prev) => !prev)}>
          <span>{selected?.name || placeholder}</span>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </DropdownToggle>
        {isOpen && <DropdownList>{children}</DropdownList>}
      </DropdownWrapper>
    </DropdownContext.Provider>
  );
}

export { DropdownContext };
