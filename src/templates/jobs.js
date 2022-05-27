import React, { useContext } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import { HelmetDatoCms } from "gatsby-source-datocms";
import styled from "styled-components";
import { Layout } from "../components/Layout2";
import { theme } from "../theme/theme";
import scrollTo from "gatsby-plugin-smoothscroll";

const Page = ({ pageContext }) => {
  const { locale } = useContext(LocaleContext);
  const text = snippet[locale];
  const { data } = pageContext;

  return (
    <>
      <Layout locale={pageContext.locale} transparent={false}>
        <Main>
          <div className="wrap padding">
            <h2>{text.menu.jobs}</h2>
          </div>
        </Main>
      </Layout>
    </>
  );
};

export default Page;

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #fff;
  padding-top: 160px;
  height: 100vh;
  background: ${theme.primary};
`;
