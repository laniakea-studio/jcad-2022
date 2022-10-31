import React, { useContext, useState, useEffect } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import styled from "styled-components";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { Layout } from "../components/Layout";
import { theme } from "../theme/theme";
import { TutorialNavigation } from "@components/TutorialNavigation";

const Page = ({ pageContext }) => {
  const { locale } = useContext(LocaleContext);
  const { page } = pageContext.data;

  console.log({ page });

  return (
    <>
      <HelmetDatoCms seo={page.seoMetaTags} />
      <Layout locale={locale} transparent={false}>
        <main
          className="pagePadding flex"
          css={`
            color: #fff;
            padding-top: 94px;
            background: ${theme.primary};
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          `}
        >
          <section
            className="row padding container col-800"
            css={`
              padding-top: 60px;
              padding-bottom: 160px;
              min-height: 100vh;
              .SubTitle {
                text-transform: uppercase;
                font-weight: 500;
              }
              h1 {
                text-transform: none;
                font-size: 36px;
                margin: 5px auto 30px;
              }
              .Kuvaus {
                margin-bottom: 50px;
                p {
                  fo  nt-size: 17px;
                }
              }
            `}
          >
            <TutorialNavigation />
            <div className="col">
              <div
                className="Kuvaus"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default Page;
