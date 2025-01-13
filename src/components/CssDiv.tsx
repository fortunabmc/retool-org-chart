import React from "react";

export interface ButtonProps {
  style: React.CSSProperties;
  children: React.ReactNode;
}

const Div: React.FC<ButtonProps> = (props) => {
  return <div style={props.style}>{props.children}</div>;
};

export default Div;
