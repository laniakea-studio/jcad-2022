export const submitToNetlify = (data, e) => {
  let formData = new FormData();

  Object.keys(data).forEach((i) => {
    formData.append(i, data[i]);
  });

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode({
      "form-name": event.target.getAttribute("name"),
      ...data,
    }),
  })
    .then(() => {
      alert("Thank you, follow your email!");
      console.log("Form submit to Netlify success");
    })
    .catch((error) => {
      alert("Something went wrong. Try again.");
      console.log("Error inside submitToNetlify();", error);
    });
};

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}
