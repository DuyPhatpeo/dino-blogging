// Option.js
import React, { useContext } from "react";
import styled from "styled-components";
import { DropdownContext } from "./Dropdown";

const OptionItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.colors.text};
  transition: all 0.2s linear;
  border-radius: ${(props) => props.theme.radius.sm};

  &:hover {
    background: ${(props) => props.theme.colors.grayLight};
    color: ${(props) => props.theme.colors.primary};
  }
`;

export default function Option({ value }) {
  const { onChange, setIsOpen } = useContext(DropdownContext);

  return (
    <OptionItem
      onClick={() => {
        onChange(value);
        setIsOpen(false);
      }}
    >
      {value.name}
    </OptionItem>
  );
}
