import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

const GlobalStyle = createGlobalStyle`
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
  border-radius: 22px;
  padding-left: 30px;
  padding-right: 30px;
  height: 44px;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 0.1em;
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
  color: #00a19a;
}
.btn.outlines {
  border: 2px solid #00a19a;
  color: #00a19a;
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
  font-family: "DM Sans", sans-serif;
}
p,
li {
  font-family: "DM Sans", sans-serif;
  font-size: 16px;
  line-height: 1.6;
}
span {
    color: ${theme.primary};
}
h1,
h2 {
  font-family: "Playfair Display", serif;
  font-weight: 400;
  color: ${theme.primary};
}
h1 {
    font-size: 55px;
}
h2 {
    font-size: 40px;
}
h3 {
  font-family: "DM Sans", sans-serif;
  font-size: 21px;
  font-weight: 400;
  
  line-height: 1.6;
  color: ${theme.primary};
}
`;

export default GlobalStyle;
