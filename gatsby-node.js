const path = require(`path`);

const dummyData = {
  home: {
    title: "Hello world!",
    heroImage: "undefined",
  },
  allArticles: {
    edges: [
      {
        title: "Article 1",
        slug: "article-1",
      },
      {
        title: "Article 2",
        slug: "article-2",
      },
    ],
  },
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  /*
  const data = await graphql(`
    {
      home: datoCmsHome(locale: { eq: "fi" }) {
        title
        heroImage {
          gatsbyImageData(
            width: 1600
            placeholder: BLURRED
            forceBlurhash: false
          )
        }
      }
      allArticles: allDatoCmsArticle {
        edges {
          node {
            title
            slug
          }
        }
      }
    }
  `);
  */

  // Page Templates
  const home = path.resolve(`src/templates/home.js`);
  const about = path.resolve(`src/templates/about.js`);
  const blog = path.resolve(`src/templates/blog.js`);
  const article = path.resolve(`src/templates/Article.js`);
  const contact = path.resolve(`src/templates/contact.js`);

  createPage({
    path: `/`,
    component: home,
    context: {
      locale: "fi",
      translateLink: "/en",
      data: dummyData.home,
    },
  });

  dummyData.allArticles.edges.map((i) => {
    createPage({
      path: `/blog/${i.slug}`,
      component: article,
      context: {
        locale: "fi",
        data: i,
        slug: "kohteet",
      },
    });
  });

  createPage({
    path: `/about`,
    component: about,
    context: {
      locale: "fi",
      translateLink: "/",
      data: "",
    },
  });

  createPage({
    path: `/contact`,
    component: contact,
    context: {
      locale: "fi",
      translateLink: "/",
      data: "",
    },
  });

  createPage({
    path: `/blog`,
    component: blog,
    context: {
      locale: "fi",
      translateLink: "/",
      data: "",
    },
  });
};
