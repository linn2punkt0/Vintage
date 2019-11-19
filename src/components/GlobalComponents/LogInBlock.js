import React from "react";
import styled from "styled-components";

const StyledLogInBlock = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--main-accent-color);
  color: var(--light-text-color);
  border-radius: 5px;
  margin: 10px 0;
`;

const LogInBlock = ({ children }) => {
  return <StyledLogInBlock>{children}</StyledLogInBlock>;
};

export default LogInBlock;
