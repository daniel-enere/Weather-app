const request = require('request');

var getSky = (lat, lng, callback) => {
  // var skyFall = encodeURIComponent(blueSky)
  request ({
    url: `<add your weather api key here>${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        realtemp: body.currently.apparentTemperature
      });
    }
    else if (error) {
      callback('Unable to fetch weather');
    }
  });
}

module.exports.getSky = getSky;
