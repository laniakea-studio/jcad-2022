const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const locales = ["fi", "en", "sv"];

  const slugs = {
    fi: {
      product: "maaralaskentaohjelmisto",
      pricing: "hinta",
      contact: "yhteystiedot",
      gdpr: "tietosuojaseloste",
      about: "meista",
      webinars: "webinaarit",
      jobs: "rekry",
      order: "tilaa",
    },
    en: {
      product: "product",
      pricing: "pricing",
      contact: "contact",
      gdpr: "gdpr",
      about: "about",
      webinars: "webinars",
      jobs: "jobs",
      order: "order",
    },
    sv: {
      product: "produkten",
      pricing: "pris",
      contact: "kontakter",
      gdpr: "gdpr",
      about: "om-oss",
      webinars: "webinarer",
      jobs: "jobb",
      order: "bestall",
    },
  };

  await Promise.all(
    locales.map(async (locale) => {
      const query = await graphql(`
    {
      about: datoCmsAbout(locale: { eq: "${locale}" }) {
        seoMetaTags {
          tags 
        }
        kuva {
          gatsbyImageData(
            width: 1600
            placeholder: BLURRED
            forceBlurhash: false
          )
        }
        otsikko1
        otsikko2
        otsikko3
        slide1
        slide2
        slide3
        partners {
          url
          alt
        }
      }
      home: datoCmsHome(locale: { eq: "${locale}" })  {
        seoMetaTags {
          tags 
        }
        title
        intro
        cta {
          text
          slug
        } 
      }
      product: datoCmsTuotesivu(locale: { eq: "${locale}" }) {
        seoMetaTags {
          tags 
        }
        title
        lead
        customers {
          url
          alt
        }
        activeUser
        customerHappiness
        tooltip
        section1Content
        points {
          content
        }
      }
      pricing: datoCmsPricing(locale: { eq: "${locale}" }) {
        seoMetaTags {
          tags 
        }
        lead
        tuotteet {
          icon {
            url
            alt
          }
          title
          teksti1
          price
          startprice
        }
        valikkoOhjelmisto {
          label
          value
        }
      }
      webinaarit: datoCmsWebinarsPage(locale: { eq: "${locale}" }) {
        seoMetaTags {
          tags 
        }
        palautteita {
          content
        }
        arvosanat
        kuvaajanTeksti
      }
      jobs: datoCmsRekry(locale: { eq: "${locale}" }) {
        seoMetaTags {
          tags 
        }
        title
        intro
        positio {
          content
        }
        liikevaihto
        employees
        askMore
      }
      allReferences: allDatoCmsReferenssi(filter: { locale: { eq: "${locale}" } }) {
        edges {
          node {
            slug
            yritys
            sitaatti
            quote
            nimi
          }
        }
      }
      allWebinars: allDatoCmsWebinar(
        filter: { locale: { eq: "${locale}" } }
        sort: {order: ASC, fields: webinaarinAjankohta}
        ) {
        edges {
          node {
            seoMetaTags {
              tags 
            }
            title
            slug
            webinaarinAjankohta
            kestoMinuuttia
            nosto
            kuvaus
            puhuja
          }
        }
      }
      order: datoCmsOrder(locale: { eq: "${locale}" })  {
        seoMetaTags {
          tags 
        }
        content
      }
      booking: datoCmsTilaaDemo(locale: { eq: "${locale}" }) {
        title
        content
        calendlyBookingUrl
        buttonText
      }
      yhteystiedot: datoCmsYhteystiedot(locale: { eq: "${locale}" }) {
        seoMetaTags {
          tags           
        }     
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
      gdpr: datoCmsTietosuoja(locale: { eq: "${locale}" }) {        
        tietosuojaseloste
      }
    }
  `);

      const { data } = query;

      const prefix = locale === "fi" ? "" : locale === "en" ? "en/" : "sv/";

      createPage({
        path: `/${prefix}`,
        component: path.resolve(`src/templates/home.js`),
        context: {
          locale: locale,
          localeSlugs: {
            fi: "/",
            en: "/en",
            sv: "/sv",
          },
          data: {
            page: data.home,
          },
        },
      });

      createPage({
        path: `/${prefix + slugs[locale].product}`,
        component: path.resolve(`src/templates/product.js`),
        context: {
          locale: locale,
          localeSlugs: {
            fi: `/${slugs.fi.product}`,
            en: `/en/${slugs.en.product}`,
            sv: `/sv/${slugs.sv.product}`,
          },
          data: {
            product: data.product,
            booking: data.booking,
            references: data.allReferences.edges,
          },
        },
      });

      createPage({
        path: `/${prefix + slugs[locale].pricing}`,
        component: path.resolve(`src/templates/pricing.js`),
        context: {
          locale: locale,
          localeSlugs: {
            fi: `/${slugs.fi.pricing}`,
            en: `/en/${slugs.en.pricing}`,
            sv: `/sv/${slugs.sv.pricing}`,
          },
          data: { page: data.pricing, booking: data.booking },
        },
      });

      createPage({
        path: `/${prefix + slugs[locale].contact}`,
        component: path.resolve(`src/templates/contact.js`),
        context: {
          locale: locale,
          localeSlugs: {
            fi: `/${slugs.fi.contact}`,
            en: `/en/${slugs.en.contact}`,
            sv: `/sv/${slugs.sv.contact}`,
          },
          data: { yhteystiedot: data.yhteystiedot },
        },
      });

      createPage({
        path: `/${prefix + slugs[locale].gdpr}`,
        component: path.resolve(`src/templates/gdpr.js`),
        context: {
          locale: locale,
          localeSlugs: {
            fi: `/${slugs.fi.gdpr}`,
            en: `/en/${slugs.en.gdpr}`,
            sv: `/sv/${slugs.sv.gdpr}`,
          },
          data: data.gdpr,
        },
      });

      createPage({
        path: `/${prefix + slugs[locale].about}`,
        component: path.resolve(`src/templates/about.js`),
        context: {
          locale: locale,
          localeSlugs: {
            fi: `/${slugs.fi.about}`,
            en: `/en/${slugs.en.about}`,
            sv: `/sv/${slugs.sv.about}`,
          },
          data: {
            home: data.about,
            referenssit: data.allReferences,
          },
        },
      });

      // Only Finnish pages
      if (locale === "fi") {
        createPage({
          path: `/${prefix + slugs[locale].webinars}`,
          component: path.resolve(`src/templates/webinars.js`),
          context: {
            locale: locale,
            localeSlugs: {
              fi: `/${slugs.fi.webinars}`,
              en: null,
              sv: null,
            },
            data: {
              page: data.webinaarit,
              allWebinars: data.allWebinars.edges,
            },
          },
        });

        data.allWebinars.edges.map((i) => {
          createPage({
            path: `/${prefix + slugs[locale].webinars}/${i.node.slug}`,
            component: path.resolve(`src/templates/Webinar.js`),
            context: {
              locale: locale,
              data: {
                page: i.node,
              },
              localeSlugs: {
                fi: `/${prefix + slugs.fi.webinars}`,
                en: null,
                sv: null,
              },
            },
          });
        });

        createPage({
          path: `/${prefix + slugs[locale].jobs}`,
          component: path.resolve(`src/templates/jobs.js`),
          context: {
            locale: locale,
            localeSlugs: {
              fi: `/${slugs.fi.jobs}`,
              en: null,
              sv: null,
            },
            data: {
              page: data.jobs,
            },
          },
        });

        createPage({
          path: `/${prefix + slugs[locale].order}`,
          component: path.resolve(`src/templates/order.js`),
          context: {
            locale: locale,
            localeSlugs: {
              fi: `/${slugs.fi.order}`,
              en: null,
              sv: null,
            },
            data: {
              page: data.order,
              pricing: data.pricing,
            },
          },
        });
      }
    })
  );
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@locales": path.resolve(__dirname, "src/locales"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@contexts": path.resolve(__dirname, "src/contexts"),
        "@constants": path.resolve(__dirname, "src/constants"),
      },
    },
  });
};
