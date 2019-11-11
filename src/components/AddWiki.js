import React, { useState } from "react";
import styled from "styled-components";
import app from "../firebase";
import { useAuth } from "../context/auth";
import Button from "./GlobalComponents/Button";
import Input from "./GlobalComponents/Input";

const StyledAddWiki = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const StyledWikiForm = styled.div`
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 2em;
  margin: 2em;
  border: solid 1px black;
  border-radius: 5px;
`;

const AddWiki = ({ addNewItem }) => {
  const db = app.firestore();
  const [wikiWord, setWikiWord] = useState("");
  const [wikiDescription, setWikiDescription] = useState("");
  // eslint-disable-next-line no-unused-vars

  // Get user if logged in
  const { authUser } = useAuth();

  const resetForm = () => {
    setWikiWord("");
    setWikiDescription("");
  };

  // If any fields are empty disable submit-button
  const isInvalid = wikiWord === "" || wikiDescription === "";

  const addNewWiki = async e => {
    e.preventDefault();

    if (authUser) {
      // Add data to firebase here:
      db.collection("vintageWiki")
        .doc(wikiWord)
        .set({
          name: wikiWord.charAt(0).toUpperCase() + wikiWord.slice(1),
          description: wikiDescription,
          addedByUser: authUser.email
        })
        .then(function() {
          console.log("Document successfully written!");
          resetForm();
          addNewItem({
            name: wikiWord.charAt(0).toUpperCase() + wikiWord.slice(1),
            description: wikiDescription,
            addedByUser: authUser.email,
            id: wikiWord
          });
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
  };

  return (
    <StyledAddWiki>
      <StyledWikiForm>
        <h3>Lägg till ett nytt ord:</h3>
        <Input
          type="text"
          name="wikiWord"
          id="wikiWord"
          placeholder="Lägg till nytt ord i VintageWiki"
          value={wikiWord}
          onChange={e => setWikiWord(e.target.value)}
        />
        <Input
          type="text"
          name="wikiDescription"
          id="wikiDescription"
          placeholder="Lägg till beskrivning av ordet."
          value={wikiDescription}
          onChange={e => setWikiDescription(e.target.value)}
          height="100px"
        />
        <Button type="submit" onClick={addNewWiki} disabled={isInvalid}>
          Lägg till
        </Button>
      </StyledWikiForm>
    </StyledAddWiki>
  );
};

export default AddWiki;
