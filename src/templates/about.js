import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { GatsbyImage } from "gatsby-plugin-image";
import { HelmetDatoCms } from "gatsby-source-datocms";
import React, { useContext, useEffect, useState } from "react";
import { useScrollYPosition } from "react-use-scroll-position";
import svgBg1 from "../assets/svgBg1.svg";
import svgTriangle from "../assets/svgTriangle.svg";
import { CompanyFacts } from "../components/CompanyFacts";
import { Layout } from "../components/Layout";
import {
  Svg2ndBottomRight,
  SvgCircle,
  SvgDottedThinX,
  SvgDottedThinX2,
  SvgHorizontal,
  SvgLineXXX,
  SvgVertical,
  SvgVerticalXXX,
} from "../components/SvgCollection-2021";
import Ticker from "../components/Ticker";
import { LocaleContext } from "../contexts/LocaleContext";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import en from "../locales/en.yml";
import fi from "../locales/fi.yml";
import sv from "../locales/sv.yml";
import "../theme-2021/globals.css";
import theme from "../theme-2021/theme";

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
      <HelmetDatoCms seo={data.home.seoMetaTags} />
      <Layout page="about">
        <main className="homePage">
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
              font-weight: 600;
            }
            h1 {
              font-size: 100px;
              max-width: 1100px;
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
           
            @media (max-width: 1024px) {
              .otsikko-1,
              .otsikko-2,
              .otsikko-3 {
                left: 100px;
              }
              h1 {
                font-size: 100px;
              }
            }
            @media (max-width: 900px),
            (max-height: 770px) {
              h1 {
                font-size: 90px;
              }
              h2 {
                font-size: 60px;
              }
            }
            @media (max-width: 600px) {
              .otsikko-1 {
                top: 170px; 
                left: 20px;
              }
              .otsikko-2 {                
                top: 105px; 
                left: 20px;             
              }
              .otsikko-3 {
                top: 300px;
                left: 20px;
              }
              h1 {
                font-size: 65px;
              }
              h2 {
                font-size: 42px;
              }
            }
            @media (max-width: 400px) {
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
                css={`
                  position: absolute;
                  max-width: 1500px;
                  margin: 0 auto;
                  width: 100%;
                  height: 100%;
                `}
              >
                <div className="leftLine" />
                <div className="rightLine" />
              </div>
              <div
                id="heroContent"
                css={`
                  max-width: 1500px;
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
                    style={{ display: "none" }}
                  />
                  <h1 id="h1" className="otsikko-1">
                    {data.home.otsikko1}
                  </h1>
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
              background: ${theme.primary};
              padding-left: 0;
              padding-right: 0;
              color: #fff;
              height: 400vh;
              position: relative;
              scroll-snap-align: start;
              align-items: center;
              .sectionBox {
                flex-direction: column;
                height: 100vh;
                max-width: 1440px;
                margin: 0 auto;
                width: 100%;
                position: sticky;
                top: 0;
              }

              @media (max-width: 1024px) {
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
              @media (max-width: 900px) {
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
                max-width: 1500px;
                margin: 0 auto;
                width: 100%;
                height: 100%;
              `}
            >
              <div className="leftLine" />
              <div className="rightLine" />
            </div>
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
                @media (max-width: 1000px) {
                  left: calc(50% - 350px);
                }
                @media (max-width: 700px) {
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
                @media (max-width: 700px) {
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
                @media (max-width: 1000px) {
                  right: calc(50% - 350px);
                }
                @media (max-width: 700px) {
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
                  padding-left: 10px;
                  padding-right: 10px;
                  @media (max-width: 1500) {
                  padding-left: 0; 
                  padding-right: 0; 
                  }
                  .line {
                    height: 1px;
                    width: 32px;
                    background: #fff;
                    margin-right: 10px;
                  }
                  h2 {
                    position: absolute;
                    left: 45px;
                    top: 32px;
                    width: 260px;
                  }
                  .progressCircle {
                    position: absolute;
                    right: 0;
                    width: 50px;
                    margin-right: 30px;
                  }
                  @media (max-width: 600px) {
                    .progressCircle {
                    margin-right: 0;
                    )
                  }
                }
              `}
            >
              <div>
                <div className="header">
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
                  @media (max-width: 600px) {
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
                    visibility: hidden;
                    position: relative;
                    top: 100px;
                    height: 12px;
                  }
                  svg.mainBg1 {
                    width: 100%;
                  }
                  svg.bottomLine {
                    position: relative;
                    visibility: hidden;
                    top: -100px;
                    width: 100%;
                  }
                  @media (max-width: 600px) {
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
                    @media (max-width: 600px) {
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

          <CompanyFacts />
          <div
            className="pagePadding"
            css={`
              background: ${theme.indigo};
            `}
          >
            <div className="row container tickernop">
              <Ticker data={data.home.partners} />
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default HomePage;
