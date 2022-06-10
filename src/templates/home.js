import React, { useContext } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import { HelmetDatoCms } from "gatsby-source-datocms";
import styled from "styled-components";
import { Layout } from "../components/Layout";
import { theme } from "../theme/theme";
import { AnimatedBox } from "../components/AnimatedBox";
import { fullMenu, prefix } from "../constants/slugs";

// TODO: Magnetic button https://codesandbox.io/s/tgowd?file=/src/components/Button.js

const Page = ({ pageContext }) => {
  const { locale } = useContext(LocaleContext);
  const text = snippet[locale];
  const { page } = pageContext.data;

  return (
    <>
      <Layout locale={pageContext.locale} transparent={false} page="home">
        <Main className="pagePadding">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2136"
            height="774"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 2136 774"
            css={`
              margin: auto;
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              background: rgb(0, 0, 83);
              display: block;

              shape-rendering: auto;
            `}
          >
            <g transform="translate(1068,387) scale(1,1) translate(-1068,-387)">
              <g
                transform="translate(1744.4487044235962,68.68740162595168) scale(100)"
                opacity="0.4"
              >
                <path
                  d="M7.475999999999999 0 C7.475999999999999 3.289439999999999 7.612315626456905 2.9603449658443517 5.286330296150629 5.286330296150628 S3.2894399999999995 7.475999999999999 4.577729735212805e-16 7.475999999999999 S-2.9603449658443517 7.612315626456905 -5.286330296150628 5.286330296150629 S-7.475999999999999 3.28944 -7.475999999999999 9.15545947042561e-16 S-7.612315626456906 -2.9603449658443513 -5.28633029615063 -5.286330296150628 S-3.2894400000000004 -7.475999999999998 -1.3733189205638417e-15 -7.475999999999999 S2.9603449658443504 -7.612315626456905 5.286330296150627 -5.28633029615063 S7.475999999999998 -3.289440000000001 7.475999999999999 -1.831091894085122e-15"
                  fill="#222282"
                  stroke-width="0"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    dur="25s"
                    repeatCount="indefinite"
                    values="0;90"
                  ></animateTransform>
                </path>
              </g>
              <g
                transform="translate(1879.7384453083152,5.024881951141992) scale(100)"
                opacity="0.4"
              >
                <path
                  d="M8.9712 0 C8.9712 3.9473279999999993 9.134778751748287 3.552413959013222 6.343596355380756 6.343596355380754 S3.9473279999999997 8.9712 5.493275682255367e-16 8.9712 S-3.552413959013222 9.134778751748287 -6.343596355380754 6.343596355380756 S-8.9712 3.947328 -8.9712 1.0986551364510734e-15 S-9.134778751748287 -3.5524139590132218 -6.343596355380757 -6.343596355380754 S-3.947328000000001 -8.9712 -1.6479827046766101e-15 -8.9712 S3.552413959013221 -9.134778751748287 6.343596355380753 -6.343596355380757 S8.971199999999998 -3.9473280000000015 8.9712 -2.197310272902147e-15"
                  fill="#11116e"
                  stroke-width="0"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    dur="12.5s"
                    repeatCount="indefinite"
                    values="0;90"
                  ></animateTransform>
                </path>
              </g>
            </g>
          </svg>
          <div className="Hero container  col">
            <div className="row padding">
              <div className="col">
                <h1>{page.title}</h1>
              </div>
              <div className="col">
                <p>{page.intro}</p>
                <div className="row">
                  {page.cta.map((i) => (
                    <Link className="HeroLink" to={i.slug}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.99997 6L8.58997 7.41L13.17 12L8.58997 16.59L9.99997 18L16 12L9.99997 6Z"
                          fill="#fff"
                        />
                      </svg>
                      {i.text}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="Grid padding">
              {fullMenu[locale].map((i, index) => {
                if (index === 6) return;
                return (
                  <Link
                    id={`Link-${index}`}
                    className="Link"
                    to={prefix[locale] + i.slug}
                  >
                    <header className="row">
                      <span>{i.title}</span>
                      <Arrow />
                    </header>
                    <AnimatedBox index={index} />
                  </Link>
                );
              })}
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
  background: ${theme.primary};
  padding-top: 94px;
  .Hero {
    min-height: 100vh;

    height: 100%;
    color: #fff;
    position: relative;
    padding-top: 55px;
    @media (max-width: 600px) {
      padding-top: 50px;
    }

    .wrap {
      height: 100vh;
      @media (max-width: 1500px) {
        overflow: hidden;
      }
    }
    > .row {
      @media (max-width: 1100px) {
        flex-direction: column;
      }
    }
    h1 {
      font-size: 64px;
      margin-bottom: 40px;
      font-weight: 600;
      @media (max-width: 700px) {
        font-size: 42px;
      }
    }
    p {
      font-size: 18px;
      line-height: 1.6;
      max-width: 720px;
      margin-bottom: 20px;
    }
  }
  .HeroLink {
    font-size: 18px;
    font-weight: 600;
    opacity: 0.6;
    svg {
      margin-bottom: -6px;
    }
    &:hover {
      opacity: 1;
    }
  }
  .Grid {
    margin-top: 60px;
    margin-bottom: 60px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    @media (max-width: 1000px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (max-width: 700px) {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }
  .Link {
    height: 240px;
    border: 0.8px solid #ffffff;
    padding: 30px;
    transition: 1s;

    background-color: rgba(0, 0, 83, 0.2);
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);

    span {
      font-size: 20px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.7px;
    }
    header {
      justify-content: space-between;
    }
  }
  /***************************************************
 * Generated by SVG Artista on 5/26/2022, 2:28:06 PM
 * MIT license (https://opensource.org/licenses/MIT)
 * W. https://svgartista.net
 **************************************************/
  #Link-0 {
    svg.Sleep {
      display: none;
      position: absolute;
      opacity: 0.3;
    }
    svg.Animate {
      position: absolute;
      .svg-elem-1 {
        stroke-dashoffset: 294px;
        stroke-dasharray: 294px;
        transition: stroke-dashoffset 0.5s cubic-bezier(0.47, 0, 0.745, 0.715)
          0s;
      }
      .svg-elem-2 {
        stroke-dashoffset: 864px;
        stroke-dasharray: 864px;
        transition: stroke-dashoffset 0.5s cubic-bezier(0.47, 0, 0.745, 0.715)
          0.12s;
      }
      .svg-elem-3 {
        stroke-dashoffset: 83.27300194836795px;
        stroke-dasharray: 83.27300194836795px;
        transition: stroke-dashoffset 0.5s cubic-bezier(0.47, 0, 0.745, 0.715)
          0.24s;
      }
      .svg-elem-4 {
        stroke-dashoffset: 144px;
        stroke-dasharray: 144px;
        transition: stroke-dashoffset 0.5s cubic-bezier(0.47, 0, 0.745, 0.715)
          0.36s;
      }
    }
    &:hover .Animate {
      .svg-elem-1 {
        stroke-dashoffset: 0;
      }
      .svg-elem-2 {
        stroke-dashoffset: 0;
      }
      .svg-elem-3 {
        stroke-dashoffset: 0;
      }
      .svg-elem-4 {
        stroke-dashoffset: 0;
      }
    }
  }
  #Link-1 {
    svg .svg-elem-1 {
      stroke-dashoffset: 83.27300194836795px;
      stroke-dasharray: 83.27300194836795px;
      transition: stroke-dashoffset 0.3s cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
    }
    svg .svg-elem-2 {
      stroke-dashoffset: 83.27300194836795px;
      stroke-dasharray: 83.27300194836795px;
      transition: stroke-dashoffset 0.3s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.12s;
    }
    svg .svg-elem-3 {
      stroke-dashoffset: 261.14683640196847px;
      stroke-dasharray: 261.14683640196847px;
      transition: stroke-dashoffset 0.3s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.24s;
    }
    svg .svg-elem-4 {
      stroke-dashoffset: 134.6000518798828px;
      stroke-dasharray: 134.6000518798828px;
      transition: stroke-dashoffset 0.3s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.36s;
    }
    svg .svg-elem-5 {
      stroke-dashoffset: 134.59999084472656px;
      stroke-dasharray: 134.59999084472656px;
      transition: stroke-dashoffset 0.3s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.48s;
    }
    &:hover {
      svg .svg-elem-1 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-2 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-3 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-4 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-5 {
        stroke-dashoffset: 0;
      }
    }
  }
  #Link-2 {
    svg .svg-elem-1 {
      stroke-dashoffset: 246px;
      stroke-dasharray: 246px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
    }

    svg .svg-elem-2 {
      stroke-dashoffset: 136px;
      stroke-dasharray: 136px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.02s;
    }

    svg .svg-elem-3 {
      stroke-dashoffset: 136px;
      stroke-dasharray: 136px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.04s;
    }

    svg .svg-elem-4 {
      stroke-dashoffset: 136px;
      stroke-dasharray: 136px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.06s;
    }

    svg .svg-elem-5 {
      stroke-dashoffset: 136px;
      stroke-dasharray: 136px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.08s;
    }

    svg .svg-elem-6 {
      stroke-dashoffset: 246px;
      stroke-dasharray: 246px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.1s;
    }

    svg .svg-elem-7 {
      stroke-dashoffset: 136px;
      stroke-dasharray: 136px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.12s;
    }

    svg .svg-elem-8 {
      stroke-dashoffset: 136px;
      stroke-dasharray: 136px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.14s;
    }

    svg .svg-elem-9 {
      stroke-dashoffset: 136px;
      stroke-dasharray: 136px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.16s;
    }
    svg .svg-elem-10 {
      stroke-dashoffset: 136px;
      stroke-dasharray: 136px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.18s;
    }
    svg .svg-elem-11 {
      stroke-dashoffset: 246px;
      stroke-dasharray: 246px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.2s;
    }
    svg .svg-elem-12 {
      stroke-dashoffset: 136px;
      stroke-dasharray: 136px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.22s;
    }
    svg .svg-elem-13 {
      stroke-dashoffset: 136px;
      stroke-dasharray: 136px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.24s;
    }
    svg .svg-elem-14 {
      stroke-dashoffset: 136px;
      stroke-dasharray: 136px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.26s;
    }
    svg .svg-elem-15 {
      stroke-dashoffset: 136px;
      stroke-dasharray: 136px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.28s;
    }
    svg .svg-elem-16 {
      stroke-dashoffset: 246px;
      stroke-dasharray: 246px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.3s;
    }
    svg .svg-elem-17 {
      stroke-dashoffset: 136px;
      stroke-dasharray: 136px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.32s;
    }
    svg .svg-elem-18 {
      stroke-dashoffset: 136px;
      stroke-dasharray: 136px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.34s;
    }
    svg .svg-elem-19 {
      stroke-dashoffset: 136px;
      stroke-dasharray: 136px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.36s;
    }
    svg .svg-elem-20 {
      stroke-dashoffset: 136px;
      stroke-dasharray: 136px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.38s;
    }
    &:hover {
      svg .svg-elem-1 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-2 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-3 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-4 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-5 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-6 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-7 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-8 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-9 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-10 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-11 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-12 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-13 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-14 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-15 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-16 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-17 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-18 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-19 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-20 {
        stroke-dashoffset: 0;
      }
    }
  }
  #Link-3 {
    svg .svg-elem-1 {
      stroke-dashoffset: 848px;
      stroke-dasharray: 848px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
    }
    svg .svg-elem-2 {
      stroke-dashoffset: 336px;
      stroke-dasharray: 336px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.12s;
    }
    svg .svg-elem-3 {
      stroke-dashoffset: 370px;
      stroke-dasharray: 370px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.24s;
    }
    svg .svg-elem-4 {
      stroke-dashoffset: 370px;
      stroke-dasharray: 370px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.36s;
    }
    svg .svg-elem-5 {
      stroke-dashoffset: 85.13841247558594px;
      stroke-dasharray: 85.13841247558594px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.48s;
    }

    &:hover {
      svg .svg-elem-1 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-2 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-3 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-4 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-5 {
        stroke-dashoffset: 0;
      }
    }
  }
  #Link-4 {
    svg .svg-elem-1 {
      stroke-dashoffset: 856px;
      stroke-dasharray: 856px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715) 0s,
        fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
    }
    svg .svg-elem-2 {
      stroke-dashoffset: 392.60772705078125px;
      stroke-dasharray: 392.60772705078125px;
      fill: transparent;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
          0.12s,
        fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
    }
    svg .svg-elem-3 {
      stroke-dashoffset: 883.2762451171875px;
      stroke-dasharray: 883.2762451171875px;
      fill: transparent;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
          0.24s,
        fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 0.1s;
    }
    svg .svg-elem-4 {
      stroke-dashoffset: 288.6121520996094px;
      stroke-dasharray: 288.6121520996094px;
      fill: transparent;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
          0.36s,
        fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 0.2s;
    }
    svg .svg-elem-5 {
      stroke-dashoffset: 669.257080078125px;
      stroke-dasharray: 669.257080078125px;
      fill: transparent;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
          0.48s,
        fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 0.3s;
    }
    svg .svg-elem-6 {
      stroke-dashoffset: 226.07794189453125px;
      stroke-dasharray: 226.07794189453125px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
          0.6s,
        fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 0.4s;
    }
    svg .svg-elem-7 {
      stroke-dashoffset: 404.1275634765625px;
      stroke-dasharray: 404.1275634765625px;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.47, 0, 0.745, 0.715)
          0.72s,
        fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 0.5s;
    }
    &:hover {
      svg .svg-elem-1 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-2 {
        stroke-dashoffset: 0;
        fill: rgb(255, 255, 255);
      }
      svg .svg-elem-3 {
        stroke-dashoffset: 0;
        fill: rgb(255, 255, 255);
      }
      svg .svg-elem-4 {
        stroke-dashoffset: 0;
        fill: rgb(255, 255, 255);
      }
      svg .svg-elem-5 {
        stroke-dashoffset: 0;
        fill: rgb(255, 255, 255);
      }
      svg .svg-elem-6 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-7 {
        stroke-dashoffset: 0;
      }
    }
  }
  #Link-5 {
    svg .svg-elem-1 {
      stroke-dashoffset: 83.27300194836795px;
      stroke-dasharray: 83.27300194836795px;
      transition: stroke-dashoffset 0.3s cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
    }
    svg .svg-elem-2 {
      stroke-dashoffset: 261.14683640196847px;
      stroke-dasharray: 261.14683640196847px;
      transition: stroke-dashoffset 0.3s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.12s;
    }

    svg .svg-elem-3 {
      stroke-dashoffset: 185.45958619168314px;
      stroke-dasharray: 185.45958619168314px;
      transition: stroke-dashoffset 0.3s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.24s;
    }

    svg .svg-elem-4 {
      stroke-dashoffset: 83.27300194836795px;
      stroke-dasharray: 83.27300194836795px;
      transition: stroke-dashoffset 0.3s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.36s;
    }

    svg .svg-elem-5 {
      stroke-dashoffset: 185.45958619168314px;
      stroke-dasharray: 185.45958619168314px;
      transition: stroke-dashoffset 0.3s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.48s;
    }

    svg .svg-elem-6 {
      stroke-dashoffset: 83.27300194836795px;
      stroke-dasharray: 83.27300194836795px;
      transition: stroke-dashoffset 0.3s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.6s;
    }

    svg .svg-elem-7 {
      stroke-dashoffset: 185.45958619168314px;
      stroke-dasharray: 185.45958619168314px;
      transition: stroke-dashoffset 0.3s cubic-bezier(0.47, 0, 0.745, 0.715)
        0.72s;
    }
    &:hover {
      svg .svg-elem-1 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-2 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-3 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-4 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-5 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-6 {
        stroke-dashoffset: 0;
      }
      svg .svg-elem-7 {
        stroke-dashoffset: 0;
      }
    }
  }
`;

const Arrow = () => (
  <svg
    width="20"
    height="22"
    viewBox="0 0 20 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 0L7.95306 1.04694L16.7381 9.83198L0.0848444 9.5294L0.05812 11.0095L16.8042 11.3151L7.95305 20.1663L8.99999 21.2132L19.6066 10.6066L9 0Z"
      fill="white"
    />
  </svg>
);
