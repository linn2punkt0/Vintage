import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  height: ${({ height }) => height || "25px"};
  width: ${({ width }) => width || "25px"};
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  border: 1px solid black;
  border-radius: 4px;
  outline: none;
  transition-duration: 0.3s;
  background-color: var(--light-text-color);
  cursor: pointer;
  margin: ${({ margin }) => margin || "0"};

  &:checked {
    border: 1px solid black;
    background-color: ${({ checkedColor }) =>
      checkedColor || "var(--secondary-button-color)"};
  }
`;

const CheckBoxInput = props => {
  const {
    type,
    onChange,
    id,
    name,
    placeholder,
    height,
    width,
    margin,
    value,
    checkedColor,
    checked
  } = props;
  return (
    <StyledInput
      type={type}
      onChange={onChange}
      id={id}
      name={name}
      placeholder={placeholder}
      height={height}
      width={width}
      margin={margin}
      value={value}
      checkedColor={checkedColor}
      checked={checked}
    />
  );
};

export default CheckBoxInput;
