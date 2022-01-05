import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

const GlobalStyle = createGlobalStyle`

/* New style */
section {
  display: flex;
}
.wrap {
  width: 100%;  
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}
.padding {
  padding-left: 20px;
  padding-right: 20px;  
  @media (min-width: 600px) {
    padding-left: 80px;
     padding-right: 80px;
  }
  @media (min-width: 900px) {
    padding-left: 80px;
     padding-right: 80px;
  }
}
.col {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  flex-direction: row;
}
.justify-center {
  justify-content: center;
}
.align-center {
  align-items: center;
}



/* Previous */


.alignCenter {
  align-items: center;
}
.justifyCenter {
  justify-content: center;
}
.wrapper {
  width: 100%;
  height: 100%;
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.leftLine,
  .rightLine {
    width: 1px;
    height: 100%;
    background: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    @media (max-width: 600px) {
    display: none;
    }
  }
  .leftLine {
    left: 40px;
  }
  .rightLine {
    right: 40px;
  }

article {
  padding-left: 20px;
  padding-right: 20px;
}
article h1 {
  text-align: center;
}

article p {
  font-size: 16px;
  margin-bottom: 20px;
}
article ul li,
article ol li {
  font-size: 16px;
  margin-bottom: 10px;
}
article h2 {
  font-size: 32px;
  font-weight: 400;
  padding-top: 20px;
  padding-bottom: 30px;
}
article h3 {
  font-size: 22px;
  font-weight: 300;
  padding-top: 15px;
  margin-bottom: 20px;
  color: #000;
  line-height: 1.3;
}
@media (max-width: 600px) {
  article h1 {
    font-size: 32px;
  }
  article h2 {
    font-size: 24px;
  }
  article h3 {
    font-size: 20px;
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;  
  padding-left: 30px;
  padding-right: 30px;
  height: 58px;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 18px;
  letter-spacing: 0.02em;
  width: fit-content;  
}
.btn:not(.white, .outlines) {
  background: ${theme.primary};
  border: 2px solid ${theme.primary};
  color: #fff;
}
.btn.white {
  background: #fff;
  border: 2px solid #fff;
  color: ${theme.primary};
}
.btn.outlines {
  border: 2px solid ${theme.primary};
  color: ${theme.primary};
}
.btn.white-outlines {
  background: none;
  border: 2px solid #fff;
  color: #fff;
}
section {
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
}
@media (max-width: 600px) {
  section {
    padding-left: 15px;
    padding-right: 15px;
  }
}
body {
  font-family: "din-2014", sans-serif;
}
p,
li {  
  font-size: 16px;
  line-height: 1.6;
}
h1,
h2 {  
  font-weight: 400;
  text-transform: uppercase;
}
h1 {
    font-size: 55px;
}
h2 {
    font-size: 40px;
}
h3 {
  text-transform: uppercase;
  font-size: 26px;
  font-weight: 600;  
  line-height: 1.6; 
}
`;

export default GlobalStyle;
