import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerStyles = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  display: inline-block;
  animation: ${spin} 1s ease-in-out infinite;

  /* tạo vòng quay gradient */
  background: conic-gradient(
    from 0deg,
    #4facfe,
    #00f2fe,
    #43e97b,
    #38f9d7,
    #4facfe
  );
  mask: radial-gradient(farthest-side, transparent 60%, black 61%);
  -webkit-mask: radial-gradient(farthest-side, transparent 60%, black 61%);

  box-shadow: 0 0 15px rgba(79, 172, 254, 0.6);
`;

const LoadingSpinner = ({ size = "50px" }) => {
  return <SpinnerStyles size={size} />;
};

export default LoadingSpinner;
