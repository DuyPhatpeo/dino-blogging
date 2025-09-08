import React from "react";
import styled from "styled-components";
import HomeBanner from "@/module/home/HomeBanner";
import Layout from "@components/layout/Layout"; // ✅ dùng Layout thay vì gọi Header trực tiếp

const HomePageStyles = styled.div`
  .banner {
    padding: 40px 20px;
  }
`;

const HomePage = () => {
  return (
    <Layout>
      <HomePageStyles>
        <div className="banner">
          <HomeBanner />
        </div>
      </HomePageStyles>
    </Layout>
  );
};

export default HomePage;
