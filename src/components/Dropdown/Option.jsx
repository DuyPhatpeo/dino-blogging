// Option.js
import React, { useContext } from "react";
import styled from "styled-components";
import { DropdownContext } from "./DropDown";
import { CheckSquare, Square } from "lucide-react";

const OptionItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.colors.text};
  transition: all 0.2s linear;
  border-radius: ${(props) => props.theme.radius.sm};
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${(props) => props.theme.colors.grayLight};
    color: ${(props) => props.theme.colors.primary};
  }
`;

export default function Option({ value }) {
  const { onChange, selected, multiple, setIsOpen } =
    useContext(DropdownContext);

  const isSelected = multiple
    ? selected.some((item) => item.id === value.id)
    : selected?.id === value.id;

  const handleClick = () => {
    if (multiple) {
      if (isSelected) {
        onChange(selected.filter((item) => item.id !== value.id));
      } else {
        onChange([...selected, value]);
      }
    } else {
      onChange(value);
      setIsOpen(false);
    }
  };

  return (
    <OptionItem onClick={handleClick}>
      {multiple &&
        (isSelected ? <CheckSquare size={18} /> : <Square size={18} />)}
      {value.name}
    </OptionItem>
  );
}
