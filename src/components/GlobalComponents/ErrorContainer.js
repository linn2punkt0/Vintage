import React from "react";
import styled from "styled-components";

const StyledErrorContainer = styled.div`
  width: 80%;
  min-height: 40px;
  border: solid 1px red;
  border-radius: 5px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--light-text-color);
  color: var(--dark-text-color);
`;

const ErrorContainer = ({ children }) => {
  return <StyledErrorContainer>{children}</StyledErrorContainer>;
};

export default ErrorContainer;
