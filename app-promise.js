const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address input',
      string: true
    }
})
.help()
.alias('help', 'h')
.argv;

var addy = encodeURIComponent(argv.address);
var geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${addy}`;

axios.get(geoUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error ('Unable to locate address');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var skyUrl = `<add your weather api key here>/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(skyUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var realtemp = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature} degrees fahrenheit, but feels like ${realtemp} degrees fahrenheit`)
}).catch((e) => {
  if (e.code === "ENOTFOUND" || e.code === "ETIMEOUT") {
    console.log('Unable to connect to server');
  } else {
    console.log(e.message);
  }
});
