import { graphql, Link, useStaticQuery } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import fi from "../locales/fi.yml";
import "../theme/index.css";
import GlobalStyle from "../theme/global";
import { theme } from "../theme/theme";
import { BurgerIcon } from "./BurgerIcon";

const menuFi = [
  { title: fi.menu.about, to: "/about" },
  { title: fi.menu.blog, to: "/blog" },
  { title: fi.menu.contact, to: "/contact" },
];

export const Layout = ({ children, secondary }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menu = menuFi;
  /*
  const { datoCmsSite } = useStaticQuery(graphql`
    query HeaderQuery {
      datoCmsSite {
        globalSeo {
          fallbackSeo {
            description
            title
          }
        }
        faviconMetaTags {
          tags
        }
      }
    }
  `);
  */

  useEffect(() => {
    //Prevent scrolling bg on iOS: https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
    if (menuOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [menuOpen]);

  return (
    <>
      <GlobalStyle />
      <HelmetDatoCms /*favicon={datoCmsSite.faviconMetaTags}*/>
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </HelmetDatoCms>
      <Header secondary={false}>
        <div>
          <Link className="logo" to="/">
            <strong>Logo</strong>
          </Link>
          <nav className="mainNav">
            {menu.map((i) => (
              <Link to={i.to}>{i.title}</Link>
            ))}
          </nav>
          <div className="burger">
            <BurgerIcon
              menuOpen={menuOpen}
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(!menuOpen);
              }}
            />
          </div>
        </div>
      </Header>
      <MobileMenu menuOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />
      <Page>{children}</Page>
      <Footer>
        <div className="content"></div>
      </Footer>
    </>
  );
};

const Header = styled.header`
  width: 100%;
  z-index: 10;
  background: ${(props) => (props.secondary ? "none" : "#fff")};
  position: ${(props) => (props.secondary ? "absolute" : "relative")};
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 20px 20px 20px;
    max-width: 1440px;
    margin: 0 auto;
  }
  a.logo {
    display: flex;
    flex-basis: 160px;
    ${theme.mobile} {
      flex-basis: 140px;
    }
    svg {
      width: 200px;
      path {
        fill: ${(props) => (props.secondary ? "#fff" : theme.primary)};
      }
    }
  }
  nav.mainNav {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    ${theme.tablet} {
      display: none;
    }
    font-size: 18px;
    > a {
      color: ${(props) => (props.secondary ? "#fff" : theme.primary)};
      padding: 10px 30px;
      font-weight: 400;
    }
  }
  .burger {
    ${theme.tablet} {
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
      color: ${(props) => (props.secondary ? "#fff" : theme.primary)};
    }
    a.disabled {
      pointer-events: none;
      cursor: default;
      opacity: 0.4;
    }
    ${theme.mobile} {
      display: none;
    }
  }
`;

const Page = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const Footer = styled.footer`
  ${theme.fullWidth}
  color: #fff;
  background: ${theme.bg};
  .content {
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 100px;
    padding-bottom: 40px;
  }
`;

const MobileMenu = ({ menuOpen }) => {
  const menu = menuFi;
  return (
    <div
      style={{ display: menuOpen ? "flex" : "none" }}
      className="mobileMenu"
      css={`
        position: fixed;
        background: rgba(255, 255, 255, 1);
        width: 100%;
        height: 100vh;
        z-index: 2;
        display: flex;
        flex-direction: column;
        color: #000;
        top: 0;
        .contentBox {
          min-height: -webkit-fill-available;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-top: 70px;
        }
        nav.mobile {
          display: flex;
          flex-direction: column;
          font-size: 28px;
          text-align: right;
          align-items: end;
          padding-top: 40px;
          a {
            width: 100%;
            padding: 10px 20px;
            margin: 8px 0;
          }
          a.active {
            opacity: 0.6;
          }
        }
      `}
    >
      <div className="contentBox">
        <nav className="mobile">
          {menu.map((i) => (
            <Link to={i.to}>{i.title}</Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
