const yargs = require('yargs');

const geocode = require('./geocode/geocode')
const weather = require('./weather/sky')

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address input',
      string: true
    },
    // s: {
    //   demand: true,
    //   alias: 'sky',
    //   describe: 'Geocode input',
    //   string: true
    // }
})
.help()
.alias('help', 'h')
.argv;

geocode.geoStuff(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    weather.getSky(results.latitude, results.longitude, (errorMessage, weatherResults) =>{
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResults.temperature}, real temp at ${weatherResults.realtemp}`);
      }
    });
  }
});
