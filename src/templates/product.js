import { HelmetDatoCms } from "gatsby-source-datocms";
import { graphql, Link, useStaticQuery } from "gatsby";
import React, { useContext } from "react";
import styled from "styled-components";
import kuva1 from "../assets/kuva1.jpg";
import kuva2 from "../assets/kuva2.jpg";
import kuva3 from "../assets/kuva3.jpg";
import { Booking } from "../components/Booking";
import { Layout } from "../components/Layout";
import {
  SvgCircle,
  SvgDashedLine,
  SvgHaircross,
} from "../components/SvgCollection";
import Ticker from "../components/Ticker";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import { theme } from "../theme/theme";
import scrollTo from "gatsby-plugin-smoothscroll";
import { MagneticButton } from "../components/MagneticButton";
import { useHover } from "../hooks/useHover";
import { Video } from "../components/Video";
import { getLocaleValue } from "@hooks/getLocaleValue";

const Product = ({ pageContext }) => {
  const { prefix } = useContext(LocaleContext);
  const { data, locale } = pageContext;
  const text = snippet[locale];

  const { bookDemo } = useStaticQuery(graphql`
    query {
      bookDemo: datoCmsTilaaDemo {
        slug: _allSlugLocales {
          locale
          value
        }
        title: _allTitleLocales {
          locale
          value
        }
      }
    }
  `);

  const [hoverRef] = useHover();

  return (
    <>
      <HelmetDatoCms seo={data.product.seoMetaTags} />
      <Layout locale={locale} transparent={false}>
        <Main>
          <div className="Hero pagePadding row">
            <div className="container row padding">
              <div
                className="col"
                css={`
                  padding-right: 40px;
                  @media (max-width: 600px) {
                    padding-right: 0;
                  }
                `}
              >
                <h1 dangerouslySetInnerHTML={{ __html: data.product.title }} />
                <p className="Lead">{data.product.lead}</p>
                {locale === "fi" && (
                  <div className="btns z-[1] flex-wrap">
                    <MagneticButton
                      ref={hoverRef}
                      className="btn white w-[180px] mr-[20px] mb-[20px]"
                      onClick={() => scrollTo("#customers")}
                      text={text.seeMore}
                    />
                    <Link
                      className="btn white-outlines w-[180px]"
                      to={prefix + getLocaleValue(bookDemo.slug, locale)}
                    >
                      {getLocaleValue(bookDemo.title, locale)}
                    </Link>
                  </div>
                )}
                {locale === "en" && (
                  <div className="btns z-[1] flex-wrap">
                    <MagneticButton
                      ref={hoverRef}
                      className="!hidden btn white w-[180px] mr-[20px] mb-[20px]"
                      onClick={() => scrollTo("#get-started")}
                      text="Get started free"
                    />
                    <Link
                      className="btn white-outlines w-[180px]"
                      to={prefix + getLocaleValue(bookDemo.slug, locale)}
                    >
                      {getLocaleValue(bookDemo.title, locale)}
                    </Link>
                  </div>
                )}

                <SvgCircle id="circle-2" />
              </div>
              <div className="col justify-center VideoCol">
                {data.product.video && (
                  <>
                    <Video
                      data={data.product.video[0].file}
                      poster={data.product.video[0].poster.url}
                      markers={data.product.video[0].markers}
                      plausibleGoalName={
                        data.product.video[0].plausibleGoalName
                      }
                    />
                    <p className="Videoteksti">
                      {data.product.video[0].videoteksti}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="pagePadding">
            <div id="customers" className="sec-1 container">
              <Ticker data={data.product.customers} />
              <p className="customers padding">
                {data.product.section1Content}
              </p>
              <div className="numberBox padding">
                <SvgNumberTopline />
                <SvgNumberFrame />

                <div className="number-1">
                  <span className="number">{data.product.activeUser}</span>
                  <span className="sub">{text.product.activeUsers}</span>
                </div>

                <div className="number-2">
                  <span className="number">
                    {data.product.customerHappiness.toLocaleString(locale)}
                    &nbsp;%
                  </span>
                  <span className="sub">
                    {text.product.customerHappiness}
                    <i className="tooltip">
                      <SvgTooltip />
                      <p
                        class="tooltiptext"
                        dangerouslySetInnerHTML={{
                          __html: data.product.tooltip,
                        }}
                      />
                    </i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="pagePadding">
            <div className="sec-2 padding container">
              <div className="Title">
                <SvgHaircross className="leftCircle" />
                <SvgDashedLine className="leftTitleLine" />
                <div className="titleBox">
                  <h2 className="blueBg">{text.product.benefits}</h2>
                </div>
                <SvgDashedLine className="rightTitleLine" />
                <SvgHaircross className="rightCircle" />
              </div>

              <div className="point">
                <div
                  className="content"
                  dangerouslySetInnerHTML={{
                    __html: data.product.points[0].content,
                  }}
                />
                <div className="image">
                  <img src={kuva1} alt="" />
                </div>
              </div>
              <div className="point">
                <SvgPoint2Frame />
                <div className="image">
                  <img src={kuva2} alt="" />
                </div>
                <div
                  className="content"
                  dangerouslySetInnerHTML={{
                    __html: data.product.points[1].content,
                  }}
                />
              </div>
              <div className="point">
                <div
                  className="content"
                  dangerouslySetInnerHTML={{
                    __html: data.product.points[2].content,
                  }}
                />
                <div className="image">
                  <img src={kuva3} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="pagePadding">
            <div className="sec-3 container padding wrap">
              <h2>{text.product.references}</h2>
              <div className="references">
                {data.references
                  .filter((item) => item.node.naytaSitaattiTuotesivulla)
                  .map(({ node }) => (
                    <div className="item" key={node.title}>
                      <h4>{node.title}</h4>
                      <p>{node.quote}</p>
                      <span>{node.nimi}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {locale === "fi" && <Booking locale={locale} />}
        </Main>
      </Layout>
    </>
  );
};

export default Product;

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  .heading {
    position: relative;
    height: 93px;
    display: flex;
    align-items: center;
    padding-left: 30px;
    overflow: hidden;
    h2 {
      font-size: 28px;
      text-transform: uppercase;
    }
    svg {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .Hero {
    background: ${theme.primary};
    height: 100%;
    color: #fff;
    position: relative;
    @media (max-width: 600px) {
      padding-top: 50px;
    }
    @media (max-width: 900px) {
      flex-direction: column;
    }

    .container {
      min-height: 700px;
      @media (max-width: 900px) {
        flex-direction: column;
        min-height: auto;
      }
    }
    .VideoCol {
      padding-right: 20px;
      padding-left: 20px;
      padding-top: 140px;
      padding-bottom: 40px;
      @media (max-width: 1300px) {
        padding-top: 80px;
      }
      @media (max-width: 900px) {
        padding-top: 40px;
        padding-right: 0;
        padding-left: 0;
      }
    }
    .wrap {
      height: 100vh;
      @media (max-width: 1500) {
        overflow: hidden;
      }
    }
    h1 {
      font-size: 46px;
      margin-bottom: 40px;
      font-weight: 400;
      margin-top: 200px;
      max-width: 540px;
      @media (max-width: 1300px) {
        font-size: 40px;
      }
      @media (max-width: 600px) {
        margin-top: 100px;
      }
    }
    p.Lead {
      font-size: 17px;
      line-height: 1.6;
      max-width: 520px;
      margin-bottom: 40px;
    }
    p.Videoteksti {
      font-size: 16px;
      text-align: center;
      margin: 0;
      font-weight: 600;
      padding: 10px 10px 0;
      @media (max-width: 1000px) {
        font-size: 14px;
      }
    }
    .btns {
      display: flex;
      margin-bottom: 40px;
      > button {
        width: 200px;
        z-index: 1;
        padding-left: 5px;
        padding-right: 5px;
      }
      > button:not(:last-child) {
        margin-right: 30px;
      }
      .white-outlines {
        background-color: rgba(0, 0, 83, 0.4);
        -webkit-backdrop-filter: blur(2px);
        backdrop-filter: blur(2px);
      }
    }
    #circle-1 {
      position: absolute;
      bottom: 0;
      right: 0;
      margin-right: -200px;
      margin-bottom: -200px;
      animation: spin 180s infinite;
      @media (max-width: 800px) {
        display: none;
        margin-bottom: -600px;
      }
    }
    #circle-2 {
      position: absolute;
      bottom: 0;
      left: 0;
      margin-left: -200px;
      margin-bottom: -650px;
      animation: spin 130s infinite;
      animation-direction: reverse;
      @media (max-width: 1100px) {
        display: none;
      }
    }
    @keyframes spin {
      to {
        -webkit-transform: rotate(360deg);
      }
    }
    @-webkit-keyframes spin {
      to {
        -webkit-transform: rotate(360deg);
      }
    }
    @media (max-width: 700px) {
      h1 {
        font-size: 42px;
      }
      p {
        font-size: 18px;
      }
    }
  }
  .sec-1 {
    padding-top: 40px;
    padding-bottom: 40px;
    &.container {
      border-color: #000;
    }
    .customers {
      font-size: 18px;
      max-width: 720px;
      margin: 50px auto 80px;
      text-align: center;
      @media (max-width: 600px) {
        font-size: 18px;
      }
    }
    .SvgNumberFrame,
    .SvgNumberTopline {
      position: absolute;
      width: 100%;
      @media (max-width: 600px) {
        display: none;
      }
    }
    .numberBox {
      margin-top: 40px;
      position: relative;
      display: flex;
      justify-content: center;
      height: 300px;
      overflow: hidden;
      > div {
        display: flex;
        flex-direction: column;
        align-self: center;
        flex-basis: 420px;
      }
      .number-1 {
        .sub {
          padding-left: 20px;
        }
        @media (max-width: 900px) {
          padding-left: 10%;
        }
      }
      .number-2 {
        padding-left: 60px;
      }
      @media (max-width: 600px) {
        flex-direction: column;
        .number-1,
        .number-2 {
          padding-left: 0;
          > span.sub {
            padding-left: 0;
            margin-top: 4px;
            margin-bottom: 30px;
            @media (max-width: 600px) {
              text-align: center;
            }
          }
        }
      }
    }
    span.number {
      font-size: 150px;
      line-height: 1;
      letter-spacing: -0.05em;
      @media (max-width: 1000px) {
        font-size: 100px;
      }
      @media (max-width: 600px) {
        text-align: center;
      }
    }
    span.sub {
      margin-top: -10px;
      font-size: 26px;
      text-transform: uppercase;
      position: relative;
      display: inline;
      @media (max-width: 900px) {
        font-size: 20px;
      }
    }
    i.tooltip {
      width: 21px;
      height: 21px;
      background: #000;
      border-radius: 50%;
      position: relative;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      top: -12px;
      right: -4px;
      cursor: pointer;
      p.tooltiptext {
        visibility: hidden;
        width: 220px;
        background-color: #000;
        color: #fff;
        text-transform: none;
        padding: 15px;
        font-size: 15px;
        border-radius: 6px;
        position: absolute;
        font-family: "din-2014", sans-serif;
        font-style: normal;
        white-space: pre-line;
        z-index: 1;
        bottom: 115%;
        left: 50%;
        margin-left: -60px;
        opacity: 0;
        transition: opacity 0.3s;
        @media (max-width: 600px) {
          margin-left: -160px;
        }
        &:after {
          content: "";
          position: absolute;
          top: 100%;
          left: 24%;
          margin-left: -5px;
          border-width: 12px;
          border-style: solid;
          border-color: #000 transparent transparent transparent;
        }
      }
      &:hover p.tooltiptext {
        visibility: visible;
        opacity: 1;
      }
    }
  }
  .Title {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-top: 60px;
    margin-bottom: 40px;
    .leftCircle,
    .leftTitleLine {
      position: absolute;
      margin: auto;
      left: 40px;
      top: 0;
      bottom: 0;
    }
    .SvgHaircross {
      path {
        stroke: #000;
      }
    }
    .SvgDashedLine {
      line {
        stroke: #000;
      }
    }
    .titleBox {
      width: 640px;
      height: 94px;
      border: 1px solid #000;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      justify-content: center;
      h2.blueBg {
        font-size: 38px;
        background: #fff;
        padding: 0 20px;
        z-index: 1;
        letter-spacing: 0.05em;
        color: #000;
      }
    }
    .rightCircle,
    .rightTitleLine {
      position: absolute;
      margin: auto;
      right: 40px;
      top: 0;
      bottom: 0;
    }
    @media (max-width: 900px) {
      justify-content: flex-start;
      .SvgHaircross,
      .SvgDashedLine {
        display: none;
      }
      .titleBox h2.blueBg {
        font-size: 28px;
      }
    }
  }
  .sec-2 {
    display: flex;
    flex-direction: column;
    &.container {
      border-color: #000;
      padding-bottom: 50px;
    }
    .point {
      display: flex;
      min-height: 340px;
      align-items: center;
      position: relative;
      padding-left: 160px;
      padding-right: 160px;
      @media (max-width: 1300px) {
        padding-left: 100px;
        padding-right: 100px;
      }
      @media (max-width: 1000px) {
        padding-left: 0;
        padding-right: 0;
      }
      h3 {
        font-size: 20px;
      }
      @media (max-width: 700px) {
        padding-top: 40px;
        padding-bottom: 40px;
        flex-direction: column;
        img {
          padding-top: 20px;
        }
        &:nth-child(odd) {
          flex-direction: column-reverse;
        }
      }

      .SvgPoint2Frame {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
      }
      > div {
        flex: 1;
      }
      h3,
      p {
        max-width: 470px;
      }
      p {
        margin-top: 15px;
        font-size: 18px;
        font-weight: 400;
        @media (max-width: 600px) {
          font-size: 18px;
        }
      }
      .image {
        display: flex;
        justify-content: center;
        align-items: center;
        > img {
          width: 100%;
          max-width: 300px;
        }
      }
    }
    .point:nth-child(odd) .image > img {
      margin-right: auto;
    }
  }
  .sec-3 {
    display: flex;
    flex-direction: column;
    h2 {
      font-size: 36px;
      text-align: center;
      @media (max-width: 600px) {
        font-size: 28px;
      }
    }
    &.container {
      border-color: #000;
      padding-top: 80px;
      border-top: 0.8px dashed #000;
    }
    .references {
      display: flex;
      justify-content: center;
      padding-top: 60px;
      padding-bottom: 120px;
      @media (max-width: 700px) {
        flex-direction: column;
      }
    }
    .item {
      display: flex;
      flex-direction: column;
      padding-right: 40px;
      padding-bottom: 60px;
      h4,
      p,
      span {
        max-width: 420px;
      }
      h4 {
        font-weight: 700;
        font-size: 24px;
        margin-bottom: 24px;
      }
      p {
        font-size: 18px;
      }
      span {
        margin-top: 10px;
        font-size: 15px;
        text-transform: uppercase;
      }
    }
  }
`;
5;
const SvgTooltip = () => (
  <svg
    width="9"
    height="13"
    viewBox="0 0 9 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.46026 9.598V9.04C5.46026 8.446 5.71226 8.212 6.07226 7.852L6.66626 7.276C7.65626 6.304 8.46626 5.296 8.46626 3.856C8.46626 1.516 6.66626 0.417999 4.56026 0.417999C2.50826 0.417999 0.780258 1.516 0.780258 3.748H3.15626C3.17426 2.938 3.82226 2.524 4.56026 2.524C5.35226 2.524 5.94626 3.01 5.94626 3.838C5.94626 4.684 5.51426 5.134 4.79426 5.818L3.98426 6.592C3.40826 7.15 3.28226 7.6 3.28226 8.356V9.598H5.46026ZM5.60426 13H3.13826V10.552H5.60426V13Z"
      fill="#fff"
    />
  </svg>
);

const SvgHeaderFrameWide = () => (
  <svg
    width="1179"
    viewBox="0 0 1179 93"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="M581.809 49.5802V45.244" stroke="black" stroke-width="0.6" />
      <path
        d="M1179.71 47.2522H1164.01M827.639 33.2663V20.1232V33.2663ZM827.639 14.0756V0.926514V14.0756Z"
        stroke="black"
        stroke-width="0.6"
      />
      <path
        d="M1173.52 47.2502H1113.17"
        stroke="black"
        stroke-width="0.6"
        stroke-dasharray="5.41 1.41"
      />
      <path
        d="M1179.71 92.0767H1.88184V0.929565H1179.71V92.0767Z"
        stroke="black"
        stroke-width="0.6"
      />
      <path
        d="M1179 -20.9999V110.351"
        stroke="black"
        stroke-width="0.6"
        stroke-dasharray="5.95 1.57"
      />
    </g>
  </svg>
);
const SvgPoint2Frame = () => (
  <svg
    className="SvgPoint2Frame"
    viewBox="0 0 1184 409"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.92925e-06 332.999H453.773M1183.15 403.634L453.795 403.634L453.795 5.23989L1183.15 5.23989L1183.15 403.634ZM453.773 403.62L453.795 403.637L453.773 403.62ZM7.92925e-06 5.22606H453.773H7.92925e-06Z"
      stroke="black"
      stroke-width="0.6"
    />
    <path
      d="M823.989 5.2417V14.6722M470.173 207.472L454.427 207.472L470.173 207.472Z"
      stroke="black"
      stroke-width="0.6"
    />
    <path
      d="M824.487 282.736V292.166M824.487 124.089V133.516V124.089Z"
      stroke="black"
      stroke-width="0.6"
    />
    <path
      d="M824.487 297.026V391.774"
      stroke="black"
      stroke-width="0.6"
      stroke-dasharray="5.95 1.57"
    />
    <path
      d="M1183.15 207.47H1167.35M824.487 394.204V403.635V394.204Z"
      stroke="black"
      stroke-width="0.6"
    />
    <path
      d="M453.795 399.059C450.356 399.059 447.569 401.108 447.569 403.633C447.569 406.157 450.357 408.21 453.795 408.21C457.233 408.21 460.021 406.161 460.021 403.633C460.021 401.105 457.232 399.059 453.795 399.059Z"
      stroke="black"
      stroke-width="0.6"
    />
    <path d="M430.685 367.417H476.875" stroke="black" stroke-width="0.6" />
    <path
      d="M453.795 362.841C450.356 362.841 447.569 364.89 447.569 367.415C447.569 369.939 450.357 371.992 453.795 371.992C457.233 371.992 460.021 369.943 460.021 367.415C460.021 364.887 457.232 362.841 453.795 362.841Z"
      stroke="black"
      stroke-width="0.6"
    />
    <path d="M430.685 331.199H476.875" stroke="black" stroke-width="0.6" />
    <path
      d="M453.795 326.623C450.356 326.623 447.569 328.672 447.569 331.197C447.569 333.721 450.357 335.775 453.795 335.775C457.233 335.775 460.021 333.726 460.021 331.198C460.021 328.67 457.232 326.623 453.795 326.623Z"
      stroke="black"
      stroke-width="0.6"
    />
    <path d="M430.685 294.981H476.875" stroke="black" stroke-width="0.6" />
    <path
      d="M453.795 290.405C450.356 290.405 447.569 292.454 447.569 294.979C447.569 297.503 450.357 299.557 453.795 299.557C457.233 299.557 460.021 297.507 460.021 294.98C460.021 292.452 457.232 290.405 453.795 290.405Z"
      stroke="black"
      stroke-width="0.6"
    />
    <path d="M430.685 258.763H476.875" stroke="black" stroke-width="0.6" />
    <path
      d="M453.795 254.188C450.356 254.188 447.569 256.237 447.569 258.761C447.569 261.286 450.357 263.339 453.795 263.339C457.233 263.339 460.021 261.29 460.021 258.762C460.021 256.234 457.232 254.188 453.795 254.188Z"
      stroke="black"
      stroke-width="0.6"
    />
    <path d="M430.685 222.547H476.875" stroke="black" stroke-width="0.6" />
    <path
      d="M453.795 217.971C450.356 217.971 447.569 220.02 447.569 222.545C447.569 225.069 450.357 227.122 453.795 227.122C457.233 227.122 460.021 225.073 460.021 222.545C460.021 220.017 457.232 217.971 453.795 217.971Z"
      stroke="black"
      stroke-width="0.6"
    />
    <path d="M430.685 186.329H476.875" stroke="black" stroke-width="0.6" />
    <path
      d="M453.795 181.754C450.356 181.754 447.569 183.803 447.569 186.327C447.569 188.852 450.357 190.905 453.795 190.905C457.233 190.905 460.021 188.856 460.021 186.328C460.021 183.8 457.232 181.754 453.795 181.754Z"
      stroke="black"
      stroke-width="0.6"
    />
    <path d="M430.685 150.111H476.875" stroke="black" stroke-width="0.6" />
    <path
      d="M453.795 145.536C450.356 145.536 447.569 147.585 447.569 150.109C447.569 152.634 450.357 154.687 453.795 154.687C457.233 154.687 460.021 152.638 460.021 150.11C460.021 147.582 457.232 145.536 453.795 145.536Z"
      stroke="black"
      stroke-width="0.6"
    />
    <path d="M430.685 113.894H476.875" stroke="black" stroke-width="0.6" />
    <path
      d="M453.795 109.318C450.356 109.318 447.569 111.367 447.569 113.891C447.569 116.416 450.357 118.469 453.795 118.469C457.233 118.469 460.021 116.42 460.021 113.892C460.021 111.364 457.232 109.318 453.795 109.318Z"
      stroke="black"
      stroke-width="0.6"
    />
    <path d="M430.685 77.6755H476.875" stroke="black" stroke-width="0.6" />
    <path
      d="M453.795 73.0998C450.356 73.0998 447.569 75.149 447.569 77.6735C447.569 80.1979 450.357 82.2512 453.795 82.2512C457.233 82.2512 460.021 80.2021 460.021 77.6742C460.021 75.1462 457.232 73.0998 453.795 73.0998Z"
      stroke="black"
      stroke-width="0.6"
    />
    <path d="M430.685 41.4575H476.875" stroke="black" stroke-width="0.6" />
    <path
      d="M453.795 36.8821C450.356 36.8821 447.569 38.9312 447.569 41.4557C447.569 43.9802 450.357 46.0334 453.795 46.0334C457.233 46.0334 460.021 43.9843 460.021 41.4564C460.021 38.9285 457.232 36.8821 453.795 36.8821Z"
      stroke="black"
      stroke-width="0.6"
    />
    <path
      d="M430.685 5.2417L476.875 5.2417"
      stroke="black"
      stroke-width="0.6"
    />
    <path
      d="M453.795 0.666252C450.356 0.666252 447.569 2.7154 447.569 5.23987C447.569 7.76434 450.357 9.81763 453.795 9.81763C457.233 9.81763 460.021 7.76848 460.021 5.24056C460.021 2.71263 457.232 0.666252 453.795 0.666252Z"
      stroke="black"
      stroke-width="0.6"
    />
  </svg>
);
const SvgHeadingFrame = () => (
  <svg
    className="SvgHeadingFrame"
    width="559"
    height="93"
    viewBox="0 0 559 93"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="M275.854 49.5801V45.2439" stroke="black" stroke-width="0.6" />
      <path
        d="M559.335 47.2522H551.89M392.409 33.2663V20.1232V33.2663ZM392.409 14.0756V0.926514V14.0756Z"
        stroke="black"
        stroke-width="0.6"
      />
      <path
        d="M556.399 47.2502H527.788"
        stroke="black"
        stroke-width="0.6"
        stroke-dasharray="5.41 1.41"
      />
      <path
        d="M559.335 92.0769H0.89209V0.929688H559.335V92.0769Z"
        stroke="black"
        stroke-width="0.6"
      />
      <path
        d="M559 -20.9999V110.351"
        stroke="black"
        stroke-width="0.6"
        stroke-dasharray="5.95 1.57"
      />
    </g>
    <defs>
      <clipPath id="clip0_2_419">
        <rect width="559" height="93" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const SvgNumberTopline = () => (
  <svg
    className="SvgNumberTopline"
    width="1287"
    height="13"
    viewBox="0 0 1287 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_2_392)">
      <path
        d="M1274.98 0.542049L1286.11 11.675M1280.55 6.10505L643.117 6.10505L1280.55 6.10505ZM1286.11 0.542049L1274.98 11.675L1286.11 0.542049ZM966.916 0.542049L955.787 11.675L966.916 0.542049ZM648.676 0.542049L637.547 11.675L648.676 0.542049ZM637.547 0.542049L648.676 11.675L637.547 0.542049ZM955.787 0.542049L966.916 11.675L955.787 0.542049Z"
        stroke="black"
        stroke-width="0.6"
      />
      <path
        d="M637.978 0.542049L649.111 11.675M643.548 6.10505L6.11707 6.10505L643.548 6.10505ZM649.111 0.542049L637.978 11.675L649.111 0.542049ZM329.916 0.542049L318.787 11.675L329.916 0.542049ZM11.6761 0.542049L0.547058 11.675L11.6761 0.542049ZM0.547058 0.542049L11.6761 11.675L0.547058 0.542049ZM318.787 0.542049L329.916 11.675L318.787 0.542049Z"
        stroke="black"
        stroke-width="0.6"
      />
    </g>
    <defs>
      <clipPath id="clip0_2_392">
        <rect width="1286.65" height="12.222" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const SvgNumberFrame = () => (
  <svg
    className="SvgNumberFrame"
    width="1197"
    height="342"
    viewBox="0 0 1197 342"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M1185.65 0V342"
        stroke="black"
        stroke-width="0.6"
        stroke-dasharray="4 4"
      />
      <path
        d="M11.353 342L11.353 -9.65595e-06"
        stroke="black"
        stroke-width="0.6"
        stroke-dasharray="4 4"
      />
      <path
        d="M80.0908 342L80.0908 -9.65595e-06"
        stroke="black"
        stroke-width="0.6"
        stroke-dasharray="4 4"
      />
      <path
        d="M1112.16 342V-9.65595e-06"
        stroke="black"
        stroke-width="0.6"
        stroke-dasharray="4 4"
      />
      <path
        d="M598.895 329.872V-12.1277"
        stroke="black"
        stroke-width="0.6"
        stroke-dasharray="4 4"
      />
      <path
        d="M1185.79 168.17L1087.81 168.17"
        stroke="black"
        stroke-width="0.6"
        stroke-dasharray="4 4"
      />
      <path
        d="M10.998 168.979H107.981"
        stroke="black"
        stroke-width="0.6"
        stroke-dasharray="4 4"
      />
      <path
        d="M1185.65 177.636V159.276M1185.65 174.942C1186.68 174.942 1187.71 174.777 1188.66 174.457C1189.62 174.137 1190.49 173.667 1191.22 173.075C1191.95 172.483 1192.54 171.78 1192.93 171.006C1193.33 170.233 1193.53 169.404 1193.53 168.566C1193.53 167.729 1193.33 166.9 1192.93 166.127C1192.54 165.353 1191.95 164.65 1191.22 164.058C1190.49 163.466 1189.62 162.996 1188.66 162.676C1187.71 162.355 1186.68 162.191 1185.65 162.191C1183.56 162.191 1181.55 162.862 1180.07 164.058C1178.59 165.254 1177.76 166.875 1177.76 168.566C1177.76 169.404 1177.97 170.233 1178.36 171.006C1178.76 171.78 1179.34 172.483 1180.07 173.075C1181.55 174.271 1183.56 174.942 1185.65 174.942V174.942Z"
        stroke="black"
        stroke-width="0.6"
      />
      <path d="M1174.29 168.456H1197" stroke="black" stroke-width="0.6" />
      <path
        d="M11.3527 159.276L11.3527 177.637M11.3527 161.97C10.3173 161.97 9.29198 162.135 8.33538 162.456C7.37877 162.776 6.50958 163.246 5.77742 163.838C5.04527 164.43 4.46449 165.133 4.06825 165.906C3.67201 166.68 3.46807 167.509 3.46807 168.346C3.46807 169.184 3.67201 170.013 4.06825 170.786C4.46449 171.56 5.04527 172.263 5.77742 172.855C6.50958 173.447 7.37877 173.917 8.33538 174.237C9.29198 174.557 10.3173 174.722 11.3527 174.722C13.4438 174.722 15.4493 174.051 16.928 172.855C18.4066 171.659 19.2373 170.037 19.2373 168.346C19.2373 167.509 19.0334 166.68 18.6371 165.906C18.2409 165.133 17.6601 164.43 16.928 163.838C15.4493 162.642 13.4438 161.97 11.3527 161.97V161.97Z"
        stroke="black"
        stroke-width="0.6"
      />
      <path
        d="M22.7051 168.457H6.06702e-05"
        stroke="black"
        stroke-width="0.6"
      />
      <g clip-path="url(#clip1_2_186)">
        <path
          d="M1230.76 320.608L1241.89 329.609M1236.33 325.106L599.012 325.106L1236.33 325.106ZM1241.89 320.608L1230.76 329.609L1241.89 320.608ZM922.754 320.608L911.627 329.609L922.754 320.608ZM604.57 320.608L593.443 329.609L604.57 320.608ZM593.443 320.608L604.57 329.609L593.443 320.608ZM911.627 320.608L922.754 329.609L911.627 320.608Z"
          stroke="black"
          stroke-width="0.6"
        />
        <path
          d="M593.874 320.608L605.005 329.609M599.443 325.106L-37.8764 325.106L599.443 325.106ZM605.005 320.608L593.874 329.609L605.005 320.608ZM285.866 320.608L274.739 329.609L285.866 320.608ZM-32.3184 320.608L-43.4455 329.609L-32.3184 320.608ZM-43.4455 320.608L-32.3184 329.609L-43.4455 320.608ZM274.739 320.608L285.866 329.609L274.739 320.608Z"
          stroke="black"
          stroke-width="0.6"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_2_186">
        <rect width="1197" height="342" fill="white" />
      </clipPath>
      <clipPath id="clip1_2_186">
        <rect
          width="1286.43"
          height="9.88159"
          fill="white"
          transform="translate(-43.9922 320.17)"
        />
      </clipPath>
    </defs>
  </svg>
);
