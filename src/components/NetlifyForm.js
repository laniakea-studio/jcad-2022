import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { theme } from "../theme/theme";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";

/* E.g. data 
 const form = {
    name: "Webinaari",
    inputs: [
      {
        type: "email",
        name: "email",
        label: text.contact.email,
        isRequired: true,
      },
      { type: "hidden", name: "webinarName", value: page.title },
      { type: "hidden", name: "webinarDate", value: date },
      { type: "submit", text: "Ilmoittaudu" },
    ],
    messages: {
      submitSucces: "Kiitos ilmoittautumisesta!",
      fillAllInputs: text.contact.fillAllInputs,
    },
  }
  */

const stylesDarkBg = {
  label: "rgba(255,255,255,0.6)",
  labelFocus: "#fff",
  inputColor: "#fff",
  border: "rgba(255,255,255,0.6)",
  borderFocus: "#fff",
  background: "none",
  backgroundFocus: "none",
  buttonBackground: "#fff",
  buttonBorder: "#fff",
  buttonColor: theme.primary,
  placeholder: "rgba(255,255,255,0.3)",
  messageColor: "#fff",
};
const stylesLightBg = {
  label: "rgba(0,0,0,0.6)",
  labelFocus: "#000",
  inputColor: "#000",
  border: "none",
  borderFocus: "rgba(0,0,0,0.6)",
  background: "rgba(0,0,0,0.05)",
  backgroundFocus: "none",
  buttonBackground: "none",
  buttonBorder: "#000",
  buttonColor: "#000",
  placeholder: "rgba(0,0,0,0.3)",
  messageColor: "#000",
};

export const NetlifyForm = ({ data, isLightBg }) => {
  const { name, inputs, messages } = data;
  const styles = isLightBg ? stylesLightBg : stylesDarkBg;

  let schema = {
    "form-name": name,
  };

  const schemaInputs = inputs.filter((input) => input.type !== "submit");
  schema = schemaInputs.reduce(
    (o, key) => ({ ...o, [key.name]: key.value || "" }),
    schema
  );

  const [formData, setFormData] = useState(schema);
  const [showMessage, setShowMessage] = useState(null);

  console.log(formData);
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
          setFormData(schema);
        })
        .catch((error) => alert(error));
    } else {
      setShowMessage(messages.fillAllInputs);
    }
  };

  const isFormValid = () => {
    let formIsValid = false;

    const requiredFields = inputs.filter((input) => input.isRequired);
    formIsValid = requiredFields.every((field) => formData[field.name]);

    return formIsValid;
  };

  return (
    <form
      name={schema["form-name"]}
      method="POST"
      data-netlify="true"
      css={`
        font-weight: 400;
        height: 100%;
        width: 100%;
        position: relative;
        max-width: 560px;
        display: flex;
        flex-direction: column;
        .input {
          display: flex;
          flex-direction: column;
          position: relative;
          padding-bottom: 5px;
        }
        .input:focus-within label {
          color: ${styles.labelFocus};
        }
        label {
          font-size: 16px;
          margin-bottom: 5px;
          font-weight: 400;
          cursor: pointer;
          color: ${styles.label};
        }
        .input textarea,
        .input input {
          border-radius: 4px;
          margin-bottom: 10px;
          color: ${styles.inputColor};
          padding: 20px;
          transition: border-color 0.2s;
          border: 1px solid ${styles.border};
          background: ${styles.background};
          &:focus {
            border-color: ${styles.borderFocus};
            transition: border-color 0.2s;
          }
          &::placeholder {
            color: ${styles.placeholder};
          }
        }
        input {
          height: 50px;
        }

        button.submit {
          border-radius: 3px;
          color: ${styles.buttonColor};
          background: ${styles.buttonBackground};
          border: 1px solid ${styles.buttonBorder};
          height: 50px;
          text-transform: uppercase;
        }
        .messageBox {
          padding: 12px;
          text-align: center;
          font-weight: 500;
          color: ${styles.messageColor};
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          span {
            padding: 0 8px;
          }
        }
      `}
    >
      {inputs.map((input) => {
        return (
          <>
            {input.type === "text" && (
              <div className="input">
                <label htmlFor={input.name}>
                  {input.label} {input.isRequired && "*"}
                </label>
                <input
                  id={input.name}
                  name={input.name}
                  type="text"
                  value={formData[input.name]}
                  placeholder={input.placeholder}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            )}
            {input.type === "email" && (
              <div className="input">
                <label htmlFor={input.name}>
                  {input.label} {input.isRequired && "*"}
                </label>
                <input
                  id={input.name}
                  name={input.name}
                  type="email"
                  value={formData[input.name]}
                  placeholder={input.placeholder}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            )}
            {input.type === "textarea" && (
              <div className="input">
                <label htmlFor={input.name}>
                  {input.label} {input.isRequired && "*"}
                </label>
                <textarea
                  id={input.name}
                  name={input.name}
                  value={formData[input.name]}
                  onChange={(e) => onInputChange(e)}
                  placeholder={input.placeholder}
                  rows="6"
                />
              </div>
            )}
            {input.type === "hidden" && (
              <input type="hidden" name={input.name} />
            )}
            {input.type === "submit" && (
              <button
                className="submit"
                type="submit"
                onClick={(e) => submitForm(e)}
              >
                {input.text}
              </button>
            )}
          </>
        );
      })}
      <div className="messageBox">
        {showMessage && <span>{showMessage}</span>}
      </div>
    </form>
  );
};

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}
