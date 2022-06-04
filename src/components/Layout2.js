import { graphql, Link, useStaticQuery } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import React, { useContext, useEffect, useState } from "react";
import { PopupButton } from "react-calendly";
import styled from "styled-components";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import GlobalStyle from "../theme/global";
import "../theme/index.css";
import { theme } from "../theme/theme";
import { BurgerIcon } from "./BurgerIcon";
import FlatHeader from "./FlatHeader";
import { Footer } from "./Footer";
import { SvgLogo } from "./SvgCollection";
import { ctaMenu, fullMenu, mainMenu, prefix } from "../constants/slugs";

export const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, localeSlugs } = useContext(LocaleContext);
  const text = snippet[locale];

  const [flatHeader, setFlatHeader] = useState(false);

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
    const onScroll = () => {
      if (window.pageYOffset <= 70 && !flatHeader) return;
      if (window.pageYOffset > 70 && flatHeader) return;
    };
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <Header className={`pagePadding ${flatHeader ? "flat" : ""}`}>
        <div className="row align-center container padding">
          <div className="col justify-center">
            <Link className="logo" to={`${prefix[locale]}`}>
              <SvgLogo />
            </Link>
          </div>
          <div className="col space-around">
            <nav className="Top flex justify-end align-center">
              <div className="secondaryLinks">
                <Link to="/" className="Login">
                  Tilaa JCAD
                </Link>
                <a
                  className="Login"
                  href="https://extra.jcad.fi/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {text.menu.login}
                </a>
              </div>
              <div className="localeLinks">
                <Link
                  to={localeSlugs.fi}
                  className={locale === "fi" && "thisLocale"}
                >
                  FI
                </Link>
                <Link
                  to={localeSlugs.en}
                  className={locale === "en" && "thisLocale"}
                >
                  EN
                </Link>
                <Link
                  to={localeSlugs.sv}
                  className={locale === "sv" && "thisLocale"}
                >
                  SV
                </Link>
              </div>
            </nav>
            <nav className="Main flex justify-end align-center">
              {mainMenu[locale].map((i) => (
                <Link to={`/${prefix[locale] + i.to}`} activeClassName="active">
                  {i.title}
                </Link>
              ))}
              <PopupButton
                className="btn white-outlines"
                url={booking.calendlyBookingUrl}
                text={booking.buttonText}
              />
            </nav>
            <div className={`burger${menuOpen ? " menuOpen" : ""}`}>
              <BurgerIcon
                menuOpen={menuOpen}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(!menuOpen);
                }}
              />
            </div>
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
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }
  .secondaryLinks {
    a {
      margin-right: 40px;
    }
  }
  .localeLinks {
    margin-left: 30px;
    a {
      opacity: 0.4;
    }
    a:not(:last-child) {
      margin-right: 5px;
    }
    a.thisLocale {
      opacity: 1;
    }
  }
  a.linkLogin {
    justify-content: center;
    align-items: center;
  }
  nav.Top {
    margin-bottom: 10px;
    a {
      padding: 5px 10px;
    }
    @media (max-width: 900px) {
      display: none;
    }
  }
  nav.Main {
    @media (max-width: 1024px) {
      display: none;
    }
    > a {
      color: #fff;
      padding: 10px 30px;
      font-weight: 600;
    }
    a.active {
      text-decoration: line-through;
    }
    .btn {
      font-size: 14px !important;
      font-weight: 600;
      border: 1px solid #fff !important;
      height: 40px;
      border-radius: 4px;
      min-width: 150px;
    }
  }
  .burger {
    justify-content: flex-end;
    @media (max-width: 1024px) {
      display: flex;
    }
  }
`;

const MobileMenu = ({
  menu,
  menuOpen,
  text,
  localeSlugs,
  locale,
  prefix,
  bookingUrl,
}) => {
  const color = "#fff";
  return (
    <div
      style={{ display: menuOpen ? "flex" : "none" }}
      css={`
        position: fixed;
        z-index: 2;
        background-color: rgba(0, 0, 83, 0.95);
        backdrop-filter: blur(6px);
        width: 100%;
        height: 100vh;
        padding-top: 80px;
        color: ${color};
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
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
          font-size: 23px;
          padding: 20px 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }
        a:last-child {
          font-size: 14px;
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
        .localeLinksMobile {
          padding-top: 40px;
          a {
            font-size: 18px;
            font-weight: 500;
          }
          a.thisLocale {
            opacity: 0.4;
          }
        }
      `}
    >
      {menu.map((i) => (
        <Link to={`/${prefix + i.to}`}>{i.title}</Link>
      ))}
      <PopupButton
        className="btn white-outlines"
        url={bookingUrl}
        text={text.bookDemo}
      />

      <a href="https://extra.jcad.fi/" target="_blank" rel="noreferrer">
        {text.menu.login}
      </a>
      <div className="localeLinksMobile">
        <Link to={localeSlugs.fi} className={locale === "fi" && "thisLocale"}>
          FI
        </Link>
        <Link to={localeSlugs.en} className={locale === "en" && "thisLocale"}>
          EN
        </Link>
        <Link to={localeSlugs.sv} className={locale === "sv" && "thisLocale"}>
          SV
        </Link>
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
