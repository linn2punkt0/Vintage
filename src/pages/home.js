import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
import styled from "styled-components";
// import BlockContent from "@sanity/block-content-to-react";
import { getData } from "../sanityFunctions";
// import sanityClient from "../sanityClient";
import SEO from "../components/GlobalComponents/SEO";
import Post from "../components/Post";
// import client from "../sanityClient";

const Styledhome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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

  return (
    <Styledhome>
      <SEO
        title="Vintage Sverige"
        description="Vintage Sverige är en sida för dig som älskar vintage och vill hjälpa till att samla kunskap på ett ställe. Här kan du tipsa om och leta efter event, mässor, tvättråd m.m."
        url="http://vintagesverige.se/"
      />
      <h2>Startsidan</h2>
      {posts.map(post => (
        <Post key={post.title} post={post} />
        // <BlockContent
        //   key={post.title}
        //   blocks={post.body}
        //   serializers={serializers}
        //   dataset="production"
        //   projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
        // />
      ))}
    </Styledhome>
  );
};

export default Home;
