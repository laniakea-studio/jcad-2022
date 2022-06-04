import React, { useState } from "react";
import styled from "styled-components";

export const BurgerIcon = ({ menuOpen, onClick }) => {
  return (
    <MenuIcon
      id="hamburger-icon"
      className={menuOpen ? "active" : "null"}
      href="#"
      title="Menu"
      onClick={onClick}
    >
      <span className="line line-1"></span>
      <span className="line line-2"></span>
      <span className="line line-3"></span>
    </MenuIcon>
  );
};

const menuOptions = {
  heightLine: "1px",
  heightIcon: "26px",
  transitionTime: "0.2s",
  rotation: "45deg",
  translateY: "13px",
  translateX: 0,
};

const MenuIcon = styled.a`
  width: 40px;
  height: ${menuOptions.heightIcon};
  position: relative;
  z-index: 3;
  display: none;
  @media (max-width: 1024px) {
    display: block;
  }
  .line {
    display: block;
    background: #fff;
    width: 40px;
    height: ${menuOptions.heightLine};
    position: absolute;
    left: 0;
    border-radius: calc(${menuOptions.heightLine} / 2);
    transition: all ${menuOptions.transitionTime};
    -webkit-transition: all ${menuOptions.transitionTime};
    -moz-transition: all ${menuOptions.transitionTime};

    &.line-1 {
      top: 0;
    }
    &.line-2 {
      top: 50%;
    }
    &.line-3 {
      top: 100%;
    }
  }
  &.active {
    .line-1 {
      transform: translateY(${menuOptions.translateY})
        translateX(${menuOptions.translateX}) rotate(${menuOptions.rotation});
      -webkit-transform: translateY(${menuOptions.translateY})
        translateX(${menuOptions.translateX}) rotate(${menuOptions.rotation});
      -moz-transform: translateY(${menuOptions.translateY})
        translateX(${menuOptions.translateX}) rotate(${menuOptions.rotation});
    }
    .line-2 {
      opacity: 0;
    }
    .line-3 {
      transform: translateY(calc(${menuOptions.translateY} * -1))
        translateX(${menuOptions.translateX})
        rotate(calc(${menuOptions.rotation} * -1));
      -webkit-transform: translateY(calc(${menuOptions.translateY} * -1))
        translateX(${menuOptions.translateX})
        rotate(calc(${menuOptions.rotation} * -1));
      -moz-transform: translateY(calc(${menuOptions.translateY} * -1))
        translateX(${menuOptions.translateX})
        rotate(calc(${menuOptions.rotation} * -1));
    }
  }
`;
