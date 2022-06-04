import React, { useContext } from "react";
import ReactDOM from "react-dom";
import "styled-components/macro";
import theme from "../theme-2021/theme";
import { LocaleContext } from "../contexts/LocaleContext";
import en from "../locales/en.yml";
import fi from "../locales/fi.yml";
import sv from "../locales/sv.yml";

const Modal = ({ children, onClose, maxWidth }) => {
  const { locale } = useContext(LocaleContext);
  const text = locale === "fi" ? fi : locale === "en" ? en : sv;
  const [target] = React.useState(() => document.createElement("div"));
  React.useEffect(() => {
    document.body.appendChild(target);
    const rect = document.body.getBoundingClientRect();
    document.body.style["overflow-y"] = "hidden";
    //eslint-disable-next-line no-unused-expressions
    document.body.scrollTop;
    const rect2 = document.body.getBoundingClientRect();
    document.body.style["padding-right"] = `${rect2.width - rect.width}px`;
    return () => {
      document.body.removeChild(target);
      document.body.style["overflow-y"] = "";
      document.body.style["padding-right"] = "";
    };
  }, [target]);
  return ReactDOM.createPortal(
    <div
      onMouseDown={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        e.preventDefault();
        onClose();
      }}
      css={`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        outline: 0;
        z-index: 3;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.35);
        transition: all 0.4s;
        .leftMargin,
        .rightMargin {
          width: 10%;
          max-width: 100px;
          position: relative;
        }
        .content {
          width: 100%;
          flex-direction: column;
          padding: 10px 40px;
          overflow-y: scroll;
        }
        button.btnClose {
          min-width: 0;
          top: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 90px;
        }
        .inner {
          width: 80%;
        }
        @media (max-width: 600px) {
          .leftMargin,
          .rightMargin {
            width: 1px;
          }
          .inner {
            width: 100%;
          }
          .content {
            padding: 10px;
            p {
              margin-top: 40px;
              font-size: 24px;
            }
          }
          button.btnClose {
            top: 0;
            right: 70px;
            height: auto;
          }
          .btnClose svg {
            transform: rotate(90deg);
            margin-top: 10px;
          }
        }
      `}
    >
      <div
        className="inner"
        style={{
          maxHeight: "100vh",
          background: "#fff",
          display: "flex",
          boxShadow: "0px 0px 32px rgba(0, 0, 0, 0.125)",
          position: "relative",
        }}
      >
        <div className="leftMargin"></div>
        <div className="content">{children}</div>
        <div className="rightMargin">
          <button
            aria-label="Sulje"
            className="btnClose"
            style={{
              position: "relative",
              lineHeight: 1,
              outline: "none",
              padding: 5,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: 24,
            }}
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27.634"
              height="62.332"
              viewBox="0 0 27.634 62.332"
            >
              <g
                id="Group_2252"
                data-name="Group 2252"
                transform="translate(-5286.844 -3671.353) rotate(-45)"
              >
                <g
                  id="Group_2153"
                  data-name="Group 2153"
                  transform="translate(1134.438 6342.587)"
                >
                  <g
                    id="Group_1962"
                    data-name="Group 1962"
                    transform="translate(0 0)"
                  >
                    <path
                      id="Path_1804"
                      data-name="Path 1804"
                      d="M-2.986-7.336A7.886,7.886,0,0,0,4.9-15.222a7.886,7.886,0,0,0-7.886-7.886,7.886,7.886,0,0,0-7.886,7.886A7.886,7.886,0,0,0-2.986-7.336Zm0,3.332V-26.713"
                      transform="translate(10.872 26.713)"
                      fill="none"
                      stroke="#000"
                      stroke-width="0.6"
                    />
                  </g>
                </g>
                <g
                  id="Group_2154"
                  data-name="Group 2154"
                  transform="translate(1130.97 6353.941)"
                >
                  <path
                    id="Path_1820"
                    data-name="Path 1820"
                    d="M0,0H22.709"
                    fill="none"
                    stroke="#000"
                    stroke-width="0.6"
                  />
                </g>
              </g>
            </svg>
            <span
              css={`
                color: #000;
                transform: rotate(270deg);
                display: inline-flex;
                text-transform: uppercase;
                font-size: 12px;
                font-weight: 700;
                margin-top: -20px;
                @media (max-width: 600px) {
                  transform: rotate(0deg);
                  padding-top: 7px;
                  padding-left: 12px;
                }
              `}
            >
              {text.modal.btnClose}
            </span>
          </button>
        </div>
      </div>
    </div>,
    target
  );
};

export default Modal;
