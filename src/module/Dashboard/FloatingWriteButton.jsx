import React from "react";
import styled from "styled-components";
import Button from "@components/Button/Button";
import { useNavigate } from "react-router-dom";
import { FilePlus } from "lucide-react";

const FloatingButton = styled(Button)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  height: 56px;
  width: 56px;
  border-radius: 50%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background: ${(props) => props.theme.primary};
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    transform: scale(1.08);
    background: ${(props) => props.theme.primaryDark};
  }
`;

const FloatingWriteButton = () => {
  const navigate = useNavigate();
  return (
    <FloatingButton onClick={() => navigate("/manage/add-post")}>
      <FilePlus />
    </FloatingButton>
  );
};

export default FloatingWriteButton;
