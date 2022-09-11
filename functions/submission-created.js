require("dotenv").config();
const SibApiV3Sdk = require("sib-api-v3-sdk");
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const { SENDINBLUE_API_KEY } = process.env;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = SENDINBLUE_API_KEY;

console.log(`Starts, key`, SENDINBLUE_API_KEY);

exports.handler = async (event) => {
  const { email, webinarName } = JSON.parse(event.body).payload;

  console.log(`Recieved a submission: ${(email, webinarName)}`);
  console.log(`Recieved a webinar: ${webinarName}`);

  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

  sendSmtpEmail = {
    to: [
      {
        email: "aleksi@laniakea.fi",
        name: "John Doe",
      },
    ],
    templateId: 1,
    params: {
      webinar_name: "Saneeraus- ja purkukohteiden laskenta",
      webinar_date_and_time: "keskiviikkona 14.9. klo 19.00",
    },
    headers: {
      "X-Mailin-custom":
        "custom_header_1:custom_value_1|custom_header_2:custom_value_2",
    },
  };

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log("API called successfully. Returned data: " + data);
    },
    function (error) {
      console.error("Error", error);
    }
  );

  console.log(`End of function`);
};
