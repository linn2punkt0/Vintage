import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
import styled from "styled-components";
import { getData } from "../sanityFunctions";
// import BlockContent from "@sanity/block-content-to-react";
// import sanityClient from "../sanityClient";
import SEO from "../components/GlobalComponents/SEO";

const Styledhome = styled.div``;

const Home = () => {
  const [posts, setPosts] = useState([]);

  // Sanity query
  const query = '*[_type == "post"]';

  // Fetch all posts from Sanity API and setPosts
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getData(query);
      setPosts(response);
    };
    fetchPosts();
  }, []);

  console.log(posts);

  // const serializers = {
  //   types: {
  //     code: node => (
  //       <pre data-language={node.language}>
  //         <code>{node.code}</code>
  //       </pre>
  //     )
  //   }
  // };

  // sanityClient.fetch('*[_type == "post"][0]').then(post => {
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
