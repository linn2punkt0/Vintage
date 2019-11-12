import React, { useState, useEffect } from "react";
import styled from "styled-components";
import app from "../firebase";
import { useAuth } from "../context/auth";
import AddWiki from "../components/AddWiki";
import SEO from "../components/GlobalComponents/SEO";

const StyledVintageWiki = styled.div``;

const StyledItem = styled.div`
  border: solid 1px black;
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
      <h2>Här kommer det bli en VintageWiki.</h2>
      {wiki.map(item => (
        <StyledItem key={item.id}>
          <h3>{item.name}</h3>
          <h4>{item.description}</h4>
        </StyledItem>
      ))}

      {authUser ? (
        <AddWiki addNewItem={addNewItem} />
      ) : (
        <h4>Logga in för att kunna lägga till nya ord i VintageWikin.</h4>
      )}
    </StyledVintageWiki>
  );
};

export default VintageWiki;
