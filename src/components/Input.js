import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  min-height: 40px;
  height: ${({ height }) => height || "40px"};
  min-width: 20em;
  border: solid 1px black;
  border-radius: 5px;
  padding: 10px;
  color: var(--dark-text-color);
  background-color: var(--light-text-color);
  margin: ${({ margin }) => margin || "0 0 1em 0"};
`;

const Input = props => {
  const {
    type,
    onChange,
    id,
    name,
    placeholder,
    height,
    margin,
    value
  } = props;
  return (
    <StyledInput
      type={type}
      onChange={onChange}
      id={id}
      name={name}
      placeholder={placeholder}
      height={height}
      margin={margin}
      value={value}
    />
  );
};

export default Input;
