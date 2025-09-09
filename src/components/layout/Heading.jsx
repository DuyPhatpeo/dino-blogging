import React from "react";
import styled from "styled-components";

const HeadingStyles = styled.h2`
  color: ${(props) => props.theme.tertiary};
  font-size: 28px;
  font-weight: 700;
  position: relative;
  margin-bottom: 30px;
  display: inline-block; /* để gạch bám theo text */

  &::before {
    content: "";
    width: 36px;
    height: 4px;
    background-color: ${(props) => props.theme.accent};
    position: absolute;
    top: -10px; /* đặt gạch phía trên chữ */
    left: 0;
    border-radius: 2px;
  }
`;

const Heading = ({ className = "", children }) => {
  return <HeadingStyles className={className}>{children}</HeadingStyles>;
};

export default Heading;
