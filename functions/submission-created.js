require("dotenv").config();
const fetch = require("node-fetch");
//const SibApiV3Sdk = require("sib-api-v3-sdk");
//const defaultClient = SibApiV3Sdk.ApiClient.instance;
const { SENDINBLUE_API_KEY } = process.env;

/* Configure API key authorization: api-key
var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = SENDINBLUE_API_KEY;
*/

exports.handler = async (event) => {
  const { data } = JSON.parse(event.body).payload;

  //console.log(`Recieved a submission: ${email}`);
  console.log(
    `DATA: ${data.email + data.webinarName + data.webinarDateAndTime}`
  );

  return fetch("https://api.sendinblue.com/v3/smtp/email", {
    method: "POST",
    url: "https://api.sendinblue.com/v3/smtp/email",
    headers: {
      accept: `application/json`,
      "api-key": SENDINBLUE_API_KEY,
      "content-type": "application/json",
    },
    data: {
      to: [
        {
          email: "aleksi@laniakea.fi",
          name: "Aleksi T",
        },
      ],
      templateId: 1,
      params: {
        webinar_name: data.webinarName,
        webinar_date_and_time: data.webinarDateAndTime,
      },
      headers: {
        "X-Mailin-custom":
          "custom_header_1:custom_value_1|custom_header_2:custom_value_2|custom_header_3:custom_value_3",
        charset: "iso-8859-1",
      },
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(`Submitted to SendinBlue, email: ${data.email}`);
    })
    .catch((error) => ({ statusCode: 422, body: String(error) }));

  /* Integrate with Sendin Blue Packade, Problem: WEBPACK ERROR
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
  */
};
