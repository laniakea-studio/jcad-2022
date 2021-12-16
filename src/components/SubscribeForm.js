import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { theme } from "../theme/theme";
import { SvgClose } from "./SvgCollection.js";
import en from "../locales/en.yml";
import fi from "../locales/fi.yml";

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export const SubscribeForm = ({ locale }) => {
  const text = locale === "fi" ? fi : en;
  const [formData, setFormData] = useState({
    "form-name": "Uutiskirje",
    email: "",
  });
  const [showMessage, setShowMessage] = useState(null);

  const messages = {
    submitSucces: text.contact.submitSuccess,
    fillAllInputs: text.contact.fillAllInputs,
  };

  const onInputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    console.log(formData);
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
    <Form name="Uutiskirje" method="POST" data-netlify="true">
      <div className="inputBox">
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => onInputChange(e)}
        />
        <label htmlFor="email" className="contactLabel">
          {text.contact.email}
        </label>
      </div>
      <button type="submit" className="btn" onClick={(e) => submitForm(e)}>
        {text.contact.send}
      </button>
      <div className="messageBox">
        {showMessage && (
          <>
            <span>{showMessage}</span>
            <button className="resetBtn" onClick={() => setShowMessage(null)}>
              <SvgClose />
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
  padding-top: 40px;
  .inputBox {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 20px;
  }
  label {
    font-size: 13px;
    margin-bottom: 5px;
    cursor: pointer;
    color: ${theme.primary};
    opacity: 0.6;
    font-weight: 700;
  }
  label:first-of-type {
    position: absolute;
    top: -20px;
  }
  textarea,
  input {
    border-radius: 3px;
    margin-bottom: 20px;
    color: ${theme.primary};
    padding: 20px;
    transition: border-color 0.2s;
    background: #fff;
    border-color: rgba(255, 255, 255, 0.5);
    &:focus {
      border-color: #fff;
      transition: border-color 0.2s;
    }
  }
  textarea:focus + label.textareaLabel {
    opacity: 1;
  }
  input:focus + label.contactLabel {
    opacity: 1;
  }

  textarea {
    flex: 1;
  }
  input {
    height: 35px;
  }
  button:not(.resetBtn) {
    width: 200px;
  }
  .messageBox {
    padding: 12px;
    text-align: left;
    font-weight: 500;
    color: #fff;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    button.resetBtn {
      height: 35px;
      width: 35px;
    }
    span {
      padding: 0 8px;
    }
    svg path {
      fill: ${theme.primary};
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
