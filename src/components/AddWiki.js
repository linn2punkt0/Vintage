import React, { useState } from "react";
import styled from "styled-components";
import app from "../firebase";
import { useAuth } from "../context/auth";

const StyledAddWiki = styled.div``;

const AddWiki = () => {
  const db = app.firestore();
  const [wikiWord, setWikiWord] = useState("");
  const [wikiDescription, setWikiDescription] = useState("");
  // eslint-disable-next-line no-unused-vars
  //   const [wikiCategory, setWikiCategory] = useState("");

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

    // Validate and format data here:

    if (authUser) {
      // Add data to firebase here:
      db.collection("vintageWiki")
        .doc(wikiWord)
        .set({
          name: wikiWord,
          description: wikiDescription,
          addedByUser: authUser.email
        })
        .then(function() {
          console.log("Document successfully written!");
          resetForm();
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
  };

  return (
    <StyledAddWiki>
      <input
        type="text"
        name="wikiWord"
        id="wikiWord"
        placeholder="Lägg till nytt ord i VintageWiki"
        value={wikiWord}
        onChange={e => setWikiWord(e.target.value)}
      />
      <input
        type="text"
        name="wikiDescription"
        id="wikiDescription"
        placeholder="Lägg till beskrivning av ordet."
        value={wikiDescription}
        onChange={e => setWikiDescription(e.target.value)}
      />
      <button type="submit" onClick={addNewWiki} disabled={isInvalid}>
        Lägg till
      </button>
    </StyledAddWiki>
  );
};

export default AddWiki;
