import React from "react";
import styled from "styled-components";
// import { useMenu } from "./context/menu";
import GlobalStyle from "./styles/GlobalStyle";
import DesktopNav from "./components/DesktopNav";
import Menu from "./components/MobileMenu";
import MobileNav from "./components/MobileNav";
// import Burger from "./components/Burger";

const StyledLayout = styled.div``;

const Layout = props => {
  const { children } = props;
  // const [menuIsOpen, setMenuIsOpen] = useState(false);
  // const { authMenu } = useMenu();

  return (
    <>
      <GlobalStyle />
      <StyledLayout>
        <DesktopNav />
        <MobileNav />
        {/* <Burger menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} /> */}
        <Menu />
        <main>{children}</main>
      </StyledLayout>
    </>
  );
};

export default Layout;
