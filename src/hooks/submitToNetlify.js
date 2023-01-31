export const submitToNetlify = (data) => {
  let formData = new FormData();

  Object.keys(data).forEach((i) => {
    formData.append(i, data[i]);
  });

  fetch("/", {
    method: "POST",
    body: formData,
  })
    .then(() => {
      console.log("Form submit success");
    })
    .catch((error) => {
      console.log("Error inside submitToNetlify();", error);
    });
};
