import React from "react";
import styled from "styled-components";

const StyledLogInBlock = styled.button`
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
  border: none;

  & > a {
    text-decoration: none;
  }
`;

const LogInBlock = ({ children }) => {
  return <StyledLogInBlock>{children}</StyledLogInBlock>;
};

export default LogInBlock;
