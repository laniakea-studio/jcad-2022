import React, { useContext } from "react";
import { Link } from "gatsby";
import { LocaleContext } from "../contexts/LocaleContext";
import { HelmetDatoCms } from "gatsby-source-datocms";
import styled from "styled-components";
import { Layout } from "../components/Layout";
import { theme } from "../theme/theme";
import { AnimatedBoxLink } from "../components/AnimatedBoxLink";
import { MagneticLinkBox } from "@components/MagneticLinkBox";
import { useHover } from "../hooks/useHover";
import { DownloadPDF } from "../components/DowloadPDF";
import { Video } from "@components/Video";

const Page = ({ pageContext }) => {
  const { prefix } = useContext(LocaleContext);
  const { locale } = pageContext;
  const { page } = pageContext.data;

  return (
    <>
      <HelmetDatoCms seo={page.seoMetaTags} />
      <div className="h-full bg-[#000053] overflow-hidden max-[600px]:relative">
        <BgAnimation />
        <Layout locale={locale} transparent={false} template="home">
          <Main className="pagePadding">
            <div className="Hero container col relative">
              <div className="absolute flex right-[10px] top-0 my-[5px] min-[501px]:hidden">
                <Link
                  to="/"
                  className={
                    "flex justify-center items-center w-[20px] h-[20px] p-[10px] rounded-[4px] text-[11px] mx-[10px] [&.active]:bg-[#ffffff26]" +
                    (locale === "fi" ? " active" : "")
                  }
                >
                  FI
                </Link>
                <Link
                  to="/en"
                  className={
                    "flex justify-center items-center w-[20px] h-[20px] p-[10px] rounded-[4px] text-[11px] mx-[10px] [&.active]:bg-[#ffffff26]" +
                    (locale === "en" ? " active" : "")
                  }
                >
                  EN
                </Link>
              </div>
              <div className="row padding">
                <div className="col">
                  <h1>{page.title}</h1>
                </div>
                <div className="col">
                  <p>{page.intro}</p>

                  <div className="col">
                    {page.cta.map((i) => (
                      <Link className="HeroLink" to={prefix + i.slug}>
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
                {page.isoValikko.map((i, index) => {
                  const [hoverRef] = useHover();

                  return (
                    <MagneticLinkBox ref={hoverRef} path={prefix + i.slug}>
                      <AnimatedBoxLink
                        index={index}
                        animation={i.animaatio}
                        title={i.title}
                      />
                    </MagneticLinkBox>
                  );
                })}
              </div>
            </div>
            {page.video[0] && (
              <section
                className="col container padding align-center"
                css={`
                  color: #fff;
                  padding-top: 80px;
                  padding-bottom: 140px;
                  @media (max-width: 600px) {
                    padding-top: 0;
                    padding-bottom: 60px;
                  }
                  .VideoBox {
                    max-width: 920px;
                    margin: 0 auto;
                  }
                  h3 {
                    text-transform: none;
                    max-width: 500px;
                    text-align: center;
                    margin-bottom: 30px;
                    font-weight: 400;
                    @media (max-width: 600px) {
                      font-size: 20px;
                    }
                  }
                  .HeroLink {
                    display: inline-flex;
                    @media (max-width: 600px) {
                      font-size: 16px;
                    }
                  }
                `}
              >
                <>
                  <h3>{page.videoHeader}</h3>
                  <Video
                    data={page.video[0].file}
                    poster={page.video[0].poster.url}
                    markers={page.video[0].markers}
                  />
                  <Link
                    className="HeroLink"
                    to={page.videoCta[0].slug}
                    css={`
                      margin-top: 20px;
                    `}
                  >
                    {" "}
                    <svg
                      className="mt-[1px]"
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
                    {page.videoCta[0]?.text}
                  </Link>
                </>
              </section>
            )}

            <DownloadPDF />
          </Main>
        </Layout>
      </div>
    </>
  );
};

export default Page;

const Main = styled.main`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  //background: ${theme.primary};
  padding-top: 94px;
  overflow-x: hidden;
  position: relative;
  .Hero {
    padding-bottom: 50px;
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
      padding-right: 60px;
      @media (max-width: 1380px) {
        font-size: 56px;
      }
      @media (max-width: 700px) {
        font-size: 34px;
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
    display: inline-flex;
    font-size: 18px;
    font-weight: 600;
    opacity: 0.6;
    color: #fff;
    text-align: left;
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
    border: 1px solid #ffffff;
    padding: 30px;
    transition: 1s;
    background-color: rgba(0, 0, 83, 0.3);
    -webkit-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
    border-radius: 4px;
    @media (max-width: 600px) {
      height: auto;
      > div {
        display: none;
      }
    }
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
  #Link-product {
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
  #Link-crosshair {
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
  #Link-columns {
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
  #Link-video {
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
  #Link-jcad {
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
  #Link-bullseye {
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
  #Link-thumbup {
    svg .svg-elem-1 {
      stroke-dashoffset: 177.513671875px;
      stroke-dasharray: 177.513671875px;
      -webkit-transition: stroke-dashoffset 0.2s
        cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
      transition: stroke-dashoffset 0.2s cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
    }
    svg .svg-elem-2 {
      stroke-dashoffset: 97.09561157226562px;
      stroke-dasharray: 97.09561157226562px;
      -webkit-transition: stroke-dashoffset 0.2s
        cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
      transition: stroke-dashoffset 0.2s cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
    }
    svg .svg-elem-3 {
      stroke-dashoffset: 82.7922134399414px;
      stroke-dasharray: 82.7922134399414px;
      -webkit-transition: stroke-dashoffset 0.2s
        cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
      transition: stroke-dashoffset 0.2s cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
    }
    svg .svg-elem-4 {
      stroke-dashoffset: 82.79185485839844px;
      stroke-dasharray: 82.79185485839844px;
      -webkit-transition: stroke-dashoffset 0.2s
        cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
      transition: stroke-dashoffset 0.2s cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
    }
    svg .svg-elem-5 {
      stroke-dashoffset: 122.37962341308594px;
      stroke-dasharray: 122.37962341308594px;
      -webkit-transition: stroke-dashoffset 0.2s
        cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
      transition: stroke-dashoffset 0.2s cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
    }
    svg .svg-elem-6 {
      stroke-dashoffset: 778.5726928710938px;
      stroke-dasharray: 778.5726928710938px;
      -webkit-transition: stroke-dashoffset 0.2s
        cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
      transition: stroke-dashoffset 0.2s cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
    }
    svg .svg-elem-7 {
      stroke-dashoffset: 325.9791259765625px;
      stroke-dasharray: 325.9791259765625px;
      -webkit-transition: stroke-dashoffset 0.2s
        cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
      transition: stroke-dashoffset 0.2s cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
    }
    svg .svg-elem-8 {
      stroke-dashoffset: 326.8302917480469px;
      stroke-dasharray: 326.8302917480469px;
      -webkit-transition: stroke-dashoffset 0.2s
        cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
      transition: stroke-dashoffset 0.2s cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
    }
    svg .svg-elem-9 {
      stroke-dashoffset: 325.9797058105469px;
      stroke-dasharray: 325.9797058105469px;
      -webkit-transition: stroke-dashoffset 0.2s
        cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
      transition: stroke-dashoffset 0.2s cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
    }
    svg .svg-elem-10 {
      stroke-dashoffset: 326.8308410644531px;
      stroke-dasharray: 326.8308410644531px;
      -webkit-transition: stroke-dashoffset 0.2s
        cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
      transition: stroke-dashoffset 0.2s cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
    }
    svg .svg-elem-11 {
      stroke-dashoffset: 436.75250244140625px;
      stroke-dasharray: 436.75250244140625px;
      -webkit-transition: stroke-dashoffset 0.2s
        cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
      transition: stroke-dashoffset 0.2s cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
    }
    svg .svg-elem-12 {
      stroke-dashoffset: 436.75286865234375px;
      stroke-dasharray: 436.75286865234375px;
      -webkit-transition: stroke-dashoffset 0.2s
        cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
      transition: stroke-dashoffset 0.2s cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
    }
    svg .svg-elem-13 {
      stroke-dashoffset: 1720px;
      stroke-dasharray: 1720px;
      -webkit-transition: stroke-dashoffset 0.2s
        cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
      transition: stroke-dashoffset 0.2s cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
    }
    &:hover {
      svg.active .svg-elem-1 {
        stroke-dashoffset: 0;
      }
      svg.active .svg-elem-2 {
        stroke-dashoffset: 0;
      }
      svg.active .svg-elem-3 {
        stroke-dashoffset: 0;
      }
      svg.active .svg-elem-4 {
        stroke-dashoffset: 0;
      }
      svg.active .svg-elem-6 {
        stroke-dashoffset: 0;
      }
      svg.active .svg-elem-5 {
        stroke-dashoffset: 0;
      }
      svg.active .svg-elem-7 {
        stroke-dashoffset: 0;
      }
      svg.active .svg-elem-8 {
        stroke-dashoffset: 0;
      }
      svg.active .svg-elem-9 {
        stroke-dashoffset: 0;
      }
      svg.active .svg-elem-11 {
        stroke-dashoffset: 0;
      }
      svg.active .svg-elem-10 {
        stroke-dashoffset: 0;
      }
      svg.active .svg-elem-12 {
        stroke-dashoffset: 0;
      }
      svg.active .svg-elem-13 {
        stroke-dashoffset: 0;
      }
    }
  }
`;

const BgAnimation = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    css={`
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background: rgb(0, 0, 83);
      display: block;
      min-width: 100vw;
      shape-rendering: auto;
      @media (max-width: 600px) {
        left: -400px;
      }
    `}
    width="2879"
    height="993"
    preserveAspectRatio="xMidYMid"
    viewBox="0 0 2879 993"
  >
    <g transform="translate(1439.5,496.5) scale(1,1) translate(-1439.5,-496.5)">
      <linearGradient id="lg-0.2510863810006023" x1="0" x2="1" y1="0" y2="0">
        <stop stop-color="#0b0b73" offset="0"></stop>
        <stop stop-color="#161660" offset="1"></stop>
      </linearGradient>
      <path d="" fill="url(#lg-0.2510863810006023)" opacity="0.4">
        <animate
          attributeName="d"
          dur="14.285714285714286s"
          repeatCount="indefinite"
          keyTimes="0;0.333;0.667;1"
          calcMode="spline"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          begin="0s"
          values="M0 0L 0 330.75163812426746Q 479.8333333333333 181.77149861291295  959.6666666666666 157.46535139885233T 1919.3333333333333 135.97171369763038T 2879 -21.518601780996164L 2879 0 Z;M0 0L 0 495.2785027836816Q 479.8333333333333 239.3811209137978  959.6666666666666 214.56633158881T 1919.3333333333333 -1.7300965622308127T 2879 -127.63558841892831L 2879 0 Z;M0 0L 0 369.4262371599777Q 479.8333333333333 272.16451219348227  959.6666666666666 248.02571969871758T 1919.3333333333333 95.10629663772534T 2879 -231.23754229829126L 2879 0 Z;M0 0L 0 330.75163812426746Q 479.8333333333333 181.77149861291295  959.6666666666666 157.46535139885233T 1919.3333333333333 135.97171369763038T 2879 -21.518601780996164L 2879 0 Z"
        ></animate>
      </path>
      <path d="" fill="url(#lg-0.2510863810006023)" opacity="0.4">
        <animate
          attributeName="d"
          dur="14.285714285714286s"
          repeatCount="indefinite"
          keyTimes="0;0.333;0.667;1"
          calcMode="spline"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          begin="-4.761904761904762s"
          values="M0 0L 0 476.3698688355545Q 479.8333333333333 237.83709995497324  959.6666666666666 210.77828043315546T 1919.3333333333333 109.272024280435T 2879 -204.30408117450685L 2879 0 Z;M0 0L 0 490.27939888235187Q 479.8333333333333 232.47573026976067  959.6666666666666 213.30960777731207T 1919.3333333333333 149.1919411473708T 2879 -166.7263792026784L 2879 0 Z;M0 0L 0 321.13633121046075Q 479.8333333333333 259.92285425806756  959.6666666666666 232.92038920234225T 1919.3333333333333 10.73061713261825T 2879 8.503078880735018L 2879 0 Z;M0 0L 0 476.3698688355545Q 479.8333333333333 237.83709995497324  959.6666666666666 210.77828043315546T 1919.3333333333333 109.272024280435T 2879 -204.30408117450685L 2879 0 Z"
        ></animate>
      </path>
      <path d="" fill="url(#lg-0.2510863810006023)" opacity="0.4">
        <animate
          attributeName="d"
          dur="14.285714285714286s"
          repeatCount="indefinite"
          keyTimes="0;0.333;0.667;1"
          calcMode="spline"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          begin="-9.523809523809524s"
          values="M0 0L 0 423.72199918448564Q 479.8333333333333 247.72761128281175  959.6666666666666 220.41664569209203T 1919.3333333333333 74.32871994367997T 2879 -93.67572590383526L 2879 0 Z;M0 0L 0 367.08675436013266Q 479.8333333333333 263.0400424962019  959.6666666666666 233.23045889402985T 1919.3333333333333 102.14817430143279T 2879 -36.923321323595644L 2879 0 Z;M0 0L 0 452.1977713828769Q 479.8333333333333 297.6305887992976  959.6666666666666 282.7922093099801T 1919.3333333333333 136.09715821609677T 2879 -128.78467924213055L 2879 0 Z;M0 0L 0 423.72199918448564Q 479.8333333333333 247.72761128281175  959.6666666666666 220.41664569209203T 1919.3333333333333 74.32871994367997T 2879 -93.67572590383526L 2879 0 Z"
        ></animate>
      </path>
    </g>
  </svg>
);
