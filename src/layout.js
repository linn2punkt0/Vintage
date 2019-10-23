import React from "react";
import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import Nav from "./components/Nav";

const StyledLayout = styled.div``;

const Layout = props => {
  const { children } = props;
  return (
    <>
      <GlobalStyle />
      <StyledLayout>
        <Nav />
        <main>{children}</main>
      </StyledLayout>
    </>
  );
};

export default Layout;
