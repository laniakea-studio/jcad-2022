import React, { useContext } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import { HelmetDatoCms } from "gatsby-source-datocms";
import styled from "styled-components";
import { Layout } from "../components/Layout";
import { CompanyFacts } from "../components/CompanyFacts";
import { theme } from "../theme/theme";
import scrollTo from "gatsby-plugin-smoothscroll";
import { NetlifyForm } from "../components/NetlifyForm";

const Page = ({ pageContext }) => {
  const { locale } = useContext(LocaleContext);
  const text = snippet[locale];
  const { page } = pageContext.data;

  const form = {
    name: "Työhakemus",
    inputs: [
      {
        type: "text",
        name: "name",
        label: text.contact.name,
        isRequired: true,
      },
      {
        type: "email",
        name: "email",
        label: text.contact.email,
        isRequired: true,
      },
      {
        type: "text",
        name: "phone",
        label: text.contact.phone,
        isRequired: false,
      },
      {
        type: "textarea",
        name: "phone",
        label: text.contact.message,
        placeholder: "",
        isRequired: true,
      },
      { type: "submit", text: text.contact.send },
    ],
    messages: {
      submitSucces: "Kiitos hakemuksestasi!",
      fillAllInputs: text.contact.fillRequiredInputs,
    },
  };

  return (
    <>
      <HelmetDatoCms seo={page.seoMetaTags} />
      <Layout locale={pageContext.locale} transparent={false}>
        <Main>
          <section className="Hero pagePadding">
            <div className="row container padding">
              <div className="col justify-center">
                <h1>{page.title}</h1>
                <div
                  className="Content"
                  dangerouslySetInnerHTML={{ __html: page.intro }}
                />
              </div>
              <div className="col justify-center align-center">
                <AbstractSvg />
              </div>
            </div>
          </section>

          <section className="Positions pagePadding">
            <div className="grid row container padding">
              {page.positio.map((i) => (
                <div className="item">
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: i.content }}
                  />
                  <button
                    className="btn white-outlines small"
                    onClick={() => scrollTo("#hae")}
                  >
                    Olen kiinnostunut
                  </button>
                </div>
              ))}
            </div>
          </section>

          <CompanyFacts />

          <section id="hae" className="Apply pagePadding">
            <div className="row container padding col-800">
              <div className="col">
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: page.askMore }}
                />
              </div>
              <div className="col">
                <NetlifyForm data={form} isLightBg />
              </div>
            </div>
          </section>
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
  background: ${theme.primary};
  h1 {
    font-weight: 600;
    font-size: 36px;
    text-transform: none;
    margin-bottom: 30px;
  }
  .Hero .container {
    padding-top: 94px;
    p {
      font-size: 19px;
      line-height: 1.4;
    }
    > .col:first-child {
      width: 50%;
      border-right: 0.8px dashed #fff;
      padding-top: 70px;
      padding-right: 40px;
      padding-bottom: 70px;
      @media (max-width: 800px) {
        border-right: none;
        width: 100%;
      }
    }
    > .col:last-child {
      width: 50%;
      padding-top: 70px;
      padding-bottom: 70px;
      padding-left: 20px;
      svg {
        width: 100%;
      }
      @media (max-width: 800px) {
        display: none;
      }
    }
  }
  .Positions {
    .container {
      border-top: 0.8px dashed #fff;
    }
    h4 {
      font-size: 19px;
      margin-bottom: 15px;
      text-transform: uppercase;
    }
    p {
      font-size: 17px;
      line-height: 1.5;
    }
    .grid {
      padding-top: 30px;
      padding-bottom: 50px;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 520px));
      gap: 40px;
      @media (max-width: 700px) {
        grid-template-columns: repeat(1, minmax(0, 520px));
      }
    }
    .item {
      padding: 30px 20px;
      max-width: 415px;
      &:first-child,
      &:nth-child(2) {
        border-bottom: 0.8px dashed #fff;
      }
      @media (max-width: 800px) {
        max-width: 100%;
        padding: 30px 0;
        &:not(:last-child) {
          border-bottom: 0.8px dashed #fff;
        }
      }
    }
    .btn {
      margin-top: auto;
    }
  }
  .Apply {
    background: #fff;
    color: #000;
    h2 {
      margin-bottom: 20px;
    }
    .container {
      border-color: #000;
      border-top: 0.8px dashed #000;
      > .col:first-child {
        width: 50%;
        border-right: 0.8px dashed #fff;
        padding-top: 70px;
        padding-right: 40px;
        padding-bottom: 70px;
        @media (max-width: 800px) {
          width: 100%;
          padding-bottom: 40px;
        }
      }
      > .col:last-child {
        width: 50%;
        padding-top: 70px;
        padding-bottom: 70px;
        padding-left: 20px;
        @media (max-width: 800px) {
          padding-left: 0;
          padding-top: 0;
          width: 100%;
        }
        svg {
          width: 100%;
        }
      }
    }
  }
`;

const AbstractSvg = () => (
  <svg
    width="597"
    height="297"
    viewBox="0 0 597 297"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M213.985 2.53186V193.173"
      stroke="white"
      stroke-width="0.6"
      stroke-dasharray="2 2"
    />
    <path
      d="M414.858 296L213.985 193.184"
      stroke="white"
      stroke-width="0.6"
      stroke-dasharray="2 2"
    />
    <path
      d="M13.1113 296L214.432 192.723"
      stroke="white"
      stroke-width="0.6"
      stroke-dasharray="2 2"
    />
    <path
      d="M1 88.746H596"
      stroke="white"
      stroke-width="0.8"
      stroke-dasharray="2 2"
    />
    <path
      d="M1 206.493H596"
      stroke="white"
      stroke-width="0.8"
      stroke-dasharray="2 2"
    />
    <path
      d="M213.932 85.2235L326.501 251.527H102.097L213.932 85.2235Z"
      stroke="white"
      stroke-width="0.8"
    />
    <path
      d="M31.6431 295.244V0.428223"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
      stroke-dasharray="4 4"
    />
    <path
      d="M16.3779 295.244V0.428223"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
      stroke-dasharray="4 4"
    />
    <path
      d="M1 295.244V0.428223"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
      stroke-dasharray="4 4"
    />
    <path
      d="M595.643 295.244V0.428223"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
      stroke-dasharray="4 4"
    />
    <path
      d="M580.378 295.244V0.428223"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
      stroke-dasharray="4 4"
    />
    <path
      d="M565 295.244V0.428223"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
      stroke-dasharray="4 4"
    />
  </svg>
);
