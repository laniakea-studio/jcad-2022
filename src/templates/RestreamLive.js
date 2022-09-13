import React, { useContext } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import { HelmetDatoCms } from "gatsby-source-datocms";
import styled from "styled-components";
import { Layout } from "../components/Layout";
import { theme } from "../theme/theme";
import { NetlifyForm } from "@components/NetlifyForm";

const Page = ({ pageContext }) => {
  const { locale } = useContext(LocaleContext);
  const text = snippet[locale];
  const { page } = pageContext.data;

  // Date Format
  let d = new Date(page.webinaarinAjankohta);
  const date = d.toLocaleDateString("fi-FI", {
    weekday: "short",
    month: "numeric",
    day: "numeric",
  });
  const hour = d.toLocaleTimeString("fi-FI", {
    timeStyle: "short",
  });

  // Form data
  const form = {
    name: "Webinaari-kysymys",
    inputs: [
      {
        type: "textarea",
        name: "message",
        label: "",
        isRequired: true,
      },
      { type: "hidden", name: "webinarName", value: page.title },
      { type: "hidden", name: "webinarDate", value: date },
      { type: "submit", text: "Lähetä kysymys" },
    ],
    messages: {
      submitSucces: "Kiitos, kysymyksesi on vastaanotettu!",
      fillAllInputs: "Viestikenttä on tyhjä.",
    },
  };

  return (
    <>
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
              .SubTitle {
                text-transform: uppercase;
                font-weight: 500;
              }
              h1 {
                text-transform: none;
                font-size: 36px;
                margin: 5px auto 15px;
              }
              form label {
                display: none;
              }
              p.AskSomething {
                margin-top: 20px;
                font-weight: 600;
              }
            `}
          >
            <span className="SubTitle">Webinaari</span>
            <h1>{page.title}</h1>
            <div
              className="row align-center justify-center"
              css={`
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
              <span>
                <DateSvg />
                {date}
              </span>
              <span>
                <HourSvg />
                {hour}
              </span>
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: page.restreamCode }}
              css={`
                margin-top: 30px;
                width: 100%;
              `}
            />
          </section>
        </main>
      </Layout>
    </>
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
