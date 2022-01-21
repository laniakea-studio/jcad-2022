import React, { useContext } from "react";
import { LocaleContext } from "../contexts/LocaleContext";
import en from "../locales/en.yml";
import fi from "../locales/fi.yml";
import sv from "../locales/sv.yml";
import "../theme-2021/globals.css";
import theme from "../theme-2021/theme";

const TietosuojaPage = ({ pageContext }) => {
  const { locale } = useContext(LocaleContext);
  const text = locale === "fi" ? fi : locale === "en" ? en : sv;
  const { data } = pageContext;
  return (
    <>
      <main
        css={`
          padding: 40px 20px 160px;
          background: ${theme.indigo};
          .content {
            margin: 100px auto;
            max-width: 900px;
            color: #fff;
            h1 {
              color: #fff;
              margin-bottom: 40px;
              font-size: 42px;
              text-align: center;
              ${theme.mobile} {
                font-size: 32px;
              }
            }
            h2 {
              padding: 35px 0 5px;
            }
            h3 {
              text-transform: none;
              font-weight: 700;
              padding: 20px 0 0;
            }
          }
          .button.back {
            background: none;
            border: none;
            margin: 0 auto;
            display: flex;
            align-items: center;
            text-transform: uppercase;
            letter-spacing: 0;
            color: #fff;
            cursor: pointer;
            width: 220px;
            justify-content: center;
            &:hover {
              opacity: 1;
            }
            svg {
              margin-right: 6px;
              path {
                fill: #fff;
              }
            }
          }
        `}
      >
        <button
          onClick={() => window.history.back()}
          className="button back"
          aria-label="Takaisin"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" />
          </svg>
          <span>{text.gdpr.buttonBack}</span>
        </button>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: data.tietosuojaseloste }}
        />
        <button
          onClick={() => window.history.back()}
          className="button back"
          aria-label="Takaisin"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" />
          </svg>
          <span>{text.gdpr.buttonBack}</span>
        </button>
      </main>
    </>
  );
};

export default TietosuojaPage;