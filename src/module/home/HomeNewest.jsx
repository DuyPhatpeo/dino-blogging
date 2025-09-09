import React from "react";
import styled from "styled-components";
import Heading from "@/components/layout/Heading";
import PostItem from "@/module/post/PostItem";
import PostNewestItem from "@/module/post/PostNewestItem";
import PostNewestLarge from "@/module/post/PostNewestLarge";

const HomeNewestStyles = styled.section`
  padding: 40px 0;

  .layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
    margin-bottom: 64px;
    align-items: start;

    @media screen and (min-width: 1024px) {
      grid-template-columns: 2fr 1fr;
      gap: 40px;
    }
  }

  .sidebar {
    padding: 24px 20px;
    background-color: #f3edff;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .grid-layout--primary {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
    margin-top: 40px;

    @media screen and (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

const HomeNewest = () => {
  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>Mới nhất</Heading>
        <div className="layout">
          <PostNewestLarge />
          <div className="sidebar">
            <PostNewestItem />
            <PostNewestItem />
            <PostNewestItem />
          </div>
        </div>
        <div className="grid-layout--primary">
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
