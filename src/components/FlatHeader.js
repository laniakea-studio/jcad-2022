import { Link } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import { PopupButton } from "react-calendly";
import { useScrollData } from "scroll-data-hook";
import { LocaleContext } from "../contexts/LocaleContext";
import en from "../locales/en.yml";
import fi from "../locales/fi.yml";
import sv from "../locales/sv.yml";
import "../theme-2021/globals.css";
import theme from "../theme-2021/theme";
import { BurgerIcon } from "./BurgerIcon";
import { SvgLogo } from "./SvgCollection.js";

const FlatHeader = ({ menu, booking, menuOpen, setMenuOpen }) => {
  const [show, setShow] = useState(false);
  const { direction, position } = useScrollData();
  const { locale, localeSlugs } = useContext(LocaleContext);
  const prefix = locale === "fi" ? "" : locale === "en" ? "en/" : "sv/";
  const text = locale === "fi" ? fi : locale === "en" ? en : sv;

  const threshold = 400;

  useEffect(() => {
    if (position.y < threshold && !menuOpen) {
      setShow(false);
      return;
    }
    if (direction.y === "up" && position.y > threshold) {
      setShow(true);
      return;
    }
    if (direction.y === "down" && !menuOpen) {
      setShow(false);
      return;
    }
  }, [direction]);

  const scrollToTopOfPage = () => {
    window.scrollTo(0, 0);
  };

  return (
    <header
      className={show ? "show" : "hide"}
      css={`
        height: 70px;
        border-bottom: 0.6px solid #fff;
        z-index: 3;
        width: 100%;
        display: flex;
        position: fixed;
        transition: all 0.3s;
        background-color: ${menuOpen
          ? "rgba(0, 0, 83, 0)"
          : "rgba(0, 0, 83, 0.95)"};
        backdrop-filter: blur(2px);
        &.hide {
          transition: all 0.3s;
          transform: translateY(-100%);
          opacity: 0;
        }
        .mobileRight {
          display: none;
          padding-right: 40px;
          ${theme.max900} {
            display: flex;
          }
          ${theme.mobile} {
            padding-right: 20px;
          }
        }
        > div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          width: 100%;
          max-width: 1440px;
          margin-left: auto;
          margin-right: auto;
          ${theme.tablet} {
            padding-right: 0;
            padding-left: 0;
          }
        }
        .logo svg {
          width: 140px;
          padding-left: 50px;
          display: flex;
          align-items: center;
          path {
            fill: #fff;
          }
          ${theme.max900} {
            padding-left: 40px;
          }
          ${theme.mobile} {
            padding-left: 20px;
          }
        }
        nav.mainNav {
          margin-left: auto;
          display: flex;
          align-items: center;
          padding-right: 50px;
          button.btn {
            height: 48px;
          }
          ${theme.max900} {
            display: none;
          }
        }
        nav.mainNav a {
          color: #fff;
          font-size: 18px;
          font-weight: 700;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          padding: 10px;
          margin-right: 30px;
          position: relative;
          &.active {
            text-decoration: line-through;
          }
        }
      `}
    >
      <div>
        <Link className="logo" to={`/${prefix}`}>
          <SvgLogo />
        </Link>
        <nav className="mainNav">
          {menu.map((i) => (
            <Link to={`/${prefix + i.to}`} activeClassName="active">
              {i.title}
            </Link>
          ))}
          <PopupButton
            className="btn white-outlines"
            url={booking.calendlyBookingUrl}
            text={booking.buttonText}
          />
        </nav>

        <div className="mobileRight">
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
    </header>
  );
};

export default FlatHeader;
