import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getData } from "../sanityFunctions";
import SEO from "../components/GlobalComponents/SEO";
import Post from "../components/Post";

const Styledhome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  const [posts, setPosts] = useState([]);

  // Sanity query
  const query =
    '*[_type == "post"]|order(_createdAt desc){title, slug, "author": author->name, mainImage, categories, publishedAt, body}|[0...10]';

  // Fetch all posts from Sanity API and setPosts
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getData(query);
      setPosts(response);
    };
    fetchPosts();
  }, []);

  console.log(posts);
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
      ))}
    </Styledhome>
  );
};

export default Home;
