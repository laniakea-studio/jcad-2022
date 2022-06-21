import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../theme/theme";

// TODO: Not ready. Add key down nav, eg.g https://codepen.io/CrocoDillon/pen/MpMoZe. This source: https://codepen.io/Chineze/pen/MqvadV

export const Radio = ({ data, styles, onChange, value }) => {
  return (
    <div
      className="Radio"
      css={`
        padding: 10px 0 15px;
        .heading {
          color: ${styles.label};
        }
        .option {
          display: flex;
          align-items: center;
          position: relative;
          padding: 30px;
          padding-left: 60px;
          margin-top: 12px;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          font-size: 17px;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          border: 2px solid #333375;
          border-radius: 4px;
          transition: all 0.2s;
        }
        .desc {
          width: 100%;
          display: inline-flex;
          font-size: 15px;
          opacity: 0.8;
        }
        .option input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        .checkmark {
          position: absolute;
          top: 0;
          left: 15px;
          bottom: 0;
          margin: auto 0;
          height: 25px;
          width: 25px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.2);
          border: 1.5px solid #eee;
          transition: all 0.3s;
        }
        .option:hover input ~ .checkmark {
          background-color: rgba(255, 255, 255, 0.3);
        }
        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
        }
        .option input:checked ~ .checkmark:after {
          display: block;
        }
        .option .checkmark:after {
          top: 7px;
          left: 7px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: white;
        }
      `}
    >
      <span className="heading">{data.label}</span>
      {data.options.map((option) => (
        <label
          class="option"
          style={{
            borderColor:
              value === option.label ? "rgba(255,255,255,1)" : "#333375",
          }}
        >
          <div>
            {option.label}
            <span className="desc">{option.desc}</span>
          </div>
          <input
            type="radio"
            checked={value === option.label}
            onChange={onChange}
            name={data.name}
            value={option.label}
          />
          <span class="checkmark"></span>
        </label>
      ))}
    </div>
  );
};
