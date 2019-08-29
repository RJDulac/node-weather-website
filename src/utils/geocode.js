const request = require("request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYW5hbHl0aWNyeWUiLCJhIjoiY2p6c2xyeXI4MDJjdzNibXpndGJib3d6NSJ9.Ug40eANUouFp3zgAvYmFXw&limit=1`;

  request({ url, json: true }, (err, { body: { features } }) => {
    if (err) {
      callback("Unable to connect to location services", undefined);
    } else if (features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name
      });
    }
  });
};

module.exports = geoCode;
