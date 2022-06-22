import { HelmetDatoCms } from "gatsby-source-datocms";
import React, { useContext } from "react";
import styled from "styled-components";
import { Layout } from "../components/Layout";
import { SvgHeadingFrame } from "../components/SvgCollection";
import { LocaleContext } from "../contexts/LocaleContext";
import en from "../locales/en.yml";
import fi from "../locales/fi.yml";
import sv from "../locales/sv.yml";
import { theme } from "../theme/theme";

const Contact = ({ pageContext }) => {
  const { locale, localeSlugs } = useContext(LocaleContext);
  const text = locale === "fi" ? fi : locale === "en" ? en : sv;
  const { data } = pageContext;

  return (
    <>
      <HelmetDatoCms seo={data.yhteystiedot.seoMetaTags} />
      <Layout>
        <Main className="pagePadding">
          <section className="First col container padding">
            <div className="leftLine" />
            <div className="rightLine" />
            <div className="Title">
              <SvgHaircross className="leftCircle" />
              <SvgDashedLine className="leftTitleLine" />
              <div className="titleBox">
                <h1 className="blueBg">{text.contactPage.title}</h1>
              </div>

              <SvgDashedLine className="rightTitleLine" />
              <SvgHaircross className="rightCircle" />
            </div>

            <div className="Area row">
              <div className="Col1">
                <div className="heading">
                  <SvgHeadingFrame />
                  <h2>{text.contactPage.sales}</h2>
                </div>
              </div>
              <div className="Col2 row">
                <div className="Grid">
                  {data.yhteystiedot.myyntiJaTilaukset.map((i) => {
                    return <ContactItem i={i} />;
                  })}
                </div>
              </div>
            </div>
            <div className="Area row">
              <div className="Col1">
                <div className="heading">
                  <SvgHeadingFrame />
                  <h2>{text.contactPage.support}</h2>
                </div>
              </div>
              <div className="Col2 row">
                <div className="Grid">
                  {data.yhteystiedot.asiakaspalvelu.map((i) => {
                    return <ContactItem i={i} />;
                  })}
                </div>
              </div>
            </div>
            <div className="Area row">
              <div className="Col1">
                <div className="heading">
                  <SvgHeadingFrame />
                  <h2>{text.contactPage.accounts}</h2>
                </div>
              </div>
              <div className="Col2 row">
                <div className="Grid">
                  {data.yhteystiedot.asiakkuudet.map((i) => {
                    return <ContactItem i={i} />;
                  })}
                </div>
              </div>
            </div>
            <div className="Area row">
              <div className="Col1">
                <div className="heading">
                  <SvgHeadingFrame />
                  <h2>{text.contactPage.locations}</h2>
                </div>
              </div>
              <div className="Col2 row">
                <div className="Grid">
                  {data.yhteystiedot.toimipisteet.map((i) => {
                    return (
                      <div className="Item">
                        <p className="osoiteNimi">
                          <strong>{i.nimi}</strong>
                        </p>
                        <div dangerouslySetInnerHTML={{ __html: i.osoite }} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="Area row">
              <div className="Col1">
                <div className="heading">
                  <SvgHeadingFrame />
                  <h2>{text.contactPage.billing}</h2>
                </div>
              </div>
              <div className="Col2 row">
                <div className="Grid">
                  {data.yhteystiedot.laskutus.map((i) => {
                    return (
                      <div className="Item">
                        <p className="osoiteNimi">
                          <strong>{i.nimi}</strong>
                        </p>
                        <div dangerouslySetInnerHTML={{ __html: i.osoite }} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="Area row">
              <div className="Col1">
                <div className="heading">
                  <SvgHeadingFrame />
                  <h2>{text.contactPage.people}</h2>
                </div>
              </div>
              <div className="Col2 row">
                <div className="Grid">
                  {data.yhteystiedot.henkilosto.map((i) => {
                    return <ContactItem i={i} />;
                  })}
                </div>
              </div>
            </div>
          </section>
        </Main>
      </Layout>
    </>
  );
};

export default Contact;

const ContactItem = ({ i }) => (
  <div className="Item">
    <p>
      {i.nimi && (
        <>
          <strong>{i.nimi}</strong>
          <br />
        </>
      )}
      {i.titteli && (
        <>
          {i.titteli} <br />
        </>
      )}
      {i.puhelin && (
        <>
          <a
            href={`tel:${i.puhelin.replace(/\s+/g, "")}`}
            className="ga-contact-phone"
          >
            {i.puhelin}
          </a>
          <br />
        </>
      )}
      <a
        href={`mailto:${i.email.replace(/\s+/g, "")}`}
        className="ga-contact-mail"
      >
        {i.email}
      </a>
    </p>
  </div>
);

const Main = styled.main`
  color: #fff;
  background: ${theme.primary};
  min-height: 100vh;

  .Area {
    @media (max-width: 900px) {
      flex-wrap: wrap;
    }
    > div {
      display: flex;
    }
    .Col1 {
      position: sticky;
      top: 0;
      height: 140px;
      width: 35%;
      min-width: 450px;
      @media (max-width: 900px) {
        position: static;
        min-width: 0;
        overflow: hidden;
        width: 100%;
      }
    }
    .Col2 {
      position: relative;
      padding-bottom: 70px;
      width: 65%;
      @media (max-width: 900px) {
        width: 100%;
        padding-bottom: 30px;
      }
    }
    .Grid {
      display: grid;
      width: 100%;
      grid-template-columns: repeat(3, 1fr);
      @media (max-width: 1300) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 1100px) {
        grid-template-columns: repeat(1, 1fr);
      }
      @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 600px) {
        grid-template-columns: repeat(1, 1fr);
      }
    }
    .Item {
      margin-bottom: 40px;
      p {
        font-size: 18px;
        strong {
          text-transform: uppercase;
        }
      }
      .osoiteNimi {
        margin-bottom: 6px;
      }
    }
  }
  .First {
    padding-top: 220px;
    padding-bottom: 0;
  }
  .Title {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 120px;
    .leftCircle,
    .leftTitleLine {
      position: absolute;
      margin: auto;
      left: 40px;
      top: 0;
      bottom: 0;
    }
    .titleBox {
      width: 640px;
      height: 94px;
      border: 1px solid #fff;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      justify-content: center;
      h1.blueBg {
        font-size: 38px;
        background: ${theme.primary};
        padding: 0 20px;
        z-index: 1;
        letter-spacing: 1px;
      }
      @media (max-width: 600px) {
        border-left-style: solid !important;
      }
    }
    .rightCircle,
    .rightTitleLine {
      position: absolute;
      margin: auto;
      right: 40px;
      top: 0;
      bottom: 0;
    }
    @media (max-width: 900px) {
      justify-content: flex-start;
      .rightCircle,
      .leftCircle,
      .rightTitleLine,
      .leftTitleLine {
        display: none;
      }
      .titleBox h2.blueBg {
        font-size: 28px;
      }
      .titleBox {
        margin-left: 0;
        border-left-style: none;
        text-align: left;
        height: auto;
        width: auto;
        justify-content: flex-start;
        padding-left: 24px;
        padding-right: 24px;
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
      font-size: 22px;
      text-transform: uppercase;
    }
    svg {
      position: absolute;
      max-width: 400px;
      overflow: hidden;
      top: 0;
      left: 0;
      path {
        stroke: #fff;
      }
    }
  }
`;

const SvgDashedLine = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="508"
      height="1"
      viewBox="0 0 508 1"
    >
      <line
        x1="508"
        transform="translate(0 0.5)"
        fill="none"
        stroke="#fff"
        stroke-width="1"
        stroke-dasharray="4 4"
      />
    </svg>
  );
};

const SvgHaircross = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
    >
      <g data-name="Group 2156" transform="translate(-1130.97 -6342.587)">
        <g data-name="Group 2153" transform="translate(1134.438 6342.587)">
          <g data-name="Group 1962" transform="translate(0 0)">
            <path
              data-name="Path 1804"
              d="M-2.986-7.336A7.886,7.886,0,0,0,4.9-15.222a7.886,7.886,0,0,0-7.886-7.886,7.886,7.886,0,0,0-7.886,7.886A7.886,7.886,0,0,0-2.986-7.336Zm0,3.332V-26.713"
              transform="translate(10.872 26.713)"
              fill="none"
              stroke="#fff"
              stroke-width="1"
            />
          </g>
        </g>
        <g data-name="Group 2154" transform="translate(1130.97 6353.941)">
          <path
            data-name="Path 1820"
            d="M0,0H22.709"
            fill="none"
            stroke="#fff"
            stroke-width="1"
          />
        </g>
      </g>
    </svg>
  );
};
