import { graphql, useStaticQuery } from "gatsby";
import React, { useContext } from "react";
import { PopupButton } from "react-calendly";
import styled from "styled-components";
import { LocaleContext } from "../contexts/LocaleContext";
import { GetStartedForm } from "./GetStartedForm";
import * as snippet from "../locales";
import { GetStartedForm2 } from "./GetStartedForm2";

export const Booking = () => {
  const { locale } = useContext(LocaleContext);
  const text = snippet[locale];
  const data = useStaticQuery(graphql`
    query {
      fi: datoCmsTilaaDemo(locale: { eq: "fi" }) {
        pfTitle
        pfContent
        pfCta {
          text
          slug
        }
        calendlyBookingUrl
      }
      en: datoCmsTilaaDemo(locale: { eq: "en" }) {
        pfTitle
        pfContent
        pfCta {
          text
          slug
        }
        calendlyBookingUrl
      }
    }
  `);

  const booking = data[locale];

  return (
    <Div id="get-started" className="pagePadding">
      <div className="container padding col align-center">
        <h2>{booking.pfTitle}</h2>
        <div
          className="mb-[30px]"
          dangerouslySetInnerHTML={{ __html: booking.pfContent }}
        />
        {locale === "fi" && (
          <div className="DemoBtn">
            <PopupButton
              className="btn white-outlines"
              url={booking.calendlyBookingUrl}
              text={booking.pfCta[0].text}
            />
          </div>
        )}

        {locale === "en" && (
          <GetStartedForm2
            data={{
              name: "Get started EN",
              inputs: [
                {
                  type: "email",
                  name: "email",
                  label: text.contact.email,
                  isRequired: true,
                },
                { type: "submit", text: "Get started" },
              ],
              messages: {
                submitSucces: `<p>Thanks, follow your email.</p>`,
                fillAllInputs: text.contact.fillEmail,
              },
            }}
          />
        )}
      </div>
    </Div>
  );
};

const Div = styled.div`
  background: #000053;
  color: #fff;
  .container {
    padding-top: 120px;
    padding-bottom: 120px;
  }
  .DemoBtn {
    margin-top: 30px;
    button.btn.white-outlines {
      height: 72px;
      padding: 0 60px;
      font-size: 22px;
      &:hover {
        transition: all 0.2s;
      }
    }
  }
  h2 {
    font-size: 36px;
    margin-bottom: 30px;
    text-align: center;
  }
  p {
    font-size: 18px;
    margin-bottom: 18px;
    max-width: 580px;
    text-align: center;
    a {
      opacity: 0.7;
      text-decoration: underline;
      font-weight: 600;
      transition: 0.2s;
      &:hover {
        opacity: 1;
      }
    }
  }
  .box {
    width: 400px;
  }
  .cool {
    transform: rotateX(51deg) rotateZ(43deg);
    transform-style: preserve-3d;
    border-radius: 32px;
    box-shadow: 1px 1px 0 1px #f9f9fb, -1px 0 28px 0 rgba(34, 33, 81, 0.01),
      28px 28px 28px 0 rgba(34, 33, 81, 0.25);
    transition: 0.4s ease-in-out transform, 0.4s ease-in-out box-shadow;

    &:hover {
      transform: translate3d(0px, -16px, 0px) rotateX(51deg) rotateZ(43deg);
      box-shadow: 1px 1px 0 1px #f9f9fb, -1px 0 28px 0 rgba(34, 33, 81, 0.01),
        54px 54px 28px -10px rgba(34, 33, 81, 0.15);
    }
  }
`;
