import React, { useContext, useState, useEffect } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import styled from "styled-components";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { Layout } from "../components/Layout";
import { NetlifyForm } from "@components/NetlifyForm";
import { Video } from "@components/Video";
import scrollTo from "gatsby-plugin-smoothscroll";
import { GetStartedForm } from "../components/GetStartedForm";

const Page = ({ pageContext, locale }) => {
  const { page } = pageContext.data;

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
      submitSucces: "Kiitos! Olemme yhteydessä.",
      fillAllInputs: "Täytä kaikki kentät.",
    },
  };

  const formIlmainenKokeilu = {
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
      {
        type: "textarea",
        name: "tuotteet",
        label: "Mistä tuotteista olet kinnostunut?",
        isRequired: true,
      },
      { type: "submit", text: "Aloita kokeilujakso" },
    ],
    messages: {
      submitSucces: "Kiitos! Olemme yhteydessä.",
      fillAllInputs: "Täytä kaikki kentät.",
    },
  };

  return (
    <>
      <HelmetDatoCms seo={page.seoMetaTags} />
      <Layout locale={locale} transparent={false}>
        <main
          className="pagePadding flex flex-col pt-[94px] bg-primary"
          css={`
            h1,
            h2,
            h3,
            span,
            p,
            li {
              color: #fff;
            }
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
              p {
                margin-bottom: 16px;
              }
            `}
          >
            <span className="SubTitle">{page.supTitle}</span>
            <h1>{page.title}</h1>
            {locale === "fi" && (
              <button
                className="btn white"
                onClick={() => scrollTo("#aloita")}
                css={`
                  margin-bottom: 50px;
                `}
              >
                Aktivoi kokeilu
              </button>
            )}

            <div
              className="flex col-1000 mx-auto mt-[40px]"
              css={`
                max-width: ${page.video ? "1150px" : "600px"};
                margin-bottom: 120px;
              `}
            >
              <div className="flex-1">
                {page.video && (
                  <Video data={page.video} poster={page.videoPoster.url} />
                )}
              </div>
              <div
                className="flex-1"
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
            {page.asiakkaidenKommentteja.length > 0 && (
              <>
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
              </>
            )}

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
                {locale === "fi" && <h3>Aktivoi kokeilujakso</h3>}
                <div
                  dangerouslySetInnerHTML={{ __html: page.aloitaKokeilujakso }}
                  css={`
                    max-width: 600px;
                    padding-right: 40px;
                  `}
                />
              </div>

              {locale === "fi" && (
                <NetlifyForm
                  data={
                    page.lomakkeenNimi === "Ilmainen-kokeilujakso"
                      ? formIlmainenKokeilu
                      : form
                  }
                  plausibleGoal={page.plausibleGoal}
                  redirectOnSuccess={null}
                />
              )}
              {locale === "en" && <GetStartedForm />}
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default Page;
