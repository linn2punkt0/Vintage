import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  min-height: 40px;
  width: 10em;
  background-color: var(--primary-button-color);
  color: var(--light-text-color);
  border-radius: 5px;
  font-weight: 600;
  border: none;

  -webkit-transform: skew(-20deg);
  -moz-transform: skew(-20deg);
  -o-transform: skew(-20deg);
  transform: skew(-20deg);
  /* margin-left: 25px; */

  & > div {
    -webkit-transform: skew(20deg);
    -moz-transform: skew(20deg);
    -o-transform: skew(20deg);
    transform: skew(20deg);
  }
`;

const Button = props => {
  const { children, onClick } = props;
  return (
    <StyledButton onClick={onClick}>
      <div>{children}</div>
    </StyledButton>
  );
};

export default Button;
