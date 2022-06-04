import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { theme } from "../theme/theme";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";

/* E.g. data 
  {
    form: [
      {
        type: "text",
        name: "name",
        label: text.contact.name,
        placeholder: text.contact.name,
        isRequired: true,
      },
      {
        type: "email",
        name: "email",
        label: text.contact.email,
        placeholder: "Email",
        isRequired: true,
      },
      {
        type: "textarea",
        name: "message",
        label: text.contact.message,
        placeholder: "Kirjoita tähän",
        isRequired: false,
      },
      { type: "submit", text: text.contact.send },
    ],
    schema: {
      "form-name": "Ilmoittaudu",
      name: "",
      email: "",
      message: "",
    },
    messages: {
      submitSucces: text.contact.submitSuccess,
      fillAllInputs: text.contact.fillAllInputs,
    },
  }
*/

const styles = {
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
};

export const NetlifyForm = ({ data }) => {
  const { form, schema, messages } = data;
  /* Configure Form: form.name === schema[key] */

  const [formData, setFormData] = useState(schema);
  const [showMessage, setShowMessage] = useState(null);

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
    const requiredFields = form.filter((input) => input.isRequired);
    console.log({ requiredFields });
    formIsValid = requiredFields.every((field) => formData[field.name]);
    console.log({ formIsValid });

    return formIsValid;
  };

  return (
    <Form name={schema["form-name"]} method="POST" data-netlify="true">
      {form.map((input) => {
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
    </Form>
  );
};

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

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
  .input {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 20px;
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
  textarea,
  input {
    border-radius: 4px;
    margin-bottom: 10px;
    color: ${styles.inputColor};
    padding: 20px;
    transition: border-color 0.2s;
    border-color: ${styles.border};
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
    color: #fff;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    span {
      padding: 0 8px;
    }
  }
`;
