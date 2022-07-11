import React, { useState, useRef } from "react";
import styled from "styled-components";
import { theme } from "../../theme/theme";

function handleFile(files) {
  alert("Number of files: " + files.length);
}

// drag drop file component
export const DragDropFile = ({ name, styles }) => {
  const [dragActive, setDragActive] = useState(false);
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
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log(e.dataTransfer.files);
      handleFile(e.dataTransfer.files);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
  };
  return (
    <div
      id="form-file-upload"
      onDragEnter={handleDrag}
      css={`
        margin-bottom: 15px;
        #input-file-upload {
          display: none;
        }

        #label-file-upload {
          min-height: 60px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-width: 2px;
          border-radius: 1rem;
          border-style: dashed;
          border-color: #cbd5e1;
          background-color: ${styles.background};
          p {
            margin: 0;
          }
        }

        #label-file-upload.drag-active {
          background-color: #ffffff;
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
        onChange={handleChange}
      />
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className={dragActive ? "drag-active" : ""}
      >
        <div>
          <p>Lisää PDF tai kuva. Tiedostokoko max. 8 MB.</p>
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
  );
};
