import React, { useState, useEffect } from "react";
import styled from "styled-components";
import imageUrlBuilder from "@sanity/image-url";
import client from "../sanityClient";
// import { getData } from "../sanityFunctions";
import SEO from "../components/GlobalComponents/SEO";

const StyledAbout = styled.div`
  width: 90vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  @media only screen and (min-width: 800px) {
    width: 60vw;
  }
`;

const StyledAboutSiteBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 2em;
  /* margin: 2em; */
  /* border: solid 1px black;
  border-radius: 5px; */
`;

const StyledContributorsBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 2em;
  margin: 2em;
  /* border: solid 1px black;
  border-radius: 5px; */
  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const StyledContributor = styled.div`
  width: 25vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 1em;
  /* border: solid 1px black; */
  border-radius: 5px;
  box-shadow: 0px 0px 3px 3px lightgrey;
  @media only screen and (max-width: 800px) {
    width: 100%;
  }

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
  const [contributors, setContributors] = useState([]);

  // Get a pre-configured url-builder from your sanity client
  const builder = imageUrlBuilder(client);

  // Then we like to make a simple function like this that gives the
  // builder an image and returns the builder for you to specify additional
  // parameters:
  function urlFor(source) {
    return builder.image(source);
  }

  // Sanity query
  const query = '*[_type == "contributors"]';

  // Fetch all contributors from Sanity API and setContributor
  // useEffect(() => {
  //   const fetchContributors = async () => {
  //     const response = await getData(query);
  //     setContributors(response);
  //   };
  //   fetchContributors();
  // }, []);

  // Get Sanity Posts via netlify functions
  const getContributors = () => {
    const tempArray = [];
    fetch(`/.netlify/functions/sanity?input=${query}`, {
      headers: { accept: "Accept: application/json" }
    })
      .then(response => response.json())
      .then(data => {
        data.msg.result.forEach(contributor => {
          tempArray.push(contributor);
        });
        setContributors([...tempArray]);
      });
  };

  useEffect(() => {
    getContributors();
  }, []);

  return (
    <StyledAbout>
      <SEO
        title="Vintage Sverige: Om sidan"
        description="Här kan du läsa mer om Vintage Sverige."
        url="http://vintagesverige.se/om-vintage-sverige"
      />

      {/* <h2>Om Vintage Sverige</h2> */}
      <StyledAboutSiteBlock>
        <h2>Om Vintage Sverige</h2>
        {/* <h3>Om</h3> */}
        <p>
          Vintage Sverige är en hemsida för dig som älskar Vintage, vill lära
          dig mer om det och hitta event och mässor där du kan njuta av vackra
          kläder och träffa likasinnade.
        </p>
        <h3>Byggarbetsplats</h3>
        <p>
          Sidan är under konstruktion och därför kommer tyvärr inte alla sidor i
          menyn att ha något innehåll ännu, men finns där för att visa på vad
          som komma skall. I första releasen kommer denna sida ha fokus på att
          ni som användare ska kunna lägga till och hitta event. Det finns även
          en Beta-version av VintageWiki, en ordlista för allt som har med
          Vintage att göra, denna ska förfinas och kommer i framtiden innehålla
          mer än bara en beskrivning om varje ord.
        </p>
        <h3>Hjälpa till?</h3>
        <p>
          Har du ideér på grejer som skulle kunna bli bättre på sidan eller vill
          du kanske bidra med innehåll så som artiklar, text till Vintageskolan
          eller en bloggpost? Kontakta mig så ska vi kika på om det är något vi
          kan lösa!
        </p>
      </StyledAboutSiteBlock>
      <h2>Vi som bidrar till Vintage Sverige</h2>
      <StyledContributorsBlock>
        {contributors &&
          contributors.map(contributor => (
            <StyledContributor key={contributor.name}>
              {contributor.portrait && (
                <img src={urlFor(contributor.portrait.asset)} alt="profile" />
              )}
              <h3>{contributor.name}</h3>
              <h4>{contributor.title}</h4>
              <p>{contributor.personal}</p>
              <p>
                {contributor.website && (
                  <a href={contributor.website}>Hemsida</a>
                )}
              </p>
              <p>
                {contributor.instagram && (
                  <a href={contributor.instagram}>Instagram</a>
                )}
              </p>
            </StyledContributor>
          ))}
      </StyledContributorsBlock>
    </StyledAbout>
  );
};

export default About;
