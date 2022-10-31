import { graphql, Link, useStaticQuery } from "gatsby";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import svgJcadLogo from "../assets/svgJcad.svg";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import { theme } from "../theme/theme";
import { SvgLogoFooter } from "./SvgCollection.js";
import { useIntersection } from "../hooks/useIntersection";
import { DownloadPdfForm } from "./DownloadPdfForm";

export const TutorialNavigation = ({ menu, prefix }) => {
  const { locale } = useContext(LocaleContext);
  const text = snippet[locale];

  const [isHidden, setIsHidden] = useState(false);

  const { allTutorials } = useStaticQuery(graphql`
    query {
      allTutorials: allDatoCmsTutoriaali(filter: { locale: { eq: "fi" } }) {
        edges {
          node {
            kategoria
            title
            slug
            videot {
              otsikko
              linkId
            }
          }
        }
      }
    }
  `);

  const kategoriat = [
    "Uusi JCAD-käyttäjä",
    "JCAD Määrät",
    "JCAD Sähkö",
    "JCAD LVI",
  ];

  console.log("Aside All Tutorials: ", allTutorials.edges);

  return (
    <>
      <button
        className="btn white-outlines"
        onClick={(e) => {
          e.preventDefault();
          setIsHidden(!isHidden);
        }}
        css={`
          width: 100%;
          margin-bottom: 40px;
          @media (min-width: 801px) {
            display: none !important;
          }
        `}
      >
        {isHidden ? "Näytä tutoriaali-valikko" : "Piilota tutoriaali-valikko"}
      </button>

      <nav
        className={isHidden ? "hideNav" : ""}
        css={`
          display: flex;
          flex-direction: column;
          min-width: 360px;
          padding-right: 30px;
          padding-bottom: 40px;
          position: sticky;
          top: 0px;
          &.hideNav {
            @media (max-width: 800px) {
              display: none;
            }
          }
          @media (max-width: 800px) {
            position: relative;
          }
          h3 {
            margin-bottom: 9px;
            opacity: 0.8;
            font-size: 18px;
            &:not(:first-child) {
              margin-top: 30px;
            }
          }
          a {
            position: relative;
            width: auto;
            font-size: 17px;
            font-weight: 600;
            padding-top: 9px;
            padding-bottom: 9px;
            opacity: 0.6;
            transition: opacity 0.2s;
            &:hover {
              opacity: 0.9;
            }
          }
          ul {
            position: relative;
            list-style: none;
            padding-left: 0;
          }
          li {
            position: relative;
          }
          .Dot {
            display: inline-flex;
            margin-right: 10px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #54548c;
          }
          .Line {
            width: 2px;
            height: 20px;
            left: 4px;
            bottom: 17px;
            height: 34px;
            background: #54548c;
            position: absolute;
          }
          .Group {
            position: relative;
            display: flex;
            flex-direction: column;
          }
          .active {
            a {
              opacity: 1;
            }
          }
        `}
      >
        {kategoriat.map((kategoria) => (
          <>
            {allTutorials.edges.some((i) => i.node.kategoria === kategoria) && (
              <>
                <h3>{kategoria}</h3>
                <ul className="Group">
                  {allTutorials.edges
                    .filter((i) => i.node.kategoria === kategoria)
                    .map((i, index) => {
                      const isActive =
                        window.location.href.indexOf(i.node.slug) > -1;
                      return (
                        <>
                          <li className={isActive ? "active" : ""}>
                            {index > 0 && <div className="Line" />}
                            <span className="Dot" />
                            <Link to={`/tutoriaalit/${i.node.slug}`}>
                              {i.node.title}
                            </Link>
                          </li>

                          {isActive && i.node.videot.length > 0 && (
                            <ul
                              css={`
                                margin: 0;
                                a {
                                  padding-left: 30px;
                                  font-size: 16px;
                                  font-size: 400;
                                  opacity: 1;
                                  &:hover {
                                    opacity: 0.8;
                                  }
                                }
                                .SubListLine {
                                  width: 2px;
                                  height: 20px;
                                  left: 4px;
                                  border-radius: 1px;
                                  height: calc(100% + 24px);
                                  background: #54548c;
                                  position: absolute;
                                  bottom: 8px;
                                }
                              `}
                            >
                              <div className="SubListLine" />
                              {i.node.videot.map((video) => (
                                <li>
                                  <Link
                                    to={`/tutoriaalit/${i.node.slug}#${video.linkId}`}
                                  >
                                    {video.otsikko}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      );
                    })}
                </ul>
              </>
            )}
          </>
        ))}
      </nav>
    </>
  );
};
