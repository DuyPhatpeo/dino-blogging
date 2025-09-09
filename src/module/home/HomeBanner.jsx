import React from "react";
import styled from "styled-components";
import banner from "@assets/banner.png";

const HomeBannerStyles = styled.section`
  width: 100%;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 80px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 40%, #43e97b 100%);

  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .banner-content {
    flex: 1;
    color: #fff;
    max-width: 600px;

    h1 {
      font-size: 56px;
      font-weight: 800;
      margin-bottom: 24px;
      line-height: 1.2;
      background: linear-gradient(90deg, #fff, #e6f7ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      font-size: 18px;
      line-height: 1.8;
      margin-bottom: 40px;
      opacity: 0.95;
    }

    .btn {
      display: inline-block;
      background: #fff;
      color: #23939f;
      font-weight: 600;
      padding: 16px 36px;
      border-radius: 12px;
      transition: all 0.3s ease;
      font-size: 16px;

      &:hover {
        background: #e6f7ff;
        transform: translateY(-3px) scale(1.03);
      }
    }
  }

  .banner-image {
    flex: 1;
    display: flex;
    justify-content: center;

    img {
      max-width: 480px;
      width: 100%;
      height: auto;
      border-radius: 20px;
      transition: transform 0.4s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  @media (max-width: 992px) {
    padding: 40px 20px;

    .inner {
      flex-direction: column;
      text-align: center;
    }

    .banner-content {
      max-width: 100%;

      h1 {
        font-size: 40px;
      }
    }

    .banner-image img {
      max-width: 320px;
      margin-top: 30px;
    }
  }
`;

const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="inner">
        <div className="banner-content">
          <h1>Dino Blogging</h1>
          <p>
            Chia sẻ kiến thức, trải nghiệm và cảm hứng viết lách cùng Dino. Nơi
            bạn có thể học hỏi, kết nối và phát triển bản thân mỗi ngày.
          </p>
          <a href="/signup" className="btn">
            Get Started
          </a>
        </div>
        <div className="banner-image">
          <img src={banner} alt="Dino Blogging" />
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
