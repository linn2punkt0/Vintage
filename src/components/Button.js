import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  min-height: 40px;
  background-color: var(--primary-button-color);
  color: var(--light-text-color);
  border-radius: 5px;
  font-weight: 600;
`;

const Button = props => {
  const { children, onClick } = props;
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
