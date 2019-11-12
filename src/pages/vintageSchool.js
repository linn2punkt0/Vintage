import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const StyledVintageSchool = styled.div``;

const VintageSchool = () => {
  return (
    <StyledVintageSchool>
      <Helmet>
        <title>Vintage Sverige: Vintageskola</title>
        <meta
          name="description"
          content="Härkan du bli vintage-expert och lära dig hur du känner igen kläder ifårn olika tidsperioder. "
          data-react-helmet="true"
        />
      </Helmet>
      <h2>
        Här kan du lära dig om hur du känner igen kläder från olika årtionden.
      </h2>
    </StyledVintageSchool>
  );
};

export default VintageSchool;
