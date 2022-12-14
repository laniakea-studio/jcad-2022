module.exports = {
  siteMetadata: {
    siteUrl: "https://jcad.fi",
    title: "JCAD",
  },
  plugins: [
    /*
    {
      resolve: "gatsby-source-google-spreadsheets",
      options: {
        spreadsheetId:
          "https://docs.google.com/spreadsheets/d/13KZKESZTIA3Ma2ZlITZn5LBMh6hxy1MpcJE45eraTBo/edit?usp=sharing",
        apiKey: "AIzaSyCChx9tTyahkEK4yAbAkr1RgW37sZPMExs",
        //credentials: require("./jcad-371504-0cdeaef4ddfd.json"),
      },
    },*/
    {
      resolve: "gatsby-source-datocms",
      options: {
        apiToken: "5228a824e8faebccad983f61f3df7c",
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        typekit: {
          id: "ppq2vtw",
        },
      },
    },
    "gatsby-plugin-postcss",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-smoothscroll",
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
