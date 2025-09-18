import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeBanner from "@module/home/HomeBanner";
import Layout from "@components/layout/Layout";
import HomeFeature from "@module/home/HomeFeature";
import HomeNewest from "@module/home/HomeNewest";
import LoadingSpinner from "@components/loading/LoadingSpinner";

const HomePageStyles = styled.div`
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 100px 0;
  }
`;

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  // ✅ giả sử bạn muốn load dữ liệu tổng hợp
  useEffect(() => {
    // Giả lập call API Firestore
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Layout noPadding>
        <HomePageStyles>
          <div className="loading">
            <LoadingSpinner size="50px" />
          </div>
        </HomePageStyles>
      </Layout>
    );
  }

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
