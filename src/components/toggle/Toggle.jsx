// src/components/toggle/Toggle.js
import React from "react";
import styled from "styled-components";

const ToggleStyles = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  .toggle-input {
    display: none;
  }

  .toggle-slider {
    width: 48px;
    height: 24px;
    background-color: ${(props) =>
      props.checked
        ? props.theme.colors.primary
        : props.theme.colors.grayLight};
    border-radius: ${(props) => props.theme.radius.full};
    position: relative;
    transition: background-color 0.2s;
  }

  .toggle-dot {
    position: absolute;
    top: 2px;
    left: ${(props) => (props.checked ? "26px" : "2px")};
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
    transition: left 0.2s;
  }

  .toggle-label {
    margin-left: 10px;
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => props.theme.colors.grayDark};
  }
`;

const Toggle = ({ checked, onChange, label }) => {
  return (
    <ToggleStyles checked={checked}>
      <input
        type="checkbox"
        className="toggle-input"
        checked={checked}
        onChange={onChange}
      />
      <div className="toggle-slider">
        <div className="toggle-dot" />
      </div>
      {label && <span className="toggle-label">{label}</span>}
    </ToggleStyles>
  );
};

export default Toggle;
