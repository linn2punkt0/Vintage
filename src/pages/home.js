import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { getData } from "../sanityFunctions";
import SEO from "../components/GlobalComponents/SEO";
import Post from "../components/Post";

const Styledhome = styled.div`
  width: 90vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: 800px) {
    width: 60vw;
  }
`;

const Home = () => {
  const [posts, setPosts] = useState([]);

  // Sanity query
  const query =
    '*[_type == "post"]|order(_createdAt desc){title, slug, "author": author->name, mainImage, categories, publishedAt, body}|[0...10]';

  // Fetch all posts from Sanity API and setPosts
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await getData(query);
  //     setPosts(response);
  //   };
  //   fetchPosts();
  // }, []);

  // Get Sanity Posts via netlify functions
  const getPosts = () => {
    const tempArray = [];
    fetch(`/.netlify/functions/sanity?input=${query}`, {
      headers: { accept: "Accept: application/json" }
    })
      .then(response => response.json())
      .then(data => {
        data.msg.result.forEach(post => {
          tempArray.push(post);
        });
        setPosts([...tempArray]);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Styledhome>
      <SEO
        title="Vintage Sverige"
        description="Vintage Sverige är en sida för dig som älskar vintage och vill hjälpa till att samla kunskap på ett ställe. Här kan du tipsa om och leta efter event, mässor, tvättråd m.m."
        url="http://vintagesverige.se/"
      />
      {posts.map(post => (
        <Post key={post.title} post={post} />
      ))}
    </Styledhome>
  );
};

export default Home;
