import { graphql, useStaticQuery } from "gatsby";
import React, { useContext } from "react";
import { PopupButton } from "react-calendly";
import styled from "styled-components";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import { theme } from "../theme/theme";

export const CompanyFacts = () => {
  const { locale } = useContext(LocaleContext);
  const text = snippet[locale];

  const { facts } = useStaticQuery(graphql`
    query {
      facts: datoCmsRekry(locale: { eq: "fi" }) {
        liikevaihto
        employees
      }
    }
  `);

  return (
    <Section className="pagePadding">
      <div className="row container padding col-800">
        <div className="Numbers col justify-center">
          <div className="Revenue row justify-center align-center">
            <LineGroupSvg />
            <div className="col">
              <span style={{ marginBottom: -26 }}>Liikevaihto 2021</span>
              <span>
                <strong>{facts.liikevaihto.toLocaleString()}</strong>
              </span>
              <span>miljoonaa euroa</span>
            </div>
            <LineGroupSvg />
          </div>
          <div className="Employees row justify-center align-center">
            <LineGroupSvg />
            <div className="col">
              <span>
                <strong>{facts.employees}</strong>
              </span>
              <span>persoonallista työkaveria</span>
            </div>
            <LineGroupSvg />
          </div>
        </div>
        <div className="Map col">
          <MapSvg />
        </div>
      </div>
    </Section>
  );
};

const Section = styled.section`
  background: #fff;
  color: #000;
  .container {
    border-color: #000;
  }

  .Numbers {
    width: 50%;
    padding-top: 60px;
    padding-right: 20px;
    border-right: 0.8px dashed #000;
    padding-bottom: 80px;
    @media (max-width: 800px) {
      border-right: none;
      width: 100%;
      padding-bottom: 40px;
      padding-right: 0;
    }
    @media (max-width: 500px) {
      padding-bottom: 0;
      border-bottom: 0.8px dashed #000;
      svg {
        visibility: hidden;
      }
    }
    span {
      text-transform: uppercase;
      font-size: 15px;
      text-align: center;
      font-weight: 600;
      strong {
        font-size: 200px;
        font-weight: 600;
        line-height: 0.8;
      }
    }
  }
  .Revenue {
    border-bottom: 0.8px dashed #000;
    span strong {
      line-height: 1.1;
    }
    svg:last-child {
      transform: scaleX(-1);
    }
  }
  .Employees {
    svg:first-child {
      transform: scaleX(-1);
    }
  }
  .Map {
    width: 50%;
    padding-top: 60px;
    padding-bottom: 80px;
    @media (max-width: 800px) {
      border-right: none;
      width: 100%;
      padding-top: 0;
      padding-bottom: 40px;
    }
    svg {
      width: 100%;
    }
  }
`;

const LineGroupSvg = () => (
  <svg
    width="79"
    height="295"
    viewBox="0 0 79 295"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M78.338 13.1326H53.0825"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      d="M65.7104 24.4414C67.5905 24.4414 69.1059 19.3903 69.1059 13.1325C69.1059 6.87477 67.5905 1.82367 65.7104 1.82367C63.8303 1.82367 62.3149 6.87477 62.3149 13.1325C62.3149 19.3903 63.8303 24.4414 65.7104 24.4414V24.4414Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      d="M78.338 102.649H53.0825"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      d="M65.7104 113.958C67.5905 113.958 69.1059 108.879 69.1059 102.649C69.1059 96.4193 67.5905 91.3401 65.7104 91.3401C63.8303 91.3401 62.3149 96.3912 62.3149 102.649C62.3149 108.907 63.8303 113.958 65.7104 113.958Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      d="M78.338 192.166H53.0825"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      d="M65.7104 203.475C67.5905 203.475 69.1059 198.396 69.1059 192.166C69.1059 185.936 67.5905 180.857 65.7104 180.857C63.8303 180.857 62.3149 185.908 62.3149 192.166C62.3149 198.424 63.8303 203.475 65.7104 203.475Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      d="M78.338 281.683H53.0825"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      d="M65.7104 293.019C67.5905 293.019 69.1059 287.94 69.1059 281.711C69.1059 275.481 67.5905 270.402 65.7104 270.402C63.8303 270.402 62.3149 275.453 62.3149 281.711C62.3149 287.968 63.8303 293.019 65.7104 293.019Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      d="M31.6431 294.816V-6.10352e-05"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
      stroke-dasharray="4 4"
    />
    <path
      d="M16.3779 294.816V-6.10352e-05"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
      stroke-dasharray="4 4"
    />
    <path
      d="M1 294.816V0"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
      stroke-dasharray="4 4"
    />
  </svg>
);

const MapSvg = () => (
  <svg
    width="603"
    height="567"
    viewBox="0 0 603 567"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M226.258 8.91292C226.258 19.5527 210.325 19.5527 210.325 8.91292C210.325 -1.72683 226.258 -1.72683 226.258 8.91292Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M254.938 8.91292C254.938 19.5527 239.004 19.5527 239.004 8.91292C239.004 -1.72683 254.938 -1.72683 254.938 8.91292Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M283.599 8.91292C283.599 19.5527 267.666 19.5527 267.666 8.91292C267.666 -1.72683 283.599 -1.72683 283.599 8.91292Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M312.315 8.91292C312.315 19.5527 296.382 19.5527 296.382 8.91292C296.382 -1.72683 312.315 -1.72683 312.315 8.91292Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M340.995 8.91292C340.995 19.5527 325.062 19.5527 325.062 8.91292C325.062 -1.72683 340.995 -1.72683 340.995 8.91292Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M369.657 8.91292C369.657 19.5527 353.724 19.5527 353.724 8.91292C353.724 -1.72683 369.657 -1.72683 369.657 8.91292Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M398.355 8.91292C398.355 19.5527 382.422 19.5527 382.422 8.91292C382.422 -1.72683 398.355 -1.72683 398.355 8.91292Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M427.016 8.91292C427.016 19.5527 411.083 19.5527 411.083 8.91292C411.083 -1.72683 427.016 -1.72683 427.016 8.91292Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M254.938 37.6571C254.938 48.2968 239.004 48.2968 239.004 37.6571C239.004 27.0173 254.938 27.0173 254.938 37.6571Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M283.599 37.6571C283.599 48.2968 267.666 48.2968 267.666 37.6571C267.666 27.0173 283.599 27.0173 283.599 37.6571Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M312.315 37.6571C312.315 48.2968 296.382 48.2968 296.382 37.6571C296.382 27.0173 312.315 27.0173 312.315 37.6571Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M340.995 37.6571C340.995 48.2968 325.062 48.2968 325.062 37.6571C325.062 27.0173 340.995 27.0173 340.995 37.6571Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M369.657 37.6571C369.657 48.2968 353.724 48.2968 353.724 37.6571C353.724 27.0173 369.657 27.0173 369.657 37.6571Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M398.355 37.6571C398.355 48.2968 382.422 48.2968 382.422 37.6571C382.422 27.0173 398.355 27.0173 398.355 37.6571Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M427.016 37.6571C427.016 48.2968 411.083 48.2968 411.083 37.6571C411.083 27.0173 427.016 27.0173 427.016 37.6571Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M455.714 37.6571C455.714 48.2968 439.781 48.2968 439.781 37.6571C439.781 27.0173 455.714 27.0173 455.714 37.6571Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M254.938 66.4012C254.938 77.041 239.004 77.041 239.004 66.4012C239.004 55.7614 254.938 55.7614 254.938 66.4012Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M283.599 66.4012C283.599 77.041 267.666 77.041 267.666 66.4012C267.666 55.7614 283.599 55.7614 283.599 66.4012Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M312.315 66.4012C312.315 77.041 296.382 77.041 296.382 66.4012C296.382 55.7614 312.315 55.7614 312.315 66.4012Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M340.995 66.4012C340.995 77.041 325.062 77.041 325.062 66.4012C325.062 55.7614 340.995 55.7614 340.995 66.4012Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M369.657 66.4012C369.657 77.041 353.724 77.041 353.724 66.4012C353.724 55.7614 369.657 55.7614 369.657 66.4012Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M398.355 66.4012C398.355 77.041 382.422 77.041 382.422 66.4012C382.422 55.7614 398.355 55.7614 398.355 66.4012Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M427.016 66.4012C427.016 77.041 411.083 77.041 411.083 66.4012C411.083 55.7614 427.016 55.7614 427.016 66.4012Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M455.714 66.4012C455.714 77.041 439.781 77.041 439.781 66.4012C439.781 55.7614 455.714 55.7614 455.714 66.4012Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M312.315 95.1449C312.315 105.785 296.382 105.785 296.382 95.1449C296.382 84.5051 312.315 84.5051 312.315 95.1449Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M340.995 95.1449C340.995 105.785 325.062 105.785 325.062 95.1449C325.062 84.5051 340.995 84.5051 340.995 95.1449Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M369.657 95.1449C369.657 105.785 353.724 105.785 353.724 95.1449C353.724 84.5051 369.657 84.5051 369.657 95.1449Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M398.355 95.1449C398.355 105.785 382.422 105.785 382.422 95.1449C382.422 84.5051 398.355 84.5051 398.355 95.1449Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M427.016 95.1449C427.016 105.785 411.083 105.785 411.083 95.1449C411.083 84.5051 427.016 84.5051 427.016 95.1449Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M283.599 123.889C283.599 134.529 267.666 134.529 267.666 123.889C267.666 113.249 283.599 113.249 283.599 123.889Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M312.315 123.889C312.315 134.529 296.382 134.529 296.382 123.889C296.382 113.249 312.315 113.249 312.315 123.889Z"
      fill="black"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M340.995 123.889C340.995 134.529 325.062 134.529 325.062 123.889C325.062 113.249 340.995 113.249 340.995 123.889Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M369.657 123.889C369.657 134.529 353.724 134.529 353.724 123.889C353.724 113.249 369.657 113.249 369.657 123.889Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M398.355 123.889C398.355 134.529 382.422 134.529 382.422 123.889C382.422 113.249 398.355 113.249 398.355 123.889Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M427.016 123.889C427.016 134.529 411.083 134.529 411.083 123.889C411.083 113.249 427.016 113.249 427.016 123.889Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M455.714 123.889C455.714 134.529 439.781 134.529 439.781 123.889C439.781 113.249 455.714 113.249 455.714 123.889Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M254.938 152.633C254.938 163.273 239.004 163.273 239.004 152.633C239.004 141.993 254.938 141.993 254.938 152.633Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M283.599 152.633C283.599 163.273 267.666 163.273 267.666 152.633C267.666 141.993 283.599 141.993 283.599 152.633Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M312.315 152.633C312.315 163.273 296.382 163.273 296.382 152.633C296.382 141.993 312.315 141.993 312.315 152.633Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M340.995 152.633C340.995 163.273 325.062 163.273 325.062 152.633C325.062 141.993 340.995 141.993 340.995 152.633Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M369.657 152.633C369.657 163.273 353.724 163.273 353.724 152.633C353.724 141.993 369.657 141.993 369.657 152.633Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M398.355 152.633C398.355 163.273 382.422 163.273 382.422 152.633C382.422 141.993 398.355 141.993 398.355 152.633Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M427.016 152.633C427.016 163.273 411.083 163.273 411.083 152.633C411.083 141.993 427.016 141.993 427.016 152.633Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M455.714 152.633C455.714 163.273 439.781 163.273 439.781 152.633C439.781 141.993 455.714 141.993 455.714 152.633Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M254.938 181.377C254.938 192.017 239.004 192.017 239.004 181.377C239.004 170.738 254.938 170.738 254.938 181.377Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M283.599 181.377C283.599 192.017 267.666 192.017 267.666 181.377C267.666 170.738 283.599 170.738 283.599 181.377Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M312.315 181.377C312.315 192.017 296.382 192.017 296.382 181.377C296.382 170.738 312.315 170.738 312.315 181.377Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M340.995 181.377C340.995 192.017 325.062 192.017 325.062 181.377C325.062 170.738 340.995 170.738 340.995 181.377Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M369.657 181.377C369.657 192.017 353.724 192.017 353.724 181.377C353.724 170.738 369.657 170.738 369.657 181.377Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M398.355 181.377C398.355 192.017 382.422 192.017 382.422 181.377C382.422 170.738 398.355 170.738 398.355 181.377Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M427.016 181.377C427.016 192.017 411.083 192.017 411.083 181.377C411.083 170.738 427.016 170.738 427.016 181.377Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M455.714 181.377C455.714 192.017 439.781 192.017 439.781 181.377C439.781 170.738 455.714 170.738 455.714 181.377Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M226.258 210.121C226.258 220.761 210.325 220.761 210.325 210.121C210.325 199.482 226.258 199.482 226.258 210.121Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M254.938 210.121C254.938 220.761 239.004 220.761 239.004 210.121C239.004 199.482 254.938 199.482 254.938 210.121Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M283.599 210.121C283.599 220.761 267.666 220.761 267.666 210.121C267.666 199.482 283.599 199.482 283.599 210.121Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M312.315 210.121C312.315 220.761 296.382 220.761 296.382 210.121C296.382 199.482 312.315 199.482 312.315 210.121Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M340.995 210.121C340.995 220.761 325.062 220.761 325.062 210.121C325.062 199.482 340.995 199.482 340.995 210.121Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M369.657 210.121C369.657 220.761 353.724 220.761 353.724 210.121C353.724 199.482 369.657 199.482 369.657 210.121Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M398.355 210.121C398.355 220.761 382.422 220.761 382.422 210.121C382.422 199.482 398.355 199.482 398.355 210.121Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M427.016 210.121C427.016 220.761 411.083 220.761 411.083 210.121C411.083 199.482 427.016 199.482 427.016 210.121Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M455.714 210.121C455.714 220.761 439.781 220.761 439.781 210.121C439.781 199.482 455.714 199.482 455.714 210.121Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M484.394 210.121C484.394 220.761 468.461 220.761 468.461 210.121C468.461 199.482 484.394 199.482 484.394 210.121Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M197.578 238.866C197.578 249.505 181.645 249.505 181.645 238.866C181.645 228.226 197.578 228.226 197.578 238.866Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M226.258 238.866C226.258 249.505 210.325 249.505 210.325 238.866C210.325 228.226 226.258 228.226 226.258 238.866Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M254.938 238.866C254.938 249.505 239.004 249.505 239.004 238.866C239.004 228.226 254.938 228.226 254.938 238.866Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M283.599 238.866C283.599 249.505 267.666 249.505 267.666 238.866C267.666 228.226 283.599 228.226 283.599 238.866Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M312.315 238.866C312.315 249.505 296.382 249.505 296.382 238.866C296.382 228.226 312.315 228.226 312.315 238.866Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M340.995 238.866C340.995 249.505 325.062 249.505 325.062 238.866C325.062 228.226 340.995 228.226 340.995 238.866Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M369.657 238.866C369.657 249.505 353.724 249.505 353.724 238.866C353.724 228.226 369.657 228.226 369.657 238.866Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M398.355 238.866C398.355 249.505 382.422 249.505 382.422 238.866C382.422 228.226 398.355 228.226 398.355 238.866Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M427.016 238.866C427.016 249.505 411.083 249.505 411.083 238.866C411.083 228.226 427.016 228.226 427.016 238.866Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M455.714 238.866C455.714 249.505 439.781 249.505 439.781 238.866C439.781 228.226 455.714 228.226 455.714 238.866Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M168.899 267.628C168.899 278.268 152.965 278.268 152.965 267.628C152.965 256.988 168.899 256.988 168.899 267.628Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M197.578 267.628C197.578 278.268 181.645 278.268 181.645 267.628C181.645 256.988 197.578 256.988 197.578 267.628Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M226.258 267.628C226.258 278.268 210.325 278.268 210.325 267.628C210.325 256.988 226.258 256.988 226.258 267.628Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M254.938 267.628C254.938 278.268 239.004 278.268 239.004 267.628C239.004 256.988 254.938 256.988 254.938 267.628Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M283.599 267.628C283.599 278.268 267.666 278.268 267.666 267.628C267.666 256.988 283.599 256.988 283.599 267.628Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M312.315 267.628C312.315 278.268 296.382 278.268 296.382 267.628C296.382 256.988 312.315 256.988 312.315 267.628Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M340.995 267.628C340.995 278.268 325.062 278.268 325.062 267.628C325.062 256.988 340.995 256.988 340.995 267.628Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M369.657 267.628C369.657 278.268 353.724 278.268 353.724 267.628C353.724 256.988 369.657 256.988 369.657 267.628Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M398.355 267.628C398.355 278.268 382.422 278.268 382.422 267.628C382.422 256.988 398.355 256.988 398.355 267.628Z"
      fill="black"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M427.016 267.628C427.016 278.268 411.083 278.268 411.083 267.628C411.083 256.988 427.016 256.988 427.016 267.628Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M455.714 267.628C455.714 278.268 439.781 278.268 439.781 267.628C439.781 256.988 455.714 256.988 455.714 267.628Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M484.394 267.628C484.394 278.268 468.461 278.268 468.461 267.628C468.461 256.988 484.394 256.988 484.394 267.628Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M168.899 296.372C168.899 307.012 152.965 307.012 152.965 296.372C152.965 285.732 168.899 285.732 168.899 296.372Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M197.578 296.372C197.578 307.012 181.645 307.012 181.645 296.372C181.645 285.732 197.578 285.732 197.578 296.372Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M226.258 296.372C226.258 307.012 210.325 307.012 210.325 296.372C210.325 285.732 226.258 285.732 226.258 296.372Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M254.938 296.372C254.938 307.012 239.004 307.012 239.004 296.372C239.004 285.732 254.938 285.732 254.938 296.372Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M283.599 296.372C283.599 307.012 267.666 307.012 267.666 296.372C267.666 285.732 283.599 285.732 283.599 296.372Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M312.315 296.372C312.315 307.012 296.382 307.012 296.382 296.372C296.382 285.732 312.315 285.732 312.315 296.372Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M340.995 296.372C340.995 307.012 325.062 307.012 325.062 296.372C325.062 285.732 340.995 285.732 340.995 296.372Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M369.657 296.372C369.657 307.012 353.724 307.012 353.724 296.372C353.724 285.732 369.657 285.732 369.657 296.372Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M398.355 296.372C398.355 307.012 382.422 307.012 382.422 296.372C382.422 285.732 398.355 285.732 398.355 296.372Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M427.016 296.372C427.016 307.012 411.083 307.012 411.083 296.372C411.083 285.732 427.016 285.732 427.016 296.372Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M455.714 296.372C455.714 307.012 439.781 307.012 439.781 296.372C439.781 285.732 455.714 285.732 455.714 296.372Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M484.394 296.372C484.394 307.012 468.461 307.012 468.461 296.372C468.461 285.732 484.394 285.732 484.394 296.372Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M140.219 325.097C140.219 335.737 124.286 335.737 124.286 325.097C124.286 314.458 140.219 314.458 140.219 325.097Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M168.899 325.097C168.899 335.737 152.965 335.737 152.965 325.097C152.965 314.458 168.899 314.458 168.899 325.097Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M197.578 325.097C197.578 335.737 181.645 335.737 181.645 325.097C181.645 314.458 197.578 314.458 197.578 325.097Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M226.258 325.097C226.258 335.737 210.325 335.737 210.325 325.097C210.325 314.458 226.258 314.458 226.258 325.097Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M254.938 325.097C254.938 335.737 239.004 335.737 239.004 325.097C239.004 314.458 254.938 314.458 254.938 325.097Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M283.599 325.097C283.599 335.737 267.666 335.737 267.666 325.097C267.666 314.458 283.599 314.458 283.599 325.097Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M312.315 325.097C312.315 335.737 296.382 335.737 296.382 325.097C296.382 314.458 312.315 314.458 312.315 325.097Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M340.995 325.097C340.995 335.737 325.062 335.737 325.062 325.097C325.062 314.458 340.995 314.458 340.995 325.097Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M369.657 325.097C369.657 335.737 353.724 335.737 353.724 325.097C353.724 314.458 369.657 314.458 369.657 325.097Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M398.355 325.097C398.355 335.737 382.422 335.737 382.422 325.097C382.422 314.458 398.355 314.458 398.355 325.097Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M427.016 325.097C427.016 335.737 411.083 335.737 411.083 325.097C411.083 314.458 427.016 314.458 427.016 325.097Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M455.714 325.097C455.714 335.737 439.781 335.737 439.781 325.097C439.781 314.458 455.714 314.458 455.714 325.097Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M484.394 325.097C484.394 335.737 468.461 335.737 468.461 325.097C468.461 314.458 484.394 314.458 484.394 325.097Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M513.074 325.097C513.074 335.737 497.141 335.737 497.141 325.097C497.141 314.458 513.074 314.458 513.074 325.097Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M140.219 353.86C140.219 364.5 124.286 364.5 124.286 353.86C124.286 343.22 140.219 343.22 140.219 353.86Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M168.899 353.86C168.899 364.5 152.965 364.5 152.965 353.86C152.965 343.22 168.899 343.22 168.899 353.86Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M197.578 353.86C197.578 364.5 181.645 364.5 181.645 353.86C181.645 343.22 197.578 343.22 197.578 353.86Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M226.258 353.86C226.258 364.5 210.325 364.5 210.325 353.86C210.325 343.22 226.258 343.22 226.258 353.86Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M254.938 353.86C254.938 364.5 239.004 364.5 239.004 353.86C239.004 343.22 254.938 343.22 254.938 353.86Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M283.599 353.86C283.599 364.5 267.666 364.5 267.666 353.86C267.666 343.22 283.599 343.22 283.599 353.86Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M312.315 353.86C312.315 364.5 296.382 364.5 296.382 353.86C296.382 343.22 312.315 343.22 312.315 353.86Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M340.995 353.86C340.995 364.5 325.062 364.5 325.062 353.86C325.062 343.22 340.995 343.22 340.995 353.86Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M369.657 353.86C369.657 364.5 353.724 364.5 353.724 353.86C353.724 343.22 369.657 343.22 369.657 353.86Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M398.355 353.86C398.355 364.5 382.422 364.5 382.422 353.86C382.422 343.22 398.355 343.22 398.355 353.86Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M427.016 353.86C427.016 364.5 411.083 364.5 411.083 353.86C411.083 343.22 427.016 343.22 427.016 353.86Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M455.714 353.86C455.714 364.5 439.781 364.5 439.781 353.86C439.781 343.22 455.714 343.22 455.714 353.86Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M484.394 353.86C484.394 364.5 468.461 364.5 468.461 353.86C468.461 343.22 484.394 343.22 484.394 353.86Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M140.219 382.604C140.219 393.244 124.286 393.244 124.286 382.604C124.286 371.965 140.219 371.965 140.219 382.604Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M168.899 382.604C168.899 393.244 152.965 393.244 152.965 382.604C152.965 371.965 168.899 371.965 168.899 382.604Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M197.578 382.604C197.578 393.244 181.645 393.244 181.645 382.604C181.645 371.965 197.578 371.965 197.578 382.604Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M226.258 382.604C226.258 393.244 210.325 393.244 210.325 382.604C210.325 371.965 226.258 371.965 226.258 382.604Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M254.938 382.604C254.938 393.244 239.004 393.244 239.004 382.604C239.004 371.965 254.938 371.965 254.938 382.604Z"
      fill="black"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M283.599 382.604C283.599 393.244 267.666 393.244 267.666 382.604C267.666 371.965 283.599 371.965 283.599 382.604Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M312.315 382.604C312.315 393.244 296.382 393.244 296.382 382.604C296.382 371.965 312.315 371.965 312.315 382.604Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M340.995 382.604C340.995 393.244 325.062 393.244 325.062 382.604C325.062 371.965 340.995 371.965 340.995 382.604Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M369.657 382.604C369.657 393.244 353.724 393.244 353.724 382.604C353.724 371.965 369.657 371.965 369.657 382.604Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M398.355 382.604C398.355 393.244 382.422 393.244 382.422 382.604C382.422 371.965 398.355 371.965 398.355 382.604Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M427.016 382.604C427.016 393.244 411.083 393.244 411.083 382.604C411.083 371.965 427.016 371.965 427.016 382.604Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M455.714 382.604C455.714 393.244 439.781 393.244 439.781 382.604C439.781 371.965 455.714 371.965 455.714 382.604Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M140.219 411.348C140.219 421.988 124.286 421.988 124.286 411.348C124.286 400.709 140.219 400.709 140.219 411.348Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M168.899 411.348C168.899 421.988 152.965 421.988 152.965 411.348C152.965 400.709 168.899 400.709 168.899 411.348Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M197.578 411.348C197.578 421.988 181.645 421.988 181.645 411.348C181.645 400.709 197.578 400.709 197.578 411.348Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M226.258 411.348C226.258 421.988 210.325 421.988 210.325 411.348C210.325 400.709 226.258 400.709 226.258 411.348Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M254.938 411.348C254.938 421.988 239.004 421.988 239.004 411.348C239.004 400.709 254.938 400.709 254.938 411.348Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M283.599 411.348C283.599 421.988 267.666 421.988 267.666 411.348C267.666 400.709 283.599 400.709 283.599 411.348Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M312.315 411.348C312.315 421.988 296.382 421.988 296.382 411.348C296.382 400.709 312.315 400.709 312.315 411.348Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M340.995 411.348C340.995 421.988 325.062 421.988 325.062 411.348C325.062 400.709 340.995 400.709 340.995 411.348Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M369.657 411.348C369.657 421.988 353.724 421.988 353.724 411.348C353.724 400.709 369.657 400.709 369.657 411.348Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M398.355 411.348C398.355 421.988 382.422 421.988 382.422 411.348C382.422 400.709 398.355 400.709 398.355 411.348Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M427.016 411.348C427.016 421.988 411.083 421.988 411.083 411.348C411.083 400.709 427.016 400.709 427.016 411.348Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M455.714 411.348C455.714 421.988 439.781 421.988 439.781 411.348C439.781 400.709 455.714 400.709 455.714 411.348Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M140.219 440.092C140.219 450.732 124.286 450.732 124.286 440.092C124.286 429.452 140.219 429.452 140.219 440.092Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M168.899 440.092C168.899 450.732 152.965 450.732 152.965 440.092C152.965 429.452 168.899 429.452 168.899 440.092Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M197.578 440.092C197.578 450.732 181.645 450.732 181.645 440.092C181.645 429.452 197.578 429.452 197.578 440.092Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M226.258 440.092C226.258 450.732 210.325 450.732 210.325 440.092C210.325 429.452 226.258 429.452 226.258 440.092Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M254.938 440.092C254.938 450.732 239.004 450.732 239.004 440.092C239.004 429.452 254.938 429.452 254.938 440.092Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M283.599 440.092C283.599 450.732 267.666 450.732 267.666 440.092C267.666 429.452 283.599 429.452 283.599 440.092Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M312.315 440.092C312.315 450.732 296.382 450.732 296.382 440.092C296.382 429.452 312.315 429.452 312.315 440.092Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M340.995 440.092C340.995 450.732 325.062 450.732 325.062 440.092C325.062 429.452 340.995 429.452 340.995 440.092Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M369.657 440.092C369.657 450.732 353.724 450.732 353.724 440.092C353.724 429.452 369.657 429.452 369.657 440.092Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M398.355 440.092C398.355 450.732 382.422 450.732 382.422 440.092C382.422 429.452 398.355 429.452 398.355 440.092Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M427.016 440.092C427.016 450.732 411.083 450.732 411.083 440.092C411.083 429.452 427.016 429.452 427.016 440.092Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M140.219 468.836C140.219 479.476 124.286 479.476 124.286 468.836C124.286 458.197 140.219 458.197 140.219 468.836Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M168.899 468.836C168.899 479.476 152.965 479.476 152.965 468.836C152.965 458.197 168.899 458.197 168.899 468.836Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M197.578 468.836C197.578 479.476 181.645 479.476 181.645 468.836C181.645 458.197 197.578 458.197 197.578 468.836Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M226.258 468.836C226.258 479.476 210.325 479.476 210.325 468.836C210.325 458.197 226.258 458.197 226.258 468.836Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M254.938 468.836C254.938 479.476 239.004 479.476 239.004 468.836C239.004 458.197 254.938 458.197 254.938 468.836Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M283.599 468.836C283.599 479.476 267.666 479.476 267.666 468.836C267.666 458.197 283.599 458.197 283.599 468.836Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M312.315 468.836C312.315 479.476 296.382 479.476 296.382 468.836C296.382 458.197 312.315 458.197 312.315 468.836Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M340.995 468.836C340.995 479.476 325.062 479.476 325.062 468.836C325.062 458.197 340.995 458.197 340.995 468.836Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M369.657 468.836C369.657 479.476 353.724 479.476 353.724 468.836C353.724 458.197 369.657 458.197 369.657 468.836Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M398.355 468.836C398.355 479.476 382.422 479.476 382.422 468.836C382.422 458.197 398.355 458.197 398.355 468.836Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M140.219 497.58C140.219 508.22 124.286 508.22 124.286 497.58C124.286 486.941 140.219 486.941 140.219 497.58Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M168.899 497.58C168.899 508.22 152.965 508.22 152.965 497.58C152.965 486.941 168.899 486.941 168.899 497.58Z"
      fill="black"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M197.578 497.58C197.578 508.22 181.645 508.22 181.645 497.58C181.645 486.941 197.578 486.941 197.578 497.58Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M226.258 497.58C226.258 508.22 210.325 508.22 210.325 497.58C210.325 486.941 226.258 486.941 226.258 497.58Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M254.938 497.58C254.938 508.22 239.004 508.22 239.004 497.58C239.004 486.941 254.938 486.941 254.938 497.58Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M283.599 497.58C283.599 508.22 267.666 508.22 267.666 497.58C267.666 486.941 283.599 486.941 283.599 497.58Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M312.315 497.58C312.315 508.22 296.382 508.22 296.382 497.58C296.382 486.941 312.315 486.941 312.315 497.58Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M340.995 497.58C340.995 508.22 325.062 508.22 325.062 497.58C325.062 486.941 340.995 486.941 340.995 497.58Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M369.657 497.58C369.657 508.22 353.724 508.22 353.724 497.58C353.724 486.941 369.657 486.941 369.657 497.58Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M82.8594 526.325C82.8594 536.964 66.9263 536.964 66.9263 526.325C66.9263 515.685 82.8594 515.685 82.8594 526.325Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M111.539 526.325C111.539 536.964 95.606 536.964 95.606 526.325C95.606 515.685 111.539 515.685 111.539 526.325Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M168.899 526.325C168.899 536.964 152.965 536.964 152.965 526.325C152.965 515.685 168.899 515.685 168.899 526.325Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M197.578 526.325C197.578 536.964 181.645 536.964 181.645 526.325C181.645 515.685 197.578 515.685 197.578 526.325Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M226.258 526.325C226.258 536.964 210.325 536.964 210.325 526.325C210.325 515.685 226.258 515.685 226.258 526.325Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M254.938 526.325C254.938 536.964 239.004 536.964 239.004 526.325C239.004 515.685 254.938 515.685 254.938 526.325Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M283.599 526.325C283.599 536.964 267.666 536.964 267.666 526.325C267.666 515.685 283.599 515.685 283.599 526.325Z"
      fill="black"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M197.578 555.087C197.578 565.727 181.645 565.727 181.645 555.087C181.645 544.447 197.578 544.447 197.578 555.087Z"
      stroke="black"
      stroke-width="0.8"
      stroke-miterlimit="10"
    />
    <path
      d="M186.084 123.485V122.165C186.084 118.91 184.524 117.515 182.199 117.515C179.889 117.515 178.329 118.91 178.329 122.165V123.485C178.329 126.74 179.889 128.135 182.199 128.135C184.524 128.135 186.084 126.74 186.084 123.485ZM180.069 122.165C180.069 119.93 180.819 119.03 182.199 119.03C183.579 119.03 184.344 119.93 184.344 122.165V123.485C184.344 125.72 183.579 126.62 182.199 126.62C180.819 126.62 180.069 125.72 180.069 123.485V122.165ZM193.948 117.65V123.815C193.948 125.795 193.243 126.62 191.818 126.62C190.393 126.62 189.688 125.795 189.688 123.815V117.65H187.948V123.815C187.948 126.86 189.523 128.135 191.818 128.135C194.113 128.135 195.688 126.86 195.688 123.8V117.65H193.948ZM199.708 117.65H197.968V128H204.313V126.5H199.708V117.65ZM211.512 117.65V123.815C211.512 125.795 210.807 126.62 209.382 126.62C207.957 126.62 207.252 125.795 207.252 123.815V117.65H205.512V123.815C205.512 126.86 207.087 128.135 209.382 128.135C211.677 128.135 213.252 126.86 213.252 123.8V117.65H211.512Z"
      fill="black"
    />
    <path d="M304.5 123.5H226.5" stroke="black" stroke-width="0.8" />
    <path
      d="M398.964 521.65H397.224V532H398.964V527.395H402.924V532H404.664V521.65H402.924V525.895H398.964V521.65ZM406.951 521.65V532H413.296V530.5H408.691V527.395H412.846V525.895H408.691V523.165H413.296V521.65H406.951ZM416.689 521.65H414.949V532H421.294V530.5H416.689V521.65ZM429.198 523.21C428.463 522.07 427.308 521.515 425.658 521.515C423.228 521.515 422.208 522.82 422.208 524.38C422.208 526.135 423.333 527.095 425.328 527.515C427.128 527.905 427.593 528.415 427.593 529.24C427.593 529.99 427.143 530.62 425.718 530.62C424.533 530.62 423.918 530.23 423.303 529.495L421.938 530.44C422.793 531.595 424.038 532.135 425.808 532.135C428.298 532.135 429.333 530.71 429.333 529.165C429.333 527.305 428.253 526.525 426.168 526.075C424.728 525.76 423.948 525.37 423.948 524.38C423.948 523.51 424.578 523.03 425.643 523.03C426.813 523.03 427.368 523.45 427.878 524.155L429.198 523.21ZM432.982 521.65H431.242V532H432.982V521.65ZM441.158 521.65V528.775L436.898 521.65H435.398V532H437.078V524.965L441.293 532H442.838V521.65H441.158ZM453.48 532L449.535 525.82L452.805 521.65H450.675L446.865 526.645V521.65H445.125V532H446.865V529.24L448.395 527.275L451.395 532H453.48ZM456.639 521.65H454.899V532H456.639V521.65Z"
      fill="black"
    />
    <path
      d="M530.941 216L526.996 209.82L530.266 205.65H528.136L524.326 210.645V205.65H522.586V216H524.326V213.24L525.856 211.275L528.856 216H530.941ZM538.137 205.65V211.815C538.137 213.795 537.432 214.62 536.007 214.62C534.582 214.62 533.877 213.795 533.877 211.815V205.65H532.137V211.815C532.137 214.86 533.712 216.135 536.007 216.135C538.302 216.135 539.877 214.86 539.877 211.8V205.65H538.137ZM549.491 211.485V210.165C549.491 206.91 547.931 205.515 545.606 205.515C543.296 205.515 541.736 206.91 541.736 210.165V211.485C541.736 214.74 543.296 216.135 545.606 216.135C547.931 216.135 549.491 214.74 549.491 211.485ZM543.476 210.165C543.476 207.93 544.226 207.03 545.606 207.03C546.986 207.03 547.751 207.93 547.751 210.165V211.485C547.751 213.72 546.986 214.62 545.606 214.62C544.226 214.62 543.476 213.72 543.476 211.485V210.165ZM554.88 212.22C557.28 212.22 558.69 211.02 558.69 208.92C558.69 206.79 557.265 205.65 554.88 205.65H551.355V216H553.095V212.22H554.88ZM553.095 210.72V207.165H554.7C556.29 207.165 556.95 207.795 556.95 208.92C556.95 210.105 556.29 210.72 554.7 210.72H553.095ZM562.078 205.65H560.338V216H562.078V205.65ZM571.83 211.485V210.165C571.83 206.91 570.27 205.515 567.945 205.515C565.635 205.515 564.075 206.91 564.075 210.165V211.485C564.075 214.74 565.635 216.135 567.945 216.135C570.27 216.135 571.83 214.74 571.83 211.485ZM565.815 210.165C565.815 207.93 566.565 207.03 567.945 207.03C569.325 207.03 570.09 207.93 570.09 210.165V211.485C570.09 213.72 569.325 214.62 567.945 214.62C566.565 214.62 565.815 213.72 565.815 211.485V210.165Z"
      fill="black"
    />
    <path d="M391 268V210H507.5" stroke="black" stroke-width="0.8" />
    <path
      d="M33.77 463.65V465.165H36.755V474H38.495V465.165H41.465V463.65H33.77ZM48.7152 463.65V469.815C48.7152 471.795 48.0102 472.62 46.5852 472.62C45.1602 472.62 44.4552 471.795 44.4552 469.815V463.65H42.7152V469.815C42.7152 472.86 44.2902 474.135 46.5852 474.135C48.8802 474.135 50.4552 472.86 50.4552 469.8V463.65H48.7152ZM60.3997 474L58.1947 469.515C59.3947 469.08 60.0697 468.165 60.0697 466.74C60.0697 464.685 58.6447 463.65 56.2597 463.65H52.7347V474H54.4747V469.8H56.4847L58.4797 474H60.3997ZM54.4747 468.3V465.165H56.1397C57.6097 465.165 58.3297 465.57 58.3297 466.74C58.3297 467.91 57.6097 468.3 56.1397 468.3H54.4747ZM70.2596 474L66.3146 467.82L69.5846 463.65H67.4546L63.6446 468.645V463.65H61.9046V474H63.6446V471.24L65.1746 469.275L68.1746 474H70.2596ZM77.4554 463.65V469.815C77.4554 471.795 76.7504 472.62 75.3254 472.62C73.9004 472.62 73.1954 471.795 73.1954 469.815V463.65H71.4554V469.815C71.4554 472.86 73.0304 474.135 75.3254 474.135C77.6204 474.135 79.1954 472.86 79.1954 469.8V463.65H77.4554Z"
      fill="black"
    />
    <path d="M276.5 527H384" stroke="black" stroke-width="0.8" />
    <path
      d="M24.1602 316.65V318.165H27.1452V327H28.8852V318.165H31.8552V316.65H24.1602ZM33.3426 327L34.0476 324.855H37.7826L38.4876 327H40.3326L36.7326 316.65H35.0826L31.4826 327H33.3426ZM35.9076 319.17L37.2876 323.355H34.5276L35.9076 319.17ZM43.1635 316.65H41.5135V327H43.1935V320.115L45.5185 325.005H46.7485L49.1185 320.07V327H50.7985V316.65H49.1335L46.1485 322.65L43.1635 316.65ZM56.6108 323.22C59.0108 323.22 60.4208 322.02 60.4208 319.92C60.4208 317.79 58.9958 316.65 56.6108 316.65H53.0858V327H54.8258V323.22H56.6108ZM54.8258 321.72V318.165H56.4308C58.0208 318.165 58.6808 318.795 58.6808 319.92C58.6808 321.105 58.0208 321.72 56.4308 321.72H54.8258ZM61.9188 316.65V327H68.2638V325.5H63.6588V322.395H67.8138V320.895H63.6588V318.165H68.2638V316.65H61.9188ZM77.5819 327L75.3769 322.515C76.5769 322.08 77.2519 321.165 77.2519 319.74C77.2519 317.685 75.8269 316.65 73.4419 316.65H69.9169V327H71.6569V322.8H73.6669L75.6619 327H77.5819ZM71.6569 321.3V318.165H73.3219C74.7919 318.165 75.5119 318.57 75.5119 319.74C75.5119 320.91 74.7919 321.3 73.3219 321.3H71.6569ZM79.0868 316.65V327H85.4318V325.5H80.8268V322.395H84.9818V320.895H80.8268V318.165H85.4318V316.65H79.0868Z"
      fill="black"
    />
    <path d="M59 339V354H247V381" stroke="black" stroke-width="0.8" />
    <path d="M161.5 497.5V469H92.5" stroke="black" stroke-width="0.8" />
  </svg>
);
