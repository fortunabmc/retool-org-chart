import React from "react";
import { styled } from "styled-components";

type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

const ErrorContainer = styled.div`
  display: flex;
  margin: 0 50px;
  font-family: "Inter var", Inter, system-ui;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #f8d7da;
  color: #721c24;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ErrorDetails = styled.pre`
  color: #721c24;
  font-size: 1.2rem;
`;

const RetryButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #f5c6cb;
  color: #721c24;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #f1b0b7;
  }
`;

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary
}) => {
  return (
    <ErrorContainer>
      <ErrorMessage>An Error has Occurred:</ErrorMessage>
      <ErrorDetails>{error.message}</ErrorDetails>
      <RetryButton onClick={() => resetErrorBoundary()}>Retry</RetryButton>
    </ErrorContainer>
  );
};

export default ErrorFallback;
