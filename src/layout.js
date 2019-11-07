import React from "react";
import styled from "styled-components";
// import { useMenu } from "./context/menu";
import GlobalStyle from "./styles/GlobalStyle";
import DesktopNav from "./components/DesktopNav";
import Menu from "./components/MobileMenu";
import MobileNav from "./components/MobileNav";
// import MobileNav2 from "./components/MobileNav2";
// import Burger from "./components/Burger";

const StyledLayout = styled.div``;

const Layout = props => {
  const { children } = props;

  return (
    <>
      <GlobalStyle />
      <StyledLayout>
        {/* <MobileNav2 /> */}
        <DesktopNav />
        <MobileNav />
        <Menu />
        <main>{children}</main>
      </StyledLayout>
    </>
  );
};

export default Layout;
