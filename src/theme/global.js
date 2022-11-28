import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

const GlobalStyle = createGlobalStyle`

#CybotCookiebotDialogBodyButtonDecline {
  display: none !important;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
  border: 1px solid #333375;
  background: #333375;
  border-radius: 4px;
}

@keyframes ticker-kf {
    0% {
      transform: translate3d(0, 0, 0);
    }

    100% {
      transform: translate3d(-1600px, 0, 0);
    }
  }

  .img-ticker {
    animation: ticker-kf 45s linear infinite;
  }

  .tickerBox {
    overflow: hidden;
  position: relative;
  .leftFade,
  .rightFade {
    width: 60px;
    height: 100%;
    position: absolute;
    top: 0;
    @media (max-width: 1440px) {
      display: none;
    }
  }

  .leftFade {
    display: none;
    left: 0;
    background: linear-gradient(
      270deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
  }
  .rightFade {
    display: none;
    right: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
  }

  .img-ticker {
    display: flex;
    box-sizing: border-box;
    animation: ticker-kf 45s linear infinite;
  }
  .item {
    flex: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    padding-left: 90px;
    padding-right: 90px;
    box-sizing: border-box;
    img {
      width: 100%;
      max-width: 220px;
    }    
  }
  @keyframes ticker-kf {
    0% {
      transform: translate3d(0, 0, 0);
    }

    100% {
      transform: translate3d(-1600px, 0, 0);
    }
  }
  }
    
/* New style */
ul li,
ol li {
  margin-bottom: 15px;
}

section {
  display: flex;
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
  padding-left: 20px;
  padding-right: 20px;
  height: 58px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 15px;
  letter-spacing: 0.05em;
  width: fit-content;  
  border-radius: 4px;  
}
.btn:not(.white, .outlines) {
  background: ${theme.primary};
  border: 1px solid ${theme.primary};
  color: #fff;
}
.btn svg {
  margin-left: 15px;
}
.btn.white {
  background: #fff;
  border: 1px solid #fff;
  color: ${theme.primary};
}
.btn.outlines {
  border: 1px solid ${theme.primary};
  color: ${theme.primary};
}
.btn.small {
  min-height: 44px;
  height: 44px;
  font-weight: 600;
  font-size: 15px;
}
.btn.black-outlines {
  background: none;
  border: 1px solid #000;
  color: #000;
}
.btn.white-outlines {
  background: none;
  border: 1px solid #fff;
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
  overscroll-behavior-y: none;
}
p,
li {  
  font-size: 16px;
  line-height: 1.6;
}
ul, ol {
    font-size: 18px;
    line-height: 1.6;  
}
h1 {  
  font-weight: 400;
  text-transform: uppercase;
  font-size: 55px;
}
h2 {
  font-weight: 600;
    font-size: 36px;
}
h3 {
  text-transform: uppercase;
  font-size: 26px;
  font-weight: 600;  
  line-height: 1.6; 
}
`;

export default GlobalStyle;
