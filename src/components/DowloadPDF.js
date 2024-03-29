import { graphql, useStaticQuery } from "gatsby";
import React, { useContext } from "react";
import styled from "styled-components";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import { DownloadPdfForm } from "./DownloadPdfForm";

export const DownloadPDF = () => {
  const { locale } = useContext(LocaleContext);
  const text = snippet[locale];

  // Only Finnish
  if (locale !== "fi") return <></>;

  const { globalFi } = useStaticQuery(graphql`
    query {
      globalFi: datoCmsGlobal(locale: { eq: "fi" }) {
        content
        pdf {
          url
        }
      }
    }
  `);

  const form = {
    name: "Hukka rakennusalalla 2022 PDF",
    inputs: [
      {
        type: "email",
        name: "email",
        label: text.contact.email,
        isRequired: true,
      },
      { type: "submit", text: "Avaa kyselytutkimus (PDF)" },
    ],
    messages: {
      submitSucces: `<a href=${globalFi.pdf.url} target="_blank">Avaa kyselytutkimus tästä</a>`,
      fillAllInputs: text.contact.fillEmail,
    },
    url: globalFi.pdf.url,
  };

  return (
    <section
      id="DownloadPDF"
      className="row container padding"
      css={`
        border-top: 0.9px dashed;
        color: #fff;
        padding-top: 60px;
        padding-bottom: 60px;
        @media (max-width: 800px) {
          flex-direction: column;
        }
        > div:first-child {
          padding-right: 40px;
          @media (max-width: 800px) {
            padding-right: 0;
          }
        }
        form {
          margin-top: 20px;
          max-width: 450px;
        }
        .Content {
          padding-left: 80px;
          max-width: 620px;
          h2 {
            margin-bottom: 20px;
            max-width: 520px;
            line-height: 1.1;
            font-weight: 400;
            font-size: 32px;
          }
          @media (max-width: 1100px) {
            padding-left: 0;
          }
          p {
            margin-bottom: 20px;
          }
        }
      `}
    >
      <div className="col">
        <div
          className="Content"
          dangerouslySetInnerHTML={{ __html: globalFi.content }}
        />
      </div>
      <div className="col">
        <DownloadPdfForm data={form} />
      </div>
    </section>
  );
};
