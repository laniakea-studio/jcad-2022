const path = require(`path`);
const csv2json = require("csvtojson");
const fetch = require("node-fetch");

const isDebug = false; //process.env.NODE_ENV !== "production";

const createPublishedGoogleSpreadsheetNode = async (
  {
    actions: { createNode, createNodeField },
    createNodeId,
    createContentDigest,
  },
  publishedURL,
  type,
  { skipFirstLine = true, alwaysEnabled = false, subtype = null }
) => {
  // All table has first row reserved
  const result = await fetch(
    `${publishedURL}&single=true&output=csv&headers=1${
      skipFirstLine ? "&range=A2:ZZ" : ""
    }`
  );
  const data = await result.text();
  const records = await csv2json().fromString(data);

  records.forEach((p, i) => {
    // create node for build time data example in the docs
    const meta = {
      // required fields
      id: createNodeId(`${type.toLowerCase()}-${i}`),
      parent: null,
      children: [],
      internal: {
        type,
        contentDigest: createContentDigest(p),
      },
    };
    const node = { ...p, subtype, ...meta };
    createNode(node);
  });
};

exports.sourceNodes = async (props) => {
  await Promise.all([
    createPublishedGoogleSpreadsheetNode(
      props,
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRCII9xH2qdCuC7XYtbyDK_ALkIkorYyANK3HTD2D_T4hNSyLm9kUnVuY5bstHB7SewL-xWYBblW_cr/pub?gid=0",
      "ReferenssitGoogleSheets",
      { skipFirstLine: false, alwaysEnabled: true }
    ),
  ]);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const locales = ["fi", "en" /*"sv"*/];

  const prefixes = {
    fi: "",
    en: "en/",
    sv: "sv/",
  };

  const thanks = {
    fi: "/kiitos",
    en: "/thanks",
    sv: "/tack",
  };

  await Promise.all(
    locales.map(async (locale) => {
      const query = await graphql(`
    {      
      home: datoCmsHome(locale: { eq: "${locale}" })  {
        title
        seoMetaTags {
          tags
        }        
        intro
        cta {
          text
          slug
        }
        isoValikko {
          title
          slug
          animaatio
        }
        videoHeader
        video {
          file {
            video {
              streamingUrl
              mp4Url
            }
          }
          poster {
            url
          }
          markers {
            text
            positionSec
          }
        }
        videoCta {
          text
          slug
        }
      }
      product: datoCmsTuotesivu(locale: { eq: "${locale}" }) {
        title
        slug
        _allSlugLocales {
          locale
          value
        }
        seoMetaTags {
          tags 
        }        
        lead
        video {
          video {
          streamingUrl
          mp4Url
          }
        }
        videoMarkers {
          positionSec
          text
        }
        videoteksti
        videoPoster {
          url
        }
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
        title
        slug
        _allSlugLocales {
          locale
          value
        }
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
      jobs: datoCmsRekry(locale: { eq: "${locale}" }) {
        _allSlugLocales {
          locale
          value
        }
        seoMetaTags {
          tags 
        }
        title
        slug
        otsikko
        intro
        positio {
          content
        }
        liikevaihto
        employees
        askMore
      }
      referenssit: datoCmsReferenssit(locale: { eq: "${locale}" }) {
        _allSlugLocales {
          locale
          value
        }
        title
        slug
        seoMetaTags {
          tags 
        }                
        kuvaus
      }
      allReferences: allDatoCmsReferenssi(filter: { locale: { eq: "${locale}" } }) {
        edges {
          node {
            _allSlugLocales {
              locale
              value
            }
            seoMetaTags {
              tags 
            }  
            title
            slug
            title
            artikkeli
            otsikko
            toimiala
            alue            
            ingressi          
            sisalto  
            video {
              video {
              streamingUrl
              mp4Url
              }
            }
            kuva {
              url
              alt
              gatsbyImageData(
                width: 1600
                placeholder: BLURRED
                forceBlurhash: false
              )
            }
            naytaSitaattiTuotesivulla            
            quote
            nimi
          }
        }
      }
      webinaarit: datoCmsWebinarsPage(locale: { eq: "${locale}" }) {
        _allSlugLocales {
          locale
          value
        }
        title
        slug
        seoMetaTags {
          tags 
        }
        palautteita {
          content
        }
        arvosanat
        kuvaajanTeksti        
        kiitosTitle
        kiitosContent
        kiitosCta {
          text
          slug
        }
      }
      allWebinars: allDatoCmsWebinar(
        filter: { locale: { eq: "${locale}" } }
        sort: {order: ASC, fields: webinaarinAjankohta}
        ) {
        edges {
          node {
            _allSlugLocales {
              locale
              value
            }
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
            isRestream
            restreamCode
          }
        }
      }
      order: datoCmsOrder(locale: { eq: "${locale}" })  {
        _allSlugLocales {
          locale
          value
        }
        seoMetaTags {
          tags 
        }
        title
        slug
        content
        kiitosTitle
        kiitosContent        
        kiitosCta {
          text
          slug
        }
      }
      booking: datoCmsTilaaDemo(locale: { eq: "${locale}" }) {
        _allSlugLocales {
          locale
          value
        }
        title
        slug
        seoMetaTags {
          tags 
        }        
        calendlyBookingUrl
        pageContent
        video {
          video {
          streamingUrl
          mp4Url
          }
        }
        videoPoster {
          url
        }
        kiitosTitle
        kiitosContent        
        kiitosCta {
          text
          slug
        }
        pfTitle
        pfContent
        pfCta {
          text
          slug
        }
      }
      about: datoCmsAbout(locale: { eq: "${locale}" }) {
        _allSlugLocales {
          locale
          value
        }
        seoMetaTags {
          tags 
        }
        slug
        title
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
      contact: datoCmsYhteystiedot(locale: { eq: "${locale}" }) {
        title
        slug
        _allSlugLocales {
          locale
          value
        }
        seoMetaTags {
          tags           
        }     
        ihmiset {
          ryhma
          nimi
          titteli
          puhelin
          email
          kuva {
            url
            alt
            gatsbyImageData(
              width: 800
              placeholder: BLURRED
              forceBlurhash: false
            )
          }
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
        title      
        slug
        _allSlugLocales {
          locale
          value
        }
        seoMetaTags {
          tags           
        }  
        tietosuojaseloste
      }
      allCampaigns: allDatoCmsCampaign(
        filter: { locale: { eq: "${locale}" } }
        ) {
        edges {
          node {
            _allSlugLocales {
              locale
              value
            } 
            seoMetaTags {
              tags           
            }   
            title
            slug
            supTitle
            videoText
            video {
              video {
              streamingUrl
              mp4Url
              }
            }
            videoPoster {
              url
            }
            asiakkaidenKommentteja {
              content
            }
            aloitaKokeilujakso
            lomakkeenNimi
            plausibleGoal
          }
        }
      }
      allTutorials: allDatoCmsTutoriaali(
        filter: { locale: { eq: "${locale}" } }
        sort: { order: ASC, fields: position }
        ) {
        edges {
          node {       
            seoMetaTags {
              tags           
            }
            _allSlugLocales {
              locale
              value
            }
            kategoria
            title
            kuvaus
            slug
            videot {
              otsikko
              linkId
              kuvaus
              videot {
                title
                alt
                video {
                streamingUrl
                mp4Url
                thumbnailUrl
                }
              }              
            }            
          }
        }
      }
      tutorials: datoCmsTutoriaalit(locale: { eq: "${locale}" }) {
        title   
        slug
        _allSlugLocales {
          locale
          value
        }
        seoMetaTags {
          tags           
        } 
        content
      }
      allReferenssitGoogleSheets {
        edges {
          node {
            Alue
            Kunta
            Liikevaihto
            Toimiala
            Yritys
          }
        }
      }
    }
  `);

      const { data } = query;

      const prefix = prefixes[locale];

      const localeSlugs = (allLocales, allPaths) => {
        let parsedPath = {
          fi: "",
          en: "",
          sv: "",
        };

        if (allPaths) {
          parsedPath = Object.assign(
            {},
            ...allPaths.map(({ locale, value }) => ({
              [locale]: value + "/",
            }))
          );
        }

        let parsed = Object.assign(
          {},
          ...allLocales.map(({ locale, value }) => ({
            [locale]: "/" + prefixes[locale] + parsedPath[locale] + value,
          }))
        );

        // Filter out Swedish localization
        const parsedWithoutSv = Object.keys(parsed)
          .filter((key) => key !== "sv")
          .reduce((obj, key) => {
            obj[key] = parsed[key];
            return obj;
          }, {});

        return parsedWithoutSv;
      };

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

      if (data.product.slug) {
        createPage({
          path: `/${prefix + data.product.slug}`,
          component: path.resolve(`src/templates/product.js`),
          context: {
            locale,
            localeSlugs: localeSlugs(data.product._allSlugLocales),
            data: {
              product: data.product,
              booking: data.booking,
              references: data.allReferences.edges,
            },
          },
        });
      }

      if (data.pricing.slug) {
        createPage({
          path: `/${prefix + data.pricing.slug}`,
          component: path.resolve(`src/templates/pricing.js`),
          context: {
            locale: locale,
            localeSlugs: localeSlugs(data.pricing._allSlugLocales),
            data: { page: data.pricing, booking: data.booking },
          },
        });
      }

      if (data.about.slug) {
        createPage({
          path: `/${prefix + data.about.slug}`,
          component: path.resolve(`src/templates/about.js`),
          context: {
            locale: locale,
            localeSlugs: localeSlugs(data.about._allSlugLocales),
            data: {
              home: data.about,
              referenssit: data.allReferences,
            },
          },
        });
      }

      if (data.jobs.slug) {
        createPage({
          path: `/${prefix + data.jobs.slug}`,
          component: path.resolve(`src/templates/jobs.js`),
          context: {
            locale,
            localeSlugs: localeSlugs(data.jobs._allSlugLocales),
            data: {
              page: data.jobs,
            },
          },
        });
      }

      if (data.contact.slug) {
        createPage({
          path: `/${prefix + data.contact.slug}`,
          component: path.resolve(`src/templates/contact.js`),
          context: {
            locale: locale,
            localeSlugs: localeSlugs(data.contact._allSlugLocales),
            data: { page: data.contact },
          },
        });
      }

      if (data.gdpr.slug) {
        createPage({
          path: `/${prefix + data.gdpr.slug}`,
          component: path.resolve(`src/templates/gdpr.js`),
          context: {
            locale,
            localeSlugs: localeSlugs(data.gdpr._allSlugLocales),
            data: data.gdpr,
          },
        });
      }

      // References

      if (data.referenssit.slug) {
        createPage({
          path: `/${prefix + data.referenssit.slug}`,
          component: path.resolve(`src/templates/referenssit.js`),
          context: {
            locale: locale,
            localeSlugs: localeSlugs(data.referenssit._allSlugLocales),
            data: {
              page: data.referenssit,
              googleSheets: data.allReferenssitGoogleSheets.edges,
              allReferences: data.allReferences.edges.filter(
                (i) => i.node.artikkeli
              ),
            },
          },
        });
      }

      const references = data.allReferences.edges.filter(
        (i) => i.node.artikkeli
      );

      if (references.length > 0) {
        references.map((i) => {
          createPage({
            path: `/${prefix + data.referenssit.slug}/${i.node.slug}`,
            component: path.resolve(`src/templates/Referenssi.js`),
            context: {
              locale: locale,
              localeSlugs: localeSlugs(
                i.node._allSlugLocales,
                data.referenssit._allSlugLocales
              ),
              data: {
                page: i.node,
                allReferences: data.allReferences.edges.filter(
                  (i) => i.node.artikkeli
                ),
              },
            },
          });
        });
      }

      // Tutorials

      if (data.tutorials.slug) {
        createPage({
          path: `/${prefix + data.tutorials.slug}`,
          component: path.resolve(`src/templates/tutoriaalit.js`),
          context: {
            locale: locale,
            localeSlugs: localeSlugs(data.tutorials._allSlugLocales),
            data: {
              page: data.tutorials,
            },
          },
        });
      }

      if (data.allTutorials.edges.length > 0) {
        data.allTutorials.edges
          .filter((i) => i.node.slug)
          .map((i) => {
            createPage({
              path: `/${prefix + data.tutorials.slug}/${i.node.slug}`,
              component: path.resolve(`src/templates/Tutorial.js`),
              context: {
                locale: locale,
                localeSlugs: localeSlugs(
                  i.node._allSlugLocales,
                  data.tutorials._allSlugLocales
                ),
                data: {
                  page: i.node,
                },
              },
            });
          });
      }

      // Webinars

      if (data.webinaarit.slug) {
        createPage({
          path: `/${prefix + data.webinaarit.slug}`,
          component: path.resolve(`src/templates/webinars.js`),
          context: {
            locale,
            localeSlugs: localeSlugs(data.webinaarit._allSlugLocales),
            data: {
              page: data.webinaarit,
              allWebinars: data.allWebinars.edges,
            },
          },
        });
        createPage({
          path: `/${prefix + data.webinaarit.slug + thanks[locale]}`,
          component: path.resolve(`src/templates/Thanks.js`),
          context: {
            locale: locale,
            localeSlugs: {
              fi: null,
              en: null,
              sv: null,
            },
            data: {
              page: {
                title: data.webinaarit.kiitosTitle,
                content: data.webinaarit.kiitosContent,
                cta: data.webinaarit.kiitosCta[0],
              },
            },
          },
        });
      }

      if (data.allWebinars.edges.length > 0) {
        data.allWebinars.edges
          .filter((i) => i.node.slug)
          .map((i) => {
            createPage({
              path: `/${prefix + data.webinaarit.slug}/${
                i.node.slug
              }-${i.node.webinaarinAjankohta.slice(0, 10)}`,
              component: path.resolve(`src/templates/Webinar.js`),
              context: {
                locale,
                localeSlugs: {
                  fi: null,
                  en: null,
                  sv: null,
                },
                data: {
                  page: i.node,
                  redirectTo: `/${
                    prefix + data.webinaarit.slug + thanks[locale]
                  }`,
                },
              },
            });

            if (i.node.isRestream) {
              createPage({
                path: `/live/${i.node.slug}-${i.node.webinaarinAjankohta.slice(
                  0,
                  10
                )}`,
                component: path.resolve(`src/templates/RestreamLive.js`),
                context: {
                  locale: locale,
                  data: {
                    page: i.node,
                  },
                  localeSlugs: {
                    fi: null,
                    en: null,
                    sv: null,
                  },
                },
              });
            }
          });
      }

      // Campaigns

      if (data.allCampaigns.edges.length > 0) {
        data.allCampaigns.edges
          .filter((i) => i.node.slug)
          .map((i) => {
            createPage({
              path: `/${i.node.slug}`,
              component: path.resolve(`src/templates/Campaign.js`),
              context: {
                locale: locale,
                localeSlugs: {
                  fi: `/${i.node.slug}`,
                  en: null,
                  sv: null,
                },
                data: {
                  page: i.node,
                },
              },
            });
          });
      }

      // Book Demo

      if (data.booking.slug) {
        createPage({
          path: `/${prefix + data.booking.slug}`,
          component: path.resolve(`src/templates/book-demo.js`),
          context: {
            locale,
            localeSlugs: localeSlugs(data.booking._allSlugLocales),
            data: {
              page: data.booking,
            },
          },
        });

        createPage({
          path: `/${prefix + data.booking.slug + thanks[locale]}`,
          component: path.resolve(`src/templates/thanks-demo-booking.js`),
          context: {
            locale: locale,
            localeSlugs: {
              fi: null,
              en: null,
              sv: null,
            },
            data: {
              page: {
                title: data.booking.kiitosTitle,
                content: data.booking.kiitosContent,
                cta: data.booking.kiitosCta[0],
              },
            },
          },
        });
      }

      // Order JCAD

      if (data.order.slug) {
        createPage({
          path: `/${prefix + data.order.slug}`,
          component: path.resolve(`src/templates/order.js`),
          context: {
            locale: locale,
            localeSlugs: localeSlugs(data.order._allSlugLocales),
            data: {
              page: data.order,
              pricing: data.pricing,
              redirectTo: `/${prefix + data.order.slug + thanks[locale]}`,
            },
          },
        });

        createPage({
          path: `/${prefix + data.order.slug + thanks[locale]}`,
          component: path.resolve(`src/templates/Thanks.js`),
          context: {
            locale: locale,
            localeSlugs: {
              fi: null,
              en: null,
              sv: null,
            },
            data: {
              page: {
                title: data.order.kiitosTitle,
                content: data.order.kiitosContent,
                cta: data.order.kiitosCta[0],
              },
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
