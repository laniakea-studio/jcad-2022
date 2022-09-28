import React from "react";
import styled from "styled-components";
import { theme } from "../../theme/theme";

export const Switch = ({ onChange, data, value, styles }) => {
  return (
    <div
      css={`
        display: flex;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 10px;
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }

        .text {
          cursor: pointer;
          padding-left: 10px;
          color: ${styles.switchColor};
        }
        /* Hide default HTML checkbox */
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        /* The slider */
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 34px;
          background-color: ${styles.switchBg};
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
          border-radius: 50%;
          background-color: ${styles.switch};
          -webkit-transition: 0.4s;
          transition: 0.4s;
          opacity: 0.4;
        }

        input:checked + .slider {
          background-color: ${styles.switchBgActive};
        }

        input:focus + .slider {
          box-shadow: 0 0 1px ${styles.switchBorderFocus};
        }

        input:checked + .slider:before {
          background-color: ${styles.switchActive};
          opacity: 1;
          -webkit-transform: translateX(26px);
          -ms-transform: translateX(26px);
          transform: translateX(26px);
        }
      `}
    >
      <label className="switch">
        <input
          type="checkbox"
          id={data.name}
          name={data.name}
          onChange={onChange}
          checked={value}
        />
        <span className="slider"></span>
      </label>
      <label for={data.name} className="text">
        {data.label}
      </label>
    </div>
  );
};
