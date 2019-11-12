import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
import styled from "styled-components";
// import BlockContent from "@sanity/block-content-to-react";
import { useAuth } from "../context/auth";
import SEO from "../components/GlobalComponents/SEO";

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

  return (
    <Styledhome>
      <SEO
        title="Vintage Sverige"
        description="Vintage Sverige är en sida för dig som älskar vintage och vill hjälpa till att samla kunskap på ett ställe. Här kan du tipsa om och leta efter event, mässor, tvättråd m.m."
        url="http://vintagesverige.se/"
      />
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
