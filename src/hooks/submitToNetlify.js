export const submitToNetlify = (data) => {
  const formData = new FormData();

  Object.keys(data).forEach((i) => {
    formData.append(i, data[i]);
  });

  fetch("/", {
    method: "POST",
    body: formData,
  })
    .then(() => {
      console.log("Ok");
      alert("Thanks, we'll contact you soon.");
    })
    .catch((error) => {
      console.log("Err", error);
      alert("Oh, something went wrong. Try again.");
    });
};
