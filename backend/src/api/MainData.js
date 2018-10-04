const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export default () => {
  return ([
    {
      Name: "Abbeville",
      PM: getRndInteger(5, 15),
      Ozone: getRndInteger(5, 15),
      Pollen: getRndInteger(5, 15),
      AQI: getRndInteger(5, 15),
      code: 36310,
    },
    {
      Name: "Abernant",
      PM: getRndInteger(5, 15),
      Ozone: getRndInteger(5, 15),
      Pollen: getRndInteger(5, 15),
      AQI: getRndInteger(5, 15),
      code: 35440,
    },
    {
      Name: "Addison",
      PM: getRndInteger(5, 15),
      Ozone: getRndInteger(5, 15),
      Pollen: getRndInteger(5, 15),
      AQI: getRndInteger(5, 15),
      code: 35540,
    },
    {
      Name: "Adger",
      PM: getRndInteger(5, 15),
      Ozone: getRndInteger(5, 15),
      Pollen: getRndInteger(5, 15),
      AQI: getRndInteger(5, 15),
      code: 35006,
    },
  ])
}
