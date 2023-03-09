export const submitToNetlify = (data, e) => {
  const formName = e.target.getAttribute("name");

  const body = {
    "form-name": formName,
    ...data,
  };

  return fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode(body),
  })
    .then(() => {
      alert("Thank you, follow your email!");
      console.log(`Submit to Netlify success`, body);
      return { success: true, data: body };
    })
    .catch((error) => {
      alert("Something went wrong. Try again.");
      console.log("Submit to Netlify failed", error);
      return { success: false, data: body };
    });
};

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}
