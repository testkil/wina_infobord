export const formatDate = (date, short = false) => {
  const options = short
    ? {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    : {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

  return new Intl.DateTimeFormat("nl-BE", options).format(date);
};

export const formatTime = (date) => {
  return new Intl.DateTimeFormat("nl-BE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};
