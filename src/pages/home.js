import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../context/auth";

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

  console.log(posts);

  return (
    <Styledhome>
      <h2>Startsidan</h2>
      {authUser ? <h2>Du är inloggad</h2> : <h2>Du är inte inloggad</h2>}
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>Här ska blogg-blockets content loopas ut på nått sätt.</p>
          <h4>Och här ska det stå vem som skrivit inlägget.</h4>
        </div>
      ))}
    </Styledhome>
  );
};

export default Home;
