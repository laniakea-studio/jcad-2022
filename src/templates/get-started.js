import React, { useContext } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { LocaleContext } from "../contexts/LocaleContext";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { Layout } from "../components/Layout";
import { Video } from "@components/Video";
import { GetStartedForm } from "../components/GetStartedForm";
import { Booking } from "../components/Booking";

const Page = ({ pageContext }) => {
  const { prefix } = useContext(LocaleContext);
  const { page, references } = pageContext.data;
  const { locale } = pageContext;

  const selected = references.articles.filter((i) => i.node.otsikko);

  return (
    <>
      <HelmetDatoCms seo={page.seoMetaTags} />
      <Layout locale={locale} transparent={false}>
        <main
          css={`
            .Layer {
              background: linear-gradient(
                180deg,
                #09096b 0%,
                rgba(0, 0, 83, 0.74) 100%
              );
            }
          `}
        >
          <div className="Hero relative overflow-hidden">
            <GatsbyImage
              className="!absolute h-full"
              image={page.heroImage.gatsbyImageData}
            />
            <div className="Layer absolute h-full w-full" />
            <div className="pagePadding relative pt-[94px]">
              <section className="container flex h-full flex-col border-x-[0.8px] border-dashed border-[#fff] pl-[110px] pt-[90px] pb-[240px] text-white max-[700px]:pl-[20px] max-[600px]:border-none">
                <span className="mb-[10px] flex text-[15px] uppercase">
                  <Caret className="mt-[5px] mr-[5px]" />
                  Get started
                </span>
                <h1 className="mb-[40px] max-w-[840px] text-[52px] font-normal normal-case max-[600px]:text-[36px] max-[600px]:leading-normal">
                  Calculate the material quantities of your next project using
                  JCAD software - activate the trial period without any
                  commitments
                </h1>
                <span className="mb-[10px] opacity-60">
                  Start the trial by entering your email and installing the
                  software.
                </span>
                <GetStartedForm />
              </section>
            </div>
          </div>
          <div className="pagePadding">
            <div className="container flex flex-col border-x-[0.8px] border-dashed border-[#222] max-[600px]:border-none">
              <div className="relative ml-auto mr-[10%] mt-[-150px] flex max-w-[1000px] flex-col px-[20px] pb-[100px] max-[1400px]:mr-auto">
                <span className="mb-[10px] flex text-[15px] uppercase text-white">
                  <Caret className="mt-[5px] mr-[5px]" />
                  Watch key features in action
                </span>
                <div className="bg-white p-[80px] max-[800px]:p-[40px] max-[600px]:p-[20px]">
                  <Video
                    data={page.video[0].file}
                    poster={page.video[0].poster.url}
                    markers={page.video[0].markers}
                  />
                  <p className="mx-auto mt-[5px] max-w-[490px] text-center">
                    With JCAD material take-off software, you can easily
                    calculate the material quantities of surfaces, spaces, and
                    structures.
                  </p>
                </div>
              </div>
              <div className="mx-auto flex w-full max-w-[1300px] items-center justify-around px-[20px] pb-[120px] max-[800px]:flex-col-reverse">
                <p className="max-w-[380px] text-[32px] leading-normal">
                  More than 1,700 in the construction industry in the Nordic
                  countries are already using JCAD to calculate material
                  quantities directly from floor plans.
                </p>
                <div className="mb-[50px] grid grid-cols-2 gap-[50px]">
                  {page.logos.map((i) => (
                    <img src={i.url} alt={i.alt} className="max-w-[120px]" />
                  ))}
                </div>
              </div>
              <div
                before="WHY?"
                className="relative grid grid-cols-2 border-t-[0.8px] border-dashed border-[#222] before:absolute before:top-[20px] before:left-[-39px] before:-rotate-90 before:text-[#222] before:content-[attr(before)] max-[800px]:grid-cols-1 max-[600px]:before:top-[10px] max-[600px]:before:left-[10px] max-[600px]:before:rotate-0"
              >
                <div className="flex flex-col items-center justify-center border-b-[0.8px] border-r-[0.8px] border-dashed border-[#222] p-[100px] text-center text-[#222] max-[800px]:border-r-0 max-[400px]:px-[40px]">
                  <Fast />
                  <h3 className="mt-[25px] mb-[15px] text-[26px] font-normal normal-case">
                    Save valuable worktime
                  </h3>
                  <p>
                    Make material quantity calculation easy. Measure structures,
                    surfaces, and shapes directly from floor plans (DWG or PDF).
                    The software calculates the quantity and price of the
                    materials.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center border-dashed border-[#222] p-[100px] text-center text-[#222] max-[800px]:border-b-[0.8px] max-[400px]:px-[40px]">
                  <Crosshair />
                  <h3 className="mt-[25px] mb-[15px] text-[26px] font-normal normal-case">
                    Reduce waste
                  </h3>
                  <p>
                    More accurate quantity calculation prevents errors and
                    reduces both material surpluses and shortages.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center p-[100px] text-center text-[#222] max-[400px]:px-[40px]">
                  <List />
                  <h3 className="mt-[25px] mb-[15px] text-[26px] font-normal normal-case">
                    Keep up-to-date material quantity
                  </h3>
                  <p>
                    Prepare an offer in an instant and maintain up-to-date
                    material quantity lists throughout a project: from the offer
                    to the procurement of supplies and from work management to
                    documentation.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center border-l-[0.8px] border-t-[0.8px] border-dashed border-[#222] p-[100px] text-center text-[#222] max-[400px]:px-[40px]">
                  <Team />
                  <h3 className="mt-[25px] mb-[15px] text-[26px] font-normal normal-case">
                    Develop work methods
                  </h3>
                  <p>
                    Standardize your company’s material quantity calculation
                    methods. Familiarize new people with material quantity
                    calculations.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="Hero relative overflow-hidden">
            <GatsbyImage
              className="!absolute h-full"
              image={page.heroImage.gatsbyImageData}
            />
            <div className="Layer absolute h-full w-full" />
            <div className="pagePadding relative">
              <div
                before="TRY NOW"
                className="container relative flex h-full flex-col border-x-[0.8px] border-dashed border-[#fff] pl-[110px] pr-[20px] pt-[120px] pb-[240px] text-white before:absolute before:top-[40px] before:left-[-52px] before:-rotate-90 before:text-white before:content-[attr(before)] max-[800px]:pl-[20px] max-[600px]:border-none max-[600px]:before:top-[10px] max-[600px]:before:left-[10px] max-[600px]:before:rotate-0"
              >
                <div className="flex items-center max-[600px]:flex-col max-[600px]:items-start">
                  <CircleNumber data="1" />
                  <div className="flex max-w-[500px] flex-col">
                    <h3 className="text-[28px] font-normal normal-case">
                      Activate the trial period
                    </h3>
                    <p className="mb-[15px]">
                      No commitment or credit card needed. The software requires
                      the Windows operating system.
                    </p>
                    <GetStartedForm />
                  </div>
                </div>
                <div className="mt-[50px] flex items-center max-[600px]:flex-col max-[600px]:items-start">
                  <CircleNumber data="2" />
                  <div className="flex max-w-[500px] flex-col">
                    <h3 className="text-[28px] font-normal normal-case">
                      Calculate your first project
                    </h3>
                    <p>
                      Get started easy with help of our step-by-step video
                      tutorials.
                    </p>
                    <Link
                      to={"/en/tutorials/new-to-jcad/"}
                      className="mt-[10px] font-bold uppercase underline underline-offset-2 opacity-70 hover:opacity-100"
                    >
                      Video tutorials
                    </Link>
                  </div>
                </div>
                <div className="mt-[50px] flex items-center max-[600px]:flex-col max-[600px]:items-start">
                  <CircleNumber data="3" />
                  <div className="flex max-w-[500px] flex-col">
                    <h3 className="text-[28px] font-normal normal-case">
                      Talk with our expert
                    </h3>
                    <p>
                      Book a meating with with our expert when you have any kind
                      of questions.
                    </p>
                    <Link
                      to={"/en/get-demo"}
                      className="mt-[10px] font-bold uppercase underline underline-offset-2 opacity-70 hover:opacity-100"
                    >
                      Schedule a meeting
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pagePadding">
            <div
              before="REFERENCES"
              className="container relative flex border-x-[0.8px] border-dashed border-[#222] before:absolute before:top-[50px] before:left-[-66px] before:-rotate-90 before:text-[#222] before:content-[attr(before)] max-[800px]:flex-col max-[800px]:[&>a:nth-child(2)]:border-y-[0.8px] max-[800px]:[&>a:nth-child(2)]:!border-x-0 max-[600px]:border-none max-[600px]:before:top-[10px] max-[600px]:before:left-[10px] max-[600px]:before:rotate-0 [&>a:nth-child(2)]:border-x-[0.8px]"
            >
              {selected.slice(0, 3).map(({ node }) => (
                <Link
                  to={prefix + references.path + "/" + node.slug}
                  className="group flex flex-1 flex-col border-dashed border-[#222] py-[100px] px-[80px] max-[1100px]:px-[40px]"
                >
                  <div className="flex flex-col transition group-hover:scale-105">
                    <span>{node.toimiala}</span>
                    <h2 className="mt-[5px] mb-[15px] text-[20px] font-normal normal-case">
                      {node.otsikko}
                    </h2>
                    <p className="mb-[10px] text-[#464646]">{node.ingressi}</p>
                    <span>{node.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <Booking locale={locale} />
        </main>
      </Layout>
    </>
  );
};

export default Page;

const CircleNumber = (props) => (
  <span className="my-[20px] mr-[50px] flex h-[160px] w-[160px] min-w-[100px] items-center justify-center rounded-full border-[0.8px] border-dashed border-[#fff] text-[36px] max-[950px]:h-[100px] max-[950px]:w-[100px]">
    {props.data}
  </span>
);

const Fast = (props) => (
  <svg
    {...props}
    width="189"
    height="81"
    viewBox="0 0 189 81"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M189 40.5C189 62.8699 170.87 81 148.5 81C126.13 81 108 62.8699 108 40.5C108 32.0678 110.576 24.2367 114.983 17.7504C115.377 17.1809 116.163 17.0227 116.742 17.4182C117.32 17.8137 117.47 18.6047 117.076 19.1742C112.945 25.265 110.531 32.5898 110.531 40.5C110.531 61.4619 127.538 78.4688 148.5 78.4688C169.462 78.4688 186.469 61.4619 186.469 40.5C186.469 19.9494 170.142 3.21943 149.766 2.55182V18.9844C149.766 19.6805 149.196 20.25 148.5 20.25C147.804 20.25 147.234 19.6805 147.234 18.9844V1.26562C147.234 0.566684 147.804 0 148.5 0C170.87 0 189 18.1301 189 40.5ZM149.402 39.5982C149.892 40.1045 149.892 40.8955 149.402 41.4018C148.896 41.8922 148.104 41.8922 147.598 41.4018L132.411 26.2143C131.92 25.708 131.92 24.917 132.411 24.4107C132.917 23.9203 133.708 23.9203 134.214 24.4107L149.402 39.5982Z"
      fill="#222222"
    />
    <line
      x1="17"
      y1="15"
      x2="95"
      y2="15"
      stroke="#222222"
      stroke-width="2"
      stroke-linecap="round"
    />
    <line
      x1="1"
      y1="39"
      x2="79"
      y2="39"
      stroke="#222222"
      stroke-width="2"
      stroke-linecap="round"
    />
    <line
      x1="14"
      y1="64"
      x2="92"
      y2="64"
      stroke="#222222"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

const Crosshair = (props) => (
  <svg
    {...props}
    width="82"
    height="82"
    viewBox="0 0 82 82"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M41 0C63.6461 0 82 18.3539 82 41C82 63.6461 63.6461 82 41 82C18.3539 82 0 63.6461 0 41C0 18.3539 18.3539 0 41 0ZM42.2812 2.58332V19.2188C42.2812 19.9234 41.7047 20.5 41 20.5C40.2953 20.5 39.7188 19.9234 39.7188 19.2188V2.58332C19.507 3.24477 3.24477 19.507 2.58332 39.7188H19.2188C19.9234 39.7188 20.5 40.2953 20.5 41C20.5 41.7047 19.9234 42.2812 19.2188 42.2812H2.58332C3.24477 62.493 19.507 78.7488 39.7188 79.4215V62.7812C39.7188 62.0766 40.2953 61.5 41 61.5C41.7047 61.5 42.2812 62.0766 42.2812 62.7812V79.4215C62.493 78.7488 78.7488 62.493 79.4215 42.2812H62.7812C62.0766 42.2812 61.5 41.7047 61.5 41C61.5 40.2953 62.0766 39.7188 62.7812 39.7188H79.4215C78.7488 19.507 62.493 3.24477 42.2812 2.58332Z"
      fill="#222222"
    />
  </svg>
);

const List = (props) => (
  <svg
    {...props}
    width="82"
    height="82"
    viewBox="0 0 82 82"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5625 11.5312C2.5625 9.40918 4.28418 7.6875 6.40625 7.6875H14.0938C16.2238 7.6875 17.9375 9.40918 17.9375 11.5312V19.2188C17.9375 21.3488 16.2238 23.0625 14.0938 23.0625H6.40625C4.28418 23.0625 2.5625 21.3488 2.5625 19.2188V11.5312ZM5.125 11.5312V19.2188C5.125 19.9234 5.69836 20.5 6.40625 20.5H14.0938C14.8016 20.5 15.375 19.9234 15.375 19.2188V11.5312C15.375 10.8234 14.8016 10.25 14.0938 10.25H6.40625C5.69836 10.25 5.125 10.8234 5.125 11.5312ZM79.4375 14.0938C80.1422 14.0938 80.7188 14.6671 80.7188 15.375C80.7188 16.0797 80.1422 16.6562 79.4375 16.6562H28.1875C27.4828 16.6562 26.9062 16.0797 26.9062 15.375C26.9062 14.6671 27.4828 14.0938 28.1875 14.0938H79.4375ZM79.4375 39.7188C80.1422 39.7188 80.7188 40.2953 80.7188 41C80.7188 41.7047 80.1422 42.2812 79.4375 42.2812H28.1875C27.4828 42.2812 26.9062 41.7047 26.9062 41C26.9062 40.2953 27.4828 39.7188 28.1875 39.7188H79.4375ZM79.4375 65.3438C80.1422 65.3438 80.7188 65.9203 80.7188 66.625C80.7188 67.3297 80.1422 67.9062 79.4375 67.9062H28.1875C27.4828 67.9062 26.9062 67.3297 26.9062 66.625C26.9062 65.9203 27.4828 65.3438 28.1875 65.3438H79.4375ZM14.0938 33.3125C16.2238 33.3125 17.9375 35.0262 17.9375 37.1562V44.8438C17.9375 46.9738 16.2238 48.6875 14.0938 48.6875H6.40625C4.28418 48.6875 2.5625 46.9738 2.5625 44.8438V37.1562C2.5625 35.0262 4.28418 33.3125 6.40625 33.3125H14.0938ZM14.0938 35.875H6.40625C5.69836 35.875 5.125 36.4516 5.125 37.1562V44.8438C5.125 45.5484 5.69836 46.125 6.40625 46.125H14.0938C14.8016 46.125 15.375 45.5484 15.375 44.8438V37.1562C15.375 36.4516 14.8016 35.875 14.0938 35.875ZM2.5625 62.7812C2.5625 60.6512 4.28418 58.9375 6.40625 58.9375H14.0938C16.2238 58.9375 17.9375 60.6512 17.9375 62.7812V70.4688C17.9375 72.5988 16.2238 74.3125 14.0938 74.3125H6.40625C4.28418 74.3125 2.5625 72.5988 2.5625 70.4688V62.7812ZM5.125 62.7812V70.4688C5.125 71.1734 5.69836 71.75 6.40625 71.75H14.0938C14.8016 71.75 15.375 71.1734 15.375 70.4688V62.7812C15.375 62.0766 14.8016 61.5 14.0938 61.5H6.40625C5.69836 61.5 5.125 62.0766 5.125 62.7812Z"
      fill="#222222"
    />
  </svg>
);

const Team = (props) => (
  <svg
    {...props}
    width="89"
    height="71"
    viewBox="0 0 89 71"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25.5875 12.2031C25.5875 16.4881 22.097 19.9688 17.8 19.9688C13.4988 19.9688 10.0125 16.4881 10.0125 12.2031C10.0125 7.914 13.4988 4.4375 17.8 4.4375C22.097 4.4375 25.5875 7.914 25.5875 12.2031ZM17.8 6.65625C14.7267 6.65625 12.2375 9.13986 12.2375 12.2031C12.2375 15.2678 14.7267 17.75 17.8 17.75C20.8733 17.75 23.3625 15.2678 23.3625 12.2031C23.3625 9.13986 20.8733 6.65625 17.8 6.65625ZM78.9875 12.2031C78.9875 16.4881 75.497 19.9688 71.2 19.9688C66.903 19.9688 63.4125 16.4881 63.4125 12.2031C63.4125 7.914 66.903 4.4375 71.2 4.4375C75.497 4.4375 78.9875 7.914 78.9875 12.2031ZM71.2 6.65625C68.1267 6.65625 65.6375 9.13986 65.6375 12.2031C65.6375 15.2678 68.1267 17.75 71.2 17.75C74.2733 17.75 76.7625 15.2678 76.7625 12.2031C76.7625 9.13986 74.2733 6.65625 71.2 6.65625ZM8.9 35.5C9.51466 35.5 10.0125 35.9992 10.0125 36.6094V59.9062C10.0125 61.1266 11.0082 62.125 12.2375 62.125H23.3625C24.5862 62.125 25.5875 61.1266 25.5875 59.9062V53.1945C26.2411 54.193 26.992 55.1082 27.8125 55.968V59.9062C27.8125 62.3607 25.8239 64.3438 23.3625 64.3438H12.2375C9.78027 64.3438 7.7875 62.3607 7.7875 59.9062V52.8479C3.14281 50.2547 0 45.2902 0 39.5908C0 31.2012 6.81962 24.4062 15.2273 24.4062H20.3727C23.6128 24.4062 26.6166 25.4186 29.078 27.1381C28.5078 27.6373 27.9655 28.1643 27.4648 28.7189C25.4206 27.4016 22.987 26.625 20.3727 26.625H15.2273C8.04894 26.625 2.225 32.4354 2.225 39.5908C2.225 44.0006 4.42358 47.8834 7.7875 50.2408V36.6094C7.7875 35.9992 8.28534 35.5 8.9 35.5ZM61.1875 59.9062V55.968C62.008 55.1082 62.7589 54.193 63.4125 53.1945V59.9062C63.4125 61.1266 64.4137 62.125 65.6375 62.125H76.7625C77.9862 62.125 78.9875 61.1266 78.9875 59.9062V36.4846C78.9875 35.9992 79.4881 35.3752 80.1 35.3752C80.7119 35.3752 81.2125 35.9992 81.2125 36.4846V50.227C84.5778 47.8834 86.775 44.0006 86.775 39.5908C86.775 32.4354 80.9483 26.5002 73.7727 26.5002H68.6273C66.013 26.5002 63.5794 27.4016 61.5352 28.7189C61.0345 28.1643 60.367 27.6373 59.922 27.1381C62.3834 25.4186 65.3872 24.2814 68.6273 24.2814H73.7727C82.0608 24.2814 89 31.2012 89 39.5908C89 45.2902 85.8572 50.2547 81.2125 52.8479V59.9062C81.2125 62.3607 79.2239 64.3438 76.7625 64.3438H65.6375C63.1761 64.3438 61.1875 62.3607 61.1875 59.9062ZM53.4 13.3125C53.4 18.2076 49.4089 22.1875 44.5 22.1875C39.5911 22.1875 35.6 18.2076 35.6 13.3125C35.6 8.41045 39.5911 4.4375 44.5 4.4375C49.4089 4.4375 53.4 8.41045 53.4 13.3125ZM44.5 6.65625C40.8148 6.65625 37.825 9.63631 37.825 13.3125C37.825 16.9873 40.8148 19.9688 44.5 19.9688C48.1852 19.9688 51.175 16.9873 51.175 13.3125C51.175 9.63631 48.1852 6.65625 44.5 6.65625ZM26.7 41.8096C26.7 33.4199 33.5141 26.625 41.9273 26.625H47.0727C55.3608 26.625 62.3 33.4199 62.3 41.8096C62.3 47.509 59.1572 52.4734 54.5125 55.0666V62.125C54.5125 64.5795 52.5239 66.5625 50.0625 66.5625H38.9375C36.4761 66.5625 34.4875 64.5795 34.4875 62.125V55.0666C29.8428 52.4734 26.7 47.509 26.7 41.8096ZM35.6 37.7188C36.2119 37.7188 36.7125 38.218 36.7125 38.8281V62.125C36.7125 63.3453 37.7137 64.3438 38.9375 64.3438H50.0625C51.2862 64.3438 52.2875 63.3453 52.2875 62.125V38.8281C52.2875 38.218 52.7881 37.7188 53.4 37.7188C54.0119 37.7188 54.5125 38.218 54.5125 38.8281V52.4457C57.8778 50.1022 60.075 46.2193 60.075 41.8096C60.075 34.6541 54.2483 28.8438 47.0727 28.8438H41.9273C34.7517 28.8438 28.7998 34.6541 28.7998 41.8096C28.7998 46.2193 31.1222 50.1022 34.3623 52.4457V38.8281C34.3623 38.218 34.9881 37.7188 35.4748 37.7188H35.6Z"
      fill="black"
    />
  </svg>
);

const Caret = (props) => (
  <svg
    {...props}
    width="7"
    height="12"
    viewBox="0 0 7 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.09445 5.47012C6.36789 5.76309 6.36789 6.23887 6.09445 6.53184L2.59445 10.2818C2.32102 10.5748 1.87695 10.5748 1.60352 10.2818C1.33008 9.98887 1.33008 9.51308 1.60352 9.22012L4.60914 5.9998L1.6057 2.77949C1.33227 2.48652 1.33227 2.01074 1.6057 1.71777C1.87914 1.4248 2.3232 1.4248 2.59664 1.71777L6.09664 5.46777L6.09445 5.47012Z"
      fill="white"
    />
  </svg>
);
