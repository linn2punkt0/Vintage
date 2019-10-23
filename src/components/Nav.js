import React from "react";
import styled from "styled-components";
// import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

const StyledNav = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 3em;
  font-family: var(--title-font);
`;
const StyledLogo = styled.img`
  width: 200px;
  height: 200px;
`;

const UnderLinedMenu = styled.div`
  width: 100%;
  border-bottom: solid 2px black;
  padding-bottom: 2em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
  text-align: center;
`;

const Nav = () => {
  return (
    <StyledNav>
      {/* <BrowserRouter> */}
      <UnderLinedMenu>
        <NavLink to="/vintageskola">Vintageskola</NavLink>
        <NavLink to="/material-och-tvattrad">Material & Tvättråd</NavLink>
      </UnderLinedMenu>

      <NavLink to="/index" as="/">
        <StyledLogo src="/images/LogoTest4.png" alt="logo" />
      </NavLink>

      <UnderLinedMenu>
        <NavLink to="/vintagewiki">VintageWiki</NavLink>
        <NavLink to="/om-vintage-sverige">Om Vintage Sverige</NavLink>
        <NavLink to="/logga-in">Logga in</NavLink>
      </UnderLinedMenu>
      {/* </BrowserRouter> */}
    </StyledNav>
  );
};

export default Nav;
