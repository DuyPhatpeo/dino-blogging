import React from "react";
import styled from "styled-components";
import Heading from "@/components/layout/Heading";
import PostFeatureItem from "@/module/post/PostFeatureItem";

const HomeFeatureStyles = styled.section`
  padding: 40px 0;

  .home-heading {
    margin-bottom: 30px;
    text-align: left;
    font-size: 24px;
    font-weight: 700;
  }

  .grid-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;

    @media screen and (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

const HomeFeature = () => {
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading className="home-heading">Bài viết nổi bật</Heading>
        <div className="grid-layout">
          <PostFeatureItem />
          <PostFeatureItem />
          <PostFeatureItem />
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
