import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
// import BlockContent from "@sanity/block-content-to-react";
import { useAuth } from "../context/auth";

// const client = require("@sanity/client")({
//   projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
//   dataset: "production",
//   useCdn: true,
//   token: process.env.REACT_APP_SANITY_TOKEN
// });

const Styledhome = styled.div``;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { authUser } = useAuth();

  // Fetch all posts from Sanity API and setPosts
  const query = '*[_type == "post"]';
  const getPosts = async () => {
    fetch(
      `https://${process.env.REACT_APP_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/production?query=${query}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SANITY_TOKEN}`
        }
      }
    )
      .then(response => response.json())
      .then(data =>
        data.result.forEach(post => {
          setPosts([...posts, post]);
        })
      );
  };

  useEffect(() => {
    getPosts();
  }, []);

  // const serializers = {
  //   types: {
  //     code: props => (
  //       <pre data-language={props.node.language}>
  //         <code>{props.node.code}</code>
  //       </pre>
  //     )
  //   }
  // };

  // client.fetch('*[_type == "post"][0]').then(post => {
  //   ReactDOM.render(
  //     <BlockContent blocks={post.body} serializers={serializers} />,
  //     document.getElementById("root")
  //   );
  // });

  console.log(posts);

  return (
    <Styledhome>
      <Helmet>
        <title>Vintage Sverige</title>
        {/* Facebook meta */}
        <meta property="og:title" content="Vintage Sverige" />
        <meta
          property="og:description"
          content="Vintage Sverige är en sida för dig som älskar vintage och vill hjälpa till att samla kunskap på ett ställe. Här kan du tipsa om och leta efter event, mässor, tvättråd m.m."
        />
        <meta property="og:image" content="/images/logoTest4.png" />
        <meta property="og:url" content="http://vintagesverige.se/" />

        {/* Twitter meta */}
        <meta name="twitter:title" content="Vintage Sverige" />
        <meta
          name="twitter:description"
          content="Vintage Sverige är en sida för dig som älskar vintage och vill hjälpa till att samla kunskap på ett ställe. Här kan du tipsa om och leta efter event, mässor, tvättråd m.m."
        />
        <meta name="twitter:url" content="http://vintagesverige.se" />
        <meta name="twitter:image" content="/images/logoTest4.png" />

        {/* standard meta */}
        <meta property="title" content="Vintage Sverige" />
        <meta
          name="description"
          content="Vintage Sverige är en sida för dig som älskar vintage och vill hjälpa till att samla kunskap på ett ställe. Här kan du tipsa om och leta efter event, mässor, tvättråd m.m."
        />
      </Helmet>
      <h2>Startsidan</h2>
      {authUser ? <h2>Du är inloggad</h2> : <h2>Du är inte inloggad</h2>}
      {posts.map(post => (
        <div key={post.title}>
          <h2>{post.title}</h2>
          <p>Här ska blogg-blockets content loopas ut på nått sätt.</p>
          <h4>Och här ska det stå vem som skrivit inlägget.</h4>
        </div>
      ))}
    </Styledhome>
  );
};

export default Home;
