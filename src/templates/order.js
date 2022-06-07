import React, { useContext } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import { HelmetDatoCms } from "gatsby-source-datocms";
import styled from "styled-components";
import { Layout } from "../components/Layout";
import { theme } from "../theme/theme";
import scrollTo from "gatsby-plugin-smoothscroll";
import { NetlifyForm } from "../components/NetlifyForm";

const Page = ({ pageContext }) => {
  const { locale } = useContext(LocaleContext);
  const text = snippet[locale];
  const { page } = pageContext.data;

  const form = {
    name: "Tilaus",
    inputs: [
      {
        type: "text",
        name: "yritys",
        label: text.contact.company,
        isRequired: true,
      },
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
        <Main className="pagePadding flex">
          <div className="row container padding justify-center">
            <div className="Form col">
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
              <div className="fields">
                <NetlifyForm data={form} />
              </div>
            </div>
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
  h1 {
    font-size: 36px;
    text-transform: none;
    margin-bottom: 30px;
  }
  .Form {
    border-left: 0.8px dashed #fff;
    border-right: 0.8px dashed #fff;
    max-width: 750px;
    padding: 70px 40px;
    .content {
      max-width: 540px;
    }
    .fields {
      max-width: 480px;
    }
  }
`;
