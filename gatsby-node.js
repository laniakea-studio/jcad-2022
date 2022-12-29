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

  const recordsStringified = JSON.stringify(records);

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

  /*
  createNode({
    // Data for the node.
    items: JSON.stringify(recordsStringified),

    // Required fields.
    id: "a-node-id",
    parent: null, // or null if it's a source node without a parent
    children: [],
    internal: {
      type,
      contentDigest: createContentDigest(recordsStringified),
    },
  });*/
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

  const locales = ["fi", "en", "sv"];

  const slugs = {
    fi: {
      product: "maaralaskentaohjelmisto",
      pricing: "hinta",
      contact: "yhteystiedot",
      gdpr: "tietosuojaseloste",
      about: "meista",
      references: "referenssit",
      webinars: "webinaarit",
      jobs: "rekry",
      order: "tilaa",
      bookDemo: "varaa-demo",
      thanksDemoBooking: "kiitos-demon-varauksesta",
      thanksWebinarBooking: "kiitos-webinaariin-ilmoittautumisesta",
      thanksOrder: "kiitos-tilauksesta",
    },
    en: {
      product: "product",
      pricing: "pricing",
      contact: "contact",
      gdpr: "gdpr",
      about: "about",
      references: "references",
      webinars: "webinars",
      jobs: "jobs",
      order: "order",
      bookDemo: "free-trial",
      thanksDemoBooking: "thanks-demo-booking",
      thanksWebinarBooking: "kiitos-webinar-booking",
      thanksOrder: "thanks-order",
    },
    sv: {
      product: "produkten",
      pricing: "pris",
      contact: "kontakter",
      gdpr: "gdpr",
      about: "om-oss",
      references: "referenser",
      webinars: "webinarer",
      jobs: "jobb",
      order: "bestall",
      bookDemo: "boka-demo",
      thanksDemoBooking: "tack-demo-bokning",
      thanksWebinarBooking: "tack-webinar-bokning",
      thanksOrder: "tack-bestallning",
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
      referenssit: datoCmsReferenssit(locale: { eq: "${locale}" }) {
        seoMetaTags {
          tags 
        }        
        otsikko
        kuvaus
      }
      allReferences: allDatoCmsReferenssi(filter: { locale: { eq: "${locale}" } }) {
        edges {
          node {
            slug
            yritys
            artikkeli
            toimiala
            alue
            otsikko
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
            isRestream
            restreamCode
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
        pageContent
        calendlyLink
        video {
          video {
          streamingUrl
          mp4Url
          }
        }
        videoPoster {
          url
        }
      }
      yhteystiedot: datoCmsYhteystiedot(locale: { eq: "${locale}" }) {
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
        tietosuojaseloste
      }
      allCampaigns: allDatoCmsCampaign(
        filter: { locale: { eq: "${locale}" } }
        ) {
        edges {
          node {       
            seoMetaTags {
              tags           
            }   
            supTitle
            heading
            slug
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
      tutoriaalit: datoCmsTutoriaalit(locale: { eq: "${locale}" }) {       
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
            video: {
              video: data.product.video,
              videoteksti: data.product.videoTeksti,
              videoPoster: data.product.videoPoster,
              videoMarkers: data.product.videoMarkers,
            },
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

      createPage({
        path: `/${prefix + slugs[locale].references}`,
        component: path.resolve(`src/templates/referenssit.js`),
        context: {
          locale: locale,
          localeSlugs: {
            fi: `/${slugs.fi.references}`,
            en: `/en/${slugs.en.references}`,
            sv: `/sv/${slugs.sv.references}`,
          },
          data: {
            page: data.referenssit,
            googleSheets: data.allReferenssitGoogleSheets.edges,
            allReferences: data.allReferences.edges.filter(
              (i) => i.node.artikkeli
            ),
          },
        },
      });

      data.allReferences.edges
        .filter((i) => i.node.artikkeli)
        .map((i) => {
          createPage({
            path: `/${prefix + slugs[locale].references}/${i.node.slug}`,
            component: path.resolve(`src/templates/Referenssi.js`),
            context: {
              locale: locale,
              localeSlugs: {
                fi: `/${i.node.slug}`,
                en: null,
                sv: null,
              },
              data: {
                page: i.node,
                allReferences: data.allReferences.edges.filter(
                  (i) => i.node.artikkeli
                ),
              },
            },
          });
        });

      // BOOK DEMO AND THANK YOU PAGES
      createPage({
        path: `/${prefix + slugs[locale].bookDemo}`,
        component: path.resolve(`src/templates/book-demo.js`),
        context: {
          locale: locale,
          localeSlugs: {
            fi: `/${slugs.fi.bookDemo}`,
            en: `/en/${slugs.en.bookDemo}`,
            sv: `/sv/${slugs.sv.bookDemo}`,
          },
          data: {
            page: data.booking,
          },
        },
      });

      createPage({
        path: `/${prefix + slugs[locale].thanksDemoBooking}`,
        component: path.resolve(`src/templates/thanks-demo-booking.js`),
        context: {
          locale: locale,
          localeSlugs: {
            fi: `/${slugs.fi.thanksDemoBooking}`,
            en: null,
            sv: null,
          },
          data: {
            page: "",
          },
        },
      });

      createPage({
        path: `/${prefix + slugs[locale].thanksWebinarBooking}`,
        component: path.resolve(`src/templates/thanks-webinar-booking.js`),
        context: {
          locale: locale,
          localeSlugs: {
            fi: `/${slugs.fi.thanksWebinarBooking}`,
            en: null,
            sv: null,
          },
          data: {
            page: "",
          },
        },
      });

      createPage({
        path: `/${prefix + slugs[locale].thanksOrder}`,
        component: path.resolve(`src/templates/thanks-order.js`),
        context: {
          locale: locale,
          localeSlugs: {
            fi: `/${slugs.fi.thanksOrder}`,
            en: null,
            sv: null,
          },
          data: {
            page: "",
          },
        },
      });

      // Only Finnish pages
      if (locale === "fi") {
        data.allTutorials.edges.map((i) => {
          createPage({
            path: `/tutoriaalit/${i.node.slug}`,
            component: path.resolve(`src/templates/Tutorial.js`),
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

        createPage({
          path: `/tutoriaalit`,
          component: path.resolve(`src/templates/tutoriaalit.js`),
          context: {
            locale: locale,
            localeSlugs: {
              fi: `/tutoriaalit`,
              en: null,
              sv: null,
            },
            data: {
              page: data.tutoriaalit,
            },
          },
        });

        data.allCampaigns.edges.map((i) => {
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
            path: `/${prefix + slugs[locale].webinars}/${
              i.node.slug
            }-${i.node.webinaarinAjankohta.slice(0, 10)}`,
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
                  fi: `/`,
                  en: null,
                  sv: null,
                },
              },
            });
          }
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
