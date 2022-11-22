import { Link } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import React, { useContext } from "react";
import { Layout } from "../components/Layout";
import { LocaleContext } from "../contexts/LocaleContext";
import { theme } from "../theme/theme";

const Page = ({ pageContext }) => {
  const { locale } = useContext(LocaleContext);
  const { page } = pageContext.data;

  console.log({ page, allReferences });

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
          <section>
            <h1>Referenssit</h1>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default Page;
