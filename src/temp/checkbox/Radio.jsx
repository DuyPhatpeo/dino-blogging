import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";

const RadioWrapper = styled.label`
  display: flex;
  align-items: center; /* căn giữa theo trục dọc */
  gap: 8px;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: ${(props) => (props.checked ? "#22c55e" : "#d1d5db")};
  transition: background-color 0.2s ease-in-out;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  background-color: #fff;
  border-radius: 50%;
`;

const LabelText = styled.span`
  line-height: 1; /* giúp chữ không bị tụt */
`;

const Radio = ({ children, control, name, value, ...rest }) => {
  const {
    field: { value: selectedValue, onChange, ...field },
  } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <RadioWrapper>
      <HiddenInput
        type="radio"
        value={value}
        checked={selectedValue === value}
        onChange={() => onChange(value)}
        {...field}
        {...rest}
      />
      <Circle checked={selectedValue === value}>
        {selectedValue === value && <Dot />}
      </Circle>
      <LabelText>{children}</LabelText>
    </RadioWrapper>
  );
};

export default Radio;
