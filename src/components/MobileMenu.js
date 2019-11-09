import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import firebase from "../firebase";
import { useAuth } from "../context/auth";
import { useMenu } from "../context/menu";

const StyledMenu = styled.div`
  width: 100vw;
  height: ${props => (props.menuIsOpen ? "100vh" : "100%")};
  top: -100vh;
  margin: 0;
  background-color: var(--main-accent-color);
  position: fixed;
  z-index: 2;
  pointer-events: ${props => (props.menuIsOpen ? "all" : "none")};
  transition: 0.5s;
  opacity: ${props => (props.menuIsOpen ? "1" : "0")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: ${props =>
    props.menuIsOpen ? "translateY(100vh)" : "translateY(0vh)"};

  div {
    height: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: var(--light-text-color);
    font-family: var(--title-font);
    font-size: 30px;
    text-decoration: none;
    text-decoration: none;
    color: var(--light-text-color);
  }

  a {
    text-decoration: none;
    color: var(--light-text-color);
  }
`;

const StyledLogo = styled.img`
  width: 200px;
  height: 200px;
`;

const LogoutButton = styled.button`
  border: none;
  background-color: var(--main-accent-color);
  color: var(--light-text-color);

  &:hover {
    cursor: pointer;
  }
`;

const Menu = () => {
  const { authUser } = useAuth();
  const { menuIsOpen, setMenuIsOpen } = useMenu();

  return (
    <StyledMenu menuIsOpen={menuIsOpen}>
      <div>
        <NavLink to="/" onClick={() => setMenuIsOpen(false)}>
          <StyledLogo
            src={menuIsOpen ? "/images/LogoWhite.png" : "/images/LogoTest4.png"}
            alt="logo"
          />
        </NavLink>
        <NavLink to="/event-och-massor" onClick={() => setMenuIsOpen(false)}>
          Events
        </NavLink>
        <NavLink to="/vintageskola" onClick={() => setMenuIsOpen(false)}>
          Vintageskola
        </NavLink>
        <NavLink
          to="/material-och-kladvard"
          onClick={() => setMenuIsOpen(false)}
        >
          Material & Klädvård
        </NavLink>
        <NavLink to="/vintagewiki" onClick={() => setMenuIsOpen(false)}>
          VintageWiki
        </NavLink>
        <NavLink to="/om-vintage-sverige" onClick={() => setMenuIsOpen(false)}>
          Om Vintage Sverige
        </NavLink>
        {!authUser ? (
          <NavLink to="/logga-in" onClick={() => setMenuIsOpen(false)}>
            Logga in
          </NavLink>
        ) : (
          <LogoutButton type="button" onClick={() => firebase.auth().signOut()}>
            Logga ut
          </LogoutButton>
        )}
      </div>
    </StyledMenu>
  );
};

export default Menu;
