import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { theme } from "../../theme/theme";
import { LocaleContext } from "../../contexts/LocaleContext";
import * as snippet from "../../locales";
import { Switch } from "./Switch";
import { Radio } from "./Radio";

export const OrderForm = ({ data, prices, isLightBg, redirectOnSuccess }) => {
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

  // Price calculation
  const priceTable = {
    base: {
      "JCAD MÄÄRÄT": prices.tuotteet[0].value,
      "JCAD MÄÄRÄT + kustannuslaskenta":
        prices.tuotteet[0].value + prices.extraHinnasto[12],
      "LVI – MÄÄRÄT": prices.tuotteet[1].value,
      "SÄHKÖ – MÄÄRÄT": prices.tuotteet[2].value,
    },
  };

  let price = priceTable.base[formData.sovellus];
  if (
    formData.sopimuskausi === "48 kk" &&
    formData.sovellus !== "JCAD MÄÄRÄT + kustannuslaskenta"
  ) {
    price = price + prices.valikkoSopimuskausi[1].value; // -130
  }
  if (
    formData.sopimuskausi === "48 kk" &&
    formData.sovellus === "JCAD MÄÄRÄT + kustannuslaskenta"
  ) {
    price =
      price -
      prices.extraHinnasto[12] +
      prices.valikkoSopimuskausi[1].value +
      prices.extraHinnasto[48];
  }

  let kayttajiaNumber = parseInt(formData.kayttajia);
  if (kayttajiaNumber > 0) {
    price = price * kayttajiaNumber;
  }

  const onInputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [key]: value });
  };

  const onSwitchChange = (e) => {
    setFormData({ ...formData, [e.target.name]: !formData[e.target.name] });
  };

  const onRadioChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          if (redirectOnSuccess) {
            window.plausible("Teki tilauksen");
            window.location.href = redirectOnSuccess;
          } else {
            setShowMessage(messages.submitSucces);
          }
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
            {input.type === "number" && (
              <div className="input">
                <label htmlFor={input.name}>
                  {input.label} {input.isRequired && "*"}
                </label>
                <input
                  id={input.name}
                  name={input.name}
                  type="number"
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
            {input.type === "switch" && (
              <Switch
                data={input}
                styles={isLightBg ? stylesLightBg : stylesDarkBg}
                onChange={onSwitchChange}
                value={formData[input.name]}
              />
            )}
            {input.type === "radio" && (
              <Radio
                data={input}
                styles={isLightBg ? stylesLightBg : stylesDarkBg}
                onChange={onRadioChange}
                value={formData[input.name]}
              />
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
            {input.type === "alustava" && (
              <div
                className="row"
                css={`
                  margin: 15px 0;
                  h4 {
                    font-weight: 400;
                    font-size: 16px;
                    min-width: fit-content;
                    padding-right: 30px;
                  }
                  .total {
                    font-size: 36px;
                    margin: 10px 0;
                  }
                  .onboarding,
                  .vat {
                    opacity: 0.7;
                  }
                `}
              >
                <h4>Hinta:</h4>
                <div className="col">
                  <span className="onboarding">Aloitusmaksu 2490 € +</span>
                  <span className="total">{price} €/kk</span>
                  <span className="vat">+ alv. 24 %</span>
                </div>
              </div>
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

const stylesDarkBg = {
  label: "rgba(255,255,255,0.6)",
  labelFocus: "#fff",
  inputColor: "#fff",
  border: "#333375",
  borderFocus: "#fff",
  background: "#333375",
  backgroundFocus: "none",
  buttonBackground: "#fff",
  buttonBorder: "#fff",
  buttonColor: theme.primary,
  placeholder: "rgba(255,255,255,0.3)",
  switch: "rgba(255,255,255,0.7)",
  switchColor: "rgba(255,255,255,0.8)",
  switchBg: "#333274",
  switchActive: "rgba(255,255,255,1)",
  switchBgActive: "rgba(255,255,255,0.5)",
  switchBorderFocus: "rgba(255,255,255,0.5)",
  messageColor: "#fff",
};
const stylesLightBg = {
  label: "rgba(0,0,0,0.6)",
  labelFocus: "#000",
  inputColor: "#000",
  border: "rgba(0,0,0,0)",
  borderFocus: "rgba(0,0,0,0.6)",
  background: "rgba(0,0,0,0.05)",
  backgroundFocus: "none",
  buttonBackground: "none",
  buttonBorder: "#000",
  buttonColor: "#000",
  placeholder: "rgba(0,0,0,0.3)",
  switch: "rgba(255,255,255,0.5)",
  switchBg: "rgba(28, 28, 102, 0.4)",
  switchActive: "rgba(255,255,255,1)",
  switchBgActive: "rgba(28, 28, 102, 1)",
  switchBorderFocus: "rgba(255,255,255,0.5)",
  messageColor: "#000",
};
