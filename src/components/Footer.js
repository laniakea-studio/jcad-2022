import React, { useEffect, useState, useContext } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import styled from "styled-components";
import { theme } from "../theme/theme";
import { Pin } from "./SvgCollection.js";
import fi from "../locales/fi.yml";
import en from "../locales/en.yml";
import sv from "../locales/sv.yml";
import svgJcadLogo from "../assets/svgJcad.svg";
import ReactVivus from "react-vivus";
import { LocaleContext } from "../contexts/LocaleContext";
import { SvgLogoFooter, SvgLogo } from "./SvgCollection.js";

export const Footer = ({ menu, prefix }) => {
  const { locale, localeSlugs } = useContext(LocaleContext);
  const text = locale === "fi" ? fi : locale === "en" ? en : sv;

  const { yhteystiedot } = useStaticQuery(graphql`
    query {
      yhteystiedot: datoCmsYhteystiedot {
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

  return (
    <FooterDiv>
      <div className="container">
        <div className="content  wrap">
          <SvgLogoFrame className="logoFrame" />
          <div className="row header">
            <div>
              <SvgLogoFooter />
            </div>
            <div className="FooterMenu">
              {menu.map((i) => (
                <Link
                  to={`/${prefix + i.to}`}
                  activeClassName="active"
                  style={{ marginTop: 8 }}
                >
                  {i.title}
                </Link>
              ))}
            </div>
            <div>
              <a
                className="backToTop"
                href="#intro"
                onClick={(e) => window.scrollTo(0, 0)}
              >
                {text.footer.buttonBackToTop}
              </a>
            </div>
          </div>

          <div className="row contacts">
            <div className="col">
              <div className="titleBox">
                <h3>{text.footer.sales}</h3>
              </div>
              <p>
                {yhteystiedot.myyntiJaTilaukset[0].nimi && (
                  <>
                    <strong>{yhteystiedot.myyntiJaTilaukset[0].nimi}</strong>
                    <br />
                  </>
                )}
                {yhteystiedot.myyntiJaTilaukset[0].titteli && (
                  <>
                    {yhteystiedot.myyntiJaTilaukset[0].titteli} <br />
                  </>
                )}
                {yhteystiedot.myyntiJaTilaukset[0].puhelin && (
                  <>
                    <a
                      href={`tel:${yhteystiedot.myyntiJaTilaukset[0].puhelin.replace(
                        /\s+/g,
                        ""
                      )}`}
                    >
                      {yhteystiedot.myyntiJaTilaukset[0].puhelin}
                    </a>
                    <br />
                  </>
                )}
                <a
                  href={`mailto:${yhteystiedot.myyntiJaTilaukset[0].email.replace(
                    /\s+/g,
                    ""
                  )}`}
                >
                  {yhteystiedot.myyntiJaTilaukset[0].email}
                </a>
              </p>
            </div>
            <div className="col">
              <div className="titleBox">
                <h3>{text.footer.support}</h3>
              </div>
              <p>
                {yhteystiedot.asiakaspalvelu[0].nimi && (
                  <>
                    <strong>{yhteystiedot.asiakaspalvelu[0].nimi}</strong>
                    <br />
                  </>
                )}
                {yhteystiedot.asiakaspalvelu[0].titteli && (
                  <>
                    {yhteystiedot.asiakaspalvelu[0].titteli} <br />
                  </>
                )}
                {yhteystiedot.asiakaspalvelu[0].puhelin && (
                  <>
                    <a
                      href={`tel:${yhteystiedot.asiakaspalvelu[0].puhelin.replace(
                        /\s+/g,
                        ""
                      )}`}
                    >
                      {yhteystiedot.asiakaspalvelu[0].puhelin}
                    </a>
                    <br />
                  </>
                )}
                <a
                  href={`mailto:${yhteystiedot.asiakaspalvelu[0].email.replace(
                    /\s+/g,
                    ""
                  )}`}
                >
                  {yhteystiedot.asiakaspalvelu[0].email}
                </a>
              </p>
            </div>
            <div className="col">
              <div className="titleBox">
                <h3>{text.footer.accounts}</h3>
              </div>
              <p>
                {yhteystiedot.asiakkuudet[0].nimi && (
                  <>
                    <strong>{yhteystiedot.asiakkuudet[0].nimi}</strong>
                    <br />
                  </>
                )}
                {yhteystiedot.asiakkuudet[0].titteli && (
                  <>
                    {yhteystiedot.asiakkuudet[0].titteli} <br />
                  </>
                )}
                {yhteystiedot.asiakkuudet[0].puhelin && (
                  <>
                    <a
                      href={`tel:${yhteystiedot.asiakkuudet[0].puhelin.replace(
                        /\s+/g,
                        ""
                      )}`}
                    >
                      {yhteystiedot.asiakkuudet[0].puhelin}
                    </a>
                    <br />
                  </>
                )}
                <a
                  href={`mailto:${yhteystiedot.asiakkuudet[0].email.replace(
                    /\s+/g,
                    ""
                  )}`}
                >
                  {yhteystiedot.asiakkuudet[0].email}
                </a>
              </p>
            </div>
          </div>

          <div className="row logoBox">
            <ReactVivus
              id="logoJcad"
              option={{
                file: svgJcadLogo,
                animTimingFunction: "ease-out",
                type: "sync",
              }}
              style={{ width: "100%" }}
            />
          </div>
          <div className="row">
            <p className="copy">
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
          <div className="backTop">
            <div />
            <a
              className="backToTop"
              href="#intro"
              onClick={(e) => window.scrollTo(0, 0)}
            >
              {text.footer.buttonBackToTop}
            </a>
          </div>
        </div>
      </div>
    </FooterDiv>
  );
};

const FooterDiv = styled.footer`
  flex-direction: column;
  background: ${theme.primary};
  padding-top: 46px;
  padding-left: 0;
  padding-right: 0;
  color: #fff;
  text-align: left;
  .content {
    position: relative;
    overflow: hidden;
    > div {
      z-index: 10;
      position: relative;
    }
  }
  .logoFrame {
    position: absolute;
    width: 100%;
  }
  .logoBox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 85%;
    max-width: 900px;
    margin: 120px auto 0;
  }
  .copy {
    margin-left: 80px;
    margin-top: 60px;
    margin-bottom: 30px;
    a {
      text-transform: uppercase;
      text-decoration: underline;
    }
  }

  .row.header {
    display: flex;
    justify-content: space-between;
    margin-top: 100px;
    margin-bottom: 30px;
    margin-left: 100px;
    margin-right: 100px;
    > div {
      display: flex;
      flex: 1;
    }
    .FooterMenu {
      display: none;
      text-align: center;
      width: 100%;
      align-items: center;
      flex-direction: column;
      margin-top: -13px;
      > a {
        display: inline-flex;
        font-size: 18px;
        padding-top: 6px;
        padding-bottom: 6px;
        padding-left: 10px;
        padding-right: 10px;
      }
    }
    a.backToTop {
      margin-left: auto;
      text-transform: uppercase;
      margin-right: 180px;
      font-weight: 700;
      font-size: 19px;
    }
  }

  ${theme.mobile} {
    .svgJcad {
      g path {
        stroke-width: 3;
      }
    }
    a.backToTop {
      margin-left: auto;
      margin-right: auto;
      margin-top: 50px;
      margin-bottom: 40px;
      text-transform: uppercase;
      font-weight: 700;
      z-index: 1;
    }
  }
  .backTop {
    overflow: hidden;
    position: relative;
    display: none;
    ${theme.mobile} {
      display: flex;
    }
    > div {
      width: 200px;
      height: 200px;
      border: 1px solid #fff;
      transform: rotate(45deg);
      position: absolute;
      margin: 0 auto;
      left: 0;
      right: 0;
      bottom: -140px;
    }
  }

  .row.contacts {
    min-height: 220px;
    border-bottom: 1px solid #fff;
    padding-left: 50px;
    padding-right: 50px;
    ${theme.max900} {
      padding-left: 0;
      padding-right: 0;
    }
    p {
      font-size: 18px;
      strong {
        text-transform: uppercase;
      }
    }
    .titleBox {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #fff;
      height: 68px;
      padding-left: 40px;
      padding-right: 40px;
      margin-bottom: 20px;
      h3 {
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
        text-align: center;
        line-height: 1.2;
      }
    }
    .col {
      flex: 1;
      padding: 50px;
      justify-content: flex-start;
    }
    .col:nth-child(2) {
      flex: 2;
    }
    ${theme.max1000} {
      .col {
        padding: 30px;
      }
    }
    ${theme.max900} {
      margin-top: 20px;
      flex-direction: column;
      border-bottom: none;
      .col {
        padding: 40px 0 0;
      }

      .titleBox h3 {
        font-size: 28px;
        padding-left: 24px;
      }
      .titleBox {
        margin-left: 0;
        border-left-style: none;
        text-align: left;
        height: auto;
        width: auto;
        justify-content: flex-start;
        padding-left: 24px;
        padding-right: 48px;
        max-width: fit-content;
      }
      p {
        padding-left: 48px;
      }
    }
  }
  @media (max-width: 1000px) {
    svg.logoFrame {
      display: none;
    }
    border-top: 1px solid #fff;
    .row.contacts {
      border-bottom: none;
    }
  }
  @media (max-width: 900px) {
    .row.header,
    .row.contacts {
      margin-left: 0;
      margin-right: 0;
    }
    .row.header {
      padding-left: 48px;
      padding-right: 48px;
    }
  }
  @media (max-width: 900px) {
    .row p.copy {
      margin-left: auto;
      margin-right: auto;
    }
    .header a.backToTop {
      display: none;
    }
  }
`;

const SvgVerticalLine = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="1"
      height="195"
      viewBox="0 0 1 195"
    >
      <line
        id="Line_184"
        data-name="Line 184"
        y2="195"
        transform="translate(0.5)"
        fill="none"
        stroke="#fff"
        stroke-width="1"
        stroke-dasharray="3 4"
      />
    </svg>
  );
};
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
const SvgHaircross = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
    >
      <g data-name="Group 2156" transform="translate(-1130.97 -6342.587)">
        <g data-name="Group 2153" transform="translate(1134.438 6342.587)">
          <g data-name="Group 1962" transform="translate(0 0)">
            <path
              data-name="Path 1804"
              d="M-2.986-7.336A7.886,7.886,0,0,0,4.9-15.222a7.886,7.886,0,0,0-7.886-7.886,7.886,7.886,0,0,0-7.886,7.886A7.886,7.886,0,0,0-2.986-7.336Zm0,3.332V-26.713"
              transform="translate(10.872 26.713)"
              fill="none"
              stroke="#fff"
              stroke-width="1"
            />
          </g>
        </g>
        <g data-name="Group 2154" transform="translate(1130.97 6353.941)">
          <path
            data-name="Path 1820"
            d="M0,0H22.709"
            fill="none"
            stroke="#fff"
            stroke-width="1"
          />
        </g>
      </g>
    </svg>
  );
};
const SvgLogoFrame = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1355.498 1261.379"
    >
      <g id="Group_1475" data-name="Group 1475" transform="translate(0 84.024)">
        <g
          id="Group_1241"
          data-name="Group 1241"
          transform="translate(679.182 486.73)"
        >
          <path
            id="Path_1128"
            data-name="Path 1128"
            d="M0,103.239V-16.831"
            transform="translate(0 16.831)"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1242"
          data-name="Group 1242"
          transform="translate(679.19 349.644)"
        >
          <path
            id="Path_1129"
            data-name="Path 1129"
            d="M0,11.047V-1.8"
            transform="translate(0 1.801)"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1243"
          data-name="Group 1243"
          transform="translate(679.19 -43.725)"
        >
          <path
            id="Path_1130"
            data-name="Path 1130"
            d="M0,65.833V-22.012"
            transform="translate(0 22.012)"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
            stroke-dasharray="6.099 1.857"
          />
        </g>
        <g
          id="Group_1244"
          data-name="Group 1244"
          transform="translate(1054.866 -59.776)"
        >
          <path
            id="Path_1131"
            data-name="Path 1131"
            d="M0,11.047V-1.8M273.9,273.7H261.048"
            transform="translate(0 1.801)"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1245"
          data-name="Group 1245"
          transform="translate(1153.022 546.753)"
        >
          <path
            id="Path_1132"
            data-name="Path 1132"
            d="M134.57,0H-21.939"
            transform="translate(21.939)"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
            stroke-dasharray="6.079 1.851"
          />
        </g>
        <g
          id="Group_1246"
          data-name="Group 1246"
          transform="translate(582.059 546.753)"
        >
          <path
            id="Path_1133"
            data-name="Path 1133"
            d="M164.442,0H151.594M-13.961,0H-26.809"
            transform="translate(26.809)"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1247"
          data-name="Group 1247"
          transform="translate(42.73 546.753)"
        >
          <path
            id="Path_1134"
            data-name="Path 1134"
            d="M134.57,0H-21.939"
            transform="translate(21.939)"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
            stroke-dasharray="6.079 1.851"
          />
        </g>
        <g
          id="Group_1248"
          data-name="Group 1248"
          transform="translate(26.681 877.689)"
        >
          <path
            id="Path_1135"
            data-name="Path 1135"
            d="M11.053,0H-1.8m275.23,274.51V261.662"
            transform="translate(1.802)"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1249"
          data-name="Group 1249"
          transform="translate(679.19 976.778)"
        >
          <path
            id="Path_1136"
            data-name="Path 1136"
            d="M0,134.3V-21.9"
            transform="translate(0 21.895)"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
            stroke-dasharray="6.067 1.848"
          />
        </g>
        <g
          id="Group_1250"
          data-name="Group 1250"
          transform="translate(679.19 730.788)"
        >
          <path
            id="Path_1137"
            data-name="Path 1137"
            d="M0,11.047V-1.8"
            transform="translate(0 1.801)"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1251"
          data-name="Group 1251"
          transform="translate(26.683 -84.024)"
        >
          <path
            id="Path_1138"
            data-name="Path 1138"
            d="M480.091,603.26H764.8M1271.922,1194.2H-30.165V12.085H1271.922ZM225.8,12.085m-255.965-54.1V32.111"
            transform="translate(30.165 42.018)"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1254"
          data-name="Group 1254"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1252"
            data-name="Group 1252"
            transform="translate(49.625 26.502)"
          >
            <path
              id="Path_1139"
              data-name="Path 1139"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.415-9.728C3.373-.648-1.3,3.706-1.3,9.08s4.67,9.728,10.4,9.728c5.745,0,10.415-4.354,10.415-9.728"
              transform="translate(1.297 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1253"
            data-name="Group 1253"
            transform="translate(49.625 26.502)"
          >
            <path
              id="Path_1140"
              data-name="Path 1140"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.415-9.728C3.373-.648-1.3,3.706-1.3,9.08s4.67,9.728,10.4,9.728C14.848,18.808,19.518,14.454,19.518,9.08Z"
              transform="translate(1.297 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1255"
          data-name="Group 1255"
          transform="translate(63.296 -84.024)"
        >
          <path
            id="Path_1142"
            data-name="Path 1142"
            d="M0,0V34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1258"
          data-name="Group 1258"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1256"
            data-name="Group 1256"
            transform="translate(131.974 26.502)"
          >
            <path
              id="Path_1143"
              data-name="Path 1143"
              d="M19.518,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.67,9.728,10.415,9.728,10.4-4.354,10.4-9.728"
              transform="translate(1.297 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1257"
            data-name="Group 1257"
            transform="translate(131.974 26.502)"
          >
            <path
              id="Path_1144"
              data-name="Path 1144"
              d="M19.518,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.67,9.728,10.415,9.728S19.518,14.454,19.518,9.08Z"
              transform="translate(1.297 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1259"
          data-name="Group 1259"
          transform="translate(99.901 -84.024)"
        >
          <path
            id="Path_1146"
            data-name="Path 1146"
            d="M0,0V34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1262"
          data-name="Group 1262"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1260"
            data-name="Group 1260"
            transform="translate(214.348 26.502)"
          >
            <path
              id="Path_1147"
              data-name="Path 1147"
              d="M19.5,9.08c0-5.374-4.67-9.728-10.4-9.728C3.358-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728c5.729,0,10.4-4.354,10.4-9.728"
              transform="translate(1.296 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1261"
            data-name="Group 1261"
            transform="translate(214.348 26.502)"
          >
            <path
              id="Path_1148"
              data-name="Path 1148"
              d="M19.5,9.08c0-5.374-4.67-9.728-10.4-9.728C3.358-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728C14.833,18.808,19.5,14.454,19.5,9.08Z"
              transform="translate(1.296 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1263"
          data-name="Group 1263"
          transform="translate(307.098 -84.024)"
        >
          <path
            id="Path_1150"
            data-name="Path 1150"
            d="M0,0V34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1266"
          data-name="Group 1266"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1264"
            data-name="Group 1264"
            transform="translate(296.69 26.502)"
          >
            <path
              id="Path_1151"
              data-name="Path 1151"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.373-.648-1.3,3.706-1.3,9.08s4.67,9.728,10.415,9.728c5.729,0,10.4-4.354,10.4-9.728"
              transform="translate(1.297 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1265"
            data-name="Group 1265"
            transform="translate(296.69 26.502)"
          >
            <path
              id="Path_1152"
              data-name="Path 1152"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.373-.648-1.3,3.706-1.3,9.08s4.67,9.728,10.415,9.728C14.848,18.808,19.518,14.454,19.518,9.08Z"
              transform="translate(1.297 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1267"
          data-name="Group 1267"
          transform="translate(389.457 -84.024)"
        >
          <path
            id="Path_1154"
            data-name="Path 1154"
            d="M0,0V34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1270"
          data-name="Group 1270"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1268"
            data-name="Group 1268"
            transform="translate(379.048 26.502)"
          >
            <path
              id="Path_1155"
              data-name="Path 1155"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.357-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.415,9.728c5.729,0,10.4-4.354,10.4-9.728"
              transform="translate(1.297 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1269"
            data-name="Group 1269"
            transform="translate(379.048 26.502)"
          >
            <path
              id="Path_1156"
              data-name="Path 1156"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.357-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.415,9.728C14.848,18.808,19.518,14.454,19.518,9.08Z"
              transform="translate(1.297 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1271"
          data-name="Group 1271"
          transform="translate(471.806 -84.024)"
        >
          <path
            id="Path_1158"
            data-name="Path 1158"
            d="M0,0V34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1274"
          data-name="Group 1274"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1272"
            data-name="Group 1272"
            transform="translate(461.415 26.502)"
          >
            <path
              id="Path_1159"
              data-name="Path 1159"
              d="M19.5,9.08c0-5.374-4.67-9.728-10.4-9.728C3.358-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728c5.729,0,10.4-4.354,10.4-9.728"
              transform="translate(1.296 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1273"
            data-name="Group 1273"
            transform="translate(461.415 26.502)"
          >
            <path
              id="Path_1160"
              data-name="Path 1160"
              d="M19.5,9.08c0-5.374-4.67-9.728-10.4-9.728C3.358-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728C14.833,18.808,19.5,14.454,19.5,9.08Z"
              transform="translate(1.296 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1275"
          data-name="Group 1275"
          transform="translate(554.165 -84.024)"
        >
          <path
            id="Path_1162"
            data-name="Path 1162"
            d="M0,0V34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1278"
          data-name="Group 1278"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1276"
            data-name="Group 1276"
            transform="translate(543.756 26.502)"
          >
            <path
              id="Path_1163"
              data-name="Path 1163"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.373-.648-1.3,3.706-1.3,9.08s4.67,9.728,10.415,9.728c5.729,0,10.4-4.354,10.4-9.728"
              transform="translate(1.297 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1277"
            data-name="Group 1277"
            transform="translate(543.756 26.502)"
          >
            <path
              id="Path_1164"
              data-name="Path 1164"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.373-.648-1.3,3.706-1.3,9.08s4.67,9.728,10.415,9.728C14.848,18.808,19.518,14.454,19.518,9.08Z"
              transform="translate(1.297 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1279"
          data-name="Group 1279"
          transform="translate(636.522 -84.024)"
        >
          <path
            id="Path_1166"
            data-name="Path 1166"
            d="M0,0V34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1282"
          data-name="Group 1282"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1280"
            data-name="Group 1280"
            transform="translate(626.113 26.502)"
          >
            <path
              id="Path_1167"
              data-name="Path 1167"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.357-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.415,9.728c5.729,0,10.4-4.354,10.4-9.728"
              transform="translate(1.297 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1281"
            data-name="Group 1281"
            transform="translate(626.113 26.502)"
          >
            <path
              id="Path_1168"
              data-name="Path 1168"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.357-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.415,9.728C14.848,18.808,19.518,14.454,19.518,9.08Z"
              transform="translate(1.297 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1283"
          data-name="Group 1283"
          transform="translate(718.88 -84.024)"
        >
          <path
            id="Path_1170"
            data-name="Path 1170"
            d="M0,0V34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1286"
          data-name="Group 1286"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1284"
            data-name="Group 1284"
            transform="translate(708.48 26.502)"
          >
            <path
              id="Path_1171"
              data-name="Path 1171"
              d="M19.5,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728S19.5,14.454,19.5,9.08"
              transform="translate(1.296 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1285"
            data-name="Group 1285"
            transform="translate(708.48 26.502)"
          >
            <path
              id="Path_1172"
              data-name="Path 1172"
              d="M19.5,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728S19.5,14.454,19.5,9.08Z"
              transform="translate(1.296 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1287"
          data-name="Group 1287"
          transform="translate(801.23 -84.024)"
        >
          <path
            id="Path_1174"
            data-name="Path 1174"
            d="M0,0V34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1290"
          data-name="Group 1290"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1288"
            data-name="Group 1288"
            transform="translate(790.838 26.502)"
          >
            <path
              id="Path_1175"
              data-name="Path 1175"
              d="M19.5,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728S19.5,14.454,19.5,9.08"
              transform="translate(1.296 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1289"
            data-name="Group 1289"
            transform="translate(790.838 26.502)"
          >
            <path
              id="Path_1176"
              data-name="Path 1176"
              d="M19.5,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728S19.5,14.454,19.5,9.08Z"
              transform="translate(1.296 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1291"
          data-name="Group 1291"
          transform="translate(883.588 -84.024)"
        >
          <path
            id="Path_1178"
            data-name="Path 1178"
            d="M0,0V34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1294"
          data-name="Group 1294"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1292"
            data-name="Group 1292"
            transform="translate(873.18 26.502)"
          >
            <path
              id="Path_1179"
              data-name="Path 1179"
              d="M19.518,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.67,9.728,10.415,9.728,10.4-4.354,10.4-9.728"
              transform="translate(1.297 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1293"
            data-name="Group 1293"
            transform="translate(873.18 26.502)"
          >
            <path
              id="Path_1180"
              data-name="Path 1180"
              d="M19.518,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.67,9.728,10.415,9.728S19.518,14.454,19.518,9.08Z"
              transform="translate(1.297 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1295"
          data-name="Group 1295"
          transform="translate(965.947 -84.024)"
        >
          <path
            id="Path_1182"
            data-name="Path 1182"
            d="M0,0V34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1298"
          data-name="Group 1298"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1296"
            data-name="Group 1296"
            transform="translate(955.538 26.502)"
          >
            <path
              id="Path_1183"
              data-name="Path 1183"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.357-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.415,9.728c5.729,0,10.4-4.354,10.4-9.728"
              transform="translate(1.297 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1297"
            data-name="Group 1297"
            transform="translate(955.538 26.502)"
          >
            <path
              id="Path_1184"
              data-name="Path 1184"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.357-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.415,9.728C14.848,18.808,19.518,14.454,19.518,9.08Z"
              transform="translate(1.297 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1299"
          data-name="Group 1299"
          transform="translate(1048.304 -84.024)"
        >
          <path
            id="Path_1186"
            data-name="Path 1186"
            d="M0,0V34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1302"
          data-name="Group 1302"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1300"
            data-name="Group 1300"
            transform="translate(1037.903 26.502)"
          >
            <path
              id="Path_1187"
              data-name="Path 1187"
              d="M19.5,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728S19.5,14.454,19.5,9.08"
              transform="translate(1.296 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1301"
            data-name="Group 1301"
            transform="translate(1037.903 26.502)"
          >
            <path
              id="Path_1188"
              data-name="Path 1188"
              d="M19.5,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728S19.5,14.454,19.5,9.08Z"
              transform="translate(1.296 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1303"
          data-name="Group 1303"
          transform="translate(1255.55 -84.024)"
        >
          <path
            id="Path_1190"
            data-name="Path 1190"
            d="M0,0V34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1306"
          data-name="Group 1306"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1304"
            data-name="Group 1304"
            transform="translate(1120.262 26.502)"
          >
            <path
              id="Path_1191"
              data-name="Path 1191"
              d="M19.5,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728S19.5,14.454,19.5,9.08"
              transform="translate(1.296 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1305"
            data-name="Group 1305"
            transform="translate(1120.262 26.502)"
          >
            <path
              id="Path_1192"
              data-name="Path 1192"
              d="M19.5,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728S19.5,14.454,19.5,9.08Z"
              transform="translate(1.296 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1307"
          data-name="Group 1307"
          transform="translate(1292.16 -84.024)"
        >
          <path
            id="Path_1194"
            data-name="Path 1194"
            d="M0,0V34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1310"
          data-name="Group 1310"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1308"
            data-name="Group 1308"
            transform="translate(1202.603 26.502)"
          >
            <path
              id="Path_1195"
              data-name="Path 1195"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.357-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.415,9.728c5.729,0,10.4-4.354,10.4-9.728"
              transform="translate(1.297 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1309"
            data-name="Group 1309"
            transform="translate(1202.603 26.502)"
          >
            <path
              id="Path_1196"
              data-name="Path 1196"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.357-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.415,9.728C14.848,18.808,19.518,14.454,19.518,9.08Z"
              transform="translate(1.297 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1311"
          data-name="Group 1311"
          transform="translate(1328.77 -84.024)"
        >
          <path
            id="Path_1198"
            data-name="Path 1198"
            d="M0,0V34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1410"
          data-name="Group 1410"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1312"
            data-name="Group 1312"
            transform="translate(1284.97 26.502)"
          >
            <path
              id="Path_1199"
              data-name="Path 1199"
              d="M19.5,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728S19.5,14.454,19.5,9.08"
              transform="translate(1.296 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1313"
            data-name="Group 1313"
            transform="translate(1284.97 26.502)"
          >
            <path
              id="Path_1200"
              data-name="Path 1200"
              d="M19.5,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728S19.5,14.454,19.5,9.08Z"
              transform="translate(1.296 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1314"
            data-name="Group 1314"
            transform="translate(60.024 1188.925)"
          >
            <path
              id="Path_1201"
              data-name="Path 1201"
              d="M0,0V72.463"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1315"
            data-name="Group 1315"
            transform="translate(49.625 1215.423)"
          >
            <path
              id="Path_1202"
              data-name="Path 1202"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.415-9.728C3.373-.648-1.3,3.706-1.3,9.08s4.67,9.728,10.4,9.728c5.745,0,10.415-4.354,10.415-9.728"
              transform="translate(1.297 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1316"
            data-name="Group 1316"
            transform="translate(49.625 1215.423)"
          >
            <path
              id="Path_1203"
              data-name="Path 1203"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.415-9.728C3.373-.648-1.3,3.706-1.3,9.08s4.67,9.728,10.4,9.728C14.848,18.808,19.518,14.454,19.518,9.08Z"
              transform="translate(1.297 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1317"
            data-name="Group 1317"
            transform="translate(142.391 1188.925)"
          >
            <path
              id="Path_1204"
              data-name="Path 1204"
              d="M0,0V72.463"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1318"
            data-name="Group 1318"
            transform="translate(131.974 1215.423)"
          >
            <path
              id="Path_1205"
              data-name="Path 1205"
              d="M19.518,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.67,9.728,10.415,9.728,10.4-4.354,10.4-9.728"
              transform="translate(1.297 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1319"
            data-name="Group 1319"
            transform="translate(131.974 1215.423)"
          >
            <path
              id="Path_1206"
              data-name="Path 1206"
              d="M19.518,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.67,9.728,10.415,9.728S19.518,14.454,19.518,9.08Z"
              transform="translate(1.297 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1320"
            data-name="Group 1320"
            transform="translate(224.741 1188.925)"
          >
            <path
              id="Path_1207"
              data-name="Path 1207"
              d="M0,0V72.463"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1321"
            data-name="Group 1321"
            transform="translate(214.348 1215.423)"
          >
            <path
              id="Path_1208"
              data-name="Path 1208"
              d="M19.5,9.08c0-5.374-4.67-9.728-10.4-9.728C3.358-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728c5.729,0,10.4-4.354,10.4-9.728"
              transform="translate(1.296 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1322"
            data-name="Group 1322"
            transform="translate(214.348 1215.423)"
          >
            <path
              id="Path_1209"
              data-name="Path 1209"
              d="M19.5,9.08c0-5.374-4.67-9.728-10.4-9.728C3.358-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728C14.833,18.808,19.5,14.454,19.5,9.08Z"
              transform="translate(1.296 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1323"
            data-name="Group 1323"
            transform="translate(307.098 1188.925)"
          >
            <path
              id="Path_1210"
              data-name="Path 1210"
              d="M0,0V72.463"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1324"
            data-name="Group 1324"
            transform="translate(296.69 1215.423)"
          >
            <path
              id="Path_1211"
              data-name="Path 1211"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.373-.648-1.3,3.706-1.3,9.08s4.67,9.728,10.415,9.728c5.729,0,10.4-4.354,10.4-9.728"
              transform="translate(1.297 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1325"
            data-name="Group 1325"
            transform="translate(296.69 1215.423)"
          >
            <path
              id="Path_1212"
              data-name="Path 1212"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.373-.648-1.3,3.706-1.3,9.08s4.67,9.728,10.415,9.728C14.848,18.808,19.518,14.454,19.518,9.08Z"
              transform="translate(1.297 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1326"
            data-name="Group 1326"
            transform="translate(389.457 1188.925)"
          >
            <path
              id="Path_1213"
              data-name="Path 1213"
              d="M0,0V72.463"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1327"
            data-name="Group 1327"
            transform="translate(379.048 1215.423)"
          >
            <path
              id="Path_1214"
              data-name="Path 1214"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.357-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.415,9.728c5.729,0,10.4-4.354,10.4-9.728"
              transform="translate(1.297 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1328"
            data-name="Group 1328"
            transform="translate(379.048 1215.423)"
          >
            <path
              id="Path_1215"
              data-name="Path 1215"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.357-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.415,9.728C14.848,18.808,19.518,14.454,19.518,9.08Z"
              transform="translate(1.297 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1329"
            data-name="Group 1329"
            transform="translate(471.806 1188.925)"
          >
            <path
              id="Path_1216"
              data-name="Path 1216"
              d="M0,0V72.463"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1330"
            data-name="Group 1330"
            transform="translate(461.415 1215.423)"
          >
            <path
              id="Path_1217"
              data-name="Path 1217"
              d="M19.5,9.08c0-5.374-4.67-9.728-10.4-9.728C3.358-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728c5.729,0,10.4-4.354,10.4-9.728"
              transform="translate(1.296 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1331"
            data-name="Group 1331"
            transform="translate(461.415 1215.423)"
          >
            <path
              id="Path_1218"
              data-name="Path 1218"
              d="M19.5,9.08c0-5.374-4.67-9.728-10.4-9.728C3.358-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728C14.833,18.808,19.5,14.454,19.5,9.08Z"
              transform="translate(1.296 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1332"
            data-name="Group 1332"
            transform="translate(554.165 1188.925)"
          >
            <path
              id="Path_1219"
              data-name="Path 1219"
              d="M0,0V72.463"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1333"
            data-name="Group 1333"
            transform="translate(543.756 1215.423)"
          >
            <path
              id="Path_1220"
              data-name="Path 1220"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.373-.648-1.3,3.706-1.3,9.08s4.67,9.728,10.415,9.728c5.729,0,10.4-4.354,10.4-9.728"
              transform="translate(1.297 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1334"
            data-name="Group 1334"
            transform="translate(543.756 1215.423)"
          >
            <path
              id="Path_1221"
              data-name="Path 1221"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.373-.648-1.3,3.706-1.3,9.08s4.67,9.728,10.415,9.728C14.848,18.808,19.518,14.454,19.518,9.08Z"
              transform="translate(1.297 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1335"
            data-name="Group 1335"
            transform="translate(636.522 1188.925)"
          >
            <path
              id="Path_1222"
              data-name="Path 1222"
              d="M0,0V72.463"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1336"
            data-name="Group 1336"
            transform="translate(626.113 1215.423)"
          >
            <path
              id="Path_1223"
              data-name="Path 1223"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.357-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.415,9.728c5.729,0,10.4-4.354,10.4-9.728"
              transform="translate(1.297 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1337"
            data-name="Group 1337"
            transform="translate(626.113 1215.423)"
          >
            <path
              id="Path_1224"
              data-name="Path 1224"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.357-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.415,9.728C14.848,18.808,19.518,14.454,19.518,9.08Z"
              transform="translate(1.297 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1338"
            data-name="Group 1338"
            transform="translate(718.88 1188.925)"
          >
            <path
              id="Path_1225"
              data-name="Path 1225"
              d="M0,0V72.463"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1339"
            data-name="Group 1339"
            transform="translate(708.48 1215.423)"
          >
            <path
              id="Path_1226"
              data-name="Path 1226"
              d="M19.5,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728S19.5,14.454,19.5,9.08"
              transform="translate(1.296 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1340"
            data-name="Group 1340"
            transform="translate(708.48 1215.423)"
          >
            <path
              id="Path_1227"
              data-name="Path 1227"
              d="M19.5,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728S19.5,14.454,19.5,9.08Z"
              transform="translate(1.296 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1341"
            data-name="Group 1341"
            transform="translate(801.23 1188.925)"
          >
            <path
              id="Path_1228"
              data-name="Path 1228"
              d="M0,0V72.463"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1342"
            data-name="Group 1342"
            transform="translate(790.838 1215.423)"
          >
            <path
              id="Path_1229"
              data-name="Path 1229"
              d="M19.5,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728S19.5,14.454,19.5,9.08"
              transform="translate(1.296 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1343"
            data-name="Group 1343"
            transform="translate(790.838 1215.423)"
          >
            <path
              id="Path_1230"
              data-name="Path 1230"
              d="M19.5,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728S19.5,14.454,19.5,9.08Z"
              transform="translate(1.296 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1344"
            data-name="Group 1344"
            transform="translate(883.588 1188.925)"
          >
            <path
              id="Path_1231"
              data-name="Path 1231"
              d="M0,0V72.463"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1345"
            data-name="Group 1345"
            transform="translate(873.18 1215.423)"
          >
            <path
              id="Path_1232"
              data-name="Path 1232"
              d="M19.518,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.67,9.728,10.415,9.728,10.4-4.354,10.4-9.728"
              transform="translate(1.297 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1346"
            data-name="Group 1346"
            transform="translate(873.18 1215.423)"
          >
            <path
              id="Path_1233"
              data-name="Path 1233"
              d="M19.518,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.67,9.728,10.415,9.728S19.518,14.454,19.518,9.08Z"
              transform="translate(1.297 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1347"
            data-name="Group 1347"
            transform="translate(965.947 1188.925)"
          >
            <path
              id="Path_1234"
              data-name="Path 1234"
              d="M0,0V72.463"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1348"
            data-name="Group 1348"
            transform="translate(955.538 1215.423)"
          >
            <path
              id="Path_1235"
              data-name="Path 1235"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.357-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.415,9.728c5.729,0,10.4-4.354,10.4-9.728"
              transform="translate(1.297 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1349"
            data-name="Group 1349"
            transform="translate(955.538 1215.423)"
          >
            <path
              id="Path_1236"
              data-name="Path 1236"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.357-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.415,9.728C14.848,18.808,19.518,14.454,19.518,9.08Z"
              transform="translate(1.297 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1350"
            data-name="Group 1350"
            transform="translate(1048.304 1188.925)"
          >
            <path
              id="Path_1237"
              data-name="Path 1237"
              d="M0,0V72.463"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1351"
            data-name="Group 1351"
            transform="translate(1037.903 1215.423)"
          >
            <path
              id="Path_1238"
              data-name="Path 1238"
              d="M19.5,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728S19.5,14.454,19.5,9.08"
              transform="translate(1.296 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1352"
            data-name="Group 1352"
            transform="translate(1037.903 1215.423)"
          >
            <path
              id="Path_1239"
              data-name="Path 1239"
              d="M19.5,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728S19.5,14.454,19.5,9.08Z"
              transform="translate(1.296 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1353"
            data-name="Group 1353"
            transform="translate(1130.653 1188.925)"
          >
            <path
              id="Path_1240"
              data-name="Path 1240"
              d="M0,0V72.463"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1354"
            data-name="Group 1354"
            transform="translate(1120.262 1215.423)"
          >
            <path
              id="Path_1241"
              data-name="Path 1241"
              d="M19.5,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728S19.5,14.454,19.5,9.08"
              transform="translate(1.296 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1355"
            data-name="Group 1355"
            transform="translate(1120.262 1215.423)"
          >
            <path
              id="Path_1242"
              data-name="Path 1242"
              d="M19.5,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728S19.5,14.454,19.5,9.08Z"
              transform="translate(1.296 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1356"
            data-name="Group 1356"
            transform="translate(1213.012 1188.925)"
          >
            <path
              id="Path_1243"
              data-name="Path 1243"
              d="M0,0V72.463"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1357"
            data-name="Group 1357"
            transform="translate(1202.603 1215.423)"
          >
            <path
              id="Path_1244"
              data-name="Path 1244"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.357-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.415,9.728c5.729,0,10.4-4.354,10.4-9.728"
              transform="translate(1.297 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1358"
            data-name="Group 1358"
            transform="translate(1202.603 1215.423)"
          >
            <path
              id="Path_1245"
              data-name="Path 1245"
              d="M19.518,9.08c0-5.374-4.67-9.728-10.4-9.728C3.357-.648-1.3,3.706-1.3,9.08s4.654,9.728,10.415,9.728C14.848,18.808,19.518,14.454,19.518,9.08Z"
              transform="translate(1.297 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1359"
            data-name="Group 1359"
            transform="translate(1295.369 1188.925)"
          >
            <path
              id="Path_1246"
              data-name="Path 1246"
              d="M0,0V72.463"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1360"
            data-name="Group 1360"
            transform="translate(1284.97 1215.423)"
          >
            <path
              id="Path_1247"
              data-name="Path 1247"
              d="M19.5,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728S19.5,14.454,19.5,9.08"
              transform="translate(1.296 0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1361"
            data-name="Group 1361"
            transform="translate(1284.97 1215.423)"
          >
            <path
              id="Path_1248"
              data-name="Path 1248"
              d="M19.5,9.08c0-5.374-4.654-9.728-10.4-9.728S-1.3,3.706-1.3,9.08s4.654,9.728,10.4,9.728S19.5,14.454,19.5,9.08Z"
              transform="translate(1.296 0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1362"
            data-name="Group 1362"
            transform="translate(-0.008 1208.196)"
          >
            <path
              id="Path_1249"
              data-name="Path 1249"
              d="M0,0H77.466"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1363"
            data-name="Group 1363"
            transform="translate(28.319 1198.462)"
          >
            <path
              id="Path_1250"
              data-name="Path 1250"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.389,4.654,9.743,10.4,9.743s10.4-4.354,10.4-9.743C20.151,4.369,15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1364"
            data-name="Group 1364"
            transform="translate(28.319 1198.462)"
          >
            <path
              id="Path_1251"
              data-name="Path 1251"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.389,4.654,9.743,10.4,9.743s10.4-4.354,10.4-9.743C20.151,4.369,15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1365"
            data-name="Group 1365"
            transform="translate(-0.008 1131.165)"
          >
            <path
              id="Path_1252"
              data-name="Path 1252"
              d="M0,0H77.466"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1366"
            data-name="Group 1366"
            transform="translate(28.319 1121.429)"
          >
            <path
              id="Path_1253"
              data-name="Path 1253"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.374,4.654,9.728,10.4,9.728s10.4-4.354,10.4-9.728C20.151,4.369,15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1367"
            data-name="Group 1367"
            transform="translate(28.319 1121.429)"
          >
            <path
              id="Path_1254"
              data-name="Path 1254"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.374,4.654,9.728,10.4,9.728s10.4-4.354,10.4-9.728C20.151,4.369,15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1368"
            data-name="Group 1368"
            transform="translate(-0.008 1054.124)"
          >
            <path
              id="Path_1255"
              data-name="Path 1255"
              d="M0,0H77.466"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1369"
            data-name="Group 1369"
            transform="translate(28.319 1044.39)"
          >
            <path
              id="Path_1256"
              data-name="Path 1256"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.743,10.4,9.743,10.4-4.369,10.4-9.743S15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1370"
            data-name="Group 1370"
            transform="translate(28.319 1044.39)"
          >
            <path
              id="Path_1257"
              data-name="Path 1257"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.743,10.4,9.743,10.4-4.369,10.4-9.743S15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1371"
            data-name="Group 1371"
            transform="translate(-0.008 977.085)"
          >
            <path
              id="Path_1258"
              data-name="Path 1258"
              d="M0,0H77.466"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1372"
            data-name="Group 1372"
            transform="translate(28.319 967.351)"
          >
            <path
              id="Path_1259"
              data-name="Path 1259"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.389,4.654,9.743,10.4,9.743s10.4-4.354,10.4-9.743C20.151,4.369,15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1373"
            data-name="Group 1373"
            transform="translate(28.319 967.351)"
          >
            <path
              id="Path_1260"
              data-name="Path 1260"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.389,4.654,9.743,10.4,9.743s10.4-4.354,10.4-9.743C20.151,4.369,15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1374"
            data-name="Group 1374"
            transform="translate(-0.008 900.046)"
          >
            <path
              id="Path_1261"
              data-name="Path 1261"
              d="M0,0H77.466"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1375"
            data-name="Group 1375"
            transform="translate(28.319 890.318)"
          >
            <path
              id="Path_1262"
              data-name="Path 1262"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.728,10.4,9.728,10.4-4.354,10.4-9.728S15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1376"
            data-name="Group 1376"
            transform="translate(28.319 890.318)"
          >
            <path
              id="Path_1263"
              data-name="Path 1263"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.728,10.4,9.728,10.4-4.354,10.4-9.728S15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1377"
            data-name="Group 1377"
            transform="translate(-0.008 823.013)"
          >
            <path
              id="Path_1264"
              data-name="Path 1264"
              d="M0,0H77.466"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1378"
            data-name="Group 1378"
            transform="translate(28.319 813.279)"
          >
            <path
              id="Path_1265"
              data-name="Path 1265"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.728,10.4,9.728,10.4-4.354,10.4-9.728S15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1379"
            data-name="Group 1379"
            transform="translate(28.319 813.279)"
          >
            <path
              id="Path_1266"
              data-name="Path 1266"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.728,10.4,9.728,10.4-4.354,10.4-9.728S15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1380"
            data-name="Group 1380"
            transform="translate(-0.008 745.974)"
          >
            <path
              id="Path_1267"
              data-name="Path 1267"
              d="M0,0H77.466"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1381"
            data-name="Group 1381"
            transform="translate(28.319 736.238)"
          >
            <path
              id="Path_1268"
              data-name="Path 1268"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.743,10.4,9.743,10.4-4.369,10.4-9.743S15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1382"
            data-name="Group 1382"
            transform="translate(28.319 736.238)"
          >
            <path
              id="Path_1269"
              data-name="Path 1269"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.743,10.4,9.743,10.4-4.369,10.4-9.743S15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1383"
            data-name="Group 1383"
            transform="translate(-0.008 668.933)"
          >
            <path
              id="Path_1270"
              data-name="Path 1270"
              d="M0,0H77.466"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1384"
            data-name="Group 1384"
            transform="translate(28.319 659.199)"
          >
            <path
              id="Path_1271"
              data-name="Path 1271"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.389,4.654,9.743,10.4,9.743s10.4-4.354,10.4-9.743C20.151,4.369,15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1385"
            data-name="Group 1385"
            transform="translate(28.319 659.199)"
          >
            <path
              id="Path_1272"
              data-name="Path 1272"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.389,4.654,9.743,10.4,9.743s10.4-4.354,10.4-9.743C20.151,4.369,15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1386"
            data-name="Group 1386"
            transform="translate(-0.008 591.894)"
          >
            <path
              id="Path_1273"
              data-name="Path 1273"
              d="M0,0H77.466"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1387"
            data-name="Group 1387"
            transform="translate(28.319 582.168)"
          >
            <path
              id="Path_1274"
              data-name="Path 1274"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.728,10.4,9.728,10.4-4.354,10.4-9.728S15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1388"
            data-name="Group 1388"
            transform="translate(28.319 582.168)"
          >
            <path
              id="Path_1275"
              data-name="Path 1275"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.728,10.4,9.728,10.4-4.354,10.4-9.728S15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1389"
            data-name="Group 1389"
            transform="translate(-0.008 514.862)"
          >
            <path
              id="Path_1276"
              data-name="Path 1276"
              d="M0,0H77.466"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1390"
            data-name="Group 1390"
            transform="translate(28.319 505.127)"
          >
            <path
              id="Path_1277"
              data-name="Path 1277"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.728,10.4,9.728,10.4-4.354,10.4-9.728S15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1391"
            data-name="Group 1391"
            transform="translate(28.319 505.127)"
          >
            <path
              id="Path_1278"
              data-name="Path 1278"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.728,10.4,9.728,10.4-4.354,10.4-9.728S15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1392"
            data-name="Group 1392"
            transform="translate(-0.008 437.822)"
          >
            <path
              id="Path_1279"
              data-name="Path 1279"
              d="M0,0H77.466"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1393"
            data-name="Group 1393"
            transform="translate(28.319 428.088)"
          >
            <path
              id="Path_1280"
              data-name="Path 1280"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.389,4.654,9.743,10.4,9.743s10.4-4.354,10.4-9.743C20.151,4.369,15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1394"
            data-name="Group 1394"
            transform="translate(28.319 428.088)"
          >
            <path
              id="Path_1281"
              data-name="Path 1281"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.389,4.654,9.743,10.4,9.743s10.4-4.354,10.4-9.743C20.151,4.369,15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1395"
            data-name="Group 1395"
            transform="translate(-0.008 360.783)"
          >
            <path
              id="Path_1282"
              data-name="Path 1282"
              d="M0,0H77.466"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1396"
            data-name="Group 1396"
            transform="translate(28.319 351.052)"
          >
            <path
              id="Path_1283"
              data-name="Path 1283"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.743,10.4,9.743,10.4-4.369,10.4-9.743S15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1397"
            data-name="Group 1397"
            transform="translate(28.319 351.052)"
          >
            <path
              id="Path_1284"
              data-name="Path 1284"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.743,10.4,9.743,10.4-4.369,10.4-9.743S15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1398"
            data-name="Group 1398"
            transform="translate(-0.008 283.747)"
          >
            <path
              id="Path_1285"
              data-name="Path 1285"
              d="M0,0H77.466"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1399"
            data-name="Group 1399"
            transform="translate(28.319 274.013)"
          >
            <path
              id="Path_1286"
              data-name="Path 1286"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.389,4.654,9.743,10.4,9.743s10.4-4.354,10.4-9.743C20.151,4.369,15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1400"
            data-name="Group 1400"
            transform="translate(28.319 274.013)"
          >
            <path
              id="Path_1287"
              data-name="Path 1287"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.389,4.654,9.743,10.4,9.743s10.4-4.354,10.4-9.743C20.151,4.369,15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1401"
            data-name="Group 1401"
            transform="translate(-0.008 206.708)"
          >
            <path
              id="Path_1288"
              data-name="Path 1288"
              d="M0,0H77.466"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1402"
            data-name="Group 1402"
            transform="translate(28.319 196.977)"
          >
            <path
              id="Path_1289"
              data-name="Path 1289"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.743,10.4,9.743,10.4-4.369,10.4-9.743S15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1403"
            data-name="Group 1403"
            transform="translate(28.319 196.977)"
          >
            <path
              id="Path_1290"
              data-name="Path 1290"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.743,10.4,9.743,10.4-4.369,10.4-9.743S15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1404"
            data-name="Group 1404"
            transform="translate(-0.008 129.672)"
          >
            <path
              id="Path_1291"
              data-name="Path 1291"
              d="M0,0H77.466"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1405"
            data-name="Group 1405"
            transform="translate(28.319 119.941)"
          >
            <path
              id="Path_1292"
              data-name="Path 1292"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.728,10.4,9.728,10.4-4.354,10.4-9.728S15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1406"
            data-name="Group 1406"
            transform="translate(28.319 119.941)"
          >
            <path
              id="Path_1293"
              data-name="Path 1293"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.728,10.4,9.728,10.4-4.354,10.4-9.728S15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1407"
            data-name="Group 1407"
            transform="translate(-0.008 52.631)"
          >
            <path
              id="Path_1294"
              data-name="Path 1294"
              d="M0,0H77.466"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
          <g
            id="Group_1408"
            data-name="Group 1408"
            transform="translate(28.319 42.9)"
          >
            <path
              id="Path_1295"
              data-name="Path 1295"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.743,10.4,9.743,10.4-4.369,10.4-9.743S15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1409"
            data-name="Group 1409"
            transform="translate(28.319 42.9)"
          >
            <path
              id="Path_1296"
              data-name="Path 1296"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.743,10.4,9.743,10.4-4.369,10.4-9.743S15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1411"
          data-name="Group 1411"
          transform="translate(1321.061 1152.083)"
        >
          <path
            id="Path_1298"
            data-name="Path 1298"
            d="M0,0H34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1414"
          data-name="Group 1414"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1412"
            data-name="Group 1412"
            transform="translate(1306.363 1198.462)"
          >
            <path
              id="Path_1299"
              data-name="Path 1299"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.389,4.654,9.743,10.4,9.743s10.4-4.354,10.4-9.743C20.151,4.369,15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1413"
            data-name="Group 1413"
            transform="translate(1306.363 1198.462)"
          >
            <path
              id="Path_1300"
              data-name="Path 1300"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.389,4.654,9.743,10.4,9.743s10.4-4.354,10.4-9.743C20.151,4.369,15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1415"
          data-name="Group 1415"
          transform="translate(1321.061 1115.477)"
        >
          <path
            id="Path_1302"
            data-name="Path 1302"
            d="M0,0H34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1418"
          data-name="Group 1418"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1416"
            data-name="Group 1416"
            transform="translate(1306.363 1121.429)"
          >
            <path
              id="Path_1303"
              data-name="Path 1303"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.374,4.654,9.728,10.4,9.728s10.4-4.354,10.4-9.728C20.151,4.369,15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1417"
            data-name="Group 1417"
            transform="translate(1306.363 1121.429)"
          >
            <path
              id="Path_1304"
              data-name="Path 1304"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.374,4.654,9.728,10.4,9.728s10.4-4.354,10.4-9.728C20.151,4.369,15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1419"
          data-name="Group 1419"
          transform="translate(1321.061 1078.867)"
        >
          <path
            id="Path_1306"
            data-name="Path 1306"
            d="M0,0H34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1422"
          data-name="Group 1422"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1420"
            data-name="Group 1420"
            transform="translate(1306.363 1044.39)"
          >
            <path
              id="Path_1307"
              data-name="Path 1307"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.743,10.4,9.743,10.4-4.369,10.4-9.743S15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1421"
            data-name="Group 1421"
            transform="translate(1306.363 1044.39)"
          >
            <path
              id="Path_1308"
              data-name="Path 1308"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.743,10.4,9.743,10.4-4.369,10.4-9.743S15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1423"
          data-name="Group 1423"
          transform="translate(1321.061 893.063)"
        >
          <path
            id="Path_1310"
            data-name="Path 1310"
            d="M0,0H34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1426"
          data-name="Group 1426"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1424"
            data-name="Group 1424"
            transform="translate(1306.363 967.351)"
          >
            <path
              id="Path_1311"
              data-name="Path 1311"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.389,4.654,9.743,10.4,9.743s10.4-4.354,10.4-9.743C20.151,4.369,15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1425"
            data-name="Group 1425"
            transform="translate(1306.363 967.351)"
          >
            <path
              id="Path_1312"
              data-name="Path 1312"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.389,4.654,9.743,10.4,9.743s10.4-4.354,10.4-9.743C20.151,4.369,15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1427"
          data-name="Group 1427"
          transform="translate(1321.061 816.024)"
        >
          <path
            id="Path_1314"
            data-name="Path 1314"
            d="M0,0H34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1430"
          data-name="Group 1430"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1428"
            data-name="Group 1428"
            transform="translate(1306.363 890.318)"
          >
            <path
              id="Path_1315"
              data-name="Path 1315"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.728,10.4,9.728,10.4-4.354,10.4-9.728S15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1429"
            data-name="Group 1429"
            transform="translate(1306.363 890.318)"
          >
            <path
              id="Path_1316"
              data-name="Path 1316"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.728,10.4,9.728,10.4-4.354,10.4-9.728S15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1431"
          data-name="Group 1431"
          transform="translate(1321.061 738.992)"
        >
          <path
            id="Path_1318"
            data-name="Path 1318"
            d="M0,0H34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1434"
          data-name="Group 1434"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1432"
            data-name="Group 1432"
            transform="translate(1306.363 813.279)"
          >
            <path
              id="Path_1319"
              data-name="Path 1319"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.728,10.4,9.728,10.4-4.354,10.4-9.728S15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1433"
            data-name="Group 1433"
            transform="translate(1306.363 813.279)"
          >
            <path
              id="Path_1320"
              data-name="Path 1320"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.728,10.4,9.728,10.4-4.354,10.4-9.728S15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1435"
          data-name="Group 1435"
          transform="translate(1321.061 661.953)"
        >
          <path
            id="Path_1322"
            data-name="Path 1322"
            d="M0,0H34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1438"
          data-name="Group 1438"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1436"
            data-name="Group 1436"
            transform="translate(1306.363 736.238)"
          >
            <path
              id="Path_1323"
              data-name="Path 1323"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.743,10.4,9.743,10.4-4.369,10.4-9.743S15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1437"
            data-name="Group 1437"
            transform="translate(1306.363 736.238)"
          >
            <path
              id="Path_1324"
              data-name="Path 1324"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.743,10.4,9.743,10.4-4.369,10.4-9.743S15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1439"
          data-name="Group 1439"
          transform="translate(1321.061 584.912)"
        >
          <path
            id="Path_1326"
            data-name="Path 1326"
            d="M0,0H34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1442"
          data-name="Group 1442"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1440"
            data-name="Group 1440"
            transform="translate(1306.363 659.199)"
          >
            <path
              id="Path_1327"
              data-name="Path 1327"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.389,4.654,9.743,10.4,9.743s10.4-4.354,10.4-9.743C20.151,4.369,15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1441"
            data-name="Group 1441"
            transform="translate(1306.363 659.199)"
          >
            <path
              id="Path_1328"
              data-name="Path 1328"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.389,4.654,9.743,10.4,9.743s10.4-4.354,10.4-9.743C20.151,4.369,15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1443"
          data-name="Group 1443"
          transform="translate(1321.061 507.873)"
        >
          <path
            id="Path_1330"
            data-name="Path 1330"
            d="M0,0H34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1446"
          data-name="Group 1446"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1444"
            data-name="Group 1444"
            transform="translate(1306.363 582.168)"
          >
            <path
              id="Path_1331"
              data-name="Path 1331"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.728,10.4,9.728,10.4-4.354,10.4-9.728S15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1445"
            data-name="Group 1445"
            transform="translate(1306.363 582.168)"
          >
            <path
              id="Path_1332"
              data-name="Path 1332"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.728,10.4,9.728,10.4-4.354,10.4-9.728S15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1447"
          data-name="Group 1447"
          transform="translate(1321.061 430.842)"
        >
          <path
            id="Path_1334"
            data-name="Path 1334"
            d="M0,0H34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1450"
          data-name="Group 1450"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1448"
            data-name="Group 1448"
            transform="translate(1306.363 505.127)"
          >
            <path
              id="Path_1335"
              data-name="Path 1335"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.728,10.4,9.728,10.4-4.354,10.4-9.728S15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1449"
            data-name="Group 1449"
            transform="translate(1306.363 505.127)"
          >
            <path
              id="Path_1336"
              data-name="Path 1336"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.728,10.4,9.728,10.4-4.354,10.4-9.728S15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1451"
          data-name="Group 1451"
          transform="translate(1321.061 353.801)"
        >
          <path
            id="Path_1338"
            data-name="Path 1338"
            d="M0,0H34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1454"
          data-name="Group 1454"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1452"
            data-name="Group 1452"
            transform="translate(1306.363 428.088)"
          >
            <path
              id="Path_1339"
              data-name="Path 1339"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.389,4.654,9.743,10.4,9.743s10.4-4.354,10.4-9.743C20.151,4.369,15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1453"
            data-name="Group 1453"
            transform="translate(1306.363 428.088)"
          >
            <path
              id="Path_1340"
              data-name="Path 1340"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.389,4.654,9.743,10.4,9.743s10.4-4.354,10.4-9.743C20.151,4.369,15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1455"
          data-name="Group 1455"
          transform="translate(1321.061 276.762)"
        >
          <path
            id="Path_1342"
            data-name="Path 1342"
            d="M0,0H34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1458"
          data-name="Group 1458"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1456"
            data-name="Group 1456"
            transform="translate(1306.363 351.052)"
          >
            <path
              id="Path_1343"
              data-name="Path 1343"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.743,10.4,9.743,10.4-4.369,10.4-9.743S15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1457"
            data-name="Group 1457"
            transform="translate(1306.363 351.052)"
          >
            <path
              id="Path_1344"
              data-name="Path 1344"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.743,10.4,9.743,10.4-4.369,10.4-9.743S15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1459"
          data-name="Group 1459"
          transform="translate(1321.061 199.726)"
        >
          <path
            id="Path_1346"
            data-name="Path 1346"
            d="M0,0H34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1462"
          data-name="Group 1462"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1460"
            data-name="Group 1460"
            transform="translate(1306.363 274.013)"
          >
            <path
              id="Path_1347"
              data-name="Path 1347"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.389,4.654,9.743,10.4,9.743s10.4-4.354,10.4-9.743C20.151,4.369,15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1461"
            data-name="Group 1461"
            transform="translate(1306.363 274.013)"
          >
            <path
              id="Path_1348"
              data-name="Path 1348"
              d="M9.751,0C4.006,0-.648,4.369-.648,9.728c0,5.389,4.654,9.743,10.4,9.743s10.4-4.354,10.4-9.743C20.151,4.369,15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1463"
          data-name="Group 1463"
          transform="translate(1321.061 14.206)"
        >
          <path
            id="Path_1350"
            data-name="Path 1350"
            d="M0,0H34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1466"
          data-name="Group 1466"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1464"
            data-name="Group 1464"
            transform="translate(1306.363 196.977)"
          >
            <path
              id="Path_1351"
              data-name="Path 1351"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.743,10.4,9.743,10.4-4.369,10.4-9.743S15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1465"
            data-name="Group 1465"
            transform="translate(1306.363 196.977)"
          >
            <path
              id="Path_1352"
              data-name="Path 1352"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.743,10.4,9.743,10.4-4.369,10.4-9.743S15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1467"
          data-name="Group 1467"
          transform="translate(1321.061 -22.401)"
        >
          <path
            id="Path_1354"
            data-name="Path 1354"
            d="M0,0H34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1470"
          data-name="Group 1470"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1468"
            data-name="Group 1468"
            transform="translate(1306.363 119.941)"
          >
            <path
              id="Path_1355"
              data-name="Path 1355"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.728,10.4,9.728,10.4-4.354,10.4-9.728S15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1469"
            data-name="Group 1469"
            transform="translate(1306.363 119.941)"
          >
            <path
              id="Path_1356"
              data-name="Path 1356"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.728,10.4,9.728,10.4-4.354,10.4-9.728S15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <g
          id="Group_1471"
          data-name="Group 1471"
          transform="translate(1321.061 -59.012)"
        >
          <path
            id="Path_1358"
            data-name="Path 1358"
            d="M0,0H34.435"
            fill="none"
            stroke="#fff"
            stroke-width="0.6"
          />
        </g>
        <g
          id="Group_1474"
          data-name="Group 1474"
          transform="translate(0 -84.022)"
        >
          <g
            id="Group_1472"
            data-name="Group 1472"
            transform="translate(1306.363 42.9)"
          >
            <path
              id="Path_1359"
              data-name="Path 1359"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.743,10.4,9.743,10.4-4.369,10.4-9.743S15.5,0,9.751,0"
              transform="translate(0.648)"
              fill="none"
            />
          </g>
          <g
            id="Group_1473"
            data-name="Group 1473"
            transform="translate(1306.363 42.9)"
          >
            <path
              id="Path_1360"
              data-name="Path 1360"
              d="M9.751,0C4.006,0-.648,4.354-.648,9.728s4.654,9.743,10.4,9.743,10.4-4.369,10.4-9.743S15.5,0,9.751,0Z"
              transform="translate(0.648)"
              fill="none"
              stroke="#fff"
              stroke-width="0.6"
            />
          </g>
        </g>
        <path
          id="Path_1362"
          data-name="Path 1362"
          d="M1342.42,1167.188H.983V-83.26H1342.42Z"
          transform="translate(6.03 4.688)"
          fill="none"
          stroke="#fff"
          stroke-width="1"
        />
      </g>
    </svg>
  );
};
