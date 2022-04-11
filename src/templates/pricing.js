import { graphql, useStaticQuery } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import React, { useContext, useEffect, useState } from "react";
import { PopupButton } from "react-calendly";
import styled from "styled-components";
import { Booking } from "../components/Booking";
import { Layout } from "../components/Layout";
import { Switch } from "../components/Switch";
import { SvgHeadingFrame } from "../components/SvgCollection";
import { LocaleContext } from "../contexts/LocaleContext";
import en from "../locales/en.yml";
import fi from "../locales/fi.yml";
import sv from "../locales/sv.yml";
import { theme } from "../theme/theme";

const valikkoSopimuskausi = [
  { value: 0, label: 12 },
  { value: -130, label: 48 },
];

const extraHinnasto = {
  12: 249,
  48: 179,
};

const Pricing = ({ pageContext }) => {
  const { locale } = useContext(LocaleContext);
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
        }
      }
    `
  );

  const [priceSelections, setPriceSelections] = useState({
    ohjelmisto: hinnasto.valikkoOhjelmisto[0],
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
      <HelmetDatoCms seo={data.pricing.seoMetaTags} />
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
                      border: 1px solid #fff;
                      display: flex;
                      border-radius: 50%;
                      font-size: 22px;
                      justify-content: center;
                      align-items: center;
                      color: #fff;
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
              {data.pricing.tuotteet.map((i, index) => {
                return (
                  <div className="item">
                    <h3>{i.title}</h3>
                    <img src={i.icon.url} alt={i.icon.alt} />
                    <div className="priceContent">
                      <span className="startPrive">{i.startprice}</span>
                      <span className="price">{price[index]}</span>
                      <span className="vat">{text.pricing.vat}</span>
                    </div>
                    <div
                      className="mainContent"
                      dangerouslySetInnerHTML={{ __html: i.teksti1 }}
                    />
                    {index === 0 && (
                      <div className="addons">
                        <p>{text.pricing.addons}</p>
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

                    <PopupButton
                      className="btn white-outlines"
                      url={data.booking.calendlyBookingUrl}
                      text={data.booking.buttonText}
                    />
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
            <Booking />
          </Main>
        </div>
      </Layout>
    </>
  );
};

export default Pricing;

const Main = styled.main`
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
  color: #fff;
  padding-top: 220px;
  padding-left: 80px;
  padding-right: 80px;
  ${theme.mobile} {
    padding-left: 20px;
    padding-right: 20px;
  }
  .selectBox {
    position: relative;
    margin-top: 10px;
    margin-bottom: 40px;
    max-width: 350px;
    height: 48px;
    border: 1px dashed #fff;
    font-size: 18px;
    ${theme.mobile} {
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
    ${theme.max1000} {
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
    ${theme.max1100} {
      grid-template-columns: repeat(2, 1fr);
    }
    ${theme.max800} {
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
        margin-bottom: 30px;
      }
      .mainContent,
      .footerContent {
        p {
          color: rgba(255, 255, 255, 0.5);
          text-align: center;
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
  .heading {
    position: relative;
    height: 93px;
    display: flex;
    align-items: center;
    padding-left: 30px;
    overflow: hidden;
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
