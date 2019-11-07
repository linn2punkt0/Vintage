import React from "react";
import styled from "styled-components";

const StyledMaterials = styled.div``;

const Materials = () => {
  return (
    <StyledMaterials>
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
