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

ChartJS.register(CategoryScale, LinearScale, BarElement);

const Page = ({ pageContext }) => {
  const { locale } = useContext(LocaleContext);
  const text = snippet[locale];
  const { page, allWebinars } = pageContext.data;

  const graphArrSource = page.arvosanat.split(",");
  const graphDataIsValid = graphArrSource.length === 10;
  const graphData = graphArrSource.map((number) => {
    return parseInt(number.trim());
  });
  console.log("Asdf", graphData);

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
          <section className="Hero row wrap padding">
            <div className="leftLine" />
            <div className="rightLine" />
            <div className="col">
              <h1>
                Seuraava webinaari
                <br /> ke 5.6 klo 9-10
              </h1>
              <p>
                Webinaarissa käydään läpi määrälaskennan tehostamista ja sitä
                rataa. JCAD-määrälaskentaohjelmiston avulla lasket pintojen,
                tilojen ja rakenteiden määrät helposti, laadit tarjouksen
                hetkessä, vältät laskuvirheet ja pidät määräluettelon ajan
                tasalla läpi projektin.
              </p>
            </div>
            <div className="col justify-center align-center">
              <span
                css={`
                  font-size: 200px;
                `}
              >
                5
              </span>
              <span>päivää jäljellä</span>
            </div>
          </section>
          <section className="Second">
            <div className="row container padding">
              <div className="Coming col">
                <h2>Tulevat webinaarit</h2>
                <div className="List">
                  {allWebinars.map((i) => {
                    let d = new Date(i.node.webinaarinAjankohta);
                    const date = d.toLocaleDateString("fi-FI", {
                      weekday: "short",
                      month: "numeric",
                      day: "numeric",
                    });
                    const hour = d.toLocaleTimeString("fi-FI", {
                      timeStyle: "short",
                    });

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
  padding-top: 115px;
  background: ${theme.primary};

  .Hero {
    h1 {
      margin-bottom: 30px;
    }
    .col {
      border-right: 0.8px dashed #fff;
      flex: 3;
      padding: 60px 0;
      padding-right: 40px;
    }
    .col:last-child {
      flex: 2;
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
    flex: 3 1 0;
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
    flex: 2 1 0;
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
