import React, { useContext, useState, useEffect } from "react";
import { LocaleContext } from "../contexts/LocaleContext";
import * as snippet from "../locales";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { Layout } from "../components/Layout";
import { theme } from "../theme/theme";
import { Booking } from "../components/Booking";
import { useSetPageTitle } from "../hooks/useSetPageTitle";

const Page = ({ pageContext }) => {
  const { locale } = useContext(LocaleContext);

  const { page } = pageContext.data;

  const [showPlayer, setShowPlayer] = useState(true);

  const handleHasJoined = () => {
    setShowPlayer(true);
  };

  // Date Format
  let d = new Date(page.webinaarinAjankohta);
  const date = d.toLocaleDateString("fi-FI", {
    weekday: "short",
    month: "numeric",
    day: "numeric",
  });
  const hour = d.toLocaleTimeString("fi-FI", {
    timeStyle: "short",
  });

  return (
    <>
      <HelmetDatoCms seo={useSetPageTitle(`LIVE: ${page.title}`)} />
      <Layout locale={locale} transparent={false}>
        <main
          className="pagePadding flex"
          css={`
            color: #fff;
            padding-top: 94px;
            background: ${theme.primary};
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          `}
        >
          <section
            className="col padding container align-center"
            css={`
              padding-top: 60px;
              padding-bottom: 160px;
              min-height: 100vh;
              .SubTitle {
                text-transform: uppercase;
                font-weight: 500;
              }
              h1 {
                text-transform: none;
                font-size: 36px;
                margin: 5px auto 15px;
              }
              p.AskSomething {
                margin-top: 20px;
                font-weight: 600;
              }
            `}
          >
            <span className="SubTitle">Webinaari</span>
            <h1>{page.title}</h1>
            <div
              className="row align-center justify-center"
              css={`
                svg {
                  width: 20px;
                  margin-bottom: -7px;
                  margin-right: 5px;
                }
                span:not(:last-child) {
                  margin-right: 40px;
                }
              `}
            >
              <span className="inline-flex">
                <DateSvg />
                {date}
              </span>
              <span className="inline-flex">
                <HourSvg />
                {hour}
              </span>
            </div>
            <div
              css={`
                position: relative;
                width: 100%;
              `}
            >
              <div
                style={{
                  visibility: showPlayer ? "visible" : "hidden",
                }}
                dangerouslySetInnerHTML={{ __html: page.restreamCode }}
                css={`
                  margin-top: 30px;
                  width: 100%;
                `}
              />
              <div
                style={{ display: showPlayer ? "none" : "flex" }}
                css={`
                  height: 100%;
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  padding-top: 50px;
                  p {
                    font-size: 18px;
                    margin-bottom: 4px;
                  }
                  span {
                    font-size: 15px;
                    opacity: 0.7;
                    margin-bottom: 20px;
                  }
                `}
                className="col align-center"
              >
                <p>Liity webinaariin syöttämällä sähköpostisi.</p>
                <span>
                  Sähköpostin ei tarvitse olla sama, jolla ilmoittauduit.
                </span>

                <Form
                  data={{
                    email: "",
                    webinarName: page.title,
                    webinarDate: date,
                    timestamp: "",
                  }}
                  handleHasJoined={handleHasJoined}
                />
              </div>
              <div
                style={{
                  visibility: showPlayer ? "visible" : "hidden",
                }}
                css={`
                  .container {
                    border-left: none;
                    border-right: none;
                  }
                `}
              >
                <Booking />
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default Page;

const Form = ({ data, handleHasJoined }) => {
  const [formData, setFormData] = useState(data);
  const [showMessage, setShowMessage] = useState(null);

  const onInputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [key]: value });
  };

  console.log(JSON.stringify({ data: formData }));

  const submitForm = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      fetch("https://hooks.zapier.com/hooks/catch/11989663/bjuiga4/", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then((res) => {
          console.log(res);
          handleHasJoined();
        })
        .catch((error) => alert(error));
    } else {
      setShowMessage("Tarkista osoitteen kirjoitusasu.");
    }
  };

  const isFormValid = () => {
    let formIsValid = false;
    if (formData.email && validateEmail(formData.email)) {
      formIsValid = true;
    }
    return formIsValid;
  };

  return (
    <form
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
          font-weight: 600;
          letter-spacing: 0.05em;
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
      <div className="input">
        <label htmlFor="email">Sähköpostisi</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => onInputChange(e)}
        />
      </div>
      <button className="submit" type="submit" onClick={(e) => submitForm(e)}>
        Liity webinaariin
      </button>
      <div className="messageBox">
        {showMessage && <span>{showMessage}</span>}
      </div>
    </form>
  );
};

function validateEmail(email) {
  var re = /^\S+@\S+\.\S+$/;
  return re.test(email);
}

const styles = {
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

const DateSvg = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19.5 3.25004H20.5833C21.775 3.25004 22.75 4.22504 22.75 5.41671V20.5834C22.75 21.775 21.775 22.75 20.5833 22.75H5.41667C4.21417 22.75 3.25 21.775 3.25 20.5834V5.41671C3.25 4.22504 4.21417 3.25004 5.41667 3.25004H6.5V1.08337H8.66667V3.25004H17.3333V1.08337H19.5V3.25004ZM7.58333 10.8334H18.4167V13H7.58333V10.8334ZM20.5833 20.5834H5.41667V8.66671H20.5833V20.5834ZM7.58333 15.1667H15.1667V17.3334H7.58333V15.1667Z"
      fill="white"
    />
  </svg>
);

const HourSvg = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.9895 2.16663C7.00949 2.16663 2.16699 7.01996 2.16699 13C2.16699 18.98 7.00949 23.8333 12.9895 23.8333C18.9803 23.8333 23.8337 18.98 23.8337 13C23.8337 7.01996 18.9803 2.16663 12.9895 2.16663ZM13.0003 21.6666C8.21199 21.6666 4.33366 17.7883 4.33366 13C4.33366 8.21163 8.21199 4.33329 13.0003 4.33329C17.7887 4.33329 21.667 8.21163 21.667 13C21.667 17.7883 17.7887 21.6666 13.0003 21.6666ZM11.917 7.58329H13.542V13.2708L18.417 16.1633L17.6045 17.4958L11.917 14.0833V7.58329Z"
      fill="white"
    />
  </svg>
);
