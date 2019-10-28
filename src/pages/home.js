import React from "react";
import styled from "styled-components";
import Ribbon from "../components/Ribbon";
import { useAuth } from "../context/auth";

const Styledhome = styled.div``;

const Home = () => {
  const { authUser } = useAuth();
  return (
    <Styledhome>
      <h2>Startsidan</h2>
      {authUser ? <h2>Du är inloggad</h2> : <h2>Du är inte inloggad</h2>}
      <Ribbon />
    </Styledhome>
  );
};

export default Home;
