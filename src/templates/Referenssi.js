import { Link } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import React, { useContext } from "react";
import { Layout } from "../components/Layout";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";

const Page = ({ pageContext }) => {
  const { locale } = useContext(LocaleContext);
  const { page } = pageContext.data;
  const text = snippet[locale];

  console.log({ page });

  return (
    <>
      <HelmetDatoCms seo={page.seoMetaTags} />
      <Layout locale={locale} transparent={false}>
        <main
          className="pagePadding flex flex-col bg-[#000053] text-[#fff] pt-[94px]"
          css={`
            .IntroCol {
              max-width: 800px;
              margin: 0 auto;
              text-align: center;
              padding: 60px 0;
            }
            .Tags {
              display: flex;
              flex-direction: column;
            }
            .MediaCol {
              display: none;
            }
            .Back {
              display: inline-flex;
              align-items: center;
              font-size: 17px;
              opacity: 0.7;
              color: #fff;
              width: fit-content;
              margin-bottom: 30px;
              font-weight: 600;
              font-size: 16px;
              transition: 0.2s;
              &:hover {
                opacity: 1;
              }
            }
          `}
        >
          <section className="container padding flex">
            <div className="flex flex-col flex-3 px-[30px] py-[60px]">
              <button
                onClick={() => window.history.back()}
                className="Back"
                aria-label={text.gdpr.buttonBack}
              >
                <span>{text.gdpr.buttonBack}</span>
              </button>
              <div className="IntroCol flex flex-col py-[30px] border-y-[0.8px] border-dashed border-[#fff]">
                <div className="Tags text-[15px]">
                  <span className="pr-[15px] opacity-[0.6] uppercase">
                    {page.toimiala}
                  </span>
                  <span>{page.yritys}</span>
                </div>
                <h1 className="text-[30px] py-[15px] normal-case">
                  {page.otsikko}
                </h1>
                <p>{page.ingressi}</p>
              </div>
            </div>
            <div className="MediaCol flex flex-col flex-2 justify-center">
              <SvgLike className="w-full" />
            </div>
          </section>
          <section className="container padding flex flex-col">
            <div
              css={`
                max-width: 600px;
                margin: 20px auto 80px;
                p {
                  padding-bottom: 20px;
                  font-size: 18px;
                }
              `}
              dangerouslySetInnerHTML={{ __html: page.sisalto }}
            />
            <button
              onClick={() => window.history.back()}
              className="Back mx-auto"
              aria-label={text.gdpr.buttonBack}
            >
              <span>{text.gdpr.buttonBack}</span>
            </button>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default Page;

const SvgLike = (props) => (
  <svg
    {...props}
    width="451"
    height="227"
    viewBox="0 0 451 227"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_402_774)">
      <path
        d="M47.6661 189.417C47.6661 177.27 39.4788 167.426 27.2909 167.426C15.103 167.426 3.55078 177.27 3.55078 189.417C3.55078 201.563 13.4283 211.407 25.6162 211.407C37.8041 211.407 47.6816 201.563 47.6816 189.417H47.6661Z"
        stroke="white"
        stroke-width="0.8"
        stroke-miterlimit="10"
      />
      <path
        d="M110.839 149.499C110.839 142.916 106.404 137.585 99.7984 137.585C93.1928 137.585 86.9282 142.916 86.9282 149.499C86.9282 156.083 92.2779 161.414 98.8836 161.414C105.489 161.414 110.839 156.083 110.839 149.499Z"
        stroke="white"
        stroke-width="0.8"
        stroke-miterlimit="10"
      />
      <path
        d="M334.874 62.3404C334.874 56.7461 331.106 52.2182 325.492 52.2182C319.879 52.2182 314.561 56.7461 314.561 62.3404C314.561 67.9347 319.104 72.4626 324.717 72.4626C330.33 72.4626 334.874 67.9347 334.874 62.3404Z"
        stroke="white"
        stroke-width="0.8"
        stroke-miterlimit="10"
      />
      <path
        d="M365.436 111.112C365.436 105.518 361.668 100.99 356.055 100.99C350.442 100.99 345.123 105.518 345.123 111.112C345.123 116.707 349.666 121.235 355.28 121.235C360.893 121.235 365.436 116.707 365.436 111.112Z"
        stroke="white"
        stroke-width="0.8"
        stroke-miterlimit="10"
      />
      <path
        d="M437.882 46.8248C437.882 38.4953 432.268 31.742 423.91 31.742C415.553 31.742 407.629 38.4953 407.629 46.8248C407.629 55.1544 414.405 61.9077 422.763 61.9077C431.121 61.9077 437.897 55.1544 437.897 46.8248H437.882Z"
        stroke="white"
        stroke-width="0.8"
        stroke-miterlimit="10"
      />
      <path
        d="M180.276 175.385H164.351V94.2987H180.276V175.385V175.385ZM284.773 147.722C278.245 166.839 270.895 175.385 267.22 175.385H190.882V93.6188C195.379 90.358 204.76 82.2294 210.482 73.2816C213.894 67.7956 216.452 60.9805 218.282 55.1853C219.848 50.2247 224.438 46.8403 229.664 46.8403V91.9961H290.898C294.17 94.4378 294.17 119.257 284.773 147.738V147.722Z"
        stroke="white"
        stroke-miterlimit="10"
      />
      <path
        d="M97.0849 80.2976H97.1469C99.3178 80.0195 101.086 78.4432 101.597 76.326C102.109 74.2089 101.241 71.999 99.4264 70.7781C87.0523 62.4949 86.2615 52.9136 88.4634 45.4958H105.551C108.311 45.4958 110.544 43.2705 110.544 40.5197V5.59425C110.544 2.84349 108.311 0.618149 105.551 0.618149H65.5762C62.816 0.618149 60.5831 2.84349 60.5831 5.59425V49.9619C60.4901 56.2516 62.5214 62.3867 66.3515 67.3783C70.8638 73.1425 79.8574 80.0658 97.0849 80.2976V80.2976Z"
        stroke="white"
        stroke-width="0.8"
        stroke-miterlimit="10"
      />
      <path
        d="M37.184 80.2976C39.3704 80.2976 41.2932 78.8913 41.9445 76.8051C42.5957 74.7343 41.8204 72.478 40.0372 71.2263C39.8511 71.0563 39.665 70.9172 39.4635 70.7781C27.0895 62.4949 26.2986 52.9136 28.5005 45.4958H45.5884C48.3486 45.4958 50.5815 43.2705 50.5815 40.5197V5.59425C50.5815 2.84349 48.3486 0.618149 45.5884 0.618149H5.61327C2.85315 0.618149 0.620247 2.84349 0.620247 5.59425V49.9619C0.527209 56.2516 2.55853 62.3867 6.38858 67.3783C10.9009 73.1425 19.8945 80.0658 37.122 80.2976H37.184V80.2976Z"
        stroke="white"
        stroke-width="0.8"
        stroke-miterlimit="10"
      />
      <path
        d="M353.915 146.702H353.853C351.682 146.981 349.914 148.557 349.403 150.674C348.891 152.791 349.759 155.001 351.574 156.222C363.948 164.505 364.738 174.086 362.537 181.504H345.449C342.688 181.504 340.456 183.73 340.456 186.48V221.406C340.456 224.156 342.688 226.382 345.449 226.382H385.424C388.184 226.382 390.417 224.156 390.417 221.406V177.038C390.51 170.748 388.478 164.613 384.648 159.622C380.136 153.857 371.142 146.934 353.915 146.702Z"
        stroke="white"
        stroke-width="0.8"
        stroke-miterlimit="10"
      />
      <path
        d="M413.816 146.702C411.629 146.702 409.707 148.109 409.055 150.195C408.404 152.266 409.179 154.522 410.963 155.774C411.149 155.944 411.335 156.083 411.536 156.222C423.91 164.505 424.701 174.086 422.499 181.504H405.411C402.651 181.504 400.418 183.73 400.418 186.48V221.406C400.418 224.156 402.651 226.382 405.411 226.382H445.387C448.147 226.382 450.38 224.156 450.38 221.406V177.038C450.473 170.748 448.441 164.613 444.611 159.622C440.099 153.857 431.105 146.934 413.878 146.702H413.816Z"
        stroke="white"
        stroke-width="0.8"
        stroke-miterlimit="10"
      />
      <path
        d="M130.516 30.3357H390.417V113.647"
        stroke="white"
        stroke-width="0.8"
        stroke-miterlimit="10"
      />
      <path
        d="M320.484 200.76H60.583V117.448"
        stroke="white"
        stroke-width="0.8"
        stroke-miterlimit="10"
      />
    </g>
    <defs>
      <clipPath id="clip0_402_774">
        <rect width="451" height="227" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
