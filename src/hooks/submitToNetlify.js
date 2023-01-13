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
      return { status: "Ok", formData };
    })
    .catch((error) => {
      console.log("Err");
      return { status: "Error", error };
    });
};
