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
    })
    .catch((error) => {
      console.log("Err", error);
    });
};
