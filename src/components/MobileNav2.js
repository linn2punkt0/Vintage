import React from "react";
import styled from "styled-components";
import Headroom from "react-headroom";
import { useMenu } from "../context/menu";

const StyledMobileNav2 = styled.div`
  width: 100%;
  height: 50px;
  background-color: var(--main-accent-color);
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-family: var(--header-font);
    margin-left: 10px;
    color: var(--light-text-color);
    transition: ${props => (props.menuIsOpen ? "opacity 3s ease-in-out" : "0")};
  }

  & > button {
    z-index: 1000;
    & > svg {
      height: 40px;
      width: 40px;
      margin-right: 5px;
    }
  }
`;

const MobileNav2 = () => {
  const { menuIsOpen, setMenuIsOpen } = useMenu();
  return (
    <Headroom style={{ zIndex: 100 }}>
      <StyledMobileNav2 menuIsOpen={menuIsOpen}>
        <h1>Vintage Sverige</h1>
        <button type="button" onClick={() => setMenuIsOpen(!menuIsOpen)}>
          <svg
            viewBox="0 0 25 25"
            width="40"
            height="40"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            fill="var(--light-text-color)"
          >
            <path d="M1.229 15.399c-.764-.781-1.229-1.668-1.229-2.649 0-1.855 1.384-3.451 3.222-3.713 2.864-.415 4.015 2.714 8.742 2.714 4.356 0 5.989-2.694 8.244-2.748 2.126 0 3.792 1.646 3.792 3.749 0 .99-.464 1.879-1.223 2.659 1.316 3.062-3.586 6.589-10.777 6.589-6.52 0-12.24-3.236-10.771-6.601m20.194-1.38c1.205-1.12.393-3.016-1.215-3.016-1.961.138-1.812 2.108-2.812 2.53-.642.271-1.729-.352-2.396-.185-.667.167-.969 1.266-1.765 1.372-.875.117-1.569-.994-2.235-.994-.667 0-1.566.915-2.396.697-.81-.213-.972-1.415-2.465-2.293-1.373-.759-1.771-1.234-2.635-1.114-1.376.197-2.075 1.937-.939 3.001.759-.36 1.62-.349 2.352-.007.858.402 3.407 2.492 7.047 2.492 2.002 0 4.017-.667 5.745-1.644 1-.565 2.041-1.624 3.714-.839m-11.453-4.019c3.383-3.229-.713-3.545.092-5.829-2.833 3.185 1.021 3.269-.092 5.829m2.983-.001c5.084-4.88-1.052-4.622.126-7.999-4.058 4.362 1.511 4.459-.126 7.999" />
          </svg>
        </button>
      </StyledMobileNav2>
    </Headroom>
  );
};

export default MobileNav2;
