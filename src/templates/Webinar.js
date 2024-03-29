import React, { useContext } from "react";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import { HelmetDatoCms } from "gatsby-source-datocms";
import styled from "styled-components";
import { Layout } from "../components/Layout";
import { theme } from "../theme/theme";
import { NetlifyForm } from "../components/NetlifyForm";

const Page = ({ pageContext }) => {
  const { locale } = useContext(LocaleContext);
  const text = snippet[locale];
  const { page, redirectTo } = pageContext.data;

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

  const dateLong = d.toLocaleDateString("fi-FI", {
    weekday: "long",
    month: "numeric",
    day: "numeric",
  });

  const dateAndTime = `${dateLong} klo ${hour}`;

  // Form
  const form = {
    name: "Webinaari",
    inputs: [
      {
        type: "email",
        name: "email",
        label: text.contact.email,
        isRequired: true,
      },
      { type: "hidden", name: "webinarName", value: page.title },
      { type: "hidden", name: "webinarDate", value: date },
      { type: "hidden", name: "webinarDateAndTime", value: dateAndTime },
      { type: "submit", text: "Ilmoittaudu" },
    ],
    messages: {
      submitSucces:
        "Kiitos ilmoittautumisesta! Saat lisätietoja sähköpostiisi myöhemmin.",
      fillAllInputs: "Anna sähköpostiosoitteesi.",
    },
  };

  return (
    <>
      <HelmetDatoCms seo={page.seoMetaTags} />
      <Layout locale={locale} transparent={false}>
        <Main
          className="pagePadding"
          css={`
            p {
              margin-bottom: 14px;
            }
          `}
        >
          <div className="container padding row">
            <div className="col">
              <button
                onClick={() => window.history.back()}
                className="Back"
                aria-label={text.gdpr.buttonBack}
              >
                <span>{text.gdpr.buttonBack}</span>
              </button>

              <h1>{page.title}</h1>
              <div
                className="row align-center Points"
                css={`
                  svg {
                    width: 20px;
                    margin-bottom: -7px;
                    margin-right: 5px;
                  }
                  span:not(:last-child) {
                    margin-right: 40px;
                    @media (max-width: 600px) {
                      margin-right: 20px;
                    }
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
                <span>
                  <PlaceSvg />
                  Verkko
                </span>
              </div>
              <div
                className="Content"
                dangerouslySetInnerHTML={{ __html: page.kuvaus }}
              />
              <div className="Speaker flex flex-col">
                <h4 className="pb-[10px]">Puhuja</h4>
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: page.puhuja }}
                />
              </div>
            </div>
            <div
              className="col"
              css={`
                h2 {
                  text-transform: uppercase;
                  font-weight: 600;
                  font-size: 19px;
                }
              `}
            >
              <h2>Ilmoittaudu webinaariin</h2>
              <p>Jätä sähköpostisi ja saat kutsun webinaariin.</p>
              <NetlifyForm
                data={form}
                plausibleGoal="Ilmoittautui webinaariin"
                redirectOnSuccess={redirectTo}
              />
            </div>
          </div>
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
  padding-top: 94px;
  .Back {
    display: inline-flex;
    align-items: center;
    color: #fff;
    width: fit-content;
    text-transform: uppercase;
    margin-bottom: 30px;
    font-weight: 600;
    font-size: 13px;
    opacity: 0.5;
    &:hover {
      opacity: 0.8;
    }
  }
  .Points {
    margin-bottom: 20px;
  }
  .Points span {
    font-size: 16px;
    font-weight: 600;
    display: inline-flex;
    @media (max-width: 600px) {
      font-size: 16px;
    }
  }
  .container {
    @media (max-width: 900px) {
      flex-direction: column;
    }
    > .col:first-child {
      flex: 1 0 0;
      border-right: 0.8px dashed #fff;
      padding-top: 40px;
      padding-right: 40px;
      padding-bottom: 70px;
      @media (max-width: 900px) {
        border-right: none;
        padding-top: 0;
        padding-right: 0;
      }
    }
    > .col:last-child {
      padding-top: 70px;
      flex: 1 0 0;
      padding-bottom: 70px;
      padding-left: 40px;
      @media (max-width: 900px) {
        padding-top: 0;
        padding-left: 0;
      }
    }
  }
  p {
    font-size: 17px;
    line-height: 25px;
  }
  h1 {
    font-size: 36px;
    text-transform: none;
    font-weight: 400;
    margin-bottom: 35px;
  }
  h2 {
    font-size: 26px;
    text-transform: none;
    margin: 30px 0 10px;
  }
  h3 {
    font-size: 20px;
    text-transform: none;
    margin: 30px 0 10px;
  }
  .Content {
    margin-top: 10px;
    padding-bottom: 40px;
    border-bottom: 0.8px dashed #fff;
  }
  .Speaker {
    margin-top: 30px;
    h4 {
      text-transform: uppercase;
      margin-right: 40px;
    }
  }
`;

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
