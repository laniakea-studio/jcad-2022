import React, { useContext } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import { HelmetDatoCms } from "gatsby-source-datocms";
import styled from "styled-components";
import { Layout } from "../components/Layout";
import { theme } from "../theme/theme";
import scrollTo from "gatsby-plugin-smoothscroll";
import { OrderForm } from "@components/OrderForm";
import { valikkoSopimuskausi, extraHinnasto } from "@constants/pricing";

const Page = ({ pageContext, location }) => {
  const { locale } = useContext(LocaleContext);
  const text = snippet[locale];
  const { page, pricing } = pageContext.data;

  // Check default radio option form url params
  const params = new URLSearchParams(location.search);
  const app = params.get("app") || "1";
  const period = params.get("period") || "12 kk";
  const users = params.get("users") || "1";
  let radioValue;
  if (app === "1") radioValue = "JCAD Määrälaskenta";
  if (app === "2") radioValue = "JCAD Määrälaskenta + kustannuslaskenta";
  if (app === "3") radioValue = "JCAD LVI";
  if (app === "4") radioValue = "JCAD Sähkö";

  // Warning: Changing sovellus options values breaks price calculation
  const form = {
    name: "Tilaus",
    inputs: [
      {
        type: "radio",
        name: "sovellus",
        label: "Valitse sovellus",
        value: radioValue,
        options: [
          {
            label: "JCAD MÄÄRÄT",
            desc: "",
            value: "JCAD MÄÄRÄT",
          },
          {
            label: "JCAD MÄÄRÄT + kustannuslaskenta",
            desc: "",
            value: "JCAD MÄÄRÄT + kustannuslaskenta",
          },
          {
            label: "LVI – MÄÄRÄT",
            desc: "",
            value: "LVI – MÄÄRÄT",
          },
          {
            label: "SÄHKÖ – MÄÄRÄT",
            desc: "",
            value: "SÄHKÖ – MÄÄRÄT",
          },
        ],
      },
      {
        type: "radio",
        name: "sopimuskausi",
        label: "Sopimuskauden pituus",
        value: period,
        options: [
          {
            label: "12 kk",
            desc: "",
            value: "12 kk",
          },
          {
            label: "48 kk",
            desc: "",
            value: "48 kk",
          },
        ],
      },
      {
        type: "number",
        name: "kayttajia",
        label: "Käyttäjiä",
        value: users,
        isRequired: true,
      },
      {
        type: "alustava",
      },
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
        name: "message",
        label: text.contact.message,
        placeholder: "",
        isRequired: false,
      },
      { type: "submit", text: text.contact.send },
    ],
    messages: {
      submitSucces: "Kiitos tilauksestasi!",
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
                <OrderForm
                  data={form}
                  prices={{
                    tuotteet: pricing.valikkoOhjelmisto,
                    valikkoSopimuskausi,
                    extraHinnasto,
                  }}
                />
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
    @media (max-width: 1000px) {
      border-left: none;
      border-right: none;
    }
    @media (max-width: 600px) {
      padding: 70px 0;
    }
    .content {
      max-width: 540px;
    }
    .fields {
      max-width: 480px;
    }
  }
`;
