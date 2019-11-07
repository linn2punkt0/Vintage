import React from "react";
import styled from "styled-components";

const StyledColumnDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${({ justify }) => justify || "space-between"};
  align-items: ${({ align }) => align || "center"};
  padding: ${({ padding }) => padding || "0px"};
`;

const ColumnDiv = ({ children, justify, align, padding }) => {
  return (
    <StyledColumnDiv justify={justify} align={align} padding={padding}>
      {children}
    </StyledColumnDiv>
  );
};

export default ColumnDiv;
