import React, { createContext, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { ChevronDown, ChevronUp, X } from "lucide-react";

const DropdownContext = createContext();

const shake = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translateX(-4px); }
  40% { transform: translateX(4px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
  100% { transform: translateX(0); }
`;

const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownToggle = styled.div`
  width: 100%;
  min-height: 54px;
  padding: 0 16px;
  border-radius: ${(props) => props.theme.radius.lg};
  border: 2px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.background};
  font-size: ${(props) => props.theme.fontSize.base};
  color: ${(props) => props.theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  cursor: pointer;
  transition: all 0.25s ease;

  ${(props) =>
    props.$hasError &&
    css`
      border-color: ${props.theme.colors.error};
      animation: ${shake} 0.3s ease;
    `}

  &:hover {
    border-color: ${(props) => props.theme.colors.grayLight};
    background: #fff;
  }

  &:focus-within {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    background: #fff;
    box-shadow: 0 0 0 4px rgba(46, 178, 193, 0.2);
  }

  div.selected-items {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;

    span {
      background: ${(props) => props.theme.colors.grayLight};
      padding: 2px 6px;
      border-radius: ${(props) => props.theme.radius.sm};
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 4px;

      svg {
        cursor: pointer;
      }
    }
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

export default function Dropdown({
  placeholder = "Select...",
  children,
  selected,
  onChange,
  multiple = false,
  hasError = false, // truyền prop giống Input
}) {
  const [isOpen, setIsOpen] = useState(false);

  const removeItem = (item) => {
    if (multiple) {
      onChange(selected.filter((i) => i.id !== item.id));
    } else {
      onChange(null);
    }
  };

  return (
    <DropdownContext.Provider
      value={{ onChange, selected, setIsOpen, multiple }}
    >
      <DropdownWrapper>
        <DropdownToggle
          onClick={() => setIsOpen((prev) => !prev)}
          $hasError={hasError}
        >
          <div className="selected-items">
            {multiple ? (
              selected && selected.length > 0 ? (
                selected.map((item) => (
                  <span key={item.id}>
                    {item.name}
                    <X
                      size={12}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(item);
                      }}
                    />
                  </span>
                ))
              ) : (
                <span>{placeholder}</span>
              )
            ) : selected ? (
              <span>{selected.name}</span>
            ) : (
              <span>{placeholder}</span>
            )}
          </div>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </DropdownToggle>
        {isOpen && <DropdownList>{children}</DropdownList>}
      </DropdownWrapper>
    </DropdownContext.Provider>
  );
}

export { DropdownContext };
