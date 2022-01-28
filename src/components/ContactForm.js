import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { theme } from "../theme/theme";
import { SvgX } from "./SvgCollection.js";
import en from "../locales/en.yml";
import fi from "../locales/fi.yml";

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export const ContactForm = ({ locale }) => {
  const text = locale === "fi" ? fi : en;
  const [formData, setFormData] = useState({
    "form-name": "Yhteydenotto",
    message: "",
    contact: "",
    name: "",
    company: "",
  });
  const [showMessage, setShowMessage] = useState(null);

  const messages = {
    submitSucces: text.contact.submitSuccess,
    fillAllInputs: text.contact.fillAllInputs,
  };

  const onInputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [key]: value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(formData),
      })
        .then(() => {
          setShowMessage(messages.submitSucces);
          setFormData({ message: "", contact: "", name: "", company: "" });
        })
        .catch((error) => alert(error));
    } else {
      setShowMessage(messages.fillAllInputs);
    }
  };

  const isFormValid = () => {
    let formIsValid = false;
    if (formData.message && formData.contact) {
      formIsValid = true;
    }
    return formIsValid;
  };

  return (
    <Form name="Yhteydenotto" method="POST" data-netlify="true">
      <div className="inputBox">
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={(e) => onInputChange(e)}
        />
        <label htmlFor="name" className="contactLabel">
          {text.contact.name}
        </label>
      </div>
      <div className="inputBox">
        <input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={(e) => onInputChange(e)}
        />
        <label htmlFor="company" className="contactLabel">
          {text.contact.company}
        </label>
      </div>
      <div className="inputBox">
        <input
          id="contact"
          name="contact"
          type="text"
          value={formData.contact}
          onChange={(e) => onInputChange(e)}
        />
        <label htmlFor="contact" className="contactLabel">
          {text.contact.phoneOrEmail}
        </label>
      </div>
      <div className="inputBox">
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={(e) => onInputChange(e)}
          rows="6"
        />
        <label htmlFor="message" className="textareaLabel">
          {text.contact.message}
        </label>
      </div>
      <button type="submit" onClick={(e) => submitForm(e)}>
        {text.contact.send}
      </button>
      <div className="messageBox">
        {showMessage && (
          <>
            <span>{showMessage}</span>
            <button className="resetBtn" onClick={() => setShowMessage(null)}>
              <SvgX />
            </button>
          </>
        )}
      </div>
    </Form>
  );
};

const Form = styled.form.attrs((props) => ({
  netlify: "netlify",
}))`
  font-weight: 400;
  height: 100%;
  width: 100%;
  position: relative;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  .inputBox {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 20px;
  }
  label {
    font-size: 16px;
    margin-bottom: 5px;
    cursor: pointer;
    color: #e6e6e6;
  }
  label:first-of-type {
    position: absolute;
    top: -20px;
  }
  textarea,
  input {
    border-radius: 3px;
    margin-bottom: 20px;
    color: ${theme.colorOnBlack};
    padding: 20px;
    transition: border-color 0.2s;
    border-color: #b9b9b9;
    &:focus {
      border-color: #fff;
      transition: border-color 0.2s;
    }
  }
  textarea:focus + label.textareaLabel {
    color: #fff;
  }
  input:focus + label.contactLabel {
    color: #fff;
  }

  textarea {
    flex: 1;
  }
  input {
    height: 50px;
  }
  button:not(.resetBtn) {
    border-radius: 3px;
    color: #000;
    background: #fff;
    border: 1px solid #fff;
    height: 50px;
  }
  .messageBox {
    padding: 12px;
    text-align: center;
    font-weight: 500;
    color: #fff;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    button.resetBtn {
      height: 35px;
      width: 35px;
    }
    span {
      padding: 0 8px;
    }
    svg path {
      fill: #fff;
      opacity: 0.5;
      padding: 5px;
      cursor: pointer;
    }
    svg:hover path {
      opacity: 0.9;
      transition: opacity 0.2s;
    }
  }
`;
