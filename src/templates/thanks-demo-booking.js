import React, { useContext } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import { HelmetDatoCms } from "gatsby-source-datocms";
import styled from "styled-components";
import { Layout } from "../components/Layout";
import { theme } from "../theme/theme";
import { StaticImage } from "gatsby-plugin-image";

const content = {
  fi: {
    h1: "Kiitos varauksesta!",
    p: "Nähdään pian. Lähetimme kalenterivarauksen sähköpostiisi. Jos et saanut varausta tai sinulla on kysyttävää, ota yhteyttä lauri.pasma@jcad.fi.",
  },
  en: {
    h1: "Thanks for booking!",
    p: "See you soon.",
  },
  sv: {
    h1: "Tack för bokingen!",
    p: "Vi ses snart.",
  },
};

const Page = () => {
  const { locale } = useContext(LocaleContext);
  const text = snippet[locale];
  console.log("??");

  return (
    <div
      css={`
        .BgImg {
          position: absolute;
          top: 0;
          height: 100vh;
          left: 0;
          right: 0;
          z-index: 1;
        }
        footer {
          display: none;
        }
      `}
    >
      <Layout locale={locale} transparent={false}>
        <StaticImage
          className="BgImg"
          src="../images/nosturitaivas.jpg"
          placeholder="blurred"
          alt="Nosturi työmaalla"
        />
        <main
          className="pagePadding"
          css={`
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            z-index: 1;
            min-height: 100vh;
            background: linear-gradient(
              0deg,
              rgba(0, 0, 83, 0.75),
              rgba(0, 0, 83, 0.75)
            );
          `}
        >
          <div
            className="col container padding justify-center align-center"
            css={`
              min-height: 100vh;
              color: #fff;
              text-align: center;
              p {
                max-width: 550px;
              }
              h1 {
                text-transform: none;
                font-size: 42px;
                font-weight: 700;
                margin-top: 20px;
                margin-bottom: 20px;
                @media (max-width: 600px) {
                  font-size: 32px;
                }
              }
              .btn {
                margin-top: 20px;
              }
            `}
          >
            <svg
              width="110"
              height="110"
              viewBox="0 0 110 110"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="55"
                cy="55"
                r="53.5"
                stroke="white"
                stroke-width="3"
              />
              <path
                d="M86.8727 34.9224L48.9717 72.8228L29.1274 52.9787L26 56.1061L48.9717 79.0776L90 38.0498L86.8727 34.9224Z"
                fill="white"
              />
            </svg>

            <h1>{content[locale].h1}</h1>
            <p>{content[locale].p}</p>
            <p>
              <Link to="/" className="btn white-outlines">
                <strong>Jatka etusivulle</strong>
              </Link>
            </p>
          </div>
        </main>
      </Layout>
    </div>
  );
};

export default Page;
