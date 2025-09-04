import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";

const InputWrapper = styled.div`
  position: relative;
  width: 100%;

  input {
    width: 100%;
    height: 54px;
    padding: 0 16px 0 48px;
    border-radius: 14px;
    border: 2px solid #e5e7eb;
    background: #ffffffcc;
    font-size: 16px;
    transition: all 0.25s ease;
  }

  input:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
    background: #fff;
    box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.15);
  }

  svg {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    width: 22px;
    height: 22px;
    pointer-events: none;
    transition: color 0.25s ease;
  }

  input:focus ~ svg {
    color: ${(props) => props.theme.primary};
  }

  .error {
    margin-top: 6px;
    font-size: 14px;
    color: #ef4444;
  }
`;

const Input = ({ name, control, type = "text", placeholder, icon: Icon }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <InputWrapper>
      <input id={name} {...field} type={type} placeholder={placeholder} />
      {Icon && <Icon />}
      {error && <span className="error">{error.message}</span>}
    </InputWrapper>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.elementType,
};

export default Input;
