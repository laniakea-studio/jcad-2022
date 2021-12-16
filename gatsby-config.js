module.exports = {
  siteMetadata: {
    siteUrl: "localhost:8888",
    title: "New Site",
  },
  plugins: [
    /*{
      resolve: "gatsby-source-datocms",
      options: {
        apiToken: "",
      },
    },*/
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};
