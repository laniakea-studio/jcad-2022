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

  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const isHome =
    path === "/" ? true : path === "/en" ? true : path === "/sv" ? true : false;

  const threshold = isHome ? 1100 : 400;

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
        border-bottom: 0.8px dashed #fff;
        z-index: 3;
        width: 100%;
        display: flex;
        position: fixed;
        transition: all 0.3s;
        background-color: ${menuOpen
          ? "rgba(0, 0, 83, 0)"
          : "rgba(0, 0, 83, 0.91)"};
        backdrop-filter: blur(2px);
        &.hide {
          transition: all 0.3s;
          transform: translateY(-100%);
          opacity: 0;
        }
        .mobileRight {
          display: none;
          padding-right: 40px;
          @media (max-width: 900px) {
            display: flex;
          }
          @media (max-width: px) @media (max-width: 600px) {
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
          @media (max-width: 1024px) {
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
          @media (max-width: 900px) {
            padding-left: 40px;
          }
          @media (max-width: 600px) {
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
          @media (max-width: 900px) {
            display: none;
          }
          .btn.white-outlines {
            font-size: 14px !important;
            font-weight: 600;
            border: 1px solid #fff !important;
            height: 40px;
            border-radius: 4px;
            min-width: 150px;
          }
          a {
            color: #fff;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            display: inline-flex;
            align-items: center;
            padding: 10px;
            margin-right: 30px;
            position: relative;
            letter-spacing: 0.02em;
            &.active {
              text-decoration: line-through;
            }
          }
        }
      `}
    >
      <div className="padding">
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
