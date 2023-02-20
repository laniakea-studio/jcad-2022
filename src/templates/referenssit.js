import { Link } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import React, { useContext, useState } from "react";
import { Layout } from "../components/Layout";
import { LocaleContext } from "../contexts/LocaleContext";
import { GatsbyImage } from "gatsby-plugin-image";

const Page = ({ pageContext }) => {
  const { locale, prefix } = useContext(LocaleContext);
  const { page, allReferences, googleSheets } = pageContext.data;
  const [showCases, setShowCases] = useState(30);

  return (
    <>
      <HelmetDatoCms seo={page.seoMetaTags} />
      <Layout locale={locale} transparent={false}>
        <main
          className="pagePadding flex flex-col bg-[#000053] pt-[94px] text-[#fff]"
          css={`
            @media (max-width: 600px) {
              .Hero {
                border: none;
              }
              .ColMap {
                display: none;
              }
              .AllReferences {
                padding-top: 0;
              }
              .Reference {
                flex-direction: column;
                > div {
                  padding-left: 0;
                  padding-right: 0;
                }
              }
            }
          `}
        >
          <section className="Hero padding container flex overflow-hidden border-b-[0.8px] border-dashed border-white">
            <div className="flex flex-col">
              <h1 className="pt-[50px] pb-[20px] text-[42px] font-normal !normal-case">
                {page.title}
              </h1>
              <p className="max-w-[600px] pb-[60px] text-[18px]">
                {page.kuvaus}
              </p>
            </div>

            <div className="ColMap flex max-h-[300px] flex-1 justify-center">
              <SvgMap />
            </div>
          </section>
          <section className="AllReferences padding container flex flex-col items-center pt-[80px] pb-[80px]">
            {allReferences.map(({ node }) => (
              <Link
                to={prefix + page.slug + "/" + node.slug}
                className="Reference flex max-w-[1100px] border-b-[0.8px] border-dashed py-[20px]"
                key={node.slug}
                css={`
                  &:hover {
                    .Tags,
                    .Arrow {
                      transition: 0.2s;
                      opacity: 1;
                    }
                    .Arrow {
                      margin-left: 10px;
                      transition: 0.2s;
                    }
                  }
                `}
              >
                <div className="flex-2 flex flex-col justify-center px-[20px]">
                  {!node.kuva && <SvgLike className="w-full" />}
                  {node.kuva && (
                    <div className="w-full">
                      <GatsbyImage
                        className="imgHero"
                        image={node.kuva.gatsbyImageData}
                        alt={node.kuva?.url}
                      />
                    </div>
                  )}
                </div>
                <div className="flex-2 flex flex-col px-[20px] py-[40px]">
                  <div className="Tags text-[15px] opacity-[0.6]">
                    <span className="pr-[15px] uppercase">{node.toimiala}</span>
                    <span>{node.yritys}</span>
                  </div>
                  <h2 className="pt-[5px] pb-[20px] text-[25px] normal-case">
                    {node.otsikko}
                  </h2>
                  <p className="text-[18px]">{node.ingressi}</p>
                  <SvgArrowRight className="Arrow w-[26px] pt-[15px] opacity-[0.6]" />
                </div>
              </Link>
            ))}
            {locale === "fi" &&
              googleSheets.slice(0, showCases).map(({ node }) => (
                <div
                  className="max-[600]:flex-col flex w-full max-w-[1100px] items-center justify-between border-b-[0.8px] border-dashed py-[50px]"
                  css={`
                    @media (max-width: 600px) {
                      flex-direction: column;
                    }
                  `}
                >
                  <h4 className="flex-[2] text-[20px]">{node.Yritys}</h4>
                  <span className="flex-[1] text-[12px] uppercase">
                    {node.Toimiala}
                  </span>
                  <span className="flex-[1] text-[12px] uppercase">
                    {node.Alue}
                  </span>
                  <span className="flex-[1] text-[12px] uppercase">
                    {node.Liikevaihto && <>Liikevaihto {node.Liikevaihto}</>}
                  </span>
                </div>
              ))}
            {locale === "fi" && setShowCases !== googleSheets.length && (
              <button
                className="btn white-outlines mx-auto mt-[50px]"
                onClick={() => setShowCases(googleSheets.length)}
              >
                Näytä kaikki
              </button>
            )}
          </section>
        </main>
      </Layout>
    </>
  );
};

export default Page;

const SvgArrowRight = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
      fill="white"
      d="M363.3 100.7l144 144C510.4 247.8 512 251.9 512 255.1s-1.562 8.188-4.688 11.31l-144 144c-6.25 6.25-16.38 6.25-22.62 0s-6.25-16.38 0-22.62l116.7-116.7H16c-8.844 0-16-7.156-16-15.1c0-8.844 7.156-16 16-16h441.4l-116.7-116.7c-6.25-6.25-6.25-16.38 0-22.62S357.1 94.44 363.3 100.7z"
    />
  </svg>
);

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

const SvgMap = () => (
  <svg
    width="388"
    height="485"
    viewBox="0 0 388 485"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M140.541 7.54409C140.541 16.5498 127.072 16.5498 127.072 7.54409C127.072 -1.46164 140.541 -1.46164 140.541 7.54409Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M164.784 7.54409C164.784 16.5498 151.315 16.5498 151.315 7.54409C151.315 -1.46164 164.784 -1.46164 164.784 7.54409Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M189.012 7.54409C189.012 16.5498 175.543 16.5498 175.543 7.54409C175.543 -1.46164 189.012 -1.46164 189.012 7.54409Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M213.286 7.54409C213.286 16.5498 199.817 16.5498 199.817 7.54409C199.817 -1.46164 213.286 -1.46164 213.286 7.54409Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M237.53 7.54409C237.53 16.5498 224.062 16.5498 224.062 7.54409C224.062 -1.46164 237.53 -1.46164 237.53 7.54409Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M261.758 7.54409C261.758 16.5498 248.289 16.5498 248.289 7.54409C248.289 -1.46164 261.758 -1.46164 261.758 7.54409Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M286.017 7.54409C286.017 16.5498 272.549 16.5498 272.549 7.54409C272.549 -1.46164 286.017 -1.46164 286.017 7.54409Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M310.245 7.54409C310.245 16.5498 296.776 16.5498 296.776 7.54409C296.776 -1.46164 310.245 -1.46164 310.245 7.54409Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M164.784 31.8737C164.784 40.8794 151.315 40.8794 151.315 31.8737C151.315 22.868 164.784 22.868 164.784 31.8737Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M189.012 31.8737C189.012 40.8794 175.543 40.8794 175.543 31.8737C175.543 22.868 189.012 22.868 189.012 31.8737Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M213.286 31.8737C213.286 40.8794 199.817 40.8794 199.817 31.8737C199.817 22.868 213.286 22.868 213.286 31.8737Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M237.53 31.8737C237.53 40.8794 224.062 40.8794 224.062 31.8737C224.062 22.868 237.53 22.868 237.53 31.8737Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M261.758 31.8737C261.758 40.8794 248.289 40.8794 248.289 31.8737C248.289 22.868 261.758 22.868 261.758 31.8737Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M286.017 31.8737C286.017 40.8794 272.549 40.8794 272.549 31.8737C272.549 22.868 286.017 22.868 286.017 31.8737Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M310.245 31.8737C310.245 40.8794 296.776 40.8794 296.776 31.8737C296.776 22.868 310.245 22.868 310.245 31.8737Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M334.504 31.8737C334.504 40.8794 321.035 40.8794 321.035 31.8737C321.035 22.868 334.504 22.868 334.504 31.8737Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M164.784 56.2033C164.784 65.209 151.315 65.209 151.315 56.2033C151.315 47.1975 164.784 47.1975 164.784 56.2033Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M189.012 56.2033C189.012 65.209 175.543 65.209 175.543 56.2033C175.543 47.1975 189.012 47.1975 189.012 56.2033Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M213.286 56.2033C213.286 65.209 199.817 65.209 199.817 56.2033C199.817 47.1975 213.286 47.1975 213.286 56.2033Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M237.53 56.2033C237.53 65.209 224.062 65.209 224.062 56.2033C224.062 47.1975 237.53 47.1975 237.53 56.2033Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M261.758 56.2033C261.758 65.209 248.289 65.209 248.289 56.2033C248.289 47.1975 261.758 47.1975 261.758 56.2033Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M286.017 56.2033C286.017 65.209 272.549 65.209 272.549 56.2033C272.549 47.1975 286.017 47.1975 286.017 56.2033Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M310.245 56.2033C310.245 65.209 296.776 65.209 296.776 56.2033C296.776 47.1975 310.245 47.1975 310.245 56.2033Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M334.504 56.2033C334.504 65.209 321.035 65.209 321.035 56.2033C321.035 47.1975 334.504 47.1975 334.504 56.2033Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M213.286 80.5329C213.286 89.5387 199.817 89.5387 199.817 80.5329C199.817 71.5272 213.286 71.5272 213.286 80.5329Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M237.53 80.5329C237.53 89.5387 224.062 89.5387 224.062 80.5329C224.062 71.5272 237.53 71.5272 237.53 80.5329Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M261.758 80.5329C261.758 89.5387 248.289 89.5387 248.289 80.5329C248.289 71.5272 261.758 71.5272 261.758 80.5329Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M286.017 80.5329C286.017 89.5387 272.549 89.5387 272.549 80.5329C272.549 71.5272 286.017 71.5272 286.017 80.5329Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M310.245 80.5329C310.245 89.5387 296.776 89.5387 296.776 80.5329C296.776 71.5272 310.245 71.5272 310.245 80.5329Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M189.012 104.862C189.012 113.868 175.543 113.868 175.543 104.862C175.543 95.8567 189.012 95.8567 189.012 104.862Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M213.286 104.862C213.286 113.868 199.817 113.868 199.817 104.862C199.817 95.8567 213.286 95.8567 213.286 104.862Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M237.53 104.862C237.53 113.868 224.062 113.868 224.062 104.862C224.062 95.8567 237.53 95.8567 237.53 104.862Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M261.758 104.862C261.758 113.868 248.289 113.868 248.289 104.862C248.289 95.8567 261.758 95.8567 261.758 104.862Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M286.017 104.862C286.017 113.868 272.549 113.868 272.549 104.862C272.549 95.8567 286.017 95.8567 286.017 104.862Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M310.245 104.862C310.245 113.868 296.776 113.868 296.776 104.862C296.776 95.8567 310.245 95.8567 310.245 104.862Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M334.504 104.862C334.504 113.868 321.035 113.868 321.035 104.862C321.035 95.8567 334.504 95.8567 334.504 104.862Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M164.784 129.192C164.784 138.198 151.315 138.198 151.315 129.192C151.315 120.186 164.784 120.186 164.784 129.192Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M189.012 129.192C189.012 138.198 175.543 138.198 175.543 129.192C175.543 120.186 189.012 120.186 189.012 129.192Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M213.286 129.192C213.286 138.198 199.817 138.198 199.817 129.192C199.817 120.186 213.286 120.186 213.286 129.192Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M237.53 129.192C237.53 138.198 224.062 138.198 224.062 129.192C224.062 120.186 237.53 120.186 237.53 129.192Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M261.758 129.192C261.758 138.198 248.289 138.198 248.289 129.192C248.289 120.186 261.758 120.186 261.758 129.192Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M286.017 129.192C286.017 138.198 272.549 138.198 272.549 129.192C272.549 120.186 286.017 120.186 286.017 129.192Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M310.245 129.192C310.245 138.198 296.776 138.198 296.776 129.192C296.776 120.186 310.245 120.186 310.245 129.192Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M334.504 129.192C334.504 138.198 321.035 138.198 321.035 129.192C321.035 120.186 334.504 120.186 334.504 129.192Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M164.784 153.522C164.784 162.527 151.315 162.527 151.315 153.522C151.315 144.516 164.784 144.516 164.784 153.522Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M189.012 153.522C189.012 162.527 175.543 162.527 175.543 153.522C175.543 144.516 189.012 144.516 189.012 153.522Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M213.286 153.522C213.286 162.527 199.817 162.527 199.817 153.522C199.817 144.516 213.286 144.516 213.286 153.522Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M237.53 153.522C237.53 162.527 224.062 162.527 224.062 153.522C224.062 144.516 237.53 144.516 237.53 153.522Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M261.758 153.522C261.758 162.527 248.289 162.527 248.289 153.522C248.289 144.516 261.758 144.516 261.758 153.522Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M286.017 153.522C286.017 162.527 272.549 162.527 272.549 153.522C272.549 144.516 286.017 144.516 286.017 153.522Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M310.245 153.522C310.245 162.527 296.776 162.527 296.776 153.522C296.776 144.516 310.245 144.516 310.245 153.522Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M334.504 153.522C334.504 162.527 321.035 162.527 321.035 153.522C321.035 144.516 334.504 144.516 334.504 153.522Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M140.541 177.851C140.541 186.857 127.072 186.857 127.072 177.851C127.072 168.846 140.541 168.846 140.541 177.851Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M164.784 177.851C164.784 186.857 151.315 186.857 151.315 177.851C151.315 168.846 164.784 168.846 164.784 177.851Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M189.012 177.851C189.012 186.857 175.543 186.857 175.543 177.851C175.543 168.846 189.012 168.846 189.012 177.851Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M213.286 177.851C213.286 186.857 199.817 186.857 199.817 177.851C199.817 168.846 213.286 168.846 213.286 177.851Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M237.53 177.851C237.53 186.857 224.062 186.857 224.062 177.851C224.062 168.846 237.53 168.846 237.53 177.851Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M261.758 177.851C261.758 186.857 248.289 186.857 248.289 177.851C248.289 168.846 261.758 168.846 261.758 177.851Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M286.017 177.851C286.017 186.857 272.549 186.857 272.549 177.851C272.549 168.846 286.017 168.846 286.017 177.851Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M310.245 177.851C310.245 186.857 296.776 186.857 296.776 177.851C296.776 168.846 310.245 168.846 310.245 177.851Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M334.504 177.851C334.504 186.857 321.035 186.857 321.035 177.851C321.035 168.846 334.504 168.846 334.504 177.851Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M358.747 177.851C358.747 186.857 345.278 186.857 345.278 177.851C345.278 168.846 358.747 168.846 358.747 177.851Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M116.297 202.181C116.297 211.187 102.828 211.187 102.828 202.181C102.828 193.175 116.297 193.175 116.297 202.181Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M140.541 202.181C140.541 211.187 127.072 211.187 127.072 202.181C127.072 193.175 140.541 193.175 140.541 202.181Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M164.784 202.181C164.784 211.187 151.315 211.187 151.315 202.181C151.315 193.175 164.784 193.175 164.784 202.181Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M189.012 202.181C189.012 211.187 175.543 211.187 175.543 202.181C175.543 193.175 189.012 193.175 189.012 202.181Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M213.286 202.181C213.286 211.187 199.817 211.187 199.817 202.181C199.817 193.175 213.286 193.175 213.286 202.181Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M237.53 202.181C237.53 211.187 224.062 211.187 224.062 202.181C224.062 193.175 237.53 193.175 237.53 202.181Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M261.758 202.181C261.758 211.187 248.289 211.187 248.289 202.181C248.289 193.175 261.758 193.175 261.758 202.181Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M286.017 202.181C286.017 211.187 272.549 211.187 272.549 202.181C272.549 193.175 286.017 193.175 286.017 202.181Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M310.245 202.181C310.245 211.187 296.776 211.187 296.776 202.181C296.776 193.175 310.245 193.175 310.245 202.181Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M334.504 202.181C334.504 211.187 321.035 211.187 321.035 202.181C321.035 193.175 334.504 193.175 334.504 202.181Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M92.0535 226.526C92.0535 235.532 78.585 235.532 78.585 226.526C78.585 217.521 92.0535 217.521 92.0535 226.526Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M116.297 226.526C116.297 235.532 102.828 235.532 102.828 226.526C102.828 217.521 116.297 217.521 116.297 226.526Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M140.541 226.526C140.541 235.532 127.072 235.532 127.072 226.526C127.072 217.521 140.541 217.521 140.541 226.526Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M164.784 226.526C164.784 235.532 151.315 235.532 151.315 226.526C151.315 217.521 164.784 217.521 164.784 226.526Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M189.012 226.526C189.012 235.532 175.543 235.532 175.543 226.526C175.543 217.521 189.012 217.521 189.012 226.526Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M213.286 226.526C213.286 235.532 199.817 235.532 199.817 226.526C199.817 217.521 213.286 217.521 213.286 226.526Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M237.53 226.526C237.53 235.532 224.062 235.532 224.062 226.526C224.062 217.521 237.53 217.521 237.53 226.526Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M261.758 226.526C261.758 235.532 248.289 235.532 248.289 226.526C248.289 217.521 261.758 217.521 261.758 226.526Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M286.017 226.526C286.017 235.532 272.549 235.532 272.549 226.526C272.549 217.521 286.017 217.521 286.017 226.526Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M310.245 226.526C310.245 235.532 296.776 235.532 296.776 226.526C296.776 217.521 310.245 217.521 310.245 226.526Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M334.504 226.526C334.504 235.532 321.035 235.532 321.035 226.526C321.035 217.521 334.504 217.521 334.504 226.526Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M358.747 226.526C358.747 235.532 345.278 235.532 345.278 226.526C345.278 217.521 358.747 217.521 358.747 226.526Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M92.0535 250.856C92.0535 259.862 78.585 259.862 78.585 250.856C78.585 241.85 92.0535 241.85 92.0535 250.856Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M116.297 250.856C116.297 259.862 102.828 259.862 102.828 250.856C102.828 241.85 116.297 241.85 116.297 250.856Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M140.541 250.856C140.541 259.862 127.072 259.862 127.072 250.856C127.072 241.85 140.541 241.85 140.541 250.856Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M164.784 250.856C164.784 259.862 151.315 259.862 151.315 250.856C151.315 241.85 164.784 241.85 164.784 250.856Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M189.012 250.856C189.012 259.862 175.543 259.862 175.543 250.856C175.543 241.85 189.012 241.85 189.012 250.856Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M213.286 250.856C213.286 259.862 199.817 259.862 199.817 250.856C199.817 241.85 213.286 241.85 213.286 250.856Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M237.53 250.856C237.53 259.862 224.062 259.862 224.062 250.856C224.062 241.85 237.53 241.85 237.53 250.856Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M261.758 250.856C261.758 259.862 248.289 259.862 248.289 250.856C248.289 241.85 261.758 241.85 261.758 250.856Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M286.017 250.856C286.017 259.862 272.549 259.862 272.549 250.856C272.549 241.85 286.017 241.85 286.017 250.856Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M310.245 250.856C310.245 259.862 296.776 259.862 296.776 250.856C296.776 241.85 310.245 241.85 310.245 250.856Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M334.504 250.856C334.504 259.862 321.035 259.862 321.035 250.856C321.035 241.85 334.504 241.85 334.504 250.856Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M358.747 250.856C358.747 259.862 345.278 259.862 345.278 250.856C345.278 241.85 358.747 241.85 358.747 250.856Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M67.8104 275.17C67.8104 284.175 54.3418 284.175 54.3418 275.17C54.3418 266.164 67.8104 266.164 67.8104 275.17Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M92.0535 275.17C92.0535 284.175 78.585 284.175 78.585 275.17C78.585 266.164 92.0535 266.164 92.0535 275.17Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M116.297 275.17C116.297 284.175 102.828 284.175 102.828 275.17C102.828 266.164 116.297 266.164 116.297 275.17Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M140.541 275.17C140.541 284.175 127.072 284.175 127.072 275.17C127.072 266.164 140.541 266.164 140.541 275.17Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M164.784 275.17C164.784 284.175 151.315 284.175 151.315 275.17C151.315 266.164 164.784 266.164 164.784 275.17Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M189.012 275.17C189.012 284.175 175.543 284.175 175.543 275.17C175.543 266.164 189.012 266.164 189.012 275.17Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M213.286 275.17C213.286 284.175 199.817 284.175 199.817 275.17C199.817 266.164 213.286 266.164 213.286 275.17Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M237.53 275.17C237.53 284.175 224.062 284.175 224.062 275.17C224.062 266.164 237.53 266.164 237.53 275.17Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M261.758 275.17C261.758 284.175 248.289 284.175 248.289 275.17C248.289 266.164 261.758 266.164 261.758 275.17Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M286.017 275.17C286.017 284.175 272.549 284.175 272.549 275.17C272.549 266.164 286.017 266.164 286.017 275.17Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M310.245 275.17C310.245 284.175 296.776 284.175 296.776 275.17C296.776 266.164 310.245 266.164 310.245 275.17Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M334.504 275.17C334.504 284.175 321.035 284.175 321.035 275.17C321.035 266.164 334.504 266.164 334.504 275.17Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M358.747 275.17C358.747 284.175 345.278 284.175 345.278 275.17C345.278 266.164 358.747 266.164 358.747 275.17Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M382.99 275.17C382.99 284.175 369.521 284.175 369.521 275.17C369.521 266.164 382.99 266.164 382.99 275.17Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M67.8104 299.515C67.8104 308.521 54.3418 308.521 54.3418 299.515C54.3418 290.509 67.8104 290.509 67.8104 299.515Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M92.0535 299.515C92.0535 308.521 78.585 308.521 78.585 299.515C78.585 290.509 92.0535 290.509 92.0535 299.515Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M116.297 299.515C116.297 308.521 102.828 308.521 102.828 299.515C102.828 290.509 116.297 290.509 116.297 299.515Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M140.541 299.515C140.541 308.521 127.072 308.521 127.072 299.515C127.072 290.509 140.541 290.509 140.541 299.515Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M164.784 299.515C164.784 308.521 151.315 308.521 151.315 299.515C151.315 290.509 164.784 290.509 164.784 299.515Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M189.012 299.515C189.012 308.521 175.543 308.521 175.543 299.515C175.543 290.509 189.012 290.509 189.012 299.515Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M213.286 299.515C213.286 308.521 199.817 308.521 199.817 299.515C199.817 290.509 213.286 290.509 213.286 299.515Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M237.53 299.515C237.53 308.521 224.062 308.521 224.062 299.515C224.062 290.509 237.53 290.509 237.53 299.515Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M261.758 299.515C261.758 308.521 248.289 308.521 248.289 299.515C248.289 290.509 261.758 290.509 261.758 299.515Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M286.017 299.515C286.017 308.521 272.549 308.521 272.549 299.515C272.549 290.509 286.017 290.509 286.017 299.515Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M310.245 299.515C310.245 308.521 296.776 308.521 296.776 299.515C296.776 290.509 310.245 290.509 310.245 299.515Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M334.504 299.515C334.504 308.521 321.035 308.521 321.035 299.515C321.035 290.509 334.504 290.509 334.504 299.515Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M358.747 299.515C358.747 308.521 345.278 308.521 345.278 299.515C345.278 290.509 358.747 290.509 358.747 299.515Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M67.8104 323.845C67.8104 332.851 54.3418 332.851 54.3418 323.845C54.3418 314.839 67.8104 314.839 67.8104 323.845Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M92.0535 323.845C92.0535 332.851 78.585 332.851 78.585 323.845C78.585 314.839 92.0535 314.839 92.0535 323.845Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M116.297 323.845C116.297 332.851 102.828 332.851 102.828 323.845C102.828 314.839 116.297 314.839 116.297 323.845Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M140.541 323.845C140.541 332.851 127.072 332.851 127.072 323.845C127.072 314.839 140.541 314.839 140.541 323.845Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M164.784 323.845C164.784 332.851 151.315 332.851 151.315 323.845C151.315 314.839 164.784 314.839 164.784 323.845Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M189.012 323.845C189.012 332.851 175.543 332.851 175.543 323.845C175.543 314.839 189.012 314.839 189.012 323.845Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M213.286 323.845C213.286 332.851 199.817 332.851 199.817 323.845C199.817 314.839 213.286 314.839 213.286 323.845Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M237.53 323.845C237.53 332.851 224.062 332.851 224.062 323.845C224.062 314.839 237.53 314.839 237.53 323.845Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M261.758 323.845C261.758 332.851 248.289 332.851 248.289 323.845C248.289 314.839 261.758 314.839 261.758 323.845Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M286.017 323.845C286.017 332.851 272.549 332.851 272.549 323.845C272.549 314.839 286.017 314.839 286.017 323.845Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M310.245 323.845C310.245 332.851 296.776 332.851 296.776 323.845C296.776 314.839 310.245 314.839 310.245 323.845Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M334.504 323.845C334.504 332.851 321.035 332.851 321.035 323.845C321.035 314.839 334.504 314.839 334.504 323.845Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M67.8104 348.174C67.8104 357.18 54.3418 357.18 54.3418 348.174C54.3418 339.169 67.8104 339.169 67.8104 348.174Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M92.0535 348.174C92.0535 357.18 78.585 357.18 78.585 348.174C78.585 339.169 92.0535 339.169 92.0535 348.174Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M116.297 348.174C116.297 357.18 102.828 357.18 102.828 348.174C102.828 339.169 116.297 339.169 116.297 348.174Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M140.541 348.174C140.541 357.18 127.072 357.18 127.072 348.174C127.072 339.169 140.541 339.169 140.541 348.174Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M164.784 348.174C164.784 357.18 151.315 357.18 151.315 348.174C151.315 339.169 164.784 339.169 164.784 348.174Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M189.012 348.174C189.012 357.18 175.543 357.18 175.543 348.174C175.543 339.169 189.012 339.169 189.012 348.174Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M213.286 348.174C213.286 357.18 199.817 357.18 199.817 348.174C199.817 339.169 213.286 339.169 213.286 348.174Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M237.53 348.174C237.53 357.18 224.062 357.18 224.062 348.174C224.062 339.169 237.53 339.169 237.53 348.174Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M261.758 348.174C261.758 357.18 248.289 357.18 248.289 348.174C248.289 339.169 261.758 339.169 261.758 348.174Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M286.017 348.174C286.017 357.18 272.549 357.18 272.549 348.174C272.549 339.169 286.017 339.169 286.017 348.174Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M310.245 348.174C310.245 357.18 296.776 357.18 296.776 348.174C296.776 339.169 310.245 339.169 310.245 348.174Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M334.504 348.174C334.504 357.18 321.035 357.18 321.035 348.174C321.035 339.169 334.504 339.169 334.504 348.174Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M67.8104 372.504C67.8104 381.51 54.3418 381.51 54.3418 372.504C54.3418 363.498 67.8104 363.498 67.8104 372.504Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M92.0535 372.504C92.0535 381.51 78.585 381.51 78.585 372.504C78.585 363.498 92.0535 363.498 92.0535 372.504Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M116.297 372.504C116.297 381.51 102.828 381.51 102.828 372.504C102.828 363.498 116.297 363.498 116.297 372.504Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M140.541 372.504C140.541 381.51 127.072 381.51 127.072 372.504C127.072 363.498 140.541 363.498 140.541 372.504Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M164.784 372.504C164.784 381.51 151.315 381.51 151.315 372.504C151.315 363.498 164.784 363.498 164.784 372.504Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M189.012 372.504C189.012 381.51 175.543 381.51 175.543 372.504C175.543 363.498 189.012 363.498 189.012 372.504Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M213.286 372.504C213.286 381.51 199.817 381.51 199.817 372.504C199.817 363.498 213.286 363.498 213.286 372.504Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M237.53 372.504C237.53 381.51 224.062 381.51 224.062 372.504C224.062 363.498 237.53 363.498 237.53 372.504Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M261.758 372.504C261.758 381.51 248.289 381.51 248.289 372.504C248.289 363.498 261.758 363.498 261.758 372.504Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M286.017 372.504C286.017 381.51 272.549 381.51 272.549 372.504C272.549 363.498 286.017 363.498 286.017 372.504Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M310.245 372.504C310.245 381.51 296.776 381.51 296.776 372.504C296.776 363.498 310.245 363.498 310.245 372.504Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M67.8104 396.834C67.8104 405.839 54.3418 405.839 54.3418 396.834C54.3418 387.828 67.8104 387.828 67.8104 396.834Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M92.0535 396.834C92.0535 405.839 78.585 405.839 78.585 396.834C78.585 387.828 92.0535 387.828 92.0535 396.834Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M116.297 396.834C116.297 405.839 102.828 405.839 102.828 396.834C102.828 387.828 116.297 387.828 116.297 396.834Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M140.541 396.834C140.541 405.839 127.072 405.839 127.072 396.834C127.072 387.828 140.541 387.828 140.541 396.834Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M164.784 396.834C164.784 405.839 151.315 405.839 151.315 396.834C151.315 387.828 164.784 387.828 164.784 396.834Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M189.012 396.834C189.012 405.839 175.543 405.839 175.543 396.834C175.543 387.828 189.012 387.828 189.012 396.834Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M213.286 396.834C213.286 405.839 199.817 405.839 199.817 396.834C199.817 387.828 213.286 387.828 213.286 396.834Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M237.53 396.834C237.53 405.839 224.062 405.839 224.062 396.834C224.062 387.828 237.53 387.828 237.53 396.834Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M261.758 396.834C261.758 405.839 248.289 405.839 248.289 396.834C248.289 387.828 261.758 387.828 261.758 396.834Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M286.017 396.834C286.017 405.839 272.549 405.839 272.549 396.834C272.549 387.828 286.017 387.828 286.017 396.834Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M67.8104 421.163C67.8104 430.169 54.3418 430.169 54.3418 421.163C54.3418 412.157 67.8104 412.157 67.8104 421.163Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M92.0535 421.163C92.0535 430.169 78.585 430.169 78.585 421.163C78.585 412.157 92.0535 412.157 92.0535 421.163Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M116.297 421.163C116.297 430.169 102.828 430.169 102.828 421.163C102.828 412.157 116.297 412.157 116.297 421.163Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M140.541 421.163C140.541 430.169 127.072 430.169 127.072 421.163C127.072 412.157 140.541 412.157 140.541 421.163Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M164.784 421.163C164.784 430.169 151.315 430.169 151.315 421.163C151.315 412.157 164.784 412.157 164.784 421.163Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M189.012 421.163C189.012 430.169 175.543 430.169 175.543 421.163C175.543 412.157 189.012 412.157 189.012 421.163Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M213.286 421.163C213.286 430.169 199.817 430.169 199.817 421.163C199.817 412.157 213.286 412.157 213.286 421.163Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M237.53 421.163C237.53 430.169 224.062 430.169 224.062 421.163C224.062 412.157 237.53 412.157 237.53 421.163Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M261.758 421.163C261.758 430.169 248.289 430.169 248.289 421.163C248.289 412.157 261.758 412.157 261.758 421.163Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19.3231 445.493C19.3231 454.499 5.85449 454.499 5.85449 445.493C5.85449 436.487 19.3231 436.487 19.3231 445.493Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M43.5672 445.493C43.5672 454.499 30.0986 454.499 30.0986 445.493C30.0986 436.487 43.5672 436.487 43.5672 445.493Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M92.0535 445.493C92.0535 454.499 78.585 454.499 78.585 445.493C78.585 436.487 92.0535 436.487 92.0535 445.493Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M116.297 445.493C116.297 454.499 102.828 454.499 102.828 445.493C102.828 436.487 116.297 436.487 116.297 445.493Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M140.541 445.493C140.541 454.499 127.072 454.499 127.072 445.493C127.072 436.487 140.541 436.487 140.541 445.493Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M164.784 445.493C164.784 454.499 151.315 454.499 151.315 445.493C151.315 436.487 164.784 436.487 164.784 445.493Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M189.012 445.493C189.012 454.499 175.543 454.499 175.543 445.493C175.543 436.487 189.012 436.487 189.012 445.493Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M116.297 469.838C116.297 478.844 102.828 478.844 102.828 469.838C102.828 460.833 116.297 460.833 116.297 469.838Z"
      stroke="white"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
  </svg>
);
