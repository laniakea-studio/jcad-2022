import React, { useContext, useState, useEffect } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import styled from "styled-components";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { Layout } from "../components/Layout";
import { theme } from "../theme/theme";
import { NetlifyForm } from "@components/NetlifyForm";
import { useLocalStorage } from "@hooks/useLocaleStorage";
import { Video } from "@components/Video";
import scrollTo from "gatsby-plugin-smoothscroll";

const Page = ({ pageContext }) => {
  const { locale } = useContext(LocaleContext);
  const { page } = pageContext.data;
  console.log(page);

  // Form
  const form = {
    name: page.lomakkeenNimi,
    inputs: [
      {
        type: "text",
        name: "yritys",
        label: "Yritys",
        isRequired: true,
      },
      {
        type: "text",
        name: "nimi",
        label: "Nimi",
        isRequired: true,
      },
      {
        type: "email",
        name: "email",
        label: "Sähköposti",
        isRequired: true,
      },
      { type: "submit", text: "Aloita kokeilujakso" },
    ],
    messages: {
      submitSucces: "Kiitos! Kurkkaa sähköpostisi.",
      fillAllInputs: "Täytä kaikki kentät.",
    },
  };

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
                margin: 5px auto 30px;
                text-align: center;
              }
              h3 {
                font-size: 20px;
                opacity: 1;
                margin-bottom: 20px;
              }
            `}
          >
            <span className="SubTitle">{page.supTitle}</span>
            <h1>{page.heading}</h1>
            <button
              className="btn white"
              onClick={() => scrollTo("#aloita")}
              css={`
                margin-bottom: 50px;
              `}
            >
              Aktivoi kokeilu
            </button>

            <div
              className="row col-1000"
              css={`
                max-width: 1150px;
                margin-bottom: 120px;
              `}
            >
              {page.video && (
                <Video data={page.video} poster={page.videoPoster.url} />
              )}

              <div
                css={`
                  padding-top: 30px;
                  padding-left: 50px;
                  @media (max-width: 1000px) {
                    padding-left: 0;
                  }
                `}
                dangerouslySetInnerHTML={{ __html: page.videoText }}
              />
            </div>
            <h3>Asiakkaiden kommentteja</h3>
            <div
              className="row col-600"
              css={`
                margin-bottom: 120px;
                max-width: 960px;
                > div {
                  padding-right: 50px;
                }
              `}
            >
              {page.asiakkaidenKommentteja.map((item) => (
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              ))}
            </div>
            <div
              id="aloita"
              className="row col-900"
              css={`
                padding-top: 20px;
                max-width: 1150px;
                form {
                  max-width: 400px;
                  margin-top: 40px;
                }
              `}
            >
              <div>
                <h3>Aktivoi kokeilujakso</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: page.aloitaKokeilujakso }}
                  css={`
                    max-width: 600px;
                    padding-right: 40px;
                  `}
                />
              </div>
              <NetlifyForm
                data={form}
                plausibleGoal={plausibleGoal}
                redirectOnSuccess={null}
              />
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default Page;
