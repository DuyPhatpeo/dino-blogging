import React from "react";
import styled from "styled-components";
import { useDropdown } from "./dropdown-context";

const OptionItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s ease;
  &:hover {
    background: #f5f5f5;
  }
`;

const Option = ({ value, children }) => {
  const { setSelected, setShow, searchTerm } = useDropdown();

  if (searchTerm && !value.toLowerCase().includes(searchTerm.toLowerCase())) {
    return null;
  }

  const handleClick = () => {
    setSelected(value);
    setShow(false);
  };

  return <OptionItem onClick={handleClick}>{children || value}</OptionItem>;
};

export default Option;
