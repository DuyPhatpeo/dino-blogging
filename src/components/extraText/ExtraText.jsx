import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ExtraTextStyles = styled.div`
  margin-top: 25px;
  font-size: 16px;
  color: #374151;

  a {
    color: ${(props) => props.theme.primary};
    font-weight: 600;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const ExtraText = ({ children }) => {
  return <ExtraTextStyles>{children}</ExtraTextStyles>;
};

ExtraText.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ExtraText;
