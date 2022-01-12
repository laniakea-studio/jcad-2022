const theme = {
  indigo: "#000053", //rgba(0,0,83,1.0)
  grey: "#4B5457",
  lightBg: "#FAFAFA",
  max400: "@media(max-width: 400px)",
  max500: "@media(max-width: 500px)",
  mobile: "@media(max-width: 600px)",
  max700: "@media(max-width: 700px)",
  max800: "@media(max-width: 800px)",
  max900: "@media(max-width: 900px)",
  tablet: "@media(max-width: 1024px)",
  max1000: "@media(max-width: 1000px)",
  max1100: "@media(max-width: 1100px)",
  laptop: "@media(max-width: 1200px)",
  max1300: "@media(max-width: 1300px)",
  max1400: "@media(max-width: 1400px)",
  max1500: "@media(max-width: 1500px)",
  max1600: "@media(max-width: 1600px)",
  windowPaddingX: `padding-left: 20px; 
                    padding-right: 20px;
                    @media(max-width: 600px) {
                      padding-left: 10px;
                      padding-right: 10px;
                     }`,
  fullWidth: `margin-left: calc(-100vw / 2 + 1440px / 2);
              margin-right: calc(-100vw / 2 + 1440px / 2);
              @media(max-width: 1440px) {
              margin-left: 0;
              margin-right: 0;
              }
    `,
};

export default theme;
