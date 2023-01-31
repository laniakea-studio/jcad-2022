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
      //alert("Thanks, follow your email!");
      return { status: "success" };
    })
    .catch((error) => {
      console.log("Err", error);
      //alert("Oh, something went wrong. Try again.");
      return { status: "error", message: error };
    });
};
