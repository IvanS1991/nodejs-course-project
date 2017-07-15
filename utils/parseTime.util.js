const parseTime = (time) => {
  const zeroFill = (value) => {
    if (value < 9) {
      return `0${value}`;
    }
    return `${value}`;
  };

  const year = zeroFill(time.getFullYear());
  const month = zeroFill(time.getMonth());
  const day = zeroFill(time.getDate());
  const hours = zeroFill(time.getHours());
  const minutes = zeroFill(time.getMinutes());
  const seconds = zeroFill(time.getSeconds());

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

module.exports = parseTime;
