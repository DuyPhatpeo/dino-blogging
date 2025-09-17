import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";

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
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    color: ${(props) => props.theme.colors.gray};
    pointer-events: none;
    transition: color 0.25s ease;
  }

  .input-container:focus-within .icon {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const Input = ({ name, control, type = "text", placeholder, icon: Icon }) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <InputWrapper>
      <div className="input-container">
        {Icon && <Icon className="icon" />}
        <input id={name} {...field} type={type} placeholder={placeholder} />
      </div>
    </InputWrapper>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  type: PropTypes.oneOf([
    "text",
    "email",
    "password",
    "number",
    "tel",
    "url",
    "search",
    "date",
    "datetime-local",
    "month",
    "time",
    "week",
  ]),
  placeholder: PropTypes.string,
  icon: PropTypes.elementType,
};

export default Input;
