import React, { useEffect } from "react";
import { theme } from "../theme/theme";
import styled from "styled-components";

const Ticker = ({ data }) => {
  const [logos, setLogos] = React.useState([]);

  useEffect(() => {
    setLogos([...data, ...data]);
  }, []);

  return (
    <Div class="tickerBox">
      <div class="img-ticker">
        {logos.length > 1 &&
          logos.map((item) => {
            return (
              <div class="item">
                <img src={item.url} alt="logo" />
              </div>
            );
          })}
      </div>
      <div className="leftFade" />
      <div className="rightFade" />
    </Div>
  );
};

export default Ticker;

const Div = styled.div`
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
    left: 0;
    background: linear-gradient(
      270deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
  }
  .rightFade {
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
    @media (max-width: 600px) {
      width: 200px;
      padding-left: 30px;
      padding-right: 30px;
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
`;
