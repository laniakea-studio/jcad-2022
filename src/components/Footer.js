import { graphql, Link, useStaticQuery } from "gatsby";
import React, { useContext, useRef } from "react";
import styled from "styled-components";
import svgJcadLogo from "../assets/svgJcad.svg";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import { theme } from "../theme/theme";
import { SvgLogoFooter } from "./SvgCollection.js";
import { useIntersection } from "../hooks/useIntersection";
import { NetlifyForm } from "./NetlifyForm";
import figbc from "../assets/figbc-white.png";
import { DownloadPDF } from "./DowloadPDF";

export const Footer = ({ menu, prefix }) => {
  const { locale } = useContext(LocaleContext);
  const text = snippet[locale];
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const isContactPage =
    path === "/yhteystiedot"
      ? true
      : path === "/en/contact"
      ? true
      : path === "/sv/kontakter"
      ? true
      : false;

  const { yhteystiedotFi, yhteystiedotEn, yhteystiedotSv } =
    useStaticQuery(graphql`
      query {
        yhteystiedotFi: datoCmsYhteystiedot(locale: { eq: "fi" }) {
          myyntiJaTilaukset {
            nimi
            titteli
            puhelin
            email
          }
          asiakaspalvelu {
            nimi
            titteli
            puhelin
            email
          }
          asiakkuudet {
            nimi
            titteli
            puhelin
            email
          }
          toimipisteet {
            nimi
            osoite
          }
          ytunnus
        }
        yhteystiedotEn: datoCmsYhteystiedot(locale: { eq: "en" }) {
          myyntiJaTilaukset {
            nimi
            titteli
            puhelin
            email
          }
          asiakaspalvelu {
            nimi
            titteli
            puhelin
            email
          }
          asiakkuudet {
            nimi
            titteli
            puhelin
            email
          }
          toimipisteet {
            nimi
            osoite
          }
          ytunnus
        }
        yhteystiedotSv: datoCmsYhteystiedot(locale: { eq: "sv" }) {
          myyntiJaTilaukset {
            nimi
            titteli
            puhelin
            email
          }
          asiakaspalvelu {
            nimi
            titteli
            puhelin
            email
          }
          asiakkuudet {
            nimi
            titteli
            puhelin
            email
          }
          toimipisteet {
            nimi
            osoite
          }
          ytunnus
        }
      }
    `);

  const yhteystiedot =
    locale === "fi"
      ? yhteystiedotFi
      : locale === "en"
      ? yhteystiedotEn
      : yhteystiedotSv;

  const contacts = [
    {
      title: text.footer.sales,
      data: yhteystiedot.myyntiJaTilaukset[0],
    },
    {
      title: text.footer.support,
      data: yhteystiedot.asiakaspalvelu[0],
    },
    {
      title: text.footer.accounts,
      data: yhteystiedot.asiakkuudet[0],
    },
  ];

  // Animate Logo when in viewport
  const ref = useRef();
  const inViewport = useIntersection(ref, "-300px");
  if (inViewport) {
    ref.current.classList.add("active");
  }

  return (
    <>
      <FooterDiv className="pagePadding col">
        <div className="container padding">
          <div className="ContactsRow row space-between">
            <div className="Logo">
              <SvgLogoFooter />
            </div>
            {!isContactPage &&
              contacts.map((i, index) => (
                <div className="Contact col">
                  <h3>{i.title}</h3>
                  <p>
                    {i.data.nimi && index !== 1 && (
                      <span className="name">
                        {i.data.nimi}
                        <br />
                      </span>
                    )}
                    {i.data.titteli && (
                      <>
                        {i.data.titteli} <br />
                      </>
                    )}
                    {i.data.puhelin && (
                      <>
                        <a
                          href={`tel:${i.data.puhelin.replace(/\s+/g, "")}`}
                          className="ga-contact-phone"
                        >
                          {i.data.puhelin}
                        </a>
                        <br />
                      </>
                    )}
                    <a
                      href={`mailto:${i.data.email.replace(/\s+/g, "")}`}
                      className="ga-contact-mail"
                    >
                      {i.data.email}
                    </a>
                  </p>
                </div>
              ))}
            <div
              className="col"
              css={`
                justify-self: end;
                width: fit-content;
                min-width: 120px;
                @media (max-width: 900px) {
                  margin-left: 0;
                }
              `}
            >
              <img
                src={figbc}
                alt="Green building council Finland"
                css={`
                  width: 100%;
                  max-width: 180px;
                `}
              />
            </div>
          </div>
          <div ref={ref}>
            <div className="BigLogo row">
              <svg
                className="svgJcad"
                width="1332"
                height="449"
                viewBox="0 0 1332 449"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1025.47 0.4H1157.44C1253.46 0.4 1331.6 78.9863 1331.61 175.58V260.201C1331.61 356.781 1253.46 435.367 1157.44 435.367H1026.91V81.9805L1026.91 81.9734L1025.47 0.4ZM1107.62 353.772V354.172H1108.02H1157.44C1208.99 354.172 1250.92 312.026 1250.93 260.201C1250.93 260.197 1250.93 260.192 1250.93 260.187V175.58C1250.93 123.735 1208.98 81.5951 1157.44 81.5951H1108.02H1107.62V81.9951V353.772ZM135.664 81.9805L135.664 81.9734L134.227 0.4H216.361V273.42C216.361 370.028 138.221 448.6 42.1707 448.6H1.83712L0.407109 367.434H42.1852C93.7249 367.434 135.664 325.25 135.664 273.42L135.664 81.9805ZM799.574 81.885L799.499 81.5805H799.186H765.533H765.023H765.009V81.9769L764.635 81.885L719.342 266.253L719.221 266.748H719.731H844.478H844.988L844.866 266.253L799.574 81.885ZM681.295 82.0468L695.024 0.4H869.185L883.001 82.3697L883.003 82.3833L883.007 82.3967L967.842 435.367H878.976L861.851 338.019L861.793 337.689H861.457H702.781H702.445L702.387 338.019L685.218 435.367H596.352L681.29 82.074L681.293 82.0605L681.295 82.0468ZM285.705 175.595C285.705 78.9863 363.845 0.4 459.88 0.4H554.965L549.101 81.5658H459.895C408.341 81.5658 366.416 123.735 366.416 175.58V260.172C366.416 312.003 408.355 354.172 459.895 354.172H544.565L538.7 435.352H459.895C363.845 435.352 285.705 356.766 285.705 260.172V175.595Z"
                  stroke="white"
                  stroke-width="0.8"
                  class="svg-elem-1"
                ></path>
              </svg>
            </div>
            <div className="MediumLogo row">
              <svg
                class="svgJcad"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 795 266"
              >
                <g transform="translate(0 104.006)">
                  <g transform="translate(0 -103.506)">
                    <g transform="translate(610.402 0.004)">
                      <path
                        d="M81.4,93.4a55.238,55.238,0,0,1-55.189,55.168h-29.3V-11.655h29.3A55.239,55.239,0,0,1,81.4,43.516ZM26.208-59.98h-78.48l.854,48.323V196.9H26.208a103.62,103.62,0,0,0,103.5-103.5V43.516a103.619,103.619,0,0,0-103.5-103.5"
                        transform="translate(52.272 59.98)"
                        fill="none"
                        stroke="#fff"
                        stroke-width=""
                        class="svg-elem-1"
                      ></path>
                    </g>
                    <g transform="translate(169.151 0.003)">
                      <path
                        d="M0,63.028V112.9A103.621,103.621,0,0,0,103.507,216.4h46.939l3.514-48.32H103.507A55.249,55.249,0,0,1,48.32,112.9V63.028A55.249,55.249,0,0,1,103.507,7.844h53.115l3.511-48.32H103.507A103.62,103.62,0,0,0,0,63.028"
                        transform="translate(0 40.476)"
                        fill="none"
                        stroke="#fff"
                        stroke-width="1"
                        class="svg-elem-2"
                      ></path>
                    </g>
                    <g transform="translate(0.001 0)">
                      <path
                        d="M48.836,98.15A55.249,55.249,0,0,1-6.348,153.334H-31.362l.854,48.318h24.16A103.621,103.621,0,0,0,97.159,98.15V-63.031H47.982L48.836-14.7Z"
                        transform="translate(31.362 63.031)"
                        fill="none"
                        stroke="#fff"
                        stroke-width="1"
                        class="svg-elem-3"
                      ></path>
                    </g>
                  </g>
                  <g transform="translate(355.921 -103.506)">
                    <path
                      d="M35.684,0l-8.17,48.328-50.43,208.55H30.265l10.213-57.572h94.076l10.185,57.572h53.187L147.565,48.517,139.352,0Zm41.7,48.328H97.649L124.5,157.013H50.534Z"
                      transform="translate(22.916)"
                      fill="none"
                      stroke="#fff"
                      stroke-width="1"
                      class="svg-elem-4"
                    ></path>
                  </g>
                </g>
              </svg>
            </div>
          </div>
          <div className="row">
            <p className="Copyright">
              © {new Date().getFullYear()} {text.footer.companyName}.{" "}
              <Link
                to={
                  locale === "fi"
                    ? "/tietosuojaseloste"
                    : locale === "en"
                    ? "/en/gdpr"
                    : "/sv/gdpr"
                }
              >
                {text.footer.linkGdpr}
              </Link>
              . {yhteystiedot.ytunnus}
            </p>
          </div>
        </div>
      </FooterDiv>
    </>
  );
};

const FooterDiv = styled.footer`
  background: ${theme.primary};
  color: #fff;
  border-top: 0.8px dashed #fff;
  position: relative;
  .container {
    padding-top: 80px;
  }
  .ContactsRow {
    @media (max-width: 900px) {
      flex-direction: column;
    }
  }
  .Logo {
    margin-right: 50px;
    margin-bottom: 50px;
    svg {
      width: 85px;
    }
  }
  .Contact {
    padding-right: 30px;
    margin-bottom: 30px;
    max-width: 250px;
    width: 100%;
    .name {
      text-transform: uppercase;
      font-weight: 700;
    }
    h3 {
      font-size: 16px;
      font-weight: 700;
      height: 40px;
    }
  }
  .BigLogo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 60px auto 0;
    @media (max-width: 1000px) {
      display: none;
    }
  }
  .MediumLogo {
    display: none;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 60px auto 0;
    @media (max-width: 1000px) {
      display: flex;
    }
  }
  .Copyright {
    margin-top: 60px;
    margin-bottom: 30px;
    font-size: 14px;
    @media (max-width: 900px) {
      margin-left: auto;
      margin-right: auto;
    }
    a {
      text-transform: uppercase;
      text-decoration: underline;
    }
  }

  /***************************************************
 * Generated by SVG Artista on 5/26/2022, 2:36:21 PM
 * MIT license (https://opensource.org/licenses/MIT)
 * W. https://svgartista.net
 **************************************************/

  .BigLogo {
    svg .svg-elem-1 {
      stroke-dashoffset: 6964.0927734375px;
      stroke-dasharray: 6964.0927734375px;
      -webkit-transition: stroke-dashoffset 1.2s
        cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
      transition: stroke-dashoffset 1.2s cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
    }
  }
  .active .BigLogo .svg-elem-1 {
    stroke-dashoffset: 0;
  }

  .MediumLogo {
    svg .svg-elem-1 {
      stroke-dashoffset: 1232.0067138671875px;
      stroke-dasharray: 1232.0067138671875px;
      transition: stroke-dashoffset 1s cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
    }

    svg .svg-elem-2 {
      stroke-dashoffset: 904.22314453125px;
      stroke-dasharray: 904.22314453125px;
      transition: stroke-dashoffset 1s cubic-bezier(0.47, 0, 0.745, 0.715) 0.12s;
    }

    svg .svg-elem-3 {
      stroke-dashoffset: 720.2703247070312px;
      stroke-dasharray: 720.2703247070312px;
      transition: stroke-dashoffset 1s cubic-bezier(0.47, 0, 0.745, 0.715) 0.24s;
    }

    svg .svg-elem-4 {
      stroke-dashoffset: 1268.3271484375px;
      stroke-dasharray: 1268.3271484375px;
      transition: stroke-dashoffset 1s cubic-bezier(0.47, 0, 0.745, 0.715) 0.36s;
    }
    // Show without animation on mobile
    @media (max-width: 600px) {
      .svg-elem-1 {
        stroke-dashoffset: 0 !important;
      }
      .svg-elem-2 {
        stroke-dashoffset: 0 !important;
      }
      .svg-elem-3 {
        stroke-dashoffset: 0 !important;
      }
      .svg-elem-4 {
        stroke-dashoffset: 0 !important;
      }
    }
  }
  .active .MediumLogo {
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
`;

const SvgDashedLine = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="508"
      height="1"
      viewBox="0 0 508 1"
    >
      <line
        x1="508"
        transform="translate(0 0.5)"
        fill="none"
        stroke="#fff"
        stroke-width="1"
        stroke-dasharray="4 4"
      />
    </svg>
  );
};
