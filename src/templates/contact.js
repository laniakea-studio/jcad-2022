import { HelmetDatoCms } from "gatsby-source-datocms";
import React, { useContext } from "react";
import { Layout } from "../components/Layout";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import { GatsbyImage } from "gatsby-plugin-image";

const Contact = ({ pageContext }) => {
  const { locale } = useContext(LocaleContext);

  const { data } = pageContext;
  console.log(data);

  const tilaukset = data.yhteystiedot.ihmiset.filter(
    (i) => i.ryhma === "Tilaukset"
  );
  const asiakkuudet = data.yhteystiedot.ihmiset.filter(
    (i) => i.ryhma === "Asiakkuudet"
  );
  const tiimi = data.yhteystiedot.ihmiset.filter((i) => i.ryhma === "Tiimi");

  const { toimipisteet } = data.yhteystiedot;
  const { laskutus } = data.yhteystiedot;
  const { asiakaspalvelu } = data.yhteystiedot;
  return (
    <>
      <HelmetDatoCms seo={data.yhteystiedot.seoMetaTags} />
      <Layout locale={pageContext.locale}>
        <section className="pagePadding flex bg-primary w-full text-white pt-[94px]">
          <div className="container px-[100px] max-[1100px]:px-[40px] max-[600px]:px-[20px] flex flex-col mx-auto pt-[60px] pb-[100px] w-full">
            <h1 className="text-[32px] text-white normal-case mb-[70px] font-normal">
              {snippet[locale].contactPage.title}
            </h1>
            <div className="grid grid-cols-4 gap-[50px] max-[900px]:grid-cols-2 max-[420px]:grid-cols-1">
              <div className="flex flex-col">
                <h3 className="uppercase text-[16px]">
                  {asiakaspalvelu[0].nimi}
                </h3>
                <a href={`tel:${asiakaspalvelu[0].puhelin}`}>
                  {asiakaspalvelu[0].puhelin}
                </a>
                <a href={`mail:${asiakaspalvelu[0].email}`}>
                  {asiakaspalvelu[0].email}
                </a>
              </div>
              <div className="flex flex-col">
                <h3 className="uppercase text-[16px]">
                  {toimipisteet[0].nimi}
                </h3>
                <div
                  dangerouslySetInnerHTML={{ __html: toimipisteet[0].osoite }}
                />
              </div>
              <div className="flex flex-col">
                <h3 className="uppercase text-[16px]">
                  {toimipisteet[1].nimi}
                </h3>
                <div
                  dangerouslySetInnerHTML={{ __html: toimipisteet[1].osoite }}
                />
              </div>
              <div className="flex flex-col">
                <h3 className="uppercase text-[16px]">{laskutus[0].nimi}</h3>
                <div dangerouslySetInnerHTML={{ __html: laskutus[0].osoite }} />
              </div>
            </div>
          </div>
        </section>
        <main className="pagePadding flex flex-col w-full mx-auto">
          <div className="container px-[100px] max-[1100px]:px-[40px] max-[600px]:px-[20px] border-black grid grid-cols-2 max-[1100px]:grid-cols-1 gap-[50px] pt-[100px] pb-[100px]">
            {tilaukset.length > 0 && (
              <div className="flex flex-[1] flex-col">
                <h2 className="normal-case text-[32px] font-normal mb-[40px]">
                  {snippet[locale].contactPage.sales}
                </h2>
                <div className="grid grid-cols-2 max-[600px]:grid-cols-1 gap-[50px]">
                  {tilaukset.map((i) => (
                    <Person data={i} />
                  ))}
                </div>
              </div>
            )}
            {asiakkuudet.length > 0 && (
              <div className="flex flex-[1] flex-col">
                <h2 className="normal-case text-[32px] font-normal mb-[40px]">
                  {snippet[locale].contactPage.accounts}
                </h2>
                <div className="grid grid-cols-2 max-[600px]:grid-cols-1 gap-[50px]">
                  {asiakkuudet.map((i) => (
                    <Person data={i} />
                  ))}
                </div>
              </div>
            )}
          </div>
          {tiimi.length > 0 && (
            <div className="container px-[100px] max-[1100px]:px-[40px] max-[600px]:px-[20px] border-black pb-[100px]">
              <div className="flex flex-[1] flex-col">
                <h2 className="normal-case text-[32px] font-normal mb-[40px]">
                  {snippet[locale].contactPage.team}
                </h2>
                <div className="grid grid-cols-4 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1 gap-[50px]">
                  {tiimi.map((i) => (
                    <Person data={i} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </Layout>
    </>
  );
};

export default Contact;

const Person = ({ data }) => {
  if (!data.kuva) return <></>;

  return (
    <div className="flex flex-[1] flex-col">
      {data.kuva && (
        <GatsbyImage className="" image={data.kuva.gatsbyImageData} />
      )}
      <p className="mt-[15px]">{data.nimi}</p>
      <p>{data.titteli}</p>
      <a href={`tel:${data.puhelin}`}>{data.puhelin}</a>
      <a href={`mail:${data.email}`}>{data.email}</a>
    </div>
  );
};
