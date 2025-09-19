import React from "react";
import styled from "styled-components";

const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  color: inherit;

  .post-dot {
    display: inline-block;
    width: 4px;
    height: 4px;
    background-color: ${(props) => props.dotColor || "currentColor"};
    border-radius: 50%;
  }

  @media screen and (max-width: 1023.98px) {
    font-size: 10px;
    gap: 6px;
  }
`;

const PostMeta = ({
  date = "Mar 23",
  authorName = "Andiez Le",
  dotColor,
  className = "",
}) => {
  return (
    <PostMetaStyles dotColor={dotColor} className={className}>
      <time className="post-time">{date}</time>
      <span className="post-dot"></span>
      <span className="post-author">{authorName}</span>
    </PostMetaStyles>
  );
};

export default PostMeta;
