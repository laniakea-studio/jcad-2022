import { graphql, Link, useStaticQuery } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import React, { useContext, useEffect, useState } from "react";
import { PopupButton } from "react-calendly";
import styled from "styled-components";
import { LocaleContext } from "../contexts/LocaleContext";
import { en, fi, sv } from "../locales";
import * as snippet from "../locales";
import GlobalStyle from "../theme/global";
import "../theme/index.css";
import { theme } from "../theme/theme";
import { BurgerIcon } from "./BurgerIcon";
import FlatHeader from "./FlatHeader";
import { Footer } from "./Footer";
import { SvgLogo } from "./SvgCollection";

const menuFi = [
  { title: fi.menu.product, to: fi.slugs.product },
  { title: fi.menu.pricing, to: fi.slugs.pricing },
  { title: fi.menu.contact, to: fi.slugs.contact },
  { title: fi.menu.about, to: fi.slugs.about },
];
const menuEn = [
  { title: en.menu.product, to: en.slugs.product },
  { title: en.menu.pricing, to: en.slugs.pricing },
  { title: en.menu.contact, to: en.slugs.contact },
  { title: en.menu.about, to: en.slugs.about },
];
const menuSv = [
  { title: sv.menu.product, to: sv.slugs.product },
  { title: sv.menu.pricing, to: sv.slugs.pricing },
  { title: sv.menu.contact, to: sv.slugs.contact },
  { title: sv.menu.about, to: sv.slugs.about },
];
export const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, localeSlugs } = useContext(LocaleContext);
  const menu = locale === "fi" ? menuFi : locale === "en" ? menuEn : menuSv;
  const prefix = locale === "fi" ? "" : locale === "en" ? "en/" : "sv/";
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
      }
      en: datoCmsTilaaDemo(locale: { eq: "en" }) {
        calendlyBookingUrl
      }
      sv: datoCmsTilaaDemo(locale: { eq: "sv" }) {
        calendlyBookingUrl
      }
    }
  `);

  const { site } = data;
  const booking = data[locale];

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
        menu={menu}
        booking={booking}
        menuOpen={menuOpen}
        setMenuOpen={() => setMenuOpen(!menuOpen)}
      />
      <Header className={flatHeader ? "flat" : ""}>
        <div>
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
          <Link className="logo" to={`/${prefix}`}>
            <Arrow />
          </Link>
          <nav className="mainNav">
            {menu.map((i) => (
              <Link
                to={`/${prefix + i.to}`}
                activeClassName="active"
                style={{ marginTop: 8 }}
              >
                {i.title}
              </Link>
            ))}
            <Link
              className="btn white-outlines"
              to={`${prefix[locale] + bookDemo[locale].slug}`}
            >
              {text.bookDemo}
            </Link>
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
          <a
            className="linkLogin"
            href="https://extra.jcad.fi/"
            target="_blank"
            rel="noreferrer"
          >
            <span>{text.menu.login}</span>
            <SvgLogin />
          </a>
        </div>
      </Header>
      <MobileMenu
        menuOpen={menuOpen}
        menu={menu}
        text={text}
        closeMenu={() => setMenuOpen(false)}
        localeSlugs={localeSlugs}
        prefix={prefix}
        bookingUrl={booking.calendlyBookingUrl}
        locale={locale}
      />
      {children}
      <Footer menu={menu} prefix={prefix} />
    </>
  );
};

const Header = styled.header`
  width: 100%;
  z-index: 10;
  background: none;
  position: absolute;
  border-bottom: 1px solid #fff;
  height: 130px;
  transition: all 0.4s;
  &.flat {
    height: 70px;

    > div {
      height: 70px;
      transition: all 0.4s;
    }
    background-color: rgba(0, 0, 83, 0.95);
    backdrop-filter: blur(2px);
    .localeLinks {
      display: none;
    }
    a.linkLogin {
      display: none;
    }
  }

  @media (max-width: 600px) {
    border-bottom: none;
  }
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    height: 130px;
    padding: 20px 80px 20px;
    max-width: 1500px;
    margin: 0 auto;
    @media (max-width: 600px) {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
  .localeLinks {
    position: absolute;
    color: #fff;
    top: 0;
    left: 0;
    width: 30px;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    @media (max-width: 1024px) {
      display: none;
    }
    > a {
      padding-top: 5px;
      padding-bottom: 5px;
      opacity: 0.4;
    }
    > a.thisLocale {
      opacity: 1;
    }
  }
  a.logo {
    display: flex;
    flex-basis: 160px;
    @media (max-width: 600px) {
      flex-basis: 140px;
    }
    svg {
      width: 140px;
      path {
        fill: #fff;
      }
    }
  }
  a.linkLogin {
    position: absolute;
    color: #fff;
    right: -46px;
    width: 130px;
    font-weight: 600;
    justify-content: center;
    align-items: center;
    height: 30px;
    font-size: 15px;
    text-transform: uppercase;
    display: flex;
    transform: rotate(270deg);
    opacity: 1;
    @media (max-width: 1024px) {
      display: none;
    }
    &:hover {
      opacity: 0.9;
      transit: all 0.2s;
    }
    svg {
      width: 20px;
      margin-top: -3px;
      margin-left: 6px;
      transform: rotate(90deg);
    }
  }

  nav.mainNav {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    @media (max-width: 1024px) {
      display: none;
    }
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    > a {
      color: #fff;
      padding: 10px 30px;
      font-weight: 400;
    }
    a.active {
      text-decoration: line-through;
    }
    a.active:after {
      content: url('data:image/svg+xml; utf8, <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="12.0862" y1="2.18557e-08" x2="12.0862" y2="24" stroke="white"/><circle cx="12" cy="12.0002" r="8.18966" stroke="white"/><line y1="11.9136" x2="24" y2="11.9136" stroke="white"/></svg>');
      display: block;
      width: 22px;
      height: 10px;
      margin: 6px auto 0;
      transform: scale(1);
      //animation: pulse 2s infinite;
    }
    /* See Glow pulse: https://stackoverflow.com/questions/36707159/how-to-create-a-pulsing-glow-ring-animation-in-css */
    @keyframes pulse {
      0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
      }

      70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
      }
      90% {
        transform: scale(1.1);
        box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
      }

      100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
      }
    }
  }
  .burger {
    @media (max-width: 1024px) {
      display: flex;
    }
  }
  .locales {
    display: none;
    position: absolute;
    top: 3px;
    right: 21px;
    font-size: 15px;
    a {
      padding: 2px 5px;
      color: #fff;
    }
    a.disabled {
      pointer-events: none;
      cursor: default;
      opacity: 0.4;
    }
    @media (max-width: 600px) {
      display: none;
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
          font-weight: 600;
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

      <a href="https://extra.jcad.fi/" rel="noreferrer">
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
