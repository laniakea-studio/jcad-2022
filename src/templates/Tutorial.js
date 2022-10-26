import React, { useContext, useState, useEffect } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import styled from "styled-components";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { Layout } from "../components/Layout";
import { theme } from "../theme/theme";
import { NetlifyForm } from "@components/NetlifyFormJoinWebinar";
import { useLocalStorage } from "@hooks/useLocaleStorage";
import { Video } from "@components/Video";

const Page = ({ pageContext }) => {
  const { locale } = useContext(LocaleContext);
  const { page } = pageContext.data;
  console.log(page);
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
            className="col padding container align-center"
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
                margin: 5px auto 45px;
                text-align: center;
              }
              video {
                max-width: 450px;
              }
            `}
          >
            <span className="SubTitle">{page.supTitle}</span>
            <h1>{page.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: page.kuvaus }} />

            {page.videot.map((item) => (
              <div className="row">
                <div>
                  <h3>{item.otsikko}</h3>
                  <div dangerouslySetInnerHTML={{ __html: item.kuvaus }} />
                </div>
                <Video
                  data={item.video}
                  poster={item.videoPoster?.url}
                  markers={item.osiot}
                />
              </div>
            ))}
          </section>
        </main>
      </Layout>
    </>
  );
};

export default Page;
