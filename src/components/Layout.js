import { graphql, Link, useStaticQuery } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import GlobalStyle from "../theme/global";
import "../theme/index.css";
import { BurgerIcon } from "./BurgerIcon";
import FlatHeader from "./FlatHeader";
import { Footer } from "./Footer";
import { SvgLogo } from "./SvgCollection";
import {
  fullMenu,
  mainMenu,
  prefix,
  order,
  bookDemo,
} from "../constants/slugs";

const isBrowser = typeof window !== "undefined";

export const Layout = ({ children, page }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, localeSlugs } = useContext(LocaleContext);
  const text = snippet[locale];

  const data = useStaticQuery(graphql`
    query {
      site: datoCmsSite {
        faviconMetaTags {
          tags
        }
      }
      fi: datoCmsTilaaDemo(locale: { eq: "fi" }) {
        calendlyBookingUrl
        buttonText
      }
      en: datoCmsTilaaDemo(locale: { eq: "en" }) {
        calendlyBookingUrl
        buttonText
      }
      sv: datoCmsTilaaDemo(locale: { eq: "sv" }) {
        calendlyBookingUrl
        buttonText
      }
    }
  `);

  const { site, fi, en, sv } = data;
  const booking = locale === "fi" ? fi : locale === "en" ? en : sv;

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

  return (
    <>
      <GlobalStyle />
      <HelmetDatoCms favicon={site.faviconMetaTags}>
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </HelmetDatoCms>
      <FlatHeader
        menu={mainMenu[locale]}
        booking={booking}
        menuOpen={menuOpen}
        setMenuOpen={() => setMenuOpen(!menuOpen)}
      />
      <Header className="pagePadding">
        <div
          className={`row align-center container padding${
            page === "about" ? " hideSideBorders" : ""
          }`}
        >
          <div>
            <Link className="logo" to={`${prefix[locale]}`}>
              <SvgLogo />
            </Link>
          </div>
          <div className="col space-around">
            <nav
              className="Main flex justify-end align-center"
              css={`
                a.MainLink {
                  position: relative;
                  &:before {
                    content: "";
                    position: absolute;
                    display: block;
                    width: 50px;
                    height: 1px;
                    bottom: 0;
                    left: calc(50% - 25px);
                    right: 0;
                    background-color: #fff;
                    transform: scaleX(0);
                    transition: transform 0.3s ease;
                  }
                  &:hover::before,
                  &.active::before {
                    transform: scaleX(1);
                  }
                }
                a.localeLink {
                  position: relative;
                  &:before {
                    content: "";
                    position: absolute;
                    display: block;
                    width: 30px;
                    height: 1px;
                    bottom: 0;
                    left: calc(50% - 15px);
                    right: 0;
                    background-color: #fff;
                    transform: scaleX(0);
                    transition: transform 0.3s ease;
                  }
                  &:hover::before,
                  &.active::before {
                    transform: scaleX(1);
                  }
                }
              `}
            >
              {page !== "home" &&
                mainMenu[locale].map((i) => (
                  <Link
                    to={`${prefix[locale] + i.slug}`}
                    activeClassName="active"
                    className="MainLink"
                    style={{ transition: "0.1s", opacity: menuOpen ? 0 : 1 }}
                  >
                    {i.title}
                  </Link>
                ))}
              {page === "home" && (
                <>
                  <div
                    className="row"
                    css={`
                      margin-left: 40px;
                      @media (max-width: 500px) {
                        display: none !important;
                      }
                      a {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 10px;
                        font-weight: 600;
                      }
                    `}
                  >
                    {localeSlugs.fi && (
                      <Link to={localeSlugs.fi} className="localeLink">
                        FI
                      </Link>
                    )}
                    {localeSlugs.en && (
                      <Link to={localeSlugs.en} className="localeLink">
                        EN
                      </Link>
                    )}
                    {localeSlugs.sv && (
                      <Link to={localeSlugs.sv} className="localeLink">
                        SV
                      </Link>
                    )}
                  </div>
                  <a
                    className="MainLink"
                    href="https://extra.jcad.fi/"
                    rel="noreferrer"
                    style={{
                      transition: "0.1s",
                      opacity: menuOpen ? 0 : 1,
                      minWidth: 110,
                    }}
                  >
                    {text.menu.login}
                  </a>
                  {locale === "fi" && (
                    <Link
                      to={`${prefix[locale] + order[locale].slug}`}
                      activeClassName="active"
                      className="MainLink"
                      style={{
                        transition: "0.1s",
                        opacity: menuOpen ? 0 : 1,
                        minWidth: "130px",
                      }}
                    >
                      {order[locale].title}
                    </Link>
                  )}
                </>
              )}
              <Link
                className="btn white-outlines"
                to={`${prefix[locale] + bookDemo[locale].slug}`}
              >
                {text.bookDemo}
              </Link>
              <BurgerIcon
                menuOpen={menuOpen}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(!menuOpen);
                }}
              />
            </nav>
          </div>
        </div>
      </Header>
      <MobileMenu
        menuOpen={menuOpen}
        menu={fullMenu[locale]}
        text={text}
        closeMenu={() => setMenuOpen(false)}
        localeSlugs={localeSlugs}
        prefix={prefix[locale]}
        bookingUrl={booking.calendlyBookingUrl}
        locale={locale}
      />
      {children}
      <Footer menu={fullMenu[locale]} prefix={prefix[locale]} />
    </>
  );
};

const Header = styled.header`
  width: 100%;
  z-index: 10;
  background: none;
  position: absolute;
  height: 94px;
  transition: all 0.4s;
  border-bottom: 0.8px dashed #fff;
  > div,
  .col {
    height: 100%;
  }
  &.flat {
    height: 70px;
    > div {
      height: 100%;
      transition: all 0.4s;
    }
    background-color: rgba(0, 0, 83, 0.9);
    backdrop-filter: blur(2px);
    nav.Top {
      display: none;
    }
  }
  .container.hideSideBorders {
    border-left: none;
    border-right: none;
  }
  @media (max-width: 600px) {
    border-bottom: none;
  }
  a.logo {
    display: flex;
    max-width: 85px;
    svg {
      width: 85px;
      path {
        fill: #fff;
      }
    }
  }
  nav a {
    color: #fff;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  a.linkLogin {
    justify-content: center;
    align-items: center;
  }
  .MainLink {
    @media (max-width: 1024px) {
      display: none;
    }
  }
  nav.Main {
    > a {
      color: #fff;
      padding: 10px 20px;
      font-weight: 600;
    }
    .btn {
      font-size: 15px !important;
      font-weight: 600;
      border: 1px solid #fff !important;
      height: 40px;
      border-radius: 4px;
      min-width: 155px;
      -webkit-backdrop-filter: blur(2px);
      backdrop-filter: blur(2px);
      margin-left: 15px;
      @media (max-width: 600px) {
        padding-left: 10px;
        padding-right: 10px;
        min-width: 120px;
      }
    }
  }
  #BurgerIcon {
    margin-left: 30px;
    @media (max-width: 800px) {
      padding-right: 10px;
    }
  }
`;

const MobileMenu = ({
  menu,
  menuOpen,
  text,
  localeSlugs,
  isFlatHeader,
  prefix,
}) => {
  const color = "#fff";
  return (
    <div
      style={{ display: menuOpen ? "flex" : "none" }}
      className="pagePadding"
      css={`
        position: fixed;
        z-index: 2;
        background-color: rgba(0, 0, 83, 0.95);
        backdrop-filter: blur(6px);
        width: 100%;
        height: 100vh;
        padding-top: ${isBrowser && window.pageYOffset > 70 ? "70px" : "94px"};
        color: ${color};
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
        .container {
          height: 100%;
          overflow-y: auto;
        }
        &.atTop {
          z-index: 1;
          padding-top: 50px;
          a {
            padding: 12px;
          }
          button {
            margin: 20px auto 20px;
            transform: scale(1);
          }
        }
        a {
          font-size: 14px;
          padding: 11px 20px;
          padding-right: 30px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          width: 100%;
          transition: all 0.2s;
          &.active,
          &:hover,
          &:focus {
            background: rgba(255, 255, 255, 0.1);
          }
          span {
            max-width: 400px;
            width: 100%;
          }
          svg {
            margin-bottom: -3px;
            margin-left: auto;
          }
          &:not(.localeLink) {
            border-bottom: 0.8px dashed #fff;
          }
        }
        button {
          margin: 30px auto 30px;
          transform: scale(1.05);
        }
        .line {
          height: 1px;
          width: 100%;
          background: ${color};
        }
      `}
    >
      <div className="col container align-end">
        {menu.map((i) => (
          <Link
            to={`${prefix + i.slug}`}
            activeClassName="active"
            className="row justify-end"
          >
            <span className="row">
              {i.title}
              <svg
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.60669 6.10352e-05L8.55975 1.047L17.3448 9.83204L0.691534 9.52946L0.664809 11.0096L17.4108 11.3152L8.55974 20.1663L9.60668 21.2133L20.2133 10.6067L9.60669 6.10352e-05Z"
                  fill="white"
                />
              </svg>
            </span>
          </Link>
        ))}
        <a
          href="https://extra.jcad.fi/"
          rel="noreferrer"
          className="row justify-end"
        >
          <span className="row">
            {text.menu.login}

            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginTop: 5 }}
            >
              <path
                d="M0.106689 0.106689L0.106689 1.58729L12.5306 1.58729L0.541025 13.149L1.56875 14.2145L13.6261 2.58933V15.1067H15.1067V0.106689L0.106689 0.106689Z"
                fill="white"
              />
            </svg>
          </span>
        </a>
        <div
          className="localeLinks row justify-center"
          css={`
            margin-top: 10px;
            a {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 40px;
              height: 40px;
              padding: 10px;
              border-radius: 50%;
              font-size: 15px;
              font-weight: 500;
              margin-left: 5px;
              margin-right: 5px;
            }
          `}
        >
          {localeSlugs.fi && (
            <Link to={localeSlugs.fi} className="localeLink">
              FI
            </Link>
          )}
          {localeSlugs.en && (
            <Link to={localeSlugs.en} className="localeLink">
              EN
            </Link>
          )}
          {localeSlugs.sv && (
            <Link to={localeSlugs.sv} className="localeLink">
              SV
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const SvgLogin = () => (
  <svg
    width="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.49998 2.5083H17.5C18.4166 2.5083 19.1666 3.24997 19.1666 4.17497V15.8416C19.1666 16.7583 18.4166 17.4916 17.5 17.4916H2.49998C1.58331 17.4916 0.833313 16.7583 0.833313 15.8416V12.5H2.49998V15.85H17.5V4.1583H2.49998V7.49997H0.833313V4.17497C0.833313 3.2583 1.58331 2.5083 2.49998 2.5083ZM12.5 9.99997L9.16665 13.3333V10.8333H0.833313V9.16663H9.16665V6.66663L12.5 9.99997Z"
      fill="white"
    />
  </svg>
);
