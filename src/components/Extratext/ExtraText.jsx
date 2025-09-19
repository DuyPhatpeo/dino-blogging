import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ExtraTextStyles = styled.div`
  margin-top: 25px;
  font-size: ${(props) => props.theme.fontSize.base || "16px"};
  color: ${(props) => props.theme.textLight || "#374151"};
  text-align: center;

  a {
    color: ${(props) => props.theme.primary};
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s ease, text-decoration 0.2s ease;
  }

  a:hover {
    text-decoration: underline;
    color: ${(props) => props.theme.primaryHover || props.theme.primary};
  }
`;

const ExtraText = ({ children, className, style }) => {
  return (
    <ExtraTextStyles className={className} style={style}>
      {children}
    </ExtraTextStyles>
  );
};

ExtraText.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default ExtraText;
