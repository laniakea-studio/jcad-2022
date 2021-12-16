import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";
import { Layout } from "../components/Layout";
import fi from "../locales/fi.yml";
import { theme } from "../theme/theme";

const Home = ({ pageContext }) => {
  const text = fi;
  const { data } = pageContext;

  return (
    <Layout locale={pageContext.locale} transparent={false}>
      <Main>
        <div className="hero">
          <GatsbyImage
            imgClassName="heroImg"
            image={data.heroImage.gatsbyImageData}
          />
        </div>
        <h1>{data.title}</h1>
      </Main>
    </Layout>
  );
};

export default Home;

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  .hero {
    ${theme.fullWidth}
    min-height: 400px;
    display: flex;
    .heroImg {
      object-fit: cover;
    }
  }
  .subscribe {
    padding-bottom: 40px;
  }
`;
