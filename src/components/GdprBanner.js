import React, { useEffect, useState } from "react";
import { LocaleContext } from "../contexts/LocaleContext";
import en from "../locales/en.yml";
import fi from "../locales/fi.yml";
import sv from "../locales/sv.yml";
import { theme } from "../theme/theme";
import { NoSSR } from "./NoSSR";
import GdprSettings from "./GdprSettings";

export const GdprBanner = () => {
  const { locale } = useContext(LocaleContext);
  const text = locale === "fi" ? fi : locale === "en" ? en : sv;

  const [showGdprBanner, setShowGdprBanner] = useState(false);
  const [showGdprSettings, setShowGdprSettings] = useState(false);
  const [gdprSettings, setGdprSettings] = useState({
    analytics: true,
    ad: true,
  });

  const [userHasCheckedGdpr, setUserHasCheckedGdpr] = useLocalStorage(
    "gdprChecked",
    "false"
  );
  const [adStorage, setAdStorage] = useLocalStorage("ad_storage", "denied");
  const [analyticsStorage, setAnalyticsStorage] = useLocalStorage(
    "analytics_storage",
    "denied"
  );

  const denyGdprConsent = (e) => {
    e.preventDefault();
    setShowGdprSettings(false);
    setShowGdprBanner(false);
    setUserHasCheckedGdpr("true");
  };

  const handleGdprConsent = (e) => {
    e.preventDefault();
    setShowGdprSettings(false);
    setShowGdprBanner(false);

    setAdStorage(gdprSettings.ad ? "granted" : "denied");
    setAnalyticsStorage(gdprSettings.analytics ? "granted" : "denied");
    setUserHasCheckedGdpr("true");

    window.gtag("consent", "update", {
      ad_storage: gdprSettings.ad ? "granted" : "denied",
      analytics_storage: gdprSettings.analytics ? "granted" : "denied",
    });
  };

  return (
    <NoSSR>
      {showGdprSettings && (
        <Modal onClose={() => setShowGdprSettings(false)}>
          <GdprSettings
            gdprSettings={gdprSettings}
            setGdprSettings={setGdprSettings}
            handleGdprConsent={handleGdprConsent}
          />
        </Modal>
      )}
      {userHasCheckedGdpr !== "true" && (
        <div
          css={`
            display: flex;
            background: #000053;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            font-size: 16px;
            color: #fff;
            min-height: 96px;
            box-sizing: border-box;
            z-index: 2;
            padding-top: 20px;
            padding-bottom: 20px;
            h4 {
              margin: 0;
              text-transform: uppercase;
            }
            > div {
              display: flex;
              padding: 20px;
              align-items: center;
              justify-content: space-between;
              max-width: 1272px;
              width: 100%;
              margin: 0 auto;
              @media (max-width: 600px) {
                flex-direction: column;
                text-align: center;
                button {
                  margin-top: 16px;
                }
              }
              p {
                line-height: 1.5;
                margin: 0;
                max-width: 800px;
                a {
                  text-decoration: underline;
                }
              }
              p.question {
                font-size: 16px;
                padding: 10px 0;
                max-width: 480px;
              }

              button.clear {
                border: none;
                background: none;
                opacity: 0.6;
                cursor: pointer;
                font-size: 15px;
                min-width: 100px;
                padding: 0 20px;
              }
              button.btn {
                width: 180px;
                height: 48px;
                border: 1px solid #fff;
                padding: 0 20px;
                color: #fff;
                background: none;
                cursor: pointer;
              }
              button.white {
                background: #fff;
                color: #000053;
                cursor: pointer;
              }
            }
            .content {
              display: flex;
              flex-direction: column;
            }
            .btns {
              display: flex;
              justify-content: flex-end;
              align-items: center;
              gap: 20px;
              @media (max-width: 600px) {
                padding-top: 20px;
                flex-direction: column-reverse;
                gap: 10px;
              }
            }
          `}
        >
          <div>
            <div className="content">
              <h4>Kunnioitamme yksityisyyttäsi</h4>
              <p className="question">
                Käytämme evästeitä käyttökokemuksen ja tilastoinnin
                parantamiseksi sekä markkinoinnin kohdetamiseen. Sallitko tämän?
              </p>
              <p>
                <a href="/tietosuojaseloste" target="_blank" rel="noreferrer">
                  Tietosuojaseloste
                </a>
              </p>
            </div>

            <div className="btns">
              <button
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  setShowGdprSettings(true);
                }}
              >
                Säädä asetuksia
              </button>
              <button
                className="btn white"
                onClick={(e) => handleGdprConsent(e)}
              >
                Salli evästeet
              </button>
            </div>
          </div>
        </div>
      )}
    </NoSSR>
  );
};
