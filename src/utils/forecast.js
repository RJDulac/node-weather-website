const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/593c0ff5f527d3908e2c2d6884043659/${latitude},${longitude}`;

  request({ url, json: true }, (err, { body: { currently, daily, error } }) => {
    if (err) {
      callback("Unable to connect to weather service!", undefined);
    } else if (error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${daily.data[0].summary} It is currently ${
          currently.temperature
        } degrees out. There is a ${
          currently.precipProbability
        }% chance of rain.
        Feels like ${
          currently.apparentTemperature
        }. Humidty is ${currently.humidity * 100}%. Wind speed is ${
          currently.windSpeed
        } mph.`
      );
    }
  });
};

module.exports = forecast;
