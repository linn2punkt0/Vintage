import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const StyledSEO = styled.div``;

const SEO = ({ title, description, url }) => {
  return (
    <StyledSEO>
      <Helmet>
        <title>{title}</title>
        {/* Facebook meta */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/images/seo-image.png" />
        <meta property="og:url" content={url} />

        {/* Twitter meta */}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:image" content="/images/seo-image.png" />

        {/* standard meta */}
        <meta property="title" content={title} />
        <meta name="description" content={description} />
      </Helmet>
    </StyledSEO>
  );
};

export default SEO;
