require("dotenv").config();
const SibApiV3Sdk = require("sib-api-v3-sdk");
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const { SENDINBLUE_API_KEY } = process.env;

var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = SENDINBLUE_API_KEY;

exports.handler = async (event) => {
  const { data, form_name } = JSON.parse(event.body).payload;

  if (form_name !== "Webinaari") return console.log("Form name is not Webinar");

  console.log(
    `DATA: ${data.email + data.webinarName + data.webinarDateAndTime}`
  );

  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

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

  return apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log("API called successfully. Returned data: " + data);
    },
    function (error) {
      console.error("Error", error);
    }
  );
};
