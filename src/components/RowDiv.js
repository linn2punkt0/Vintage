import React from "react";
import styled from "styled-components";

const StyledRowDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${({ justify }) => justify || "space-between"};
  align-items: ${({ align }) => align || "center"};
  padding: ${({ padding }) => padding || "0px"};
`;

const RowDiv = ({ children, justify, align, padding }) => {
  return (
    <StyledRowDiv justify={justify} align={align} padding={padding}>
      {children}
    </StyledRowDiv>
  );
};

export default RowDiv;
