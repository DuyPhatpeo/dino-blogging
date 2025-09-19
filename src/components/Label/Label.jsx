import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LabelStyles = styled.label`
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  display: inline-block;
  margin-top: 6px;
`;

const Label = ({ htmlFor, children }) => {
  return <LabelStyles htmlFor={htmlFor}>{children}</LabelStyles>;
};

Label.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Label;
