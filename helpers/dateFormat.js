const dateFormat = (date = "") => {
  const [day, time] = date.split("T");

  return day;
};

module.exports = dateFormat;
