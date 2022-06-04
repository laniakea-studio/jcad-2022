import { graphql, useStaticQuery } from "gatsby";
import React, { useContext } from "react";
import { PopupButton } from "react-calendly";
import styled from "styled-components";
import { LocaleContext } from "../contexts/LocaleContext";
import en from "../locales/en.yml";
import fi from "../locales/fi.yml";
import sv from "../locales/sv.yml";
import { theme } from "../theme/theme";

export const Booking = () => {
  const { locale, localeSlugs } = useContext(LocaleContext);
  const text = locale === "fi" ? fi : locale === "en" ? en : sv;

  const data = useStaticQuery(graphql`
    query {
      bookingFi: datoCmsTilaaDemo(locale: { eq: "fi" }) {
        title
        content
        calendlyBookingUrl
        buttonText
      }
      bookingEn: datoCmsTilaaDemo(locale: { eq: "en" }) {
        title
        content
        calendlyBookingUrl
        buttonText
      }
      bookingSv: datoCmsTilaaDemo(locale: { eq: "sv" }) {
        title
        content
        calendlyBookingUrl
        buttonText
      }
    }
  `);

  const booking =
    locale === "fi"
      ? data.bookingFi
      : locale === "en"
      ? data.bookingEn
      : data.bookingSv;

  return (
    <Div>
      <div className="container padding col align-center">
        <h2>{booking.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: booking.content }} />
        <div className="DemoBtn">
          <PopupButton
            className="btn white-outlines"
            url={booking.calendlyBookingUrl}
            text={booking.buttonText}
          />
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div`
  background: ${theme.primary};
  color: #fff;
  padding-top: 120px;
  padding-bottom: 120px;
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
    font-size: 52px;
    margin-bottom: 30px;
    text-align: center;
  }
  p {
    max-width: 580px;
    text-align: center;
    font-size: 20px;
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
