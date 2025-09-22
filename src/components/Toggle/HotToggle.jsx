// components/Toggle/HotToggle.jsx
import React from "react";
import styled from "styled-components";
import { Flame } from "lucide-react";

const ToggleWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => (props.checked ? "#ef4444" : "#374151")};
  user-select: none;
`;

const ToggleBox = styled.div`
  width: 50px;
  height: 28px;
  border-radius: 9999px;
  background-color: ${(props) => (props.checked ? "#fee2e2" : "#e5e7eb")};
  display: flex;
  align-items: center;
  padding: 4px;
  transition: all 0.3s ease;
`;

const FlameIcon = styled(Flame)`
  width: 20px;
  height: 20px;
  transition: all 0.3s ease;
  color: ${(props) => (props.checked ? "#ef4444" : "#9ca3af")};
  transform: ${(props) =>
    props.checked ? "translateX(22px)" : "translateX(0)"};
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const HotToggle = ({ checked, onChange, label }) => {
  return (
    <ToggleWrapper checked={checked}>
      <HiddenCheckbox type="checkbox" checked={checked} onChange={onChange} />
      <ToggleBox checked={checked}>
        <FlameIcon checked={checked} />
      </ToggleBox>
      {label && <span>{label}</span>}
    </ToggleWrapper>
  );
};

export default HotToggle;
