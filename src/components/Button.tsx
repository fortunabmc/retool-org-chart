import React from "react";
import { styled } from "styled-components";

import { useTheme } from "../hooks/useTheme";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

type Theme = ReturnType<typeof useTheme>["controls"];
type ThemeProps = { [K in `$${keyof Theme}`]: string };

const StyledButton = styled.button<ThemeProps>`
  background-color: ${(props) => props.$bgColor};
  border: none;
  color: ${(props) => props.$color};
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-family:
    "Inter var",
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    system-ui,
    Segoe UI,
    Roboto,
    Helvetica Neue,
    Ubuntu,
    sans-serif;
  font-size: ${(props) => props.$fontSize};
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.$hoverBgColor};
  }
`;

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  const theme = useTheme();
  const { fontSize, color, bgColor, hoverBgColor } = theme.controls;

  return (
    <StyledButton
      $color={color}
      $bgColor={bgColor}
      $fontSize={fontSize}
      $hoverBgColor={hoverBgColor}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
