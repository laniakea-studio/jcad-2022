import React, { useContext } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import { HelmetDatoCms } from "gatsby-source-datocms";
import styled from "styled-components";
import { Layout } from "../components/Layout";
import { theme } from "../theme/theme";
import { StaticImage } from "gatsby-plugin-image";
import { InlineWidget } from "react-calendly";

const content = {
  fi: {
    h1: "Varaa demo",
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

const Page = ({ pageContext }) => {
  const { locale } = useContext(LocaleContext);
  const text = snippet[locale];

  const { page } = pageContext.data;

  return (
    <Layout locale={locale} transparent={false}>
      <main
        className="pagePadding"
        css={`
          padding-top: 94px;
          background: ${theme.primary};
        `}
      >
        <div
          className="row container padding"
          css={`
            color: #fff;
            padding-top: 70px;
            @media (max-width: 700px) {
              padding-top: 30px;
              flex-direction: column;
            }
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
            .calendly-inline-widget {
              min-width: 300px;
              max-width: 400px;
              height: 1000px;
            }
          `}
        >
          <div className="col">
            <div
              className="row align-center Points"
              css={`
                margin-bottom: 20px;
                opacity: 0.65;

                span {
                  font-size: 17px;
                  font-weight: 600;
                  @media (max-width: 600px) {
                    font-size: 16px;
                  }
                }
                svg {
                  width: 20px;
                  margin-bottom: -7px;
                  margin-right: 5px;
                }
                span:not(:last-child) {
                  margin-right: 40px;
                }
              `}
            >
              <span className="inline-flex">
                <HourSvg />
                15-60 min.
              </span>
              <span className="inline-flex">
                <PlaceSvg />
                Teams
              </span>
            </div>
            <div
              css={`
                p {
                  margin-bottom: 15px;
                }
              `}
              dangerouslySetInnerHTML={{ __html: page.pageContent }}
            />
          </div>
          <div className="col">
            <InlineWidget
              url={`${page.calendlyLink}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=000053&text_color=ffffff&primary_color=ffffff`}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Page;

const DateSvg = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19.5 3.25004H20.5833C21.775 3.25004 22.75 4.22504 22.75 5.41671V20.5834C22.75 21.775 21.775 22.75 20.5833 22.75H5.41667C4.21417 22.75 3.25 21.775 3.25 20.5834V5.41671C3.25 4.22504 4.21417 3.25004 5.41667 3.25004H6.5V1.08337H8.66667V3.25004H17.3333V1.08337H19.5V3.25004ZM7.58333 10.8334H18.4167V13H7.58333V10.8334ZM20.5833 20.5834H5.41667V8.66671H20.5833V20.5834ZM7.58333 15.1667H15.1667V17.3334H7.58333V15.1667Z"
      fill="white"
    />
  </svg>
);

const HourSvg = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.9895 2.16663C7.00949 2.16663 2.16699 7.01996 2.16699 13C2.16699 18.98 7.00949 23.8333 12.9895 23.8333C18.9803 23.8333 23.8337 18.98 23.8337 13C23.8337 7.01996 18.9803 2.16663 12.9895 2.16663ZM13.0003 21.6666C8.21199 21.6666 4.33366 17.7883 4.33366 13C4.33366 8.21163 8.21199 4.33329 13.0003 4.33329C17.7887 4.33329 21.667 8.21163 21.667 13C21.667 17.7883 17.7887 21.6666 13.0003 21.6666ZM11.917 7.58329H13.542V13.2708L18.417 16.1633L17.6045 17.4958L11.917 14.0833V7.58329Z"
      fill="white"
    />
  </svg>
);

const PlaceSvg = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M23.8333 17.3334C23.8333 18.525 22.8583 19.5 21.6667 19.5H26V21.6667H0V19.5H4.33333C3.14167 19.5 2.16667 18.525 2.16667 17.3334V6.50004C2.16667 5.30837 3.14167 4.33337 4.33333 4.33337H21.6667C22.8583 4.33337 23.8333 5.30837 23.8333 6.50004V17.3334ZM21.6667 6.50004H4.33333V17.3334H21.6667V6.50004Z"
      fill="white"
    />
  </svg>
);
