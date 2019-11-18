import React from "react";
import styled from "styled-components";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import client from "../sanityClient";

const StyledPost = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: solid 1px black;
  margin-bottom: 20px;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 90vw;
    @media only screen and (min-width: 800px) {
      width: 600px;
    }
  }

  p {
    width: 90%;
    height: auto;
    /* padding: 10px; */
  }
  & > h4 {
    text-align: right;
    font-style: italic;
  }
`;

const Post = ({ post }) => {
  // Get a pre-configured url-builder from your sanity client
  const builder = imageUrlBuilder(client);

  // Then make a simple function that gives the builder an image and
  // returns the builder for you to specify additional parameters:
  function urlFor(source) {
    return builder.image(source);
  }

  const serializers = {
    types: {
      code: node => (
        <pre data-language={node.language}>
          <code>{node.code}</code>
        </pre>
      )
    }
  };
  return (
    <StyledPost>
      <h2>{post.title}</h2>
      {post.mainImage && <img src={urlFor(post.mainImage.asset)} alt="Main" />}
      <BlockContent
        key={post.title}
        blocks={post.body}
        serializers={serializers}
        dataset="production"
        projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
        // imageOptions={{ w: 300, fit: "max" }}
      />
      <h4>Av: {post.author}</h4>
    </StyledPost>
  );
};

export default Post;
