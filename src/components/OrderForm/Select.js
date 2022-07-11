import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../theme/theme";

// TODO: Not ready. Add key down nav, eg.g https://codepen.io/CrocoDillon/pen/MpMoZe. This source: https://codepen.io/Chineze/pen/MqvadV

export const Select = () => {
  const [selectedOption, setSelectedOption] = useState("blue");

  const options = {
    red: "Red",
    blue: "Blue",
    green: "Green",
  };
  const name = "select";

  return (
    <SelectDropdown
      name={name}
      onChange={(selectedOption) => {
        setSelectedOption(selectedOption);
      }}
      options={options}
      selectedOption={selectedOption}
    />
  );
};

const SelectDropdown = (props) => {
  const [selectedOption, setSelectedOption] = useState(
    props.selectedOption || props.defaultOption
  );
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelectedOption = (event) => {
    const selectedOption = event.target.getAttribute("value");
    const { onChange } = props;

    setSelectedOption(selectedOption);
    setShowDropdown(false);

    if (onChange) {
      onChange(selectedOption);
    }
  };

  const { options, name } = props;
  const optionKeys = Object.keys(options);

  let styles = {
    dropdown: {
      color: "#6f6f6f",
      letterSpacing: 0.5,
      fontWeight: 300,
      outline: "none",
      position: "relative",
      width: "250px",
      display: "inline-block",
    },
    icon: {
      color: "#CCCCCC",
      fontSize: 16,
      transform: "none",
      transition: "all 0.1s ease-in",
    },
    list: {
      background: "#FFFFFF",
      border: "3px solid #EEEEEE",
      borderBottom: "none",
      borderBottomLeftRadius: "3px",
      borderBottomRightRadius: "3px",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      boxShadow: "0 6px 16px 0 rgba(0, 0, 0, 0.06)",
      listStyle: "none",
      marginTop: -1,
      overflow: "scroll",
      padding: 0,
      position: "absolute",
      width: "250px",
      zIndex: 10,
    },
    listItem: {
      alignItems: "center",
      borderBottom: "3px solid #EEEEEE",
      cursor: "pointer",
      display: "flex",
      fontSize: "14px",
      justifyContent: "space-between",
      paddingBottom: 15,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 15,
      icon: {
        color: "#31D0EC",
        fontSize: 14,
      },
    },
    selectedOption: {
      alignItems: "center",
      background: "#FFFFFF",
      border: "3px solid #EEEEEE",
      ...(showDropdown && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }),
      ...(!showDropdown && {
        borderBottomLeftRadius: "3px",
        borderBottomRightRadius: "3px",
      }),
      borderTopLeftRadius: "3px",
      borderTopRightRadius: "3px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: 15,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 15,
      marginBottom: -3,
    },
    selectedOptionLink: {
      color: "inherit",
      fontSize: 14,
    },
  };

  return (
    <div
      style={styles.dropdown}
      tabIndex={1}
      css={`
        a.SelectedOption {
          width: 100%;
          display: flex;
          svg {
            width: 10px;
            margin-left: auto;
          }
        }
        ul {
          max-height: 0;
          transition: max-height 0.5s;

          &.show {
            max-height: 250px;
          }

          li {
            &:hover {
              background: #efefef;
            }

            &:focus {
              background: #ffffff;
            }
          }
        }
      `}
    >
      <div style={styles.selectedOption} onClick={toggleDropdown}>
        <a className={`SelectedOption`} style={styles.selectedOptionLink}>
          {options[selectedOption]}
          {showDropdown ? <ChevronUp /> : <ChevronDown />}
        </a>
      </div>
      <ul className={`${showDropdown ? "show" : ""}`} style={styles.list}>
        {optionKeys.map((optionKey, index) => (
          <li
            style={styles.listItem}
            key={index}
            name={name}
            value={optionKey}
            onClick={handleSelectedOption}
          >
            {options[optionKey]}
            <i
              className={`far fa-${
                selectedOption === optionKey ? "dot-circle" : "circle"
              }`}
              style={styles.listItem.icon}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const ChevronDown = () => (
  <svg viewBox="0 0 10 7">
    <path
      d="M2.08578644,6.5 C1.69526215,6.89052429 1.69526215,7.52368927 2.08578644,7.91421356 C2.47631073,8.30473785 3.10947571,8.30473785 3.5,7.91421356 L8.20710678,3.20710678 L3.5,-1.5 C3.10947571,-1.89052429 2.47631073,-1.89052429 2.08578644,-1.5 C1.69526215,-1.10947571 1.69526215,-0.476310729 2.08578644,-0.0857864376 L5.37867966,3.20710678 L2.08578644,6.5 Z"
      transform="translate(5.000000, 3.207107) rotate(90.000000) translate(-5.000000, -3.207107) "
    />
  </svg>
);

const ChevronUp = () => (
  <svg viewBox="0 0 10 8">
    <path
      d="M2.08578644,7.29289322 C1.69526215,7.68341751 1.69526215,8.31658249 2.08578644,8.70710678 C2.47631073,9.09763107 3.10947571,9.09763107 3.5,8.70710678 L8.20710678,4 L3.5,-0.707106781 C3.10947571,-1.09763107 2.47631073,-1.09763107 2.08578644,-0.707106781 C1.69526215,-0.316582489 1.69526215,0.316582489 2.08578644,0.707106781 L5.37867966,4 L2.08578644,7.29289322 Z"
      transform="translate(5.000000, 4.000000) rotate(-90.000000) translate(-5.000000, -4.000000) "
    />
  </svg>
);
