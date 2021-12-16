import React from "react";
import styled from "styled-components";
import { Layout } from "../components/Layout";
import fi from "../locales/fi.yml";

const About = ({ pageContext }) => {
  const text = fi;

  return (
    <Layout>
      <Main>
        <h1>About</h1>
      </Main>
    </Layout>
  );
};

export default About;

const Main = styled.main`
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
