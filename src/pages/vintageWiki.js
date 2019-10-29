import React, { useState, useEffect } from "react";
import styled from "styled-components";
import app from "../firebase";
import { useAuth } from "../context/auth";
import AddWiki from "../components/AddWiki";

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
          tempArray.push(doc.data());
        });
        setWiki(tempArray);
      });
  }, []);

  return (
    <StyledVintageWiki>
      <h2>Här kommer det bli en VintageWiki.</h2>
      {wiki.map(item => (
        <StyledItem key={item}>
          <h3>{item.name}</h3>
          <h4>{item.description}</h4>
        </StyledItem>
      ))}

      {authUser ? (
        <AddWiki />
      ) : (
        <h4>Logga in för att kunna lägga till nya ord i VintageWikin.</h4>
      )}
    </StyledVintageWiki>
  );
};

export default VintageWiki;
