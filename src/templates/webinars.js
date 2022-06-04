import React, { useContext } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import { HelmetDatoCms } from "gatsby-source-datocms";
import styled from "styled-components";
import { Layout } from "../components/Layout2";
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
  const nextWebinar = allWebinars[0];
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

  return (
    <>
      <Layout locale={pageContext.locale} transparent={false}>
        <Main>
          <section className="Hero pagePadding">
            <div className="row container padding">
              <div className="col">
                <span className="uppercase" style={{ fontSize: 22 }}>
                  Seuraava webinaari
                </span>
                <span className="uppercase" style={{ fontSize: 45 }}>
                  {nextDate} klo {nextHour}
                </span>
                <h1 style={{ fontSize: 32, textTransform: "none" }}>
                  {nextWebinar.node.title}
                </h1>

                <p>{nextWebinar.node.nosto}</p>
              </div>
              <div className="col justify-center align-center">
                <LineSvg />
                <span
                  style={{ fontSize: 200, lineHeight: 0.85, marginTop: 20 }}
                >
                  5
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
                  {allWebinars.map((i) => {
                    const [date, hour] = getFriendlyDateAndHour(
                      new Date(i.node.webinaarinAjankohta)
                    );

                    return (
                      <Link
                        className="Item row"
                        to={`${prefix[locale] + webinar[locale]}/${
                          i.node.slug
                        }`}
                      >
                        <div className="col">
                          <span className="date">{date}</span>
                          <span className="hour">klo {hour}</span>
                        </div>
                        <div className="col">
                          <h3>{i.node.title}</h3>
                          <p className="desc">{i.node.nosto}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
              <aside className="Aside col">
                <div className="Feedback col">
                  <h3>Palautetta edellistä webinaareista</h3>
                  {page.palautteita.map((i) => (
                    <div
                      className="item"
                      dangerouslySetInnerHTML={{ __html: i.content }}
                    />
                  ))}
                </div>
                <div className="Graph col">
                  <h3>webinaarien arvosana</h3>
                  <Bar data={data} options={{ responsive: true }} />
                  <p>{page.kuvaajanTeksti}</p>
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
      padding-bottom: 60px;
      padding-right: 40px;
    }
    .col:last-child {
      width: 38.2%;
      padding-left: 20px;
      border-right: none;
    }
  }
  .Second {
    background: #fff;
    color: #000;
    width: 100%;
    .container {
      border-left: 0.8px dashed #000;
      border-right: 0.8px dashed #000;
    }
  }
  .Coming {
    width: 61.8%;
    padding-top: 60px;
    border-right: 0.8px dashed #000;
    padding-bottom: 80px;
  }
  .List {
    margin-top: 60px;
    padding-right: 40px;
  }
  .Item {
    padding-bottom: 30px;
    margin-bottom: 40px;
    border-bottom: 0.8px dashed #000;
    > div:first-child {
      flex: 1 1 50px;
    }
    > div:last-child {
      flex: 5 1 0;
    }
    .date {
      margin-top: 8px;
      font-size: 22px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .hour {
      font-size: 22px;
      font-weight: 500;
    }
    h3 {
      text-transform: none;
      font-size: 26px;
      line-height: 1.2;
      margin-bottom: 15px;
    }
  }
  .Aside {
    width: 38.2%;
    padding-top: 60px;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 80px;
    h3 {
      font-size: 24px;
      line-height: 21px;
      margin-bottom: 30px;
    }
    .Feedback {
      padding-top: 40px;
      padding-bottom: 40px;
      .item {
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }
    .Graph {
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
