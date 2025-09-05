import React from "react";
import styled, { keyframes, css } from "styled-components";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";

const shake = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translateX(-4px); }
  40% { transform: translateX(4px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
  100% { transform: translateX(0); }
`;

const InputWrapper = styled.div`
  width: 100%;

  .input-container {
    position: relative;
    width: 100%;
  }

  input {
    width: 100%;
    height: 54px;
    padding: 0 16px 0 48px; /* chừa chỗ icon */
    border-radius: 14px;
    border: 2px solid #e5e7eb;
    background: #ffffffcc;
    font-size: 16px;
    transition: all 0.25s ease;

    ${(props) =>
      props.$hasError &&
      css`
        border-color: #ef4444;
        animation: ${shake} 0.3s ease;
      `}
  }

  input:hover {
    border-color: #d1d5db;
    background: #fff;
  }

  input:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
    background: #fff;
    box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.15);
  }

  .icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    color: #9ca3af;
    pointer-events: none;
    transition: color 0.25s ease;
  }

  .input-container:focus-within .icon {
    color: ${(props) => props.theme.primary};
  }

  ${(props) =>
    props.$hasError &&
    css`
      .icon {
        color: #ef4444;
      }
    `}

  .error {
    margin-top: 6px;
    font-size: 14px;
    color: #ef4444;
    text-align: left;
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
    <InputWrapper $hasError={!!error}>
      <div className="input-container">
        {Icon && <Icon className="icon" />}
        <input id={name} {...field} type={type} placeholder={placeholder} />
      </div>
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
