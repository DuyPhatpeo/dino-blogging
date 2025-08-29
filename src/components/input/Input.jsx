import React, { useState } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const InputStyles = styled.input`
  width: 100%;
  padding: 12px 40px 12px 15px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 14px;
  background-color: #f3f4f6;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${(props) => props.theme.primary};
    background-color: white;
    outline: none;
    box-shadow: 0 0 0 3px ${(props) => props.theme.primary + "33"};
  }
`;

const ToggleIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #6b7280;
  font-size: 18px;

  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;

const Input = ({ type = "text", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  if (type === "password") {
    return (
      <InputWrapper>
        <InputStyles type={showPassword ? "text" : "password"} {...props} />
        <ToggleIcon onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </ToggleIcon>
      </InputWrapper>
    );
  }

  return <InputStyles type={type} {...props} />;
};

export default Input;
