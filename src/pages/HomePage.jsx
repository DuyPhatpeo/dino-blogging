import React from "react";
import styled from "styled-components";
import HomeBanner from "@/module/home/HomeBanner";
import Layout from "@components/layout/Layout"; // ✅ dùng Layout thay vì gọi Header trực tiếp

const HomePageStyles = styled.div``;

const HomePage = () => {
  return (
    <Layout noPadding>
      <HomePageStyles>
        <HomeBanner />
      </HomePageStyles>
    </Layout>
  );
};

export default HomePage;
