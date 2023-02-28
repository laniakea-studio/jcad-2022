import { Link } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Booking } from "../components/Booking";
import { Layout } from "../components/Layout";
import { Switch } from "../components/Switch";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import { valikkoSopimuskausi, extraHinnasto } from "@constants/pricing";

// Warning: Changing order of card items will break to url parameters generation
const Pricing = ({ pageContext }) => {
  const { locale, prefix } = useContext(LocaleContext);
  const text = snippet[locale];
  const isFinnish = locale === "fi";

  const { page } = pageContext.data;

  const [priceSelections, setPriceSelections] = useState({
    ohjelmisto: page.valikkoOhjelmisto[0],
    sopimuskausi: valikkoSopimuskausi[0],
    lisenssi: 1,
    kustannuslaskenta: false,
  });

  const [price, setPrice] = useState([null, null, null]);

  useEffect(() => {
    const { ohjelmisto, lisenssi, sopimuskausi, kustannuslaskenta } =
      priceSelections;
    const kustannuslaskentaValue = kustannuslaskenta
      ? extraHinnasto[sopimuskausi.label]
      : 0;
    const lisenssiValue = lisenssi < 1 ? 1 : lisenssi;

    setPrice([
      `${
        (ohjelmisto.value + sopimuskausi.value + kustannuslaskentaValue) *
        lisenssiValue
      } €/${text.pricing.mo}`,
      `${(ohjelmisto.value + sopimuskausi.value) * lisenssiValue} €/${
        text.pricing.mo
      }`,
      `${(ohjelmisto.value + sopimuskausi.value) * lisenssiValue} €/${
        text.pricing.mo
      }`,
    ]);
  }, [priceSelections]);

  const handleLicenseChange = (e) => {
    setPriceSelections({
      ...priceSelections,
      lisenssi: e.target.value,
    });
  };

  return (
    <>
      <HelmetDatoCms seo={page.seoMetaTags} />
      <Layout>
        <Main className="pagePadding">
          <div className="col padding container">
            <h1>{page.title}</h1>
            <p className="lead">{page.lead}</p>
            <div className="selections">
              <div>
                <h3 className="selectHeading">
                  1. {text.pricing.selectPeriod}{" "}
                </h3>
                <div className="periodBtns">
                  {valikkoSopimuskausi.map((i) => (
                    <button
                      className={
                        i.value === priceSelections.sopimuskausi.value &&
                        "active"
                      }
                      onClick={() =>
                        setPriceSelections({
                          ...priceSelections,
                          sopimuskausi: i,
                        })
                      }
                    >
                      {i.label}&nbsp;{text.pricing.mo}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="selectHeading">
                  2. {text.pricing.selectLicense}
                </h3>
                <div
                  className="licenseBox"
                  css={`
                    padding-top: 15px;
                    display: flex;
                    input {
                      height: 48px;
                      border: 1px dashed #fff;
                      color: #fff;
                      font-size: 18px;
                      padding: 10px;
                      margin-left: 10px;
                      margin-right: 10px;
                      width: 140px;
                    }
                    button {
                      height: 48px;
                      width: 48px;
                      border: 2px solid rgba(255, 255, 255, 0.75);
                      display: flex;
                      border-radius: 50%;
                      font-size: 22px;
                      justify-content: center;
                      align-items: center;
                      color: #fff;
                      transition: 0.2s;
                      &:hover:not(:disabled) {
                        border-color: rgba(255, 255, 255, 1);
                      }
                      &:disabled {
                        opacity: 0.4;
                        pointer: cursor;
                      }
                    }
                  `}
                >
                  <button
                    disabled={priceSelections.lisenssi < 2}
                    onClick={() => {
                      setPriceSelections({
                        ...priceSelections,
                        lisenssi: --priceSelections.lisenssi,
                      });
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={priceSelections.lisenssi}
                    onChange={(e) => handleLicenseChange(e)}
                  ></input>
                  <button
                    onClick={() => {
                      setPriceSelections({
                        ...priceSelections,
                        lisenssi: ++priceSelections.lisenssi,
                      });
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <h3 className="selectHeading">3. {text.pricing.selectProduct} </h3>
            <div className="plans">
              {page.tuotteet.map((i, index) => {
                const appParameterTable = [1, 3, 4];
                let app = appParameterTable[index];
                if (index === 0 && priceSelections.kustannuslaskenta) {
                  app = 2;
                }
                const period = `&period=${priceSelections.sopimuskausi.label}%20kk`;
                const users = `&users=${priceSelections.lisenssi}`;
                const urlParameters = `?app=${app + period + users}`;

                return (
                  <div className="item">
                    <h3>{i.title}</h3>
                    <img src={i.icon.url} alt={i.icon.alt} />
                    <div className="priceContent">
                      <span>{i.startprice}</span>
                      <span className="price">{price[index]}</span>
                      <span className="vat">{text.pricing.vat}</span>
                    </div>
                    <div
                      className="mainContent"
                      dangerouslySetInnerHTML={{ __html: i.teksti1 }}
                    />
                    {index === 0 && (
                      <div className="addons">
                        <p className="py-[10px]">{text.pricing.addons}</p>
                        <Switch
                          handleSwitch={() =>
                            setPriceSelections({
                              ...priceSelections,
                              kustannuslaskenta:
                                !priceSelections.kustannuslaskenta,
                            })
                          }
                          checked={priceSelections.kustannuslaskenta}
                          label={text.pricing.kustannus}
                        />
                      </div>
                    )}

                    {isFinnish && (
                      <Link
                        to={`/tilaa${urlParameters}`}
                        className="btn white-outlines"
                      >
                        Tilaa JCAD
                      </Link>
                    )}
                    {!isFinnish && (
                      <Link
                        className="btn white-outlines"
                        to={prefix + "free-trial"}
                      >
                        Free Trial
                      </Link>
                    )}

                    <div className="footerContent">
                      <p>
                        {text.pricing.period}:{" "}
                        {priceSelections.sopimuskausi.label} {text.pricing.mo}
                        <br />
                        {text.pricing.license}: {priceSelections.lisenssi}{" "}
                        {priceSelections.lisenssi < 2
                          ? text.pricing.user
                          : text.pricing.users}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Main>
        <Booking locale={locale} />
      </Layout>
    </>
  );
};

export default Pricing;

const Main = styled.main`
  position: relative;
  color: #fff;
  background: #000053;
  > .container {
    padding-top: 94px;
  }
  h1 {
    margin-top: 50px;
    font-weight: 400;
    font-size: 42px;
    text-transform: none;
    margin-bottom: 30px;
  }
  .lead {
    font-size: 19px;
    line-height: 1.4;
    max-width: 800px;
  }
  .selectBox {
    position: relative;
    margin-top: 10px;
    margin-bottom: 40px;
    max-width: 350px;
    height: 48px;
    border: 1px dashed #fff;
    font-size: 18px;
    @media (max-width: 600px) {
      margin-bottom: 0;
    }
  }
  .selected {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    padding-left: 30px;
    padding-right: 20px;
    margin-bottom: 40px;
    background: #000053;
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
    color: #000053;
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    width: 100%;
    &:not(:last-child) {
      border-bottom: 1px solid #000053;
    }
    .ball {
      visibility: hidden;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #000053;
      margin: auto 12px;
    }
    &:hover {
      transition: all 0.1s;
      color: #fff;
      background-color: #000053;

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
      border-radius: 4px;
      &.active {
        background: rgba(255, 255, 255, 1);
        color: #000053;
      }
    }
    button:not(:last-child) {
      margin-right: 20px;
    }
  }
  .selections {
    display: flex;
    margin-top: 40px;
    @media (max-width: 1000px) {
      flex-direction: column;
    }
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
  .addons {
    text-align: center;
    padding-bottom: 20px;
    p {
      text-transform: uppercase;
      letter-spacing: 0.4px;
      opacity: 0.9;
    }
  }
  .plans {
    padding-top: 15px;
    padding-bottom: 70px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    @media (max-width: 1100px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 800px) {
      grid-template-columns: repeat(1, 1fr);
    }
    .item {
      display: flex;
      flex-direction: column;
      border: 1px solid #fff;
      border-radius: 4px;
      align-items: center;
      padding: 50px 30px 30px;
      img {
        margin-top: 20px;
        margin-bottom: 30px;
      }
      .mainContent,
      .footerContent {
        p {
          color: rgba(255, 255, 255, 0.9);
          text-align: center;
          margin-bottom: 15px;
        }
      }
      .mainContent {
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
        padding-bottom: 30px;
      }
      span.price {
        font-size: 36px;
      }
      .vat {
        text-align: right;
        opacity: 0.5;
      }
      .btn {
        margin-top: auto;
        width: 220px;
      }
    }
  }
`;
