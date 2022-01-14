import React, { useContext } from "react";
import styled from "styled-components";
import { Layout } from "../components/Layout";
import { LocaleContext } from "../contexts/LocaleContext";
import fi from "../locales/fi.yml";
import en from "../locales/en.yml";
import sv from "../locales/sv.yml";

const Article = ({ pageContext }) => {
  const { locale, localeSlugs } = useContext(LocaleContext);
  const text = locale === "fi" ? fi : locale === "en" ? en : sv;
  const { data } = pageContext;

  return (
    <Layout>
      <Main>
        <h1>{data.yritys}</h1>
      </Main>
    </Layout>
  );
};

export default Article;

const Main = styled.main`
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
