import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { theme } from "../theme/theme";
import { Pin } from "./SvgCollection.js";
import fi from "../locales/fi.yml";
import en from "../locales/en.yml";
import sv from "../locales/sv.yml";
import { LocaleContext } from "../contexts/LocaleContext";
import { PopupButton } from "react-calendly";

export const Booking = ({ data }) => {
  const { locale, localeSlugs } = useContext(LocaleContext);
  const text = locale === "fi" ? fi : locale === "en" ? en : sv;

  return (
    <Div className="col wrap padding align-center">
      <h2>Miten JCAD toimii?</h2>
      <p>
        Tiiviin 15–60 min verkkotapaamisen aikana laskemme yhdessä, millä
        tavalla JCAD voisi tehostaa määrälaskentaa yrityksessänne.
      </p>
      <p>Näe omin silmin, miten JCAD toimii.</p>
      <div className="DemoBtn">
        <PopupButton
          className="btn white-outlines"
          url="https://calendly.com/jcad-booking/tilaa-demo"
          text="Tilaa demo"
        />
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
