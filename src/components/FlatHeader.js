import { Link } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import { useScrollData } from "scroll-data-hook";
import { bookDemo, prefix } from "../constants/slugs";
import { LocaleContext } from "../contexts/LocaleContext";
import en from "../locales/en.yml";
import fi from "../locales/fi.yml";
import sv from "../locales/sv.yml";
import "../theme-2021/globals.css";
import { BurgerIcon } from "./BurgerIcon";
import { SvgLogo } from "./SvgCollection.js";

// TODO: Remove menu from props
const FlatHeader = ({ menu, booking, menuOpen, setMenuOpen }) => {
  const [show, setShow] = useState(false);
  const { direction, position } = useScrollData();
  const { locale } = useContext(LocaleContext);

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
      className={`pagePadding ${show ? " show" : " hide"}`}
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

        > div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
        }
        .logo svg {
          width: 85px;
          display: flex;
          align-items: center;
          path {
            fill: #fff;
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
            letter-spacing: 0.05em;
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
        }
      `}
    >
      <div className="container padding">
        <Link className="logo" to={`${prefix[locale]}`}>
          <SvgLogo />
        </Link>
        <nav className="mainNav">
          {menu.map((i) => (
            <Link to={`${prefix[locale] + i.slug}`} activeClassName="active">
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

        <BurgerIcon
          menuOpen={menuOpen}
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen(!menuOpen);
          }}
        />
      </div>
    </header>
  );
};

export default FlatHeader;
