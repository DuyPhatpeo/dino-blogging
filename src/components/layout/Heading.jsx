import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const HeadingStyles = styled.h2`
  color: ${(props) =>
    props.$color ||
    props.theme.colors.secondary}; /* đổi mặc định -> secondary */
  font-size: ${(props) => props.theme.fontSize.xl};
  font-weight: 700;
  position: relative;
  margin-bottom: 30px;
  display: inline-block;
  text-align: ${(props) => props.$align || "left"};

  &::before {
    content: "";
    width: 36px;
    height: 4px;
    background-color: ${(props) =>
      props.$lineColor || props.theme.colors.primary};
    position: absolute;
    top: -10px;
    left: 0;
    border-radius: 2px;
  }
`;

const Heading = ({ className = "", children, color, lineColor, align }) => {
  return (
    <HeadingStyles
      className={className}
      $color={color}
      $lineColor={lineColor}
      $align={align}
    >
      {children}
    </HeadingStyles>
  );
};

Heading.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  lineColor: PropTypes.string,
  align: PropTypes.oneOf(["left", "center", "right"]),
};

export default Heading;
