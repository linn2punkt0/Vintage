import React from "react";
import styled from "styled-components";
import { useMenu } from "../context/menu";

const StyledBurger = styled.nav`
  width: 56px;
  height: 56px;
  background-color: var(--main-accent-color);
  border-radius: 50px;
  position: fixed;
  /* top: 5vh;
  right: 5vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
  @media only screen and (max-width: 800px) {
    top: 2vh;
    right: 2vh;
  }
  /* @media only screen and (min-width: 800px) {
    display: none;
  } */

  button {
    z-index: 1000;
    background: none;
    border: none;
    width: 100%;
    height: 100%;
    padding: 0;
    width: 60px;
    height: 45px;
    position: relative;
    transform: rotate(0deg) scale(0.5);
    transition: 0.5s ease-in-out;
    cursor: pointer;
    background: none;
    border: none;
  }

  span {
    background-color: var(--main-font-color);
  }

  button :focus {
    outline: 0;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-tap-highlight-color: transparent;
  }

  button span {
    display: block;
    position: absolute;
    height: 4px;
    width: 100%;
    background: white;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
  }
  button span:nth-child(1) {
    top: ${props => (props.menuIsOpen ? "18px" : "0px")};
    width: ${props => (props.menuIsOpen ? "0%" : "100%")};
    left: ${props => (props.menuIsOpen ? "50%" : "0")};
  }

  button span:nth-child(2) {
    top: 18px;
    transform: ${props =>
      props.menuIsOpen ? "rotate(45deg)" : "rotate(0deg)"};
  }
  button span:nth-child(3) {
    top: 18px;
    transform: ${props =>
      props.menuIsOpen ? "rotate(-45deg)" : "rotate(0deg)"};
  }

  button span:nth-child(4) {
    top: ${props => (props.menuIsOpen ? "18px" : "36px")};
    width: ${props => (props.menuIsOpen ? "0%" : "100%")};
    left: ${props => (props.menuIsOpen ? "50%" : "0")};
  }
`;

const Burger = () => {
  const { menuIsOpen, setMenuIsOpen } = useMenu();
  return (
    <StyledBurger menuIsOpen={menuIsOpen}>
      <button
        aria-label="menu"
        type="button"
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      >
        <span /> <span /> <span /> <span />
      </button>
    </StyledBurger>
  );
};

export default Burger;
