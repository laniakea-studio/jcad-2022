const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const locales = ["fi", "en", "sv"];

  const pageSlugsFi = {
    product: "maaralaskentaohjelmisto",
    pricing: "hinta",
    contact: "yhteystiedot",
    booking: "varaa-demo",
  };
  const pageSlugsEn = {
    product: "product",
    pricing: "pricing",
    contact: "contact",
    booking: "book-demo",
  };
  const pageSlugsSv = {
    product: "produkten",
    pricing: "pris",
    contact: "kontakter",
    booking: "boka-demo",
  };

  locales.forEach(async (locale) => {
    const query = await graphql(`
    {
      product: datoCmsTuotesivu(locale: { eq: "${locale}" }) {
        title
        lead
        customers {
          url
          alt
        }
        activeUser
        customerHappiness
        section1Content
        points {
          content
        }
      }
      pricing: datoCmsPricing(locale: { eq: "${locale}" }) {       
        lead
        tuotteet {
          icon {
            url
            alt
          }
          title
          teksti1
          teksti2
          price
          startprice
        }
      }
      allReferences: allDatoCmsReferenssi(filter: { locale: { eq: "${locale}" } }) {
        edges {
          node {
            slug
            yritys
            quote
            nimi
          }
        }
      }
      yhteystiedot: datoCmsYhteystiedot(locale: { eq: "${locale}" }) {
        calendly_booking_url
        myyntiJaTilaukset {
          nimi
          titteli
          puhelin
          email
        }
        henkilosto {
          nimi
          titteli
          puhelin
          email
        }
        asiakaspalvelu {
          nimi
          titteli
          puhelin
          email
        }
        asiakkuudet {
          nimi
          titteli
          puhelin
          email
        }
        toimipisteet {
          nimi
          osoite
        }
        laskutus {
          nimi
          osoite
        }
        ytunnus
      }
    }
  `);

    const { data } = query;

    // Page Templates
    const home = path.resolve(`src/templates/home.js`);
    const product = path.resolve(`src/templates/product.js`);
    const pricing = path.resolve(`src/templates/pricing.js`);
    const booking = path.resolve(`src/templates/booking.js`);
    const article = path.resolve(`src/templates/Article.js`);
    const contact = path.resolve(`src/templates/contact.js`);

    const prefix = locale === "fi" ? "" : locale === "en" ? "en/" : "sv/";
    const pageSlugs =
      locale === "fi"
        ? pageSlugsFi
        : locale === "en"
        ? pageSlugsEn
        : pageSlugsSv;

    createPage({
      path: `/${prefix}`,
      component: home,
      context: {
        locale: locale,
        localeSlugs: {
          fi: "/",
          en: "/en",
          sv: "/sv",
        },
        data: { product: data.product, references: data.allReferences.edges },
      },
    });

    createPage({
      path: `/${prefix + pageSlugs.product}`,
      component: product,
      context: {
        locale: locale,
        localeSlugs: {
          fi: `/${pageSlugsFi.product}`,
          en: `/en/${pageSlugsEn.product}`,
          sv: `/sv/${pageSlugsSv.product}`,
        },
        data: { product: data.product, references: data.allReferences.edges },
      },
    });

    data.allReferences.edges.map((i) => {
      createPage({
        path: `/${prefix}reference/${i.node.slug}`,
        component: article,
        context: {
          locale: locale,
          data: i.node,
        },
      });
    });

    createPage({
      path: `/${prefix + pageSlugs.pricing}`,
      component: pricing,
      context: {
        locale: locale,
        localeSlugs: {
          fi: `/${pageSlugsFi.pricing}`,
          en: `/en/${pageSlugsEn.pricing}`,
          sv: `/sv/${pageSlugsSv.pricing}`,
        },
        data: { pricing: data.pricing },
      },
    });

    createPage({
      path: `/${prefix + pageSlugs.contact}`,
      component: contact,
      context: {
        locale: locale,
        localeSlugs: {
          fi: `/${pageSlugsFi.contact}`,
          en: `/en/${pageSlugsEn.contact}`,
          sv: `/sv/${pageSlugsSv.contact}`,
        },
        data: { yhteystiedot: data.yhteystiedot },
      },
    });

    createPage({
      path: `/${prefix + pageSlugs.booking}`,
      component: booking,
      context: {
        locale: locale,
        localeSlugs: {
          fi: `/${pageSlugsFi.booking}`,
          en: `/en/${pageSlugsEn.booking}`,
          sv: `/sv/${pageSlugsSv.booking}`,
        },
        data: "",
      },
    });
  });
};
