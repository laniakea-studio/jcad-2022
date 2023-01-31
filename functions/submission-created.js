require("dotenv").config();
const p = require("phin");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const { SENDINBLUE_API_KEY } = process.env;

var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = SENDINBLUE_API_KEY;

// Form names as in Netlify. CHANGE IN TWO PLACES
const forms = ["Webinaari", "Kustannuslaskenta-kampanja"];

exports.handler = async (event) => {
  const { data, form_name } = JSON.parse(event.body).payload;

  console.log({ data, form_name });

  if (form_name === "Get Started EN") {
    console.log("START");

    const post = await p({
      url: "https://jcad-trial-service.azurewebsites.net/license/create",
      method: "POST",
      data: {
        email: data.email,
      },
    });

    console.log("P", post);
  }

  if (!forms.includes(form_name)) {
    return console.log("No Netlify function for this form");
  }

  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  if (form_name === "Webinaari") {
    sendSmtpEmail = {
      to: [
        {
          email: data.email,
          //name: "",
        },
      ],
      templateId: 1,
      params: {
        webinar_name: data.webinarName,
        webinar_date_and_time: data.webinarDateAndTime,
      },
      headers: {
        "X-Mailin-custom":
          "custom_header_1:custom_value_1|custom_header_2:custom_value_2",
      },
    };
  }

  if (form_name === "Kustannuslaskenta-kampanja") {
    sendSmtpEmail = {
      to: [
        {
          email: data.email,
        },
      ],
      templateId: 2,
      headers: {
        "X-Mailin-custom":
          "custom_header_1:custom_value_1|custom_header_2:custom_value_2",
      },
    };
  }

  return apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log("API called successfully. Returned data: " + data);
    },
    function (error) {
      console.error("Error", error);
    }
  );
};

const data = JSON.stringify({
  name: "John Doe",
  job: "Content Writer",
});

const options = {
  hostname: "reqres.in",
  path: "/api/users",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
  },
};
