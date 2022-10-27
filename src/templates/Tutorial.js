import React, { useContext, useState, useEffect } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import styled from "styled-components";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { Layout } from "../components/Layout";
import { theme } from "../theme/theme";
import { NetlifyForm } from "@components/NetlifyFormJoinWebinar";
import { useLocalStorage } from "@hooks/useLocaleStorage";
import { Video } from "@components/Video";

const Page = ({ pageContext }) => {
  const { locale } = useContext(LocaleContext);
  const { page } = pageContext.data;

  const [linkCopied, setLinkCopied] = useState(null);

  function handleLinkCopy(e, link) {
    navigator.clipboard.writeText(
      `https://www.jcad.fi/tutoriaalit/${page.slug}#${link}`
    );
    setLinkCopied(link);
    e.preventDefault();
  }

  return (
    <>
      <HelmetDatoCms seo={page.seoMetaTags} />
      <Layout locale={locale} transparent={false}>
        <main
          className="pagePadding flex"
          css={`
            color: #fff;
            padding-top: 94px;
            background: ${theme.primary};
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          `}
        >
          <section
            className="col padding container align-center"
            css={`
              padding-top: 60px;
              padding-bottom: 160px;
              min-height: 100vh;
              .TempWrapper {
                max-width: 900px;
              }
              .SubTitle {
                text-transform: uppercase;
                font-weight: 500;
              }
              h1 {
                text-transform: none;
                font-size: 36px;
                margin: 5px auto 30px;
              }
              .Kuvaus {
                margin-bottom: 50px;
              }
            `}
          >
            <div className="TempWrapper">
              <span className="SubTitle">Tutoriaali</span>
              <h1>{page.title}</h1>
              <div
                className="Kuvaus"
                dangerouslySetInnerHTML={{ __html: page.kuvaus }}
              />

              {page.videot.map((item) => (
                <div
                  id={`#${item.linkId}`}
                  className="col"
                  css={`
                    padding-bottom: 80px;
                    justify-content: flex-end;
                    h3 {
                      font-size: 24px;
                      font-weight: 400;
                      text-transform: none;
                      margin-right: auto;
                      margin-bottom: 30px;
                    }
                  `}
                >
                  <div className="row">
                    <h3>{item.otsikko}</h3>
                    {linkCopied === item.linkId && (
                      <span
                        css={`
                          margin-left: auto;
                          color: rgba(255, 255, 255, 0.8);
                          font-size: 14px;
                          margin-top: 7px;
                        `}
                      >
                        Linkki kopioitu!
                      </span>
                    )}
                    <button
                      className="flex jsutify-center align-center"
                      onClick={(e) => handleLinkCopy(e, item.linkId)}
                      css={`
                        width: 30px;
                        height: 30px;
                        margin-left: 10px;
                        border-radius: 5px;
                        &:hover {
                          background: rgba(255, 255, 255, 0.1);
                        }
                      `}
                    >
                      <svg
                        width="24"
                        height="19"
                        viewBox="0 0 24 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_328_216)">
                          <path
                            d="M6.48753 4.87988C8.59503 2.79322 12.0113 2.79322 14.1188 4.87988C16.125 6.86523 16.2338 10.0529 14.3625 12.1682L14.1638 12.3945C13.8338 12.7656 13.2675 12.8027 12.8925 12.4799C12.5175 12.157 12.48 11.593 12.8063 11.2219L13.0088 10.9955C14.2538 9.58535 14.1825 7.46269 12.8438 6.13789C11.4413 4.7166 9.16503 4.7166 7.72878 6.13789L3.51116 10.3424C2.10716 11.734 2.10716 13.9865 3.51116 15.3744C4.84878 16.6658 6.99753 16.7697 8.41878 15.5377L8.65128 15.3373C9.02253 15.0145 9.59253 15.0516 9.91878 15.4227C10.2488 15.79 10.2075 16.3541 9.83628 16.677L9.60378 16.8773C7.46628 18.7254 4.24503 18.6215 2.23841 16.6324C0.131469 14.5506 0.131469 11.1365 2.23841 9.08437L6.48753 4.87988ZM17.5125 14.1201C15.405 16.2057 11.9888 16.2057 9.88128 14.1201C7.84128 12.1014 7.76628 8.94707 9.63378 6.83184L9.81003 6.63145C10.1363 6.26035 10.7063 6.22324 11.0813 6.54609C11.4563 6.86894 11.4938 7.43301 11.1675 7.8041L10.9913 8.00449C9.74253 9.41465 9.81753 11.5373 11.1525 12.8621C12.5588 14.25 14.835 14.25 16.2413 12.8621L20.49 8.65762C21.8925 7.26602 21.8925 5.01348 20.49 3.62559C19.1513 2.30152 17.0025 2.23064 15.5813 3.46416L15.3488 3.6627C14.9775 3.98555 14.4075 3.94844 14.0813 3.57883C13.7513 3.20885 13.7925 2.6459 14.1638 2.3223L14.3963 2.1234C16.5338 0.27268 19.755 0.378887 21.7613 2.36609C23.8688 4.44941 23.8688 7.83008 21.7613 9.91563L17.5125 14.1201Z"
                            fill="white"
                            fill-opacity="0.4"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_328_216">
                            <rect width="24" height="19" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>
                  <Video
                    data={item.video}
                    poster={item.videoPoster?.url}
                    markers={item.osiot}
                  />
                  <div dangerouslySetInnerHTML={{ __html: item.kuvaus }} />
                </div>
              ))}
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default Page;
