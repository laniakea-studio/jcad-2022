import React, { useContext } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import { HelmetDatoCms } from "gatsby-source-datocms";
import styled from "styled-components";
import { Layout } from "../components/Layout";
import { theme } from "../theme/theme";

const Page = () => {
  const { locale } = useContext(LocaleContext);
  const text = snippet[locale];

  return (
    <>
      <Layout locale={locale} transparent={false}>
        <Main className="pagePadding flex">
          <div className="restream">
            <iframe
              src="https://player.restream.io/?token=d6caadf5f87b4f028519d9dc9120f5ab"
              allow="autoplay"
              allowfullscreen
              frameborder="0"
            />
          </div>
          <div className="restream">
            <iframe
              src="https://www.youtube.com/live_chat?v=9c0e6r2MEts&embed_domain=localhost"
              allowfullscreen
              frameborder="0"
            />
          </div>
        </Main>
      </Layout>
    </>
  );
};

export default Page;

const Main = styled.main`
  color: #fff;
  padding-top: 94px;
  background: ${theme.primary};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 160px;
  padding-bottom: 160px;
  .restream {
    padding: 56.25% 0 0 0;
    position: relative;
  }
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  h1 {
    font-size: 36px;
    text-transform: none;
    margin-bottom: 30px;
  }
`;
