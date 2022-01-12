import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { useEffect, useState, useContext } from "react";
import { useScrollYPosition } from "react-use-scroll-position";
import ReactVivus from "react-vivus";
import svgBg1 from "../assets/svgBg1.svg";
import svgTriangle from "../assets/svgTriangle.svg";

import {
  Svg2ndBottomRight,
  SvgBg2,
  SvgCircle,
  SvgDottedThinX,
  SvgDottedThinX2,
  SvgHorizontal,
  SvgLineXXX,
  SvgVertical,
  SvgVerticalXXX,
} from "../components/SvgCollection-2021";
import Ticker from "../components/Ticker";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import "../theme-2021/globals.css";
import theme from "../theme-2021/theme";

import styled from "styled-components";
import { Layout } from "../components/Layout";
import { LocaleContext } from "../contexts/LocaleContext";
import fi from "../locales/fi.yml";
import en from "../locales/en.yml";
import sv from "../locales/sv.yml";

const HomePage = ({ pageContext }) => {
  const { locale, localeSlugs } = useContext(LocaleContext);
  const text = locale === "fi" ? fi : locale === "en" ? en : sv;
  const { data } = pageContext;

  const { height } = useWindowDimensions();
  const { scrollY } = useViewportScroll();
  const [showModal, setShowModal] = useState(false);

  const [pulseOne, setPulseOne] = useState(false);
  const [pulseTwo, setPulseTwo] = useState(false);
  const [pulseThree, setPulseThree] = useState(false);

  const yPosition = useScrollYPosition();
  const heroImg = useTransform(scrollY, [0, height], [0, 20]);
  const startAnim4 = height * 2;

  useEffect(() => {
    if (yPosition < startAnim4 + height && !pulseOne) {
      setPulseOne(true);
      setPulseTwo(false);
      setPulseThree(false);
      return;
    }
    if (
      yPosition > startAnim4 + height &&
      yPosition < startAnim4 + height * 2.1 &&
      !pulseTwo
    ) {
      setPulseOne(false);
      setPulseTwo(true);
      setPulseThree(false);
      return;
    }
    if (yPosition > startAnim4 + height * 2.1 && !pulseThree) {
      setPulseOne(false);
      setPulseTwo(false);
      setPulseThree(true);
      return;
    }

    return;
  }, [yPosition]);

  // Hero Animations
  const opacity_1 = useTransform(
    scrollY,
    [0, 0.1 * height, 0.2 * height],
    [1, 0.9, 0]
  );
  const opacity_2 = useTransform(
    scrollY,
    [0.2 * height, 0.3 * height, 0.4 * height],
    [0, 0.5, 1]
  );
  const opacity_3 = useTransform(
    scrollY,
    [0.4 * height, 0.5 * height, 0.6 * height],
    [0, 0.5, 1]
  );

  // Blue Section Animations
  const opacity_4 = useTransform(
    scrollY,
    [startAnim4, startAnim4 + 0.9 * height, startAnim4 + height],
    [1, 1, 0]
  );
  const opacity_4b = useTransform(
    scrollY,
    [startAnim4, startAnim4 + 0.9 * height, startAnim4 + height],
    [1, 1, 0]
  );
  const circle_4 = useTransform(
    scrollY,
    [startAnim4, startAnim4 + height],
    [0, 1]
  );
  const opacity_5 = useTransform(
    scrollY,
    [
      startAnim4 + height,
      startAnim4 + height * 1.1,
      startAnim4 + height * 2.0,
      startAnim4 + height * 2.1,
    ],
    [0, 1, 1, 0]
  );
  const opacity_5b = useTransform(
    scrollY,
    [
      startAnim4 + height,
      startAnim4 + height * 1.1,
      startAnim4 + height * 2.0,
      startAnim4 + height * 2.1,
    ],
    [0, 1, 1, 0]
  );
  const circle_5 = useTransform(
    scrollY,
    [startAnim4 + height, startAnim4 + height * 2.1],
    [0, 1]
  );
  const opacity_6 = useTransform(
    scrollY,
    [startAnim4 + height * 2.1, startAnim4 + height * 2.2],
    [0, 1]
  );
  const opacity_6b = useTransform(
    scrollY,
    [startAnim4 + height * 2.1, startAnim4 + height * 2.2],
    [0, 1]
  );
  const circle_6 = useTransform(
    scrollY,
    [startAnim4 + height * 2.1, startAnim4 + height * 3],
    [0, 1]
  );

  // Asiakaskokemukset Circle Animation
  const circleRotate = useTransform(scrollY, [0, 9000], [0, 900]);
  const circleRotateSpring = useSpring(circleRotate, {
    stiffness: 400,
    damping: 90,
  });

  // Slides Navigation
  const goTo = (destination) => {
    if (destination === "slide_1") {
      window.scrollTo({
        top: startAnim4,
        behavior: "smooth",
      });
    }
    if (destination === "slide_2") {
      window.scrollTo({
        top: startAnim4 + height * 1.1,
        behavior: "smooth",
      });
    }
    if (destination === "slide_3") {
      window.scrollTo({
        top: startAnim4 + height * 2.2,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Layout seo={data.home.seoMetaTags} showModal={() => setShowModal(true)}>
        <main className="homePage">
          <div
            css={`
              position: fixed;
              top: 0;
              width: 1px;
              height: 100vh;
              margin-left: 40px;
              z-index: 1;
              background: #fff;
              ${theme.laptop} {
                margin-left: 40px;
              }
              ${theme.tablet} {
                display: none;
              }
            `}
          />
          <div
            css={`
              position: fixed;
              top: 0;
              right: 0;
              width: 1px;
              height: 100vh;
              margin-right: 40px;
              z-index: 1;
              background: #fff;
              ${theme.laptop} {
                margin-right: 40px;
              }
              ${theme.tablet} {
                display: none;
              }
              @media (min-width: 1440px) {
                margin-right: calc((100vw - 1440px) / 2 + 40px);
              }
            `}
          />
          <div
            id="intro"
            css={`
            ${theme.fullWidth}
            display: flex;
            flex-direction: column;
            position: relative;
            height: 200vh;
            scroll-snap-align: end;
            section {
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;  
              width: 100%;
              position: sticky;
              top: 0;
              overflow: hidden;
            }
            .imgHeroBox {
              width: 100%;
              height: 100%;
            }
            }
            .imgHero {
              position: relative;
              object-fit: cover;
              height: 100vh;
              width: 100%;
              top: 0;
              position: absolute;
              opacity: 1;
              transition: opacity 0.4s;
            }
            .layer {
              position: absolute;
              opacity: 0.6;
              top: 0;
              width: 100%;
              height: 100vh;
              background: rgba(0, 0, 0, 0.2);
              background: linear-gradient(180deg, rgba(0,0,0,0.22032563025210083) 0%, rgba(0,0,0,0) 100%);
              mix-blend-mode: multiply;              
            }
            h1,
            h2 {
              z-index: 1;
              line-height: 1;
              color: #fff;
            }
            h1 {
              font-size: 140px;
              max-width: 900px;
            }
            h2 {
              font-size: 75px;
              font-weight: 600;
              max-width: 950px;
            }
            p.snapHandler {
              display: none;
              position: absolute;
              top: 160px;
              right: 100px;
              font-size: 11px;
              color: #fff;
              cursor: pointer;
              z-index: 10;
              text-decoration: underline;
            }
            .otsikko-1,
            .otsikko-2,
            .otsikko-3 {
              position: absolute;
              top: 200px;
              left: 140px;
            }
            .otsikko-3 {
              top: 400px;
            }
           
            ${theme.tablet} {
              .otsikko-1,
              .otsikko-2,
              .otsikko-3 {
                left: 20px;
              }
              h1 {
                font-size: 120px;
              }
            }
            ${theme.max900},
            (max-height: 770px) {
              h1 {
                font-size: 90px;
              }
              h2 {
                font-size: 60px;
              }
            }
            ${theme.mobile} {
              .otsikko-1,
              .otsikko-2 {                
                top: 175px;              
              }
              .otsikko-3 {
                top: 330px;
              }
              h1 {
                font-size: 65px;
              }
              h2 {
                font-size: 42px;
              }
            }
            ${theme.max400} {
              h1 {
                font-size: 55px;
              }
            }
          `}
          >
            <section>
              <motion.div
                className="imgHeroBox"
                style={{
                  translateX: heroImg,
                  scale: 1.2,
                }}
              >
                <GatsbyImage
                  className="imgHero"
                  image={data.home.kuva.gatsbyImageData}
                  alt="JCAD Kuvituskuva"
                />
              </motion.div>

              <div className="layer" />
              <div
                id="heroContent"
                css={`
                  max-width: 1440px;
                  margin: 0 auto;
                  width: 100%;
                  position: absolute;
                  top: 0;
                `}
              >
                <motion.div
                  style={{
                    opacity: opacity_1,
                  }}
                >
                  <h1
                    id="h1"
                    className="otsikko-1"
                    dangerouslySetInnerHTML={{ __html: data.home.otsikko1 }}
                  />
                </motion.div>
                <motion.div
                  style={{
                    opacity: opacity_2,
                  }}
                >
                  <h2
                    id="h2"
                    className="otsikko-2"
                    dangerouslySetInnerHTML={{ __html: data.home.otsikko2 }}
                  />
                </motion.div>
                <motion.div
                  style={{
                    opacity: opacity_3,
                  }}
                >
                  <h2
                    id="h3"
                    className="otsikko-3"
                    dangerouslySetInnerHTML={{ __html: data.home.otsikko3 }}
                  />
                </motion.div>
              </div>
            </section>
          </div>
          <section
            id="ohjelmisto"
            css={`
              ${theme.fullWidth}
              flex-direction: column;
              background: ${theme.indigo};
              padding-left: 0;
              padding-right: 0;
              color: #fff;
              height: 400vh;
              position: relative;
              scroll-snap-align: start;
              .sectionBox {
                flex-direction: column;
                height: 100vh;
                max-width: 1440px;
                margin: 0 auto;
                width: 100%;
                position: sticky;
                top: 0;
              }

              ${theme.tablet} {
                .heroContainer {
                  padding-left: 0;
                  padding-right: 0;
                }
                .column.content {
                  margin-top: 60px;
                  padding-left: 40px;
                  padding-right: 40px;
                }
                .totalBox {
                  text-align: center;
                  width: 100%;
                }
              }
              ${theme.max900} {
                .heroContainer .textBox {
                  margin-top: 50px;
                  margin-bottom: 50px;
                }
              }
              .mainBg1 {
                position: absolute;
              }
            `}
          >
            <div
              css={`
                position: absolute;
                top: 0px;
                left: calc(50% - 450px);
                overflow: hidden;
                background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='16' width='6'><ellipse cx='3' cy='3' rx='1' ry='1' fill='white' opacity='0.6' /></svg>");
                background-repeat: repeat-y;
                background-position-x: 0;
                width: 6px;
                height: 100%;
                ${theme.max1000} {
                  left: calc(50% - 350px);
                }
                ${theme.max700} {
                  display: none;
                }
              `}
            />
            <div
              css={`
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                margin: auto;
                overflow: hidden;
                background-image: url("${svgBg1}");
                background-repeat: repeat-y;
                background-position-x: 0;
                width: 1200px;
                height: 100%;
                ${theme.max700} {
                  display: none;
                }
              `}
            />

            <div
              css={`
                position: absolute;
                top: 0px;
                right: calc(50% - 450px);
                overflow: hidden;
                background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='16' width='6'><ellipse cx='3' cy='3' rx='1' ry='1' fill='white' opacity='0.6' /></svg>");
                background-repeat: repeat-y;
                background-position-x: 0;
                width: 6px;
                height: 100%;
                ${theme.max1000} {
                  right: calc(50% - 350px);
                }
                ${theme.max700} {
                  display: none;
                }
              `}
            />
            <div
              className="sectionBox"
              css={`
                > div {
                  position: relative;
                  box-sizing: border-box;
                }
                .header {
                  height: 90px;
                  display: flex;
                  align-items: center;
                  position: absolute;
                  width: 100%;

                  .line {
                    height: 1px;
                    width: 32px;
                    background: #fff;
                    margin-right: 10px;
                  }
                  h2 {
                    position: absolute;
                    left: 45px;
                    top: 29px;
                    width: 260px;
                  }
                  .progressCircle {
                    position: absolute;
                    right: 0;
                    width: 50px;
                    margin-right: 30px;
                  }
                  ${theme.mobile} {
                    .progressCircle {
                    margin-right: 0;
                    )
                  }
                }
              `}
            >
              <div>
                <div className="header">
                  <div className="line" />
                  <motion.div
                    style={{
                      opacity: opacity_4b,
                    }}
                  >
                    <h2 className="--3">{text.home.slide1title}</h2>
                  </motion.div>

                  <motion.div
                    style={{
                      opacity: opacity_5b,
                    }}
                  >
                    <h2 className="--3">{text.home.slide2title}</h2>
                  </motion.div>

                  <motion.div
                    style={{
                      opacity: opacity_6b,
                    }}
                  >
                    <h2 className="--3">{text.home.slide3title}</h2>
                  </motion.div>
                  <svg className="progressCircle circle-1" viewBox="0 0 60 60">
                    <motion.path
                      fill="none"
                      strokeWidth="5"
                      stroke="white"
                      strokeDasharray="0 1"
                      d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                      style={{
                        pathLength: circle_4,
                        rotate: 90,
                        translateX: 5,
                        translateY: 5,
                        scaleX: -1,
                      }}
                    />
                    <motion.path
                      fill="none"
                      strokeWidth="5.2"
                      stroke={theme.indigo}
                      strokeDasharray="0 1"
                      d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                      style={{
                        pathLength: circle_5,
                        rotate: 90,
                        translateX: 5,
                        translateY: 5,
                        scaleX: -1,
                      }}
                    />
                    <motion.path
                      fill="none"
                      strokeWidth="5"
                      stroke="white"
                      strokeDasharray="0 1"
                      d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                      style={{
                        pathLength: circle_6,
                        rotate: 90,
                        translateX: 5,
                        translateY: 5,
                        scaleX: -1,
                      }}
                    />
                  </svg>
                </div>
              </div>
              <div
                css={`
                  position: relative;
                  width: 100%;
                  z-index: 1;
                  p {
                    max-width: 580px;
                    font-size: 34px;
                    line-height: 1.2;
                  }
                  > div {
                    position: absolute;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                  }
                  ${theme.mobile} {
                    p {
                      font-size: 25px;
                      padding-left: 20px;
                      padding-right: 20px;
                    }
                  }
                `}
              >
                <motion.div
                  style={{
                    opacity: opacity_4,
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: data.home.slide1 }} />
                </motion.div>
                <motion.div
                  style={{
                    opacity: opacity_5,
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: data.home.slide2 }} />
                </motion.div>
                <motion.div
                  style={{
                    opacity: opacity_6,
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: data.home.slide3 }} />
                </motion.div>
              </div>
              <div
                css={`
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  align-items: center;
                  width: 100%;
                  height: 100%;
                  padding: 30px;
                  box-sizing: border-box;
                  svg.verticalLeft {
                    display: none;
                    position: absolute;
                    top: 0;
                    left: 160px;
                  }
                  svg.verticalRight {
                    display: none;
                    position: absolute;
                    top: 0;
                    right: 160px;
                  }
                  svg.topLine {
                    width: 100%;
                    position: relative;
                    top: 100px;
                    height: 12px;
                  }
                  svg.mainBg1 {
                    width: 100%;
                  }
                  svg.bottomLine {
                    position: relative;
                    top: -100px;
                    width: 100%;
                  }
                  ${theme.mobile} {
                    svg.verticalLeft,
                    svg.verticalRight,
                    svg.topLine,
                    svg.mainBg1,
                    svg.bottomLine {
                      display: none;
                    }
                  }
                `}
              >
                <SvgHorizontal className="topLine" />
                <div
                  css={`
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    top: 40px;
                    z-index: 100;
                    > div {
                      display: block;
                      width: 10px;
                      height: 10px;
                      border-radius: 50%;
                      background: #fff;
                      opacity: 0.2;
                      margin-right: 20px;
                      margin-left: 20px;
                      cursor: pointer;
                    }
                    .active {
                      display: block;
                      border-radius: 50%;
                      background: #fff;
                      opacity: 1;
                      animation: pulse 0.7s;
                    }
                    ${theme.mobile} {
                      top: auto;
                      bottom: 40px;
                    }
                  `}
                >
                  <div
                    className={pulseOne ? "active" : "passive"}
                    onClick={() => goTo("slide_1")}
                  />
                  <div
                    className={pulseTwo ? "active" : "passive"}
                    onClick={() => goTo("slide_2")}
                  />
                  <div
                    className={pulseThree ? "active" : "passive"}
                    onClick={() => goTo("slide_3")}
                  />
                </div>
                <SvgVertical className="verticalLeft" />
                <SvgVertical className="verticalRight" />
                <SvgLineXXX className="bottomLine" />
              </div>
            </div>
          </section>
          <section
            id="hinnasto"
            css={`
              ${theme.fullWidth}
              flex-direction: column;
              background: ${theme.indigo};
              padding-left: 0;
              padding-right: 0;
              padding-bottom: 100px;
              color: #fff;
              text-align: left;
              min-height: 100vh;
              scroll-snap-align: start;
              .container {
                width: 100%;
                height: 100%;
              }
              .textBox p {
                max-width: 645px;
                padding-left: 40px;
                padding-right: 40px;
                margin: 0 auto;
                font-size: 34px;
                line-height: 1.2;
              }
              ${theme.tablet} {
                .container {
                  padding-left: 0;
                  padding-right: 0;
                }
                .column.content {
                  margin-top: 60px;
                  padding-left: 40px;
                  padding-right: 40px;
                }
                .totalBox {
                  text-align: center;
                  width: 100%;
                }
              }
              ${theme.max900} {
                .container .textBox {
                  margin-top: 50px;
                  margin-bottom: 50px;
                }
              }
              ${theme.mobile} {
                .textBox p {
                  font-size: 25px;
                  padding-left: 20px;
                  padding-right: 20px;
                }
                .column.content {
                  margin-top: 40px;
                  padding-left: 20px;
                  padding-right: 20px;
                }
                padding-bottom: 0;
                .svgHorizontalX {
                  display: none;
                }
              }
            `}
          >
            <div className="container">
              <div
                className="row column"
                css={`
                  position: relative;
                  .svgBg {
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 200px;
                    z-index: 0;
                    width: 100%;
                  }
                  .svgHorizontalX {
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 20px;
                    width: calc(100% + 12px);
                    margin-left: -6px;
                    ${theme.tablet} {
                      width: calc(100% - 12px);
                      margin-left: auto;
                      margin-right: auto;
                    }
                  }
                  ${theme.max900} {
                    padding-top: 50px;
                  }
                  ${theme.mobile} {
                    .svgBg {
                      display: none;
                    }
                  }
                `}
              >
                <SvgBg2 className="svgBg" />
                <SvgLineXXX className="svgHorizontalX" />
              </div>
            </div>
          </section>
          <div
            css={`
              ${theme.fullWidth}
            `}
          >
            <section
              id="asiakaskokemuksia"
              css={`
                width: 100%;
                color: #000;
                background: #fff;
                scroll-snap-align: start;
                display: flex;
                flex-direction: column;
                .container {
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                }
                @media (max-width: 1440px) {
                  padding-left: 0;
                  padding-right: 0;
                }
                .titleBox {
                  margin-top: 140px;
                  width: 50%;
                  height: 94px;
                  border: 1px solid #000;
                  display: flex;
                  align-items: center;
                  padding-left: 30px;
                  margin-left: 1px;
                }
                p.quote {
                  margin-left: 30px;
                  font-size: 30px;
                  font-weight: 600;
                  line-height: 1.2;
                  margin-bottom: 128px;
                  &:first-child {
                    max-width: 544px;
                  }
                }
                span.quoteName {
                  position: relative;
                  margin-left: 30px;
                  font-size: 19px;
                  font-weight: 300;
                  strong {
                    font-size: 23px;
                    font-weight: 700;
                    text-transform: uppercase;
                  }
                }
                .lineAfter::after {
                  content: "";
                  position: absolute;
                  bottom: -30px;
                  left: 0;
                  right: 0;
                  height: 2px;
                  width: 83vw;
                  border-top: 1px solid black;
                  z-index: -1;
                }
                .first.row {
                  height: 300px;
                  position: relative;
                  svg {
                    margin-left: auto;
                  }
                }
                .second.row {
                  position: relative;
                }
                .lineTroughTitle {
                  position: absolute;
                  bottom: 78px;
                  width: 95%;
                  height: 1px;
                  background: #000;
                  ${theme.mobile} {
                    display: none;
                  }
                }
                .second.row svg.line {
                  height: 100%;
                }
                .circleBox {
                  position: relative;
                  top: -160px;
                  right: -160px;
                }
                .third.row {
                  margin-top: 30px;
                  padding-bottom: 180px;
                }
                .third.row .column:first-child {
                  margin-top: auto;
                  justify-content: flex-end;
                  overflow-x: hidden;
                  flex: 1;
                  svg.triangle {
                    width: 90%;
                  }
                }
                .third.row .column:nth-child(2) {
                  position: relative;
                  padding-left: 50px;
                  padding-top: 0;
                  svg.bottomRight {
                    position: absolute;
                    top: 0;
                    left: -60%;
                  }
                }
                svg.circleLeftLine {
                  display: none;
                  position: absolute;
                  height: 400px;
                  width: auto;
                  margin-left: 60px;
                  top: 50px;
                }
                ${theme.tablet} {
                  padding-left: 0;
                  padding-right: 0;
                  .titleBox {
                    margin-top: 70px;
                  }
                  .randomSvg {
                    display: none;
                  }
                  .column {
                    padding-left: 40px;
                    padding-right: 40px;
                  }
                  svg.triangle {
                    margin-top: 60px;
                    margin-bottom: 60px;
                    margin-left: auto;
                    margin-right: -150px;
                  }
                  .second.row {
                    flex-direction: column;
                    overflow: hidden;
                  }
                  .circleBox {
                    top: 70px;
                    margin-bottom: 20px;
                    left: -100px;
                  }
                  .third.row {
                    flex-direction: column;
                    position: relative;
                    padding-bottom: 40px;
                    .column:nth-child(2) {
                      border-bottom: 1px solid #000;
                    }
                  }
                  p.quote {
                    margin-left: 0;
                    margin-right: 0;
                    margin-bottom: 60px;
                  }
                  span.quoteName {
                    margin-left: 0;
                  }
                }
                ${theme.mobile} {
                  .titleBox {
                    width: 260px;
                  }
                  .first.row {
                    height: 200px;
                  }
                  .third.row .column:first-child {
                    height: 450px;
                    svg.triangle {
                      width: 210% !important;
                      margin-bottom: 50px;
                    }
                  }
                  .lineAfter::after {
                    display: none;
                  }
                  svg.circleLeftLine {
                    display: block;
                  }
                  p.quote {
                    font-size: 24px;
                  }
                  .column {
                    padding-left: 20px !important;
                    padding-right: 20px !important;
                  }
                  .titleBox {
                    margin-left: -1px;
                  }
                  .third.row {
                    .column:nth-child(2) {
                      border-bottom: none;
                    }
                  }
                  .container {
                    padding-left: 0;
                    padding-right: 0;
                  }
                  .bottomRight,
                  .circleLeftLine {
                    display: none !important;
                  }
                }
              `}
            >
              <div className="container">
                <div className="first row">
                  <div className="titleBox">
                    <h2>{text.home.referencesTitle}</h2>
                  </div>
                  <div className="lineTroughTitle" />
                </div>
                <div className="second row">
                  <svg
                    className="randomSvg"
                    width="8.234"
                    height="437.637"
                    viewBox="0 0 8.234 437.637"
                  >
                    <g
                      id="Group_1852"
                      data-name="Group 1852"
                      transform="translate(5.059) rotate(90)"
                    >
                      <g
                        id="Group_1851"
                        data-name="Group 1851"
                        transform="translate(0 -3.175)"
                      >
                        <g
                          id="Group_1850"
                          data-name="Group 1850"
                          transform="translate(0.365 0.369)"
                        >
                          <path
                            id="Path_1697"
                            data-name="Path 1697"
                            d="M2.3,2.305h429.4M-1.445,6.053l7.5-7.5m207.525,7.5,7.5-7.5m206.884,7.5,7.5-7.5m0,7.5-7.5-7.5m-206.884,7.5-7.5-7.5M6.055,6.053l-7.5-7.5"
                            transform="translate(1.445 1.447)"
                            fill="none"
                            stroke="#000"
                            stroke-width="1"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>

                  <div className="column">
                    <p className="quote">
                      {data.referenssit.edges[0].node.sitaatti}
                    </p>
                    <span className="quoteName lineAfter">
                      <strong>{data.referenssit.edges[0].node.nimi}, </strong>{" "}
                      {data.referenssit.edges[0].node.yritys}
                    </span>
                  </div>
                  <div
                    className=""
                    css={`
                      margin-left: auto;
                      margin-top: -150px;
                      height: fit-content;
                      width: fit-content;
                      position: relative;
                      ${theme.mobile} {
                        margin-top: 50px;
                        margin-left: -120px;
                        z-index: 1;
                      }
                      .circleLine {
                        display: none;
                        position: absolute;
                        bottom: 0;
                        right: -50px;
                        ${theme.mobile} {
                          display: block;
                        }
                      }
                    `}
                  >
                    <motion.div style={{ rotate: circleRotateSpring }}>
                      <SvgCircle className="svgCircle" />
                    </motion.div>
                    <SvgVerticalXXX className="circleLine" />
                  </div>
                  <div
                    className="divider"
                    css={`
                      position: absolute;
                      height: 1px;
                      width: 100%;
                      margin: 0 auto;
                      background: #000;
                      bottom: 50px;
                      ${theme.mobile} {
                        display: none;
                      }
                    `}
                  />
                </div>

                <div className="column afterSecondRow">
                  <p className="quote" style={{ maxWidth: 696, marginTop: 70 }}>
                    {data.referenssit.edges[1].node.sitaatti}
                  </p>
                  <span className="quoteName">
                    <strong>{data.referenssit.edges[1].node.nimi},</strong>{" "}
                    {data.referenssit.edges[1].node.yritys}
                  </span>
                </div>

                <div
                  className="third row"
                  css={`
                    .triangleLeftLine {
                      display: none;
                      position: absolute;
                      height: 280px;
                      width: auto;
                      margin-left: 60px;
                      top: 0;
                    }
                    .column {
                      overflow: hidden;
                    }
                    ${theme.mobile} {
                      .column {
                        min-height: 250px;
                      }
                      .triangleLeftLine {
                        display: block;
                      }
                      #svgTriangle {
                        overflow: hidden;
                        top: 0;
                        position: absolute;
                        right: -170px;
                        margin-top: -210px;
                        transform: scale(1.1);
                      }
                    }
                  `}
                >
                  <div className="column">
                    <SvgVerticalXXX className="triangleLeftLine" />
                    <div
                      css={`
                        position: relative;
                      `}
                    >
                      <ReactVivus
                        id="svgTriangle"
                        option={{
                          file: svgTriangle,
                          duration: 150,
                          animTimingFunction: "ease-out",
                          type: "sync",
                        }}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="column">
                    <Svg2ndBottomRight className="bottomRight" />
                    <p
                      className="quote"
                      style={{ maxWidth: 540, marginTop: 70 }}
                    >
                      {data.referenssit.edges[2].node.sitaatti}
                    </p>
                    <span className="quoteName" style={{ paddingBottom: 100 }}>
                      <strong>{data.referenssit.edges[2].node.nimi},</strong>{" "}
                      {data.referenssit.edges[2].node.yritys}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <section
            id="meistä"
            data-section={8}
            css={`
              ${theme.fullWidth}
              flex-direction: column;
              background: ${theme.indigo};
              padding-left: 0;
              padding-right: 0;
              padding-bottom: 30px;
              position: relative;
              overflow: hidden;
              color: #fff;
              scroll-snap-align: start;
              .heroImg {
                position: absolute;
                object-fit: cover;
                height: 100%;
                width: 100%;
              }
              .container {
                width: 100%;
                height: 100%;
                position: relative;
                display: flex;
                flex-direction: column;
              }
              .titleBox {
                margin-top: 140px;
                width: 50%;
                height: 94px;
                border: 1px solid #fff;
                display: flex;
                align-items: center;
                padding-left: 30px;
              }
              p {
                padding-left: 40px;
                padding-right: 40px;
                font-weight: 400;
                font-size: 30px;
                line-height: 1.2;
                color: #fff;
                strong {
                  font-weight: 600;
                }
              }
              .first.row {
                align-items: center;
                padding-top: 30px;
              }
              .textBox {
                margin: 30px auto;
                max-width: 780px;
              }
              svg.divider {
                width: calc(100% + 10px);
                margin-left: -5px;
                margin-top: 40px;
                margin-bottom: 50px;
              }
              ${theme.tablet} {
                .container {
                  padding-left: 0;
                  padding-right: 0;
                }
              }
              ${theme.mobile} {
                svg.divider {
                  display: none;
                }
                .textBox p {
                  font-size: 24px;
                  margin: 0;
                  padding-left: 20px;
                  padding-right: 20px;
                }
              }

              .leftFade,
              .rightFade {
                display: none !important;
              }

              .img-ticker {
                display: flex;
                box-sizing: border-box;
              }
              .item {
                flex: none;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 200px;
                padding-left: 30px;
                padding-right: 30px;
                box-sizing: border-box;
                img {
                  width: 100%;
                }
              }
            `}
          >
            <GatsbyImage
              className="heroImg"
              image={data.about.taustakuva.gatsbyImageData}
              alt="JCAD Meistä"
            />
            <div className="container">
              <div className="first row">
                <div
                  className="line"
                  css={`
                    height: 1px;
                    width: 32px;
                    background: #fff;
                    margin-right: 10px;
                  `}
                />
                <h2>{text.home.aboutTitle}</h2>
              </div>
              <div className="row">
                <div
                  className="textBox"
                  dangerouslySetInnerHTML={{ __html: data.about.content }}
                />
              </div>
              <SvgLineXXX className="divider" />
              <div
                className="first row"
                css={`
                  margin-bottom: 30px;
                `}
              >
                <div
                  className="line"
                  css={`
                    height: 1px;
                    width: 32px;
                    background: #fff;
                    margin-right: 10px;
                  `}
                />
                <h2>{text.home.ourCustomersTitle}</h2>
              </div>
              <SvgDottedThinX2 className="thinX2" />
              <Ticker data={data.home.partners} />
              <SvgDottedThinX className="thinX" />
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default HomePage;
