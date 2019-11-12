import React from "react";
import styled from "styled-components";
// import { Helmet } from "react-helmet";
import SEO from "../components/GlobalComponents/SEO";

const StyledAbout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const StyledAboutSiteBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 2em;
  margin: 2em;
  border: solid 1px black;
  border-radius: 5px;
`;

const StyledContributorsBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 2em;
  margin: 2em;
  border: solid 1px black;
  border-radius: 5px;
`;

const StyledContributor = styled.div`
  width: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 1em;
  border: solid 1px black;
  border-radius: 5px;

  img {
    width: 200px;
    border-radius: 50%;
  }
  h3 {
    margin: 0.5em;
  }
  > * {
    margin: 0.2em;
  }
  a {
    font-weight: 600;
    color: var(--main-accent-color);
  }
`;

const About = () => {
  return (
    <StyledAbout>
      <SEO
        title="Vintage Sverige: Om sidan"
        description="Här kan du läsa mer om Vintage Sverige, TEST SEO COMPONENT"
        url="http://vintagesverige.se/om-vintage-sverige"
      />
      {/* <Helmet>
        <title>Vintage Sverige: Om sidan</title> */}
      {/* Facebook meta */}
      {/* <meta property="og:title" content="Vintage Sverige: Om sidan" />
        <meta
          property="og:description"
          content="Här kan du läsa mer om Vintage Sverige"
        />
        <meta property="og:image" content="/images/logoTest4.png" />
        <meta
          property="og:url"
          content="http://vintagesverige.se/om-vintage-sverige"
        /> */}

      {/* Twitter meta */}
      {/* <meta name="twitter:title" content="Vintage Sverige: Om sidan" />
        <meta
          name="twitter:description"
          content="Här kan du läsa mer om Vintage Sverige"
        />
        <meta
          name="twitter:url"
          content="http://vintagesverige.se/om-vintage-sverige"
        />
        <meta name="twitter:image" content="/images/logoTest4.png" /> */}

      {/* standard meta */}
      {/* <meta property="title" content="Vintage Sverige: Om sidan" />
        <meta
          name="description"
          content="Här kan du läsa mer om Vintage Sverige"
        />
      </Helmet> */}
      <h2>Om Vintage Sverige</h2>
      <StyledAboutSiteBlock>
        <p>
          Vintage Sverige är en hemsida för dig som älskar Vintage, vill lära
          dig mer om det och hitta event och mässor där du kan njuta av vackra
          kläder och träffa likasinnade.
        </p>
        <p>
          Sidan är under konstruktion och därför kommer tyvärr inte alla sidor i
          menyn att ha något innehåll ännu, men finns där för att visa på vad
          som komma skall. I första releasen kommer denna sida ha fokus på att
          ni som användare ska kunna lägga till och hitta event. Det finns även
          en Beta-version av VitnageWiki, en ordlista för allt som har med
          Vintage att göra, denna ska förfinas och kommer i framtiden innehålla
          mer än bara en beskrivning om varje ord.
        </p>
        <p>
          Har du ideér på grejer som skulle kunna bli bättre på sidan eller vill
          du kanske bidra med innehåll så som artiklar, text till Vintageskolan
          eller en bloggpost? Kontakta mig så ska vi kika på om det är något vi
          kan lösa!
        </p>
      </StyledAboutSiteBlock>
      <h2>Vi som bidrar till Vintage Sverige</h2>
      <StyledContributorsBlock>
        <StyledContributor>
          <img src="/images/linn2.jpg" alt="profile" />
          <h3>Linn Johansson</h3>
          <h4>Grundare - Webbutvecklare</h4>
          <p>
            Linn heter jag, pluggar webbutveckling och älskar
            vintage-klänningar. Den här hemsidan är mitt examensarbete.
          </p>
          <p>
            <a href="https://linnjohansson.dev/">Min webbutvecklar-portfolio</a>
          </p>
          <p>
            <a href="https://www.instagram.com/linn2.0/">Min instagram</a>
          </p>
        </StyledContributor>
      </StyledContributorsBlock>
    </StyledAbout>
  );
};

export default About;
