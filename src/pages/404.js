import { Link } from "gatsby";
import React from "react";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { theme } from "../theme/theme";
import { Layout } from "../components/Layout";

const NotFoundPage = () => {
  const seoMetaTags = {
    tags: [
      {
        tagName: "title",
        content: "Äh! Sivu hukassa • 404",
      },
    ],
  };
  return (
    <>
      <Layout>
        <HelmetDatoCms seo={seoMetaTags} />
        <div
          className="col all-center"
          css={`
            height: 100vh;
            background: #000053;
            color: #fff;
            h2 {
              margin-bottom: 20px;
            }
            .btn {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              box-sizing: border-box;
              padding-left: 20px;
              padding-right: 20px;
              height: 58px;
              font-weight: 600;
              text-transform: uppercase;
              font-size: 15px;
              letter-spacing: 0.05em;
              width: fit-content;
              border-radius: 4px;
            }
            .btn svg {
              margin-left: 15px;
            }
            .btn.white {
              background: #fff;
              border: 1px solid #fff;
              color: ${theme.primary};
            }
            .btn.white-outlines {
              background: none;
              border: 1px solid #fff;
              color: #fff;
            }
          `}
        >
          <h2>Äh! Se on 404. Sivua ei löytynyt.</h2>
          <Link className="btn white" to="/">
            Palaa etusivulle
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default NotFoundPage;
