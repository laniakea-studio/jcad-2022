import React, { useEffect, useContext } from "react";
import { theme } from "../theme/theme";

const Ticker = ({ data }) => {
  const [logos, setLogos] = React.useState([]);

  useEffect(() => {
    setLogos([...data, ...data]);
  }, []);

  return (
    <div
      class="overflow-hidden tickerBox"
      css={`
        overflow: hidden;
        position: relative;
        .leftFade,
        .rightFade {
          width: 60px;
          height: 100%;
          position: absolute;
          top: 0;
          ${theme.max1440} {
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
      `}
    >
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
    </div>
  );
};

export default Ticker;
