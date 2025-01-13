import React from "react";

export interface ButtonProps {
  onClick: () => void;
  style: React.CSSProperties;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      style={props.style}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
