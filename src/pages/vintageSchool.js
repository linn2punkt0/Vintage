import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const StyledVintageSchool = styled.div``;

const VintageSchool = () => {
  return (
    <StyledVintageSchool>
      <Helmet>
        <title>Vintage Sverige: Vintageskola</title>

        {/* Facebook meta */}
        <meta property="og:title" content="Vintage Sverige: Vintageskola" />
        <meta
          property="og:description"
          content="Här kan du bli vintage-expert och lära dig hur du känner igen kläder ifårn olika tidsperioder."
        />
        <meta property="og:image" content="/images/logoTest4.png" />
        <meta
          property="og:url"
          content="http://vintagesverige.se/vintageskola"
        />

        {/* Twitter meta */}
        <meta name="twitter:title" content="Vintage Sverige: Vintageskola" />
        <meta
          name="twitter:description"
          content="Här kan du bli vintage-expert och lära dig hur du känner igen kläder ifårn olika tidsperioder."
        />
        <meta
          name="twitter:url"
          content="http://vintagesverige.se/vintageskola"
        />
        <meta name="twitter:image" content="/images/logoTest4.png" />

        {/* standard meta */}
        <meta property="title" content="Vintage Sverige: Vintageskola" />
        <meta
          name="description"
          content="Här kan du bli vintage-expert och lära dig hur du känner igen kläder ifårn olika tidsperioder."
        />
      </Helmet>
      <h2>
        Här kan du lära dig om hur du känner igen kläder från olika årtionden.
      </h2>
    </StyledVintageSchool>
  );
};

export default VintageSchool;
