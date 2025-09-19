import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PostImageStyles = styled.div`
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
`;

const PostImage = ({
  className = "",
  url = "",
  alt = "Post Image",
  to = null,
  onClick,
}) => {
  const content = (
    <PostImageStyles className={`post-image ${className}`} onClick={onClick}>
      <img src={url || "/fallback.jpg"} alt={alt} loading="lazy" />
    </PostImageStyles>
  );

  if (to)
    return (
      <NavLink to={to} style={{ display: "block" }}>
        {content}
      </NavLink>
    );
  return content;
};

export default PostImage;
