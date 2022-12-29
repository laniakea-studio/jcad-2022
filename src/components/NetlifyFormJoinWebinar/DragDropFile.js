import React, { useState, useRef } from "react";
import styled from "styled-components";
import { theme } from "../../theme/theme";

// Credits: https://www.codemzy.com/blog/react-drag-drop-file-upload
const options = {
  maxFiles: 1,
  maxSize: 8_000_000,
  validFormats: ["image/jpeg", "image/png", "image/jpg", "application/pdf"],
};

export const DragDropFile = ({ name, styles, handleFile, value }) => {
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState([]);
  const inputRef = useRef(null);

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    setDragActive(false);
    if (!validateFile(files)) return;
    if (files && files[0]) {
      handleFile(name, files[0]);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    const files = e.target.files;
    if (!validateFile(files)) return;
    if (files && files[0]) {
      handleFile(name, files[0]);
    }
  };
  const clearInput = (e) => {
    e.preventDefault();
    handleFile(name, null);
  };

  const validateFile = (files) => {
    let isValid = true;
    setErrors([]);

    if (files.length > options.maxFiles) {
      isValid = false;
      setErrors([
        ...errors,
        "Voit lähettää vain yhden liitetiedoston kerralla.",
      ]);
      return isValid;
    }
    if (files[0].size > options.maxSize) {
      isValid = false;
      setErrors([...errors, "Ähh... Tiedosto on liian suuri (max 8 MB)"]);
    }
    if (!options.validFormats.includes(files[0].type)) {
      isValid = false;
      setErrors([
        ...errors,
        "Höh... Tiedoston formaatti ei näytä olevan PDF tai kuva (.pdf, .jpg, .jpge, .png).",
      ]);
    }

    return isValid;
  };

  return (
    <>
      {!value && (
        <div
          id="form-file-upload"
          onDragEnter={handleDrag}
          css={`
            margin-bottom: 15px;
            #input-file-upload {
              display: none;
            }

            #label-file-upload {
              min-height: 100px;
              padding: 20px;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              border-width: 2px;
              border-radius: 4px;
              border-style: dashed;
              border-color: #cbd5e1;
              background-color: ${styles.background};
              p {
                margin: 0;
                line-height: 1.2;
              }
            }

            #label-file-upload.drag-active {
              background-color: #ffffff;
              border-color: #6f8aab;
              svg {
                opacity: 1;
              }
            }

            #drag-file-element {
              position: absolute;
              width: 100%;
              height: 100%;
              border-radius: 1rem;
              top: 0px;
              right: 0px;
              bottom: 0px;
              left: 0px;
            }
          `}
        >
          <input
            ref={inputRef}
            type="file"
            id="input-file-upload"
            multiple={true}
            name={name}
            onChange={handleChange}
          />
          <label
            id="label-file-upload"
            htmlFor="input-file-upload"
            className={dragActive ? "drag-active" : ""}
            css={`
              text-align: center;
              span {
                font-size: 14px;
              }
            `}
          >
            <div
              css={`
                svg {
                  display: flex;
                  margin: 10px auto;
                  width: 40px;
                  height: 40px;
                  opacity: 0.5;
                }
              `}
            >
              <p>
                Lisää PDF tai kuva raahaamalla tai <u>napauta</u>
              </p>
              <SvgFile />
              <span>Tiedostokoko max. 8 MB</span>
            </div>
          </label>
          {dragActive && (
            <div
              id="drag-file-element"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            ></div>
          )}
        </div>
      )}
      {errors.length > 0 &&
        errors.map((error) => (
          <p
            className="row align-center"
            css={`
              font-size: 13px;
              svg {
                margin-right: 5px;
              }
            `}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M23 21.5L12 2.5L1 21.5H23ZM11 18.5V16.5H13V18.5H11ZM11 14.5H13V10.5H11V14.5Z"
                fill="#FFB803"
              />
            </svg>
            {error}
          </p>
        ))}
      {value && (
        <>
          <span
            css={`
              font-size: 13px;
              color: rgba(0, 0, 0, 0.6);
              margin: 10px 0 5px;
            `}
          >
            Lisätty:
          </span>
          <div
            className="row align-center"
            css={`
              margin-bottom: 20px;
              svg {
                width: auto;
                margin-right: 5px;
              }
              button {
                margin-left: auto;
                span {
                  font-size: 13px;
                  color: ${styles.label};
                }
                svg path {
                  fill: ${styles.label};
                  transition: all 0.2s;
                }
                &:hover {
                  svg path {
                    fill: ${styles.labelFocus};
                  }
                  span {
                    color: ${styles.labelFocus};
                  }
                }
              }
            `}
          >
            <SvgFile />

            <span>{value.name}</span>
            <button onClick={(e) => clearInput(e)} className="flex all-center">
              <span>Poista</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.5 4H19V6H5V4H8.5L9.5 3H14.5L15.5 4ZM8 21C6.9 21 6 20.1 6 19V7H18V19C18 20.1 17.1 21 16 21H8Z"
                  fill="#000053"
                  fill-opacity="0.5"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </>
  );
};

const SvgFile = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.01 4C4.01 2.9 4.9 2 6 2H14L20 8V20C20 21.1 19.1 22 18 22H5.99C4.89 22 4 21.1 4 20L4.01 4ZM13 3.5V9H18.5L13 3.5Z"
      fill="#838383"
    />
  </svg>
);
