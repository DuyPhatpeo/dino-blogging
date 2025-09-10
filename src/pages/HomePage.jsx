import React from "react";
import styled from "styled-components";
import HomeBanner from "@module/home/HomeBanner";
import Layout from "@components/layout/Layout";
import HomeFeature from "@module/home/HomeFeature";
import HomeNewest from "@module/home/HomeNewest";

const HomePageStyles = styled.div``;

const HomePage = () => {
  return (
    <Layout noPadding>
      <HomePageStyles>
        <HomeBanner />
        <HomeFeature />
        <HomeNewest />
      </HomePageStyles>
    </Layout>
  );
};

export default HomePage;
