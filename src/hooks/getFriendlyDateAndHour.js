export const getFriendlyDateAndHour = (d) => {
  const date = d.toLocaleDateString("fi-FI", {
    weekday: "short",
    month: "numeric",
    day: "numeric",
  });
  const hour = d.toLocaleTimeString("fi-FI", {
    timeStyle: "short",
  });
  return [date, hour];
};
