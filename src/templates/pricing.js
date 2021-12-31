import React, { useContext, useState, useEffect, useRef } from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import { Layout } from "../components/Layout";
import fi from "../locales/fi.yml";
import en from "../locales/en.yml";
import sv from "../locales/sv.yml";
import { theme } from "../theme/theme";
import { LocaleContext } from "../contexts/LocaleContext";
import { SvgHeadingFrame } from "../components/SvgCollection";
import useComponentVisible from "../hooks/useComponentVisible";
import { Booking } from "../components/Booking";

const Pricing = ({ pageContext }) => {
  const { locale, localeSlugs } = useContext(LocaleContext);
  const text = locale === "fi" ? fi : locale === "en" ? en : sv;
  const { data } = pageContext;

  const { hinnasto } = useStaticQuery(
    graphql`
      query {
        hinnasto: datoCmsHinnasto {
          valikkoOhjelmisto {
            label
            value
          }
          valikkoSopimuskausi {
            label
            value
          }
          valikkoLisenssi {
            label
            value
          }
        }
      }
    `
  );

  const [priceSelections, setPriceSelections] = useState({
    ohjelmisto: hinnasto.valikkoOhjelmisto[0],
    sopimuskausi: hinnasto.valikkoSopimuskausi[0],
    lisenssi: hinnasto.valikkoLisenssi[0],
  });

  const [price, setPrice] = useState(null);

  useEffect(() => {
    if (priceSelections.lisenssi.value) {
      const { ohjelmisto, lisenssi, sopimuskausi } = priceSelections;
      setPrice(
        `${(ohjelmisto.value + sopimuskausi.value) * lisenssi.value} €/kk`
      );
    } else {
      setPrice(null);
    }
  }, [priceSelections]);

  const {
    ref: refTwo,
    isComponentVisible: showDropTwo,
    setIsComponentVisible: setShowDropTwo,
  } = useComponentVisible(false);

  return (
    <Layout>
      <div
        css={`
          background: ${theme.primary};
          width: 100%;
          min-height: 100vh;
        `}
      >
        <Main>
          <div className="leftLine" />
          <div className="rightLine" />
          <div className="heading">
            <SvgHeadingFrame />
            <h2>{text.menu.pricing}</h2>
          </div>
          <p className="lead">{data.pricing.lead}</p>
          <div className="selections">
            <div>
              <h3 className="selectHeading">1. {text.pricing.selectPeriod} </h3>
              <div className="periodBtns">
                {hinnasto.valikkoSopimuskausi.map((i) => (
                  <button
                    className={
                      i.value === priceSelections.sopimuskausi.value && "active"
                    }
                    onClick={() =>
                      setPriceSelections({
                        ...priceSelections,
                        sopimuskausi: i,
                      })
                    }
                  >
                    {i.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="selectHeading">
                2. {text.pricing.selectLicense}{" "}
              </h3>
              <div className="selectBox" ref={refTwo}>
                <div onClick={() => setShowDropTwo(true)} className="selected">
                  <span>{priceSelections.lisenssi.label}</span>
                  <svg
                    className="dropindicator"
                    width="30"
                    height="15"
                    viewBox="0 0 30 15"
                  >
                    <path
                      id="Polygon_9"
                      data-name="Polygon 9"
                      d="M15,0,30,15H0Z"
                      transform="translate(30 15) rotate(180)"
                      fill="#fff"
                    />
                  </svg>
                </div>
                <div
                  className="options"
                  style={{
                    display: showDropTwo ? "inline-flex" : "none",
                  }}
                >
                  {hinnasto.valikkoLisenssi.map((item) => {
                    return (
                      <div
                        class={`optionItem ${
                          item.label === priceSelections.lisenssi.label
                            ? "active"
                            : "passive"
                        }`}
                        onClick={() => {
                          setShowDropTwo(false);
                          setPriceSelections({
                            ...priceSelections,
                            lisenssi: item,
                          });
                        }}
                      >
                        <div className="ball" />
                        {item.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <h3 className="selectHeading">3. {text.pricing.selectProduct} </h3>
          <div className="plans">
            {data.pricing.tuotteet.map((i) => {
              return (
                <div className="item">
                  <h3>{i.title}</h3>
                  <img src={i.icon.url} alt={i.icon.alt} />
                  <div
                    className="mainContent"
                    dangerouslySetInnerHTML={{ __html: i.teksti1 }}
                  />
                  <div className="priceContent">
                    <span className="startPrive">{i.startprice}</span>
                    <span className="price">{price}</span>
                    <span className="vat">{text.pricing.vat}</span>
                  </div>
                  <button className="btn white-outlines">Avaa chat</button>
                  <div
                    className="footerContent"
                    dangerouslySetInnerHTML={{ __html: i.teksti2 }}
                  />
                </div>
              );
            })}
          </div>
          <Booking />
        </Main>
      </div>
    </Layout>
  );
};

export default Pricing;

const Main = styled.main`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
  color: #fff;
  padding-top: 220px;
  padding-left: 80px;
  padding-right: 80px;
  .selectBox {
    position: relative;
    margin-top: 10px;
    margin-bottom: 40px;
    max-width: 350px;
    height: 48px;
    border: 1px dashed #fff;
    font-size: 18px;
  }
  .selected {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    padding-left: 30px;
    padding-right: 20px;
    margin-bottom: 40px;
    background: ${theme.primary};
    box-sizing: border-box;
    cursor: pointer;
    .dropindicator {
      margin-left: auto;
    }
  }
  .options {
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    width: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    z-index: 100;
    cursor: pointer;
    border: 1px solid #fff;
  }
  .optionItem {
    color: ${theme.primary};
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    width: 100%;
    &:not(:last-child) {
      border-bottom: 1px solid ${theme.primary};
    }
    .ball {
      visibility: hidden;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: ${theme.primary};
      margin: auto 12px;
    }
    &:hover {
      transition: all 0.1s;
      color: #fff;
      background-color: ${theme.primary};

      &.active .ball {
        background: #fff;
      }
    }
    &.active {
      .ball {
        visibility: visible;
      }
    }
  }

  svg.SvgHeadingFrame path {
    stroke: #fff;
  }
  h3.selectHeading {
    margin-bottom: 6px;
    font-size: 20px;
    font-weight: 400;
  }
  .periodBtns {
    display: flex;
    padding-top: 15px;
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      font-size: 18px;
      font-weight: 500;
      width: 104px;
      height: 48px;
      &.active {
        background: rgba(255, 255, 255, 1);
        color: ${theme.primary};
      }
    }
    button:not(:last-child) {
      margin-right: 20px;
    }
  }
  .selections {
    display: flex;
    margin-top: 40px;
    > div {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;
    }
    > div:first-child {
      flex: 2;
    }
    > div:last-child {
      flex: 1;
    }
  }
  .plans {
    padding-top: 15px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    ${theme.mobile} {
      grid-template-columns: repeat(1, 1fr);
    }
    .item {
      display: flex;
      flex-direction: column;
      border: 1px solid #fff;
      align-items: center;
      padding: 50px 30px 30px;
      img {
        margin-top: 20px;
        margin-bottom: 40px;
      }
      .mainContent,
      .footerContent {
        p {
          color: rgba(255, 255, 255, 0.5);
          text-align: center;
        }
      }
      .mainContent {
        min-height: 220px;
      }
      .footerContent {
        margin-top: 20px;
      }
      .startPrice {
        color: rgba(255, 255, 255, 0.5);
        font-size: 15px;
      }
      .priceContent {
        display: flex;
        flex-direction: column;
      }
      span.price {
        font-size: 36px;
      }
      .vat {
        text-align: right;
        opacity: 0.5;
      }
      .btn {
        margin-top: 30px;
        width: 220px;
      }
    }
  }
  .heading {
    position: relative;
    height: 93px;
    display: flex;
    align-items: center;
    padding-left: 30px;
    h2 {
      font-size: 28px;
      text-transform: uppercase;
    }
    svg {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .lead {
    font-size: 20px;
    margin-top: 60px;
    max-width: 800px;
  }
`;
