import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center; /* căn giữa icon + chữ */
  gap: 8px;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Box = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  background-color: ${(props) => (props.checked ? "#22c55e" : "#d1d5db")};
  color: ${(props) => (props.checked ? "#fff" : "transparent")};
`;

const LabelText = styled.span`
  line-height: 1;
`;

const Checkbox = ({ control, name, children, ...rest }) => {
  const {
    field: { value, onChange, ...field },
  } = useController({
    control,
    name,
    defaultValue: false,
  });

  return (
    <CheckboxWrapper>
      <HiddenInput
        type="checkbox"
        checked={!!value}
        onChange={(e) => onChange(e.target.checked)}
        {...field}
        {...rest}
      />
      <Box checked={!!value}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </Box>
      <LabelText>{children}</LabelText>
    </CheckboxWrapper>
  );
};

export default Checkbox;
