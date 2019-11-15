import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import firebase from "../firebase";
import { useAuth } from "../context/auth";

const StyledNav = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 3em;
  font-family: var(--title-font);
  @media only screen and (max-width: 800px) {
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

const LogoutButton = styled.button`
  border: none;
  background-color: var(--bg-color);

  &:hover {
    cursor: pointer;
  }
`;

const Nav = () => {
  const { authUser } = useAuth();

  return (
    <StyledNav>
      <UnderLinedMenu>
        <NavLink to="/event-och-massor">Event</NavLink>
        <NavLink to="/vintageskola">Vintageskola</NavLink>
        <NavLink to="/material-och-kladvard">Material & Klädvård</NavLink>
      </UnderLinedMenu>

      <NavLink to="/">
        <StyledLogo src="/images/LogoTest4.png" alt="logo" />
      </NavLink>

      <UnderLinedMenu>
        <NavLink to="/vintagewiki">VintageWiki</NavLink>
        <NavLink to="/om-vintage-sverige">Om Vintage Sverige</NavLink>
        {!authUser ? (
          <NavLink to="/logga-in">Logga in</NavLink>
        ) : (
          <LogoutButton type="button" onClick={() => firebase.auth().signOut()}>
            Logga ut
          </LogoutButton>
        )}
      </UnderLinedMenu>
    </StyledNav>
  );
};

export default Nav;
