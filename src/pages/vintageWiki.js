import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import app from "../firebase";
import { useAuth } from "../context/auth";
import AddWiki from "../components/AddWiki";
import SEO from "../components/GlobalComponents/SEO";
import LogInBlock from "../components/GlobalComponents/LogInBlock";

const StyledVintageWiki = styled.div`
  width: 90vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: 800px) {
    width: 60vw;
  }
`;
const WikiContainer = styled.div`
  border: solid 1px black;
  border-radius: 5px;
  width: 100%;
  height: 50vh;
  overflow: scroll;
`;

const StyledItem = styled.div`
  border-bottom: solid 1px black;
`;

const VintageWiki = () => {
  const db = app.firestore();
  const [wiki, setWiki] = useState([]);

  // Get user if logged in
  const { authUser } = useAuth();

  useEffect(() => {
    const tempArray = [];

    db.collection("vintageWiki")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          tempArray.push({ id: doc.id, ...doc.data() });
        });
        setWiki(tempArray);
      });
  }, []);

  const addNewItem = object => {
    setWiki([...wiki, object]);
  };

  return (
    <StyledVintageWiki>
      <SEO
        title="Vintage Sverige: VintageWiki"
        description="Här kan du lägga till ord och begrepp i vår vintage-ordbok och tillsammans med oss bygga upp en stor kunskapsbank."
        url="http://vintagesverige.se/vintagewiki"
      />
      <h2>VintageWiki - Beta</h2>
      <WikiContainer>
        {wiki.map(item => (
          <StyledItem key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </StyledItem>
        ))}
      </WikiContainer>
      {authUser ? (
        <AddWiki addNewItem={addNewItem} />
      ) : (
        <LogInBlock>
          <NavLink to="/logga-in">
            <h4>Logga in för att kunna lägga till nya ord i VintageWikin.</h4>
          </NavLink>
        </LogInBlock>
      )}
    </StyledVintageWiki>
  );
};

export default VintageWiki;
