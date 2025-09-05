import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LabelStyles = styled.label`
  font-size: 15px;
  font-weight: 600;
  color: #374151;
`;

const Label = ({ htmlFor, children }) => {
  return <LabelStyles htmlFor={htmlFor}>{children}</LabelStyles>;
};

Label.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Label;
