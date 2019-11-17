import React from "react";
import styled from "styled-components";
import SEO from "../components/GlobalComponents/SEO";

const StyledVintageSchool = styled.div`
  @media only screen and (min-width: 800px) {
    width: 60vw;
    margin: auto;
  }
`;

const VintageSchool = () => {
  return (
    <StyledVintageSchool>
      <SEO
        title="Vintage Sverige: Vintageskola"
        description="Här kan du bli vintage-expert och lära dig hur du känner igen kläder ifårn olika tidsperioder."
        url="http://vintagesverige.se/vintageskola"
      />
      <h2>
        Här kan du lära dig om hur du känner igen kläder från olika årtionden.
      </h2>
    </StyledVintageSchool>
  );
};

export default VintageSchool;
