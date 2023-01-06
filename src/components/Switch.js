import React from "react";
import styled from "styled-components";

export const Switch = ({ handleSwitch, label, checked }) => {
  return (
    <Styles>
      <label className="switch">
        <input
          id="kustannusSwitch"
          type="checkbox"
          onChange={handleSwitch}
          checked={checked}
        />
        <span className="slider"></span>
      </label>
      <label for="kustannusSwitch" className="text">
        {label}
      </label>
    </Styles>
  );
};

const Styles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .text {
    cursor: pointer;
    padding-left: 10px;
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
    background-color: #1c1c66;
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
    background-color: #fff;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    opacity: 0.4;
  }

  input:checked + .slider {
    background-color: #28287e;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #fff;
  }

  input:checked + .slider:before {
    background-color: #fff;
    opacity: 1;
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;
