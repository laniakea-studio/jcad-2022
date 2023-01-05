import React, { useContext } from "react";
import { LocaleContext } from "../contexts/LocaleContext";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { Layout } from "../components/Layout";
import { TutorialNavigation } from "@components/TutorialNavigation";

const Page = ({ pageContext }) => {
  const { locale } = useContext(LocaleContext);
  const { page } = pageContext.data;

  return (
    <>
      <HelmetDatoCms seo={page.seoMetaTags} />
      <Layout locale={locale} transparent={false}>
        <main className="pagePadding flex flex-col pt-[94px] text-[#fff] bg-primary">
          <section
            className="flex w-full pt-[60px] pb-[160px] px-[20px] container"
            css={`
              @media (max-width: 800px) {
                flex-direction: column;
              }
            `}
          >
            <TutorialNavigation />
            <div className="flex flex-col">
              <h1 className="normal-case text-[32px] font-normal my-[20px]">
                {page.title}
              </h1>
              <div
                className="mb-[50px]"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default Page;
