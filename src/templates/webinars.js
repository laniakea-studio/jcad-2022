import React, { useContext, useEffect } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import { HelmetDatoCms } from "gatsby-source-datocms";
import styled from "styled-components";
import { Layout } from "../components/Layout";
import { theme } from "../theme/theme";
import scrollTo from "gatsby-plugin-smoothscroll";
import { webinar, prefix } from "../constants/slugs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getFriendlyDateAndHour } from "../hooks/getFriendlyDateAndHour";
import { transform } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const Page = ({ pageContext }) => {
  const { locale } = useContext(LocaleContext);
  const text = snippet[locale];
  const { page, allWebinars } = pageContext.data;
  const now = new Date();
  const onlyComingWebinars = allWebinars.filter(
    (webinar) => new Date(webinar.node.webinaarinAjankohta) > now
  );
  const sortedWebinars = onlyComingWebinars.sort((a, b) =>
    a.node.webinaarinAjankohta.localeCompare(b.node.webinaarinAjankohta)
  );
  const nextWebinar = sortedWebinars[0];
  const [nextDate, nextHour] = getFriendlyDateAndHour(
    new Date(nextWebinar.node.webinaarinAjankohta)
  );

  const graphArrSource = page.arvosanat.split(",");
  const graphDataIsValid = graphArrSource.length === 10;
  const graphData = graphArrSource.map((number) => {
    return parseInt(number.trim());
  });

  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [
      {
        data: graphData,
        backgroundColor: "rgba(0, 0, 0, 1)",
      },
    ],
  };

  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(nextWebinar.node.webinaarinAjankohta);
  const secondDate = new Date();
  const daysleft = Math.round(Math.abs((firstDate - secondDate) / oneDay));

  return (
    <>
      <HelmetDatoCms seo={page.seoMetaTags} />
      <Layout locale={pageContext.locale} transparent={false}>
        <Main>
          <section className="Hero pagePadding">
            <div className="row container padding">
              <div className="col">
                <span className="uppercase" style={{ fontSize: 22 }}>
                  Seuraava webinaari{" "}
                  <strong>
                    {nextDate} klo {nextHour}
                  </strong>
                </span>

                <h1
                  style={{ fontSize: 32, textTransform: "none", marginTop: 5 }}
                >
                  {nextWebinar.node.title}
                </h1>

                <p style={{ marginBottom: 30 }}>{nextWebinar.node.nosto}</p>
                <Link
                  to={`${prefix[locale] + webinar[locale]}/${
                    nextWebinar.node.slug
                  }-${nextWebinar.node.webinaarinAjankohta.slice(0, 10)}`}
                  className="btn white-outlines"
                >
                  Lue lisää ja ilmoittaudu
                  <svg
                    width="17"
                    height="19"
                    viewBox="0 0 17 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 0.606445L7.11162 1.49482L14.5661 8.9493L0.435109 8.69255L0.412432 9.94851L14.6222 10.2078L7.11162 17.7184L7.99999 18.6067L17.0001 9.60659L8 0.606445Z"
                      fill="#fff"
                    />
                  </svg>
                </Link>
              </div>
              <div className="col justify-center align-center">
                <LineSvg />
                <span
                  style={{ fontSize: 200, lineHeight: 0.85, marginTop: 20 }}
                >
                  {daysleft}
                </span>
                <span
                  className="uppercase"
                  style={{ marginBottom: 30, fontWeight: 600 }}
                >
                  päivää jäljellä
                </span>
                <LineSvg />
              </div>
            </div>
          </section>
          <section className="Second pagePadding">
            <div className="row container padding">
              <div className="Coming col">
                <h2>Tulevat webinaarit</h2>
                <div className="List">
                  {sortedWebinars.map((i) => {
                    const [date, hour] = getFriendlyDateAndHour(
                      new Date(i.node.webinaarinAjankohta)
                    );

                    return (
                      <Link
                        key={date}
                        className="Item row"
                        to={`${prefix[locale] + webinar[locale]}/${
                          i.node.slug
                        }-${i.node.webinaarinAjankohta.slice(0, 10)}`}
                      >
                        <div className="col">
                          <span className="date">{date}</span>
                          <span className="hour">klo {hour}</span>
                        </div>
                        <div className="col">
                          <h3>{i.node.title}</h3>
                          <p className="desc">{i.node.nosto}</p>
                          <button className="mt-[20px] btn black-outlines small">
                            Lue lisää ja ilmoittaudu
                            <svg
                              width="17"
                              height="19"
                              viewBox="0 0 17 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8 0.606445L7.11162 1.49482L14.5661 8.9493L0.435109 8.69255L0.412432 9.94851L14.6222 10.2078L7.11162 17.7184L7.99999 18.6067L17.0001 9.60659L8 0.606445Z"
                                fill="black"
                              />
                            </svg>
                          </button>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
              <aside className="Aside col">
                <div className="Graph col">
                  <h3>webinaarien arvosana</h3>
                  <Bar data={data} options={{ responsive: true }} />
                  <p>{page.kuvaajanTeksti}</p>
                </div>
                <div className="Feedback col">
                  <h3>Palautteita aiemmista webinaareista</h3>
                  {page.palautteita.map((i) => (
                    <div
                      className="item"
                      dangerouslySetInnerHTML={{ __html: i.content }}
                    />
                  ))}
                </div>
              </aside>
            </div>
          </section>
        </Main>
      </Layout>
    </>
  );
};

export default Page;

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #fff;
  background: ${theme.primary};
  padding-top: 94px;
  .Hero {
    h1 {
      margin-bottom: 30px;
    }
    .col:first-child {
      border-right: 0.8px dashed #fff;
      width: 61.8%;
      padding-top: 60px;
      padding-bottom: 100px;
      padding-right: 40px;
      @media (max-width: 1400px) {
        width: 50%;
      }
      @media (max-width: 700px) {
        width: 100%;
        border-right: none;
      }
    }
    .col:last-child {
      width: 38.2%;
      padding-left: 20px;
      padding-top: 60px;
      padding-bottom: 60px;
      border-right: none;
      @media (max-width: 1400px) {
        width: 50%;
      }
      @media (max-width: 1000px) {
        svg {
          display: none;
        }
      }
      @media (max-width: 700px) {
        display: none;
      }
    }
  }
  .Second {
    background: #fff;
    color: #000;
    width: 100%;
    .container {
      border-color: #000;
      @media (max-width: 800px) {
        flex-direction: column;
        .Coming,
        .Aside {
          width: 100%;
          border-right: none;
        }
      }
    }
  }
  h2 {
    font-size: 36px;
    font-weight: 600;
  }
  .Coming {
    width: 61.8%;
    padding-top: 60px;
    border-right: 0.8px dashed #000;
    padding-bottom: 80px;
    height: 100%;
    @media (max-width: 600px) {
      padding-bottom: 0;
      border-right: none;
    }
  }
  .List {
    margin-top: 60px;

    @media (min-width: 800px) {
      padding-right: 40px;
    }
  }
  .Item {
    padding-bottom: 52px;
    margin-bottom: 52px;
    border-bottom: 0.8px dashed #000;
    @media (max-width: 600px) {
      flex-direction: column;
    }
    > div:first-child {
      flex: 1 1 50px;
      @media (max-width: 600px) {
        flex-direction: row;
      }
    }
    > div:last-child {
      flex: 5 1 0;
    }
    .date {
      font-size: 23px;
      font-weight: 600;
      text-transform: uppercase;
      @media (max-width: 600px) {
        margin-top: 0;
        margin-right: 15px;
      }
    }
    .hour {
      font-size: 16px;
      font-weight: 500;
    }
    h3 {
      text-transform: none;
      font-size: 26px;
      line-height: 1.27;
      margin-bottom: 15px;
      font-weight: 400;
    }
  }
  .Aside {
    width: 38.2%;
    padding-top: 60px;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 80px;
    position: sticky;
    top: 0;
    @media (max-width: 600px) {
      padding: 30px 0 60px;
    }
    h3 {
      font-size: 24px;
      line-height: 31px;
      margin-bottom: 30px;
    }
    .Feedback {
      padding-bottom: 40px;
      .item {
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }
    .Graph {
      padding-bottom: 40px;
      canvas {
        width: 100%;
      }
      p {
        text-align: center;
        margin-top: 5px;
        font-size: 15px;
        font-weight: 600;
      }
    }
  }
`;

const LineSvg = () => (
  <svg
    width="425"
    height="8"
    viewBox="0 0 425 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_189_491)">
      <path
        d="M417.369 0.353387L424.647 7.64673"
        stroke="white"
        stroke-width="0.8"
        stroke-miterlimit="10"
      />
      <path
        d="M208.546 0.353387L215.824 7.64673"
        stroke="white"
        stroke-width="0.8"
        stroke-miterlimit="10"
      />
      <path
        d="M0.352774 0.353265L7.63086 7.64661"
        stroke="white"
        stroke-width="0.8"
        stroke-miterlimit="10"
      />
      <path
        d="M7.63086 0.353266L0.352773 7.64661"
        stroke="white"
        stroke-width="0.8"
        stroke-miterlimit="10"
      />
      <path
        d="M215.824 0.353388L208.546 7.64673"
        stroke="white"
        stroke-width="0.8"
        stroke-miterlimit="10"
      />
      <path
        d="M424.647 0.353388L417.369 7.64673"
        stroke="white"
        stroke-width="0.8"
        stroke-miterlimit="10"
      />
      <path
        d="M420.996 3.98743L4.00452 3.98739"
        stroke="white"
        stroke-width="0.8"
        stroke-miterlimit="10"
      />
    </g>
    <defs>
      <clipPath id="clip0_189_491">
        <rect
          width="425"
          height="7.99996"
          fill="white"
          transform="translate(425 8) rotate(-180)"
        />
      </clipPath>
    </defs>
  </svg>
);
