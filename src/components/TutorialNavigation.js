import { graphql, Link, useStaticQuery } from "gatsby";
import React, { useContext, useState } from "react";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import { tutorials } from "../constants/slugs";

const isBrowser = typeof window !== "undefined";

export const TutorialNavigation = () => {
  const { locale } = useContext(LocaleContext);
  const text = snippet[locale];

  const [isHidden, setIsHidden] = useState(false);

  const data = useStaticQuery(graphql`
    query {
      allTutorialsFi: allDatoCmsTutoriaali(filter: { locale: { eq: "fi" } }) {
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
      allTutorialsEn: allDatoCmsTutoriaali(filter: { locale: { eq: "en" } }) {
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

  const allTutorials =
    locale === "fi"
      ? data.allTutorialsFi.edges.filter((i) => i.node.slug)
      : data.allTutorialsEn.edges.filter((i) => i.node.slug);

  const kategoriat = [
    { fi: "Uusi JCAD-käyttäjä", en: "How to Guides" },
    { fi: "JCAD Määrät", en: "JCAD" },
    { fi: "JCAD Sähkö", en: "JCAD" },
    { fi: "JCAD LVI", en: "JCAD" },
  ];

  console.log(allTutorials);
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
        {isHidden ? text.tutorials.showMenu : text.tutorials.hideMenu}
      </button>

      <nav
        className={isHidden ? "hideNav" : ""}
        css={`
          display: flex;
          flex-direction: column;
          min-width: 360px;
          padding-right: 30px;
          padding-bottom: 40px;
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
        <div
          css={`
            position: sticky;
            top: 30px;
          `}
        >
          {kategoriat.map((kategoria) => (
            <>
              {allTutorials.some((i) => i.node.kategoria === kategoria.fi) && (
                <>
                  <h3>{kategoria[locale]}</h3>
                  <ul className="Group">
                    {allTutorials
                      .filter((i) => i.node.kategoria === kategoria.fi)
                      .map((i, index) => {
                        let isActive = false;
                        if (isBrowser) {
                          isActive =
                            window.location.href.indexOf(i.node.slug) > -1;
                        }

                        return (
                          <>
                            <li className={isActive ? "active" : ""}>
                              {index > 0 && <div className="Line" />}
                              <span className="Dot" />
                              <Link
                                to={`${
                                  text.prefix + tutorials[locale] + i.node.slug
                                }`}
                              >
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
                                      className="opacity-50 hover:opacity-90 transition"
                                      to={`${
                                        text.prefix +
                                        tutorials[locale] +
                                        i.node.slug +
                                        "#" +
                                        video.linkId
                                      }`}
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
        </div>
      </nav>
    </>
  );
};
