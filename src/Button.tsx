import React from "react";
import styled from "styled-components";

import { useTheme } from "./useTheme";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  const theme = useTheme();
  const { color, bgColor, hoverBgColor } = theme.controls;

  const StyledButton = styled.button`
    background-color: ${bgColor};
    border: none;
    color: ${color};
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${hoverBgColor};
    }
  `;

  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
