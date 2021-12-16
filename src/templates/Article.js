import React from "react";
import styled from "styled-components";
import { Layout } from "../components/Layout";
import fi from "../locales/fi.yml";

const Blog = ({ pageContext }) => {
  const text = fi;
  const { data } = pageContext;

  return (
    <Layout>
      <Main>
        <h1>{data.title}</h1>
      </Main>
    </Layout>
  );
};

export default Blog;

const Main = styled.main`
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
