import React from "react";
import styled from "styled-components";

const LabelStyles = styled.label`
  font-size: 15px;
  font-weight: 600;
  color: #374151;
`;

const Label = ({ htmlFor, children }) => {
  return <LabelStyles htmlFor={htmlFor}>{children}</LabelStyles>;
};

export default Label;
