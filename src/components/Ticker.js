import React, { useEffect } from "react";
import { theme } from "../theme/theme";
import styled from "styled-components";

const Ticker = ({ data }) => {
  const [logos, setLogos] = React.useState([]);

  useEffect(() => {
    setLogos([...data, ...data]);
  }, []);

  return (
    <Div className="tickerBox">
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
    </Div>
  );
};

export default Ticker;

const Div = styled.div`
  overflow: hidden;
  position: relative;

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
