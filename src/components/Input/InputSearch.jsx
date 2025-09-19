import React from "react";
import styled from "styled-components";
import { Search } from "lucide-react"; // icon search

const InputSearchStyles = styled.div`
  width: 100%;
  position: relative;

  input {
    width: 100%;
    height: 44px;
    padding: 0 16px 0 42px; /* chừa chỗ cho icon */
    border-radius: ${(props) => props.theme.radius.lg};
    border: 2px solid ${(props) => props.theme.colors.border};
    background: ${(props) => props.theme.colors.background};
    font-size: ${(props) => props.theme.fontSize.base};
    color: ${(props) => props.theme.colors.text};
    transition: all 0.25s ease;
  }

  input:hover {
    border-color: ${(props) => props.theme.colors.grayLight};
    background: #fff;
  }

  input:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    background: #fff;
    box-shadow: 0 0 0 4px rgba(46, 178, 193, 0.2);
  }

  .icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    color: ${(props) => props.theme.colors.gray};
    pointer-events: none;
    transition: color 0.25s ease;
  }

  &:focus-within .icon {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const InputSearch = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <InputSearchStyles>
      <Search className="icon" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </InputSearchStyles>
  );
};

export default InputSearch;
