import React, { type CSSProperties } from "react";
import { styled } from "styled-components";

import type { DollarProps } from "../lib/types";

type NodeProps = {
  children: React.ReactNode;
};

type WrapperProps = Pick<CSSProperties, "justifyContent" | "flexDirection">;

const FlexWrapper = styled.div<DollarProps<WrapperProps>>`
  display: flex;
  flex-direction: ${(props) => props.$flexDirection ?? "row"};
  justify-content: ${(props) => props.$flexDirection};
`;

const Wrapper: React.FC<WrapperProps & NodeProps> = ({
  flexDirection,
  children
}) => {
  return <FlexWrapper $flexDirection={flexDirection}>{children}</FlexWrapper>;
};

export default Wrapper;
