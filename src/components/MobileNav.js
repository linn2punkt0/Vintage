import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Burger from "./Burger";

const StyledNav = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 3em;
  font-family: var(--title-font);
  @media only screen and (min-width: 800px) {
    display: none;
  }
  a {
    text-decoration: none;
  }
`;

const StyledLogo = styled.img`
  width: 200px;
  height: 200px;
`;

const MobileNav = () => {
  return (
    <StyledNav>
      <NavLink to="/">
        <StyledLogo src="/images/Logo.png" alt="logo" />
      </NavLink>
      <Burger />
    </StyledNav>
  );
};

export default MobileNav;
