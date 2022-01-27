import React from "react";
import theme from "../styles/theme";
import text from "../locales/fi.yml";

const GdprSettings = ({ gdprSettings, setGdprSettings, handleGdprConsent }) => {
  const onChange = (e) => {
    console.log(e);
    const key = e.target.name;
    const value = !gdprSettings[key];
    setGdprSettings({ ...gdprSettings, [key]: value });
  };

  return (
    <div
      className="gdprForm"
      css={`
        flex: 1;
        padding: 20px 20px;
        align-items: center;
        padding-top: 40px;
        padding-bottom: 40px;
        text-align: center;
        position: relative;
        .svgLeft,
        .svgRight {
          position: absolute;
          top: 20px;
        }
        .svgLeft {
          left: 0;
        }
        .svgRight {
          right: 0;
        }
        .center {
          display: flex;
          align-items: center;
          flex-direction: column;
        }
        h3 {
          margin-top: 20px;
          font-size: 24px;
          font-weight: 600;
          max-width: 590px;
          width: 100%;
          line-height: 1.06;
          text-transform: uppercase;
        }
        ${theme.mobile} {
          padding: 40px 0;
          .svgLeft {
            display: none;
          }
          .svgRight {
            display: none;
          }
          .center p {
            font-size: 16px !important;
          }
        }
        .switchZone {
          display: flex;
          align-items: center;
          position: relative;
          padding: 20px;
          max-width: 600px;
          cursor: pointer;
          ${theme.mobile} {
            padding: 20px 0;
          }
        }
        .text {
          flex: 1;
          text-align: left;
          padding-left: 30px;
          p {
            margin: 0;
            color: #898989;
            &:first-child {
              padding-bottom: 10px;
            }
            strong {
              color: #000;
            }
          }
        }
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        input:checked + .slider {
          background-color: #000053;
        }

        input:focus + .slider {
          box-shadow: 0 0 1px #2196f3;
        }

        input:checked + .slider:before {
          -webkit-transform: translateX(26px);
          -ms-transform: translateX(26px);
          transform: translateX(26px);
        }

        /* Rounded sliders */
        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }
      `}
    >
      <SvgVertical className="svgLeft" />
      <div className="center">
        <h3>Kunnioitamme yksityisyyttäsi</h3>
        <p>Säädä asetuksista, mitä tietoja annat sivustomme kerätä.</p>
        <div>
          <label className="switchZone">
            <div className="switch">
              <input
                name="analytics"
                type="checkbox"
                checked={gdprSettings.analytics}
                onChange={onChange}
              />
              <span className="slider round"></span>
            </div>
            <div className="text">
              <p>
                <strong>Käyttöä koskevat tiedot</strong>
              </p>
              <p>
                Sallit meidän kerätä anonyymia tietoa käytöstäsi. Tiedon avulla
                saamme tilastoja esimerkiksi kävijämääristä ja käyttäjien
                demografiasta.
              </p>
            </div>
          </label>
        </div>
        <div>
          <label className="switchZone">
            <div className="switch">
              <input
                name="ad"
                type="checkbox"
                checked={gdprSettings.ad}
                onChange={onChange}
              />
              <span className="slider round"></span>
            </div>
            <div className="text">
              <p>
                <strong>Mainonnan kohdentaminen</strong>
              </p>
              <p>
                Sallit mainosevästeiden keräämisen ja saatat nähdä mainoksemme
                vierailessasi toisella verkkosivustolla.
              </p>
            </div>
          </label>
        </div>
        <button
          className="buttonSubmit"
          type="submit"
          aria-label="Tallenna asetukset"
          onClick={(e) => handleGdprConsent(e)}
          css={`
            border: 1px solid #000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            height: 60px;
            width: 210px;
            color: #000;
            text-transform: uppercase;
            background: #fff;
            margin: 60px auto 20px;
            border-radius: 0;
            position: relative;
            cursor: pointer;
          `}
        >
          Tallenna asetukset
        </button>
      </div>
      <SvgVertical className="svgRight" />
    </div>
  );
};

export default GdprSettings;

const SvgVertical = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="8.234"
      height="437.637"
      viewBox="0 0 8.234 437.637"
    >
      <defs></defs>
      <g
        id="Group_2250"
        data-name="Group 2250"
        transform="translate(5.059) rotate(90)"
      >
        <g
          id="Group_1851"
          data-name="Group 1851"
          transform="translate(0 -3.175)"
        >
          <g
            id="Group_1850"
            data-name="Group 1850"
            transform="translate(0.365 0.369)"
          >
            <path
              id="Path_1697"
              data-name="Path 1697"
              d="M2.3,2.305h429.4M-1.445,6.053l7.5-7.5m207.525,7.5,7.5-7.5m206.884,7.5,7.5-7.5m0,7.5-7.5-7.5m-206.884,7.5-7.5-7.5M6.055,6.053l-7.5-7.5"
              transform="translate(1.445 1.447)"
              fill="none"
              stroke="#000"
              stroke-width="0.6"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
