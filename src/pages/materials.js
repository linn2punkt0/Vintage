import React from "react";
import styled from "styled-components";
import SEO from "../components/GlobalComponents/SEO";

const StyledMaterials = styled.div`
  @media only screen and (min-width: 800px) {
    width: 60vw;
    margin: auto;
  }
`;

const Materials = () => {
  return (
    <StyledMaterials>
      <SEO
        title="Vintage Sverige: Material & Klädvård"
        description="Här kan du läsa om olika material och hur du bäst tar hand om dina vintage-kläder."
        url="http://vintagesverige.se/material-och-kladvard"
      />
      <h2>Här kan du läsa på om material och skötselråd.</h2>

      <h3>Materialguide</h3>
      <p>
        Här ska det finnas bild på materialet, beskrivning/info, och råd om hur
        man tvättar och sköter om det på bästa sätt.
      </p>
      <h3>Klädvård</h3>
      <p>
        Här ska det finnas andra råd kring hur du tar hand om dina kläder, lagar
        dem m.m.
      </p>
    </StyledMaterials>
  );
};

export default Materials;
