import React from "react";
import styled from "styled-components";
import Layout from "src/temp/layout/Layout";
import Heading from "src/temp/layout/Heading";
import PostCategory from "@module/dasddddd/PostCategory";
import PostImage from "@module/dasddddd/PostImage";
import PostItem from "@module/dasddddd/PostItem";
import PostMeta from "@module/dasddddd/PostMeta";

const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;

  .post-header {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    margin: 40px 0;
  }

  .post-feature {
    width: 100%;
    max-width: 640px;
    height: 466px;
    border-radius: 20px;
  }

  .post-info {
    flex: 1;
  }

  .post-heading {
    font-weight: bold;
    font-size: 36px;
    margin-bottom: 16px;
  }

  .post-content {
    max-width: 700px;
    margin: 80px auto;
    line-height: 2;

    figure {
      margin: 40px 0;
      img {
        width: 100%;
        border-radius: 20px;
      }
      figcaption {
        font-size: 14px;
        margin-top: 8px;
        color: ${(props) => props.theme.gray6};
      }
    }
  }

  .author {
    display: flex;
    gap: 20px;
    margin: 40px 0 80px;
    background-color: ${(props) => props.theme.grayF3};
    border-radius: 20px;
    overflow: hidden;

    &-image {
      flex-shrink: 0;
      width: 200px;
      height: 200px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-content {
      padding: 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;

      &-name {
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 10px;
      }

      &-desc {
        font-size: 14px;
      }
    }
  }

  .post-related {
    margin-top: 80px;
    .grid-layout {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  @media screen and (max-width: 1024px) {
    padding-bottom: 40px;

    .post-header {
      flex-direction: column;
    }

    .post-feature {
      height: auto;
    }

    .post-heading {
      font-size: 26px;
    }

    .post-content {
      margin: 40px 0;
    }

    .author {
      flex-direction: column;

      &-image {
        width: 100%;
        height: auto;
      }
    }
  }
`;

const PostDetailsPage = () => {
  return (
    <Layout>
      <PostDetailsPageStyles>
        <article className="container">
          {/* Post Header */}
          <header className="post-header">
            <PostImage
              url="https://images.unsplash.com/photo-1649837867356-6c7ef7057f32?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80"
              className="post-feature"
            />
            <div className="post-info">
              <PostCategory>Kiến thức</PostCategory>
              <h1 className="post-heading">
                Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
              </h1>
              <PostMeta />
            </div>
          </header>

          {/* Post Content */}
          <section className="post-content">
            <h2>Chương 1</h2>
            <p>
              {" "}
              Gastronomy atmosphere set aside. Slice butternut cooking home.
              Delicious romantic undisturbed raw platter will meld. Thick
              Skewers skillet natural, smoker soy sauce wait roux. slices Food
              qualities braise chicken cuts bowl through slices butternut snack.
              Tender meat juicy dinners. One-pot low heat plenty of time adobo
              fat raw soften fruit. sweet renders bone-in marrow richness
              kitchen, fricassee basted pork shoulder. Delicious butternut
              squash hunk. Flavor centerpiece plate, delicious ribs bone-in
              meat, excess chef end. sweet effortlessly pork, low heat smoker
              soy sauce flavor meat, rice fruit fruit. Romantic
              fall-off-the-bone butternut chuck rice burgers. renders aromatic
              enjoyment, then slices taco. Minutes undisturbed cuisine lunch
              magnificent mustard curry. Juicy share baking sheet pork. Meals
              ramen rarities selection, raw pastries richness magnificent
              atmosphere. Sweet soften dinners, cover mustard infused skillet,
              Skewers on culinary experience.{" "}
            </p>{" "}
            <p>
              {" "}
              Juicy meatballs brisket slammin' baked shoulder. Juicy smoker soy
              sauce burgers brisket. polenta mustard hunk greens. Wine technique
              snack skewers chuck excess. Oil heat slowly. slices natural
              delicious, set aside magic tbsp skillet, bay leaves brown
              centerpiece. fruit soften edges frond slices onion snack pork
              steem on wines excess technique cup; Cover smoker soy sauce fruit
              snack. Sweet one-dozen scrape delicious, non sheet raw crunch
              mustard. Minutes clever slotted tongs scrape, brown steem
              undisturbed rice.{" "}
            </p>{" "}
            <p>
              {" "}
              Food qualities braise chicken cuts bowl through slices butternut
              snack. Tender meat juicy dinners. One-pot low heat plenty of time
              adobo fat raw soften fruit. sweet renders bone-in marrow richness
              kitchen, fricassee basted pork shoulder. Delicious butternut
              squash hunk. Flavor centerpiece plate, delicious ribs bone-in
              meat, excess chef end. sweet effortlessly pork, low heat smoker
              soy sauce flavor meat, rice fruit fruit. Romantic
              fall-off-the-bone butternut chuck rice burgers.{" "}
            </p>
            <figure>
              <img
                src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80"
                alt=""
              />
              <figcaption>
                Gastronomy atmosphere set aside. Slice butternut cooking home.
              </figcaption>
            </figure>
            <h2>Chương 2</h2>
            <p>
              {" "}
              Gastronomy atmosphere set aside. Slice butternut cooking home.
              Delicious romantic undisturbed raw platter will meld. Thick
              Skewers skillet natural, smoker soy sauce wait roux. slices Food
              qualities braise chicken cuts bowl through slices butternut snack.
              Tender meat juicy dinners. One-pot low heat plenty of time adobo
              fat raw soften fruit. sweet renders bone-in marrow richness
              kitchen, fricassee basted pork shoulder. Delicious butternut
              squash hunk. Flavor centerpiece plate, delicious ribs bone-in
              meat, excess chef end. sweet effortlessly pork, low heat smoker
              soy sauce flavor meat, rice fruit fruit. Romantic
              fall-off-the-bone butternut chuck rice burgers. renders aromatic
              enjoyment, then slices taco. Minutes undisturbed cuisine lunch
              magnificent mustard curry. Juicy share baking sheet pork. Meals
              ramen rarities selection, raw pastries richness magnificent
              atmosphere. Sweet soften dinners, cover mustard infused skillet,
              Skewers on culinary experience.{" "}
            </p>
          </section>

          {/* Author Info */}
          <section className="author">
            <div className="author-image">
              <img
                src="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80"
                alt="Evondev"
              />
            </div>
            <div className="author-content">
              <h3 className="author-content-name">Evondev</h3>
              <p className="author-content-desc">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit...
              </p>
            </div>
          </section>

          {/* Related Posts */}
          <section className="post-related">
            <Heading>Bài viết liên quan</Heading>
            <div className="grid-layout">
              <PostItem />
              <PostItem />
              <PostItem />
              <PostItem />
            </div>
          </section>
        </article>
      </PostDetailsPageStyles>
    </Layout>
  );
};

export default PostDetailsPage;
