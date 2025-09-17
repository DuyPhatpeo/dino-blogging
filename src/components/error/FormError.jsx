// @components/error/FormError.jsx
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ErrorText = styled.p`
  color: #ef4444; /* đỏ */
  font-size: 14px;
  margin-top: 6px;
  text-align: left;
`;

const FormError = ({ message }) => {
  if (!message) return null;
  return <ErrorText>{message}</ErrorText>;
};

FormError.propTypes = {
  message: PropTypes.string,
};

export default FormError;
