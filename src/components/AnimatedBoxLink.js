import React, { useState, useRef, forwardRef, useEffect } from "react";
import styled from "styled-components";
import { Link } from "gatsby";

export const AnimatedBoxLink = (props) => {
  const { index, path, title } = props;

  return (
    <Link id={`Link-${index}`} className="Link" to={path}>
      <header className="row">
        <span>{title}</span>
        <Arrow />
      </header>
      <AnimatedBox className="AnimatedBox">
        {index === 0 && (
          <>
            <svg
              className="Sleep"
              width="292"
              height="142"
              viewBox="0 0 292 142"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="292"
                y1="71.5"
                y2="71.5"
                stroke="white"
                class="svg-elem-1"
              ></line>
              <rect
                x="291.5"
                y="0.5"
                width="141"
                height="290"
                transform="rotate(90 291.5 0.5)"
                stroke="white"
                class="svg-elem-2"
              ></rect>
              <circle
                cx="147"
                cy="71"
                r="12.935"
                transform="rotate(-45 147 71)"
                stroke="white"
                class="svg-elem-3"
              ></circle>
              <line
                x1="146.5"
                y1="2.18557e-08"
                x2="146.5"
                y2="142"
                stroke="white"
                class="svg-elem-4"
              ></line>
            </svg>
            <svg
              className="Animate"
              width="292"
              height="142"
              viewBox="0 0 292 142"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="292"
                y1="71.5"
                y2="71.5"
                stroke="white"
                class="svg-elem-1"
              ></line>
              <rect
                x="291.5"
                y="0.5"
                width="141"
                height="290"
                transform="rotate(90 291.5 0.5)"
                stroke="white"
                class="svg-elem-2"
              ></rect>
              <circle
                cx="147"
                cy="71"
                r="12.935"
                transform="rotate(-45 147 71)"
                stroke="white"
                class="svg-elem-3"
              ></circle>
              <line
                x1="146.5"
                y1="2.18557e-08"
                x2="146.5"
                y2="142"
                stroke="white"
                class="svg-elem-4"
              ></line>
            </svg>
          </>
        )}
        {index === 1 && (
          <>
            <svg
              className="Animate"
              width="228"
              height="119"
              viewBox="0 0 228 119"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="14"
                cy="55"
                r="12.935"
                transform="rotate(-45 14 55)"
                stroke="white"
                class="svg-elem-1"
              ></circle>
              <circle
                cx="214"
                cy="55"
                r="12.935"
                transform="rotate(-45 214 55)"
                stroke="white"
                class="svg-elem-2"
              ></circle>
              <circle
                cx="111.036"
                cy="59.0361"
                r="41.2445"
                transform="rotate(-45 111.036 59.0361)"
                stroke="white"
                class="svg-elem-3"
              ></circle>
              <line
                x1="63.4599"
                y1="107.299"
                x2="157.222"
                y2="13.5363"
                stroke="white"
                class="svg-elem-4"
              ></line>
              <line
                x1="157.121"
                y1="104.534"
                x2="63.3586"
                y2="10.7717"
                stroke="white"
                class="svg-elem-5"
              ></line>
            </svg>
          </>
        )}
        {index === 3 && (
          <svg
            width="267"
            height="142"
            viewBox="0 0 267 142"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="56"
              height="66"
              stroke="white"
              class="svg-elem-1"
            ></rect>
            <rect
              x="67.5"
              y="0.5"
              width="56"
              height="11"
              stroke="white"
              class="svg-elem-2"
            ></rect>
            <rect
              x="67.5"
              y="20.5"
              width="56"
              height="11"
              stroke="white"
              class="svg-elem-3"
            ></rect>
            <rect
              x="67.5"
              y="38.5"
              width="56"
              height="11"
              stroke="white"
              class="svg-elem-4"
            ></rect>
            <rect
              x="67.5"
              y="55.5"
              width="56"
              height="11"
              stroke="white"
              class="svg-elem-5"
            ></rect>
            <rect
              x="143.5"
              y="0.5"
              width="56"
              height="66"
              stroke="white"
              class="svg-elem-6"
            ></rect>
            <rect
              x="210.5"
              y="0.5"
              width="56"
              height="11"
              stroke="white"
              class="svg-elem-7"
            ></rect>
            <rect
              x="210.5"
              y="20.5"
              width="56"
              height="11"
              stroke="white"
              class="svg-elem-8"
            ></rect>
            <rect
              x="210.5"
              y="38.5"
              width="56"
              height="11"
              stroke="white"
              class="svg-elem-9"
            ></rect>
            <rect
              x="210.5"
              y="55.5"
              width="56"
              height="11"
              stroke="white"
              class="svg-elem-10"
            ></rect>
            <rect
              x="143.5"
              y="75.5"
              width="56"
              height="66"
              stroke="white"
              class="svg-elem-11"
            ></rect>
            <rect
              x="210.5"
              y="75.5"
              width="56"
              height="11"
              stroke="white"
              class="svg-elem-12"
            ></rect>
            <rect
              x="210.5"
              y="95.5"
              width="56"
              height="11"
              stroke="white"
              class="svg-elem-13"
            ></rect>
            <rect
              x="210.5"
              y="113.5"
              width="56"
              height="11"
              stroke="white"
              class="svg-elem-14"
            ></rect>
            <rect
              x="210.5"
              y="130.5"
              width="56"
              height="11"
              stroke="white"
              class="svg-elem-15"
            ></rect>
            <rect
              x="0.5"
              y="75.5"
              width="56"
              height="66"
              stroke="white"
              class="svg-elem-16"
            ></rect>
            <rect
              x="67.5"
              y="75.5"
              width="56"
              height="11"
              stroke="white"
              class="svg-elem-17"
            ></rect>
            <rect
              x="67.5"
              y="95.5"
              width="56"
              height="11"
              stroke="white"
              class="svg-elem-18"
            ></rect>
            <rect
              x="67.5"
              y="113.5"
              width="56"
              height="11"
              stroke="white"
              class="svg-elem-19"
            ></rect>
            <rect
              x="67.5"
              y="130.5"
              width="56"
              height="11"
              stroke="white"
              class="svg-elem-20"
            ></rect>
          </svg>
        )}
        {index === 2 && (
          <svg
            width="283"
            height="142"
            viewBox="0 0 283 142"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="282.5"
              y="0.5"
              width="141"
              height="282"
              transform="rotate(90 282.5 0.5)"
              stroke="white"
              class="svg-elem-1"
            ></rect>
            <rect
              x="91.5"
              y="23.5"
              width="95"
              height="72"
              transform="rotate(90 91.5 23.5)"
              stroke="white"
              class="svg-elem-2"
            ></rect>
            <rect
              x="265.5"
              y="23.5"
              width="19"
              height="165"
              transform="rotate(90 265.5 23.5)"
              stroke="white"
              class="svg-elem-3"
            ></rect>
            <rect
              x="265.5"
              y="99.5"
              width="19"
              height="165"
              transform="rotate(90 265.5 99.5)"
              stroke="white"
              class="svg-elem-4"
            ></rect>
            <path
              d="M175 55.1436L199 69L175 82.8564L175 55.1436Z"
              stroke="white"
              class="svg-elem-5"
            ></path>
          </svg>
        )}
        {index === 4 && (
          <svg
            width="287"
            height="142"
            viewBox="0 0 287 142"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="286.5"
              y="0.5"
              width="141"
              height="286"
              transform="rotate(90 286.5 0.5)"
              stroke="white"
              class="svg-elem-1"
            ></rect>
            <mask id="path-2-inside-1_0_1" fill="white">
              <path
                d="M251.633 79.6856C251.626 84.3268 249.774 88.7756 246.484 92.0564C243.194 95.3372 238.734 97.1822 234.083 97.1868H224.764V46.3422H234.083C238.735 46.3469 243.196 48.1927 246.486 51.4747C249.776 54.7568 251.627 59.207 251.633 63.8493V79.6856ZM234.083 31.0063H209.123L209.394 46.3422V112.523H234.083C242.807 112.511 251.17 109.048 257.339 102.892C263.508 96.7365 266.978 88.3909 266.99 79.6856V63.8493C266.98 55.1429 263.51 46.7959 257.341 40.639C251.172 34.4821 242.808 31.018 234.083 31.0063Z"
                class="svg-elem-2"
              ></path>
            </mask>
            <path
              d="M251.633 79.6856L252.633 79.6872V79.6856H251.633ZM234.083 97.1868V98.1868H234.084L234.083 97.1868ZM224.764 97.1868H223.764V98.1868H224.764V97.1868ZM224.764 46.3422V45.3422H223.764V46.3422H224.764ZM234.083 46.3422L234.084 45.3422H234.083V46.3422ZM251.633 63.8493H252.633L252.633 63.848L251.633 63.8493ZM209.123 31.0063V30.0063H208.105L208.123 31.024L209.123 31.0063ZM209.394 46.3422H210.394V46.3334L210.394 46.3245L209.394 46.3422ZM209.394 112.523H208.394V113.523H209.394V112.523ZM234.083 112.523V113.523H234.085L234.083 112.523ZM266.99 79.6856L267.99 79.6869V79.6856H266.99ZM266.99 63.8493H267.99L267.99 63.8482L266.99 63.8493ZM250.633 79.6839C250.626 84.0597 248.88 88.2545 245.778 91.3483L247.19 92.7645C250.667 89.2967 252.625 84.5939 252.633 79.6872L250.633 79.6839ZM245.778 91.3483C242.675 94.4422 238.469 96.1824 234.082 96.1868L234.084 98.1868C238.999 98.1819 243.712 96.2322 247.19 92.7645L245.778 91.3483ZM234.083 96.1868H224.764V98.1868H234.083V96.1868ZM225.764 97.1868V46.3422H223.764V97.1868H225.764ZM224.764 47.3422H234.083V45.3422H224.764V47.3422ZM234.082 47.3422C238.47 47.3466 242.677 49.0876 245.78 52.1827L247.192 50.7667C243.714 47.2977 239 45.3471 234.084 45.3422L234.082 47.3422ZM245.78 52.1827C248.882 55.2777 250.627 59.4739 250.633 63.8507L252.633 63.848C252.627 58.9402 250.67 54.2358 247.192 50.7667L245.78 52.1827ZM250.633 63.8493V79.6856H252.633V63.8493H250.633ZM234.083 30.0063H209.123V32.0063H234.083V30.0063ZM208.123 31.024L208.394 46.3599L210.394 46.3245L210.123 30.9887L208.123 31.024ZM208.394 46.3422V112.523H210.394V46.3422H208.394ZM209.394 113.523H234.083V111.523H209.394V113.523ZM234.085 113.523C243.072 113.511 251.689 109.943 258.045 103.6L256.633 102.184C250.651 108.153 242.542 111.511 234.082 111.523L234.085 113.523ZM258.045 103.6C264.402 97.2573 267.978 88.6577 267.99 79.6869L265.99 79.6842C265.979 88.1242 262.614 96.2156 256.633 102.184L258.045 103.6ZM267.99 79.6856V63.8493H265.99V79.6856H267.99ZM267.99 63.8482C267.98 54.8763 264.404 46.2752 258.048 39.9312L256.635 41.3468C262.616 47.3166 265.98 55.4095 265.99 63.8505L267.99 63.8482ZM258.048 39.9312C251.691 33.5873 243.074 30.0183 234.085 30.0063L234.082 32.0063C242.543 32.0176 250.653 35.3769 256.635 41.3468L258.048 39.9312Z"
              fill="white"
              mask="url(#path-2-inside-1_0_1)"
              class="svg-elem-3"
            ></path>
            <mask id="path-4-inside-2_0_1" fill="white">
              <path
                d="M68.7959 63.8508V79.6753C68.806 88.3843 72.2774 96.7337 78.4487 102.892C84.6199 109.05 92.987 112.514 101.714 112.524H116.642L117.766 97.1883H101.714C97.0617 97.1824 92.6011 95.3355 89.3111 92.0524C86.0211 88.7694 84.1702 84.3183 84.1644 79.6753V63.8508C84.1702 59.2078 86.0211 54.7567 89.3111 51.4737C92.6011 48.1906 97.0617 46.3436 101.714 46.3378H118.603L119.722 31.002H101.714C92.9868 31.0112 84.6192 34.4751 78.4478 40.6334C72.2764 46.7917 68.8052 55.1416 68.7959 63.8508"
                class="svg-elem-4"
              ></path>
            </mask>
            <path
              d="M68.7959 79.6753H67.7959L67.7959 79.6765L68.7959 79.6753ZM101.714 112.524L101.713 113.524H101.714V112.524ZM116.642 112.524V113.524H117.571L117.639 112.597L116.642 112.524ZM117.766 97.1883L118.763 97.2614L118.842 96.1883H117.766V97.1883ZM101.714 97.1883L101.713 98.1883H101.714V97.1883ZM84.1644 79.6753H83.1644L83.1644 79.6766L84.1644 79.6753ZM84.1644 63.8508L83.1644 63.8495V63.8508H84.1644ZM101.714 46.3378V45.3378L101.713 45.3378L101.714 46.3378ZM118.603 46.3378V47.3378H119.533L119.601 46.4106L118.603 46.3378ZM119.722 31.002L120.719 31.0747L120.798 30.002H119.722V31.002ZM101.714 31.002V30.002L101.713 30.002L101.714 31.002ZM67.7959 63.8508V79.6753H69.7959V63.8508H67.7959ZM67.7959 79.6765C67.8063 88.6509 71.3836 97.2544 77.7423 103.6L79.155 102.184C73.1713 96.2129 69.8057 88.1176 69.7959 79.6742L67.7959 79.6765ZM77.7423 103.6C84.101 109.945 92.7217 113.514 101.713 113.524L101.716 111.524C93.2523 111.514 85.1389 108.155 79.155 102.184L77.7423 103.6ZM101.714 113.524H116.642V111.524H101.714V113.524ZM117.639 112.597L118.763 97.2614L116.769 97.1151L115.644 112.451L117.639 112.597ZM117.766 96.1883H101.714V98.1883H117.766V96.1883ZM101.716 96.1883C97.327 96.1828 93.1201 94.4406 90.0174 91.3446L88.6047 92.7603C92.0822 96.2303 96.7963 98.1821 101.713 98.1883L101.716 96.1883ZM90.0174 91.3446C86.9149 88.2486 85.1698 84.0515 85.1644 79.6741L83.1644 79.6766C83.1705 84.585 85.1272 89.2902 88.6047 92.7603L90.0174 91.3446ZM85.1644 79.6753V63.8508H83.1644V79.6753H85.1644ZM85.1644 63.852C85.1698 59.4746 86.9149 55.2775 90.0174 52.1815L88.6047 50.7658C85.1272 54.2359 83.1705 58.9411 83.1644 63.8495L85.1644 63.852ZM90.0174 52.1815C93.1201 49.0855 97.327 47.3433 101.716 47.3378L101.713 45.3378C96.7963 45.344 92.0822 47.2958 88.6047 50.7658L90.0174 52.1815ZM101.714 47.3378H118.603V45.3378H101.714V47.3378ZM119.601 46.4106L120.719 31.0747L118.725 30.9292L117.606 46.2651L119.601 46.4106ZM119.722 30.002H101.714V32.002H119.722V30.002ZM101.713 30.002C92.7216 30.0115 84.1003 33.5802 77.7415 39.9256L79.1542 41.3413C85.1381 35.37 93.252 32.011 101.716 32.002L101.713 30.002ZM77.7415 39.9256C71.3825 46.271 67.8055 54.875 67.7959 63.8497L69.7959 63.8518C69.8049 55.4082 73.1703 47.3125 79.1542 41.3413L77.7415 39.9256Z"
              fill="white"
              mask="url(#path-4-inside-2_0_1)"
              class="svg-elem-5"
            ></path>
            <path
              d="M41.0115 82.1529V82.1523V46.3378H41.0115L41.0114 46.3289L40.7449 31.502H55.3741V82.1517C55.3641 90.7277 51.9458 98.9498 45.8686 105.014C39.7914 111.079 31.5515 114.491 22.9563 114.501H15.7667L15.5091 100.165H22.9569H22.9574C27.7431 100.16 32.3316 98.2616 35.7163 94.8849C39.101 91.5082 41.0055 86.9294 41.0115 82.1529Z"
              stroke="white"
              class="svg-elem-6"
            ></path>
            <path
              d="M144.714 46.4595L144.718 46.4425L144.721 46.4254L147.253 31.5H179.372L181.92 46.4826L181.923 46.4997L181.927 46.5165L197.787 112.022H181.932L178.768 94.1641L178.695 93.7514H178.275H148.349H147.93L147.857 94.164L144.689 112.022H128.828L144.714 46.4595ZM160.092 45.8417H159.701L159.607 46.2215L151.065 80.7119L150.911 81.3321H151.55H175.075H175.714L175.56 80.7119L167.02 46.2216L166.926 45.8417H166.534H160.092Z"
              stroke="white"
              class="svg-elem-7"
            ></path>
          </svg>
        )}
        {index === 5 && (
          <svg
            width="278"
            height="119"
            viewBox="0 0 278 119"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="139.036"
              cy="59.0356"
              r="12.935"
              transform="rotate(-45 139.036 59.0356)"
              stroke="white"
              class="svg-elem-1"
            ></circle>
            <circle
              cx="139.036"
              cy="59.0356"
              r="41.2445"
              transform="rotate(-45 139.036 59.0356)"
              stroke="white"
              class="svg-elem-2"
            ></circle>
            <circle
              cx="139.036"
              cy="59.0356"
              r="29.1985"
              transform="rotate(-45 139.036 59.0356)"
              stroke="white"
              class="svg-elem-3"
            ></circle>
            <circle
              cx="42"
              cy="59.0356"
              r="12.935"
              transform="rotate(-45 42 59.0356)"
              stroke="white"
              class="svg-elem-4"
            ></circle>
            <circle
              cx="42"
              cy="59.0356"
              r="29.1985"
              transform="rotate(-45 42 59.0356)"
              stroke="white"
              class="svg-elem-5"
            ></circle>
            <circle
              cx="236"
              cy="59.0356"
              r="12.935"
              transform="rotate(-45 236 59.0356)"
              stroke="white"
              class="svg-elem-6"
            ></circle>
            <circle
              cx="236"
              cy="59.0356"
              r="29.1985"
              transform="rotate(-45 236 59.0356)"
              stroke="white"
              class="svg-elem-7"
            ></circle>
          </svg>
        )}
      </AnimatedBox>
    </Link>
  );
};

const AnimatedBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Arrow = () => (
  <svg
    width="20"
    height="22"
    viewBox="0 0 20 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 0L7.95306 1.04694L16.7381 9.83198L0.0848444 9.5294L0.05812 11.0095L16.8042 11.3151L7.95305 20.1663L8.99999 21.2132L19.6066 10.6066L9 0Z"
      fill="white"
    />
  </svg>
);
