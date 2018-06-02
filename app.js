const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

  geocode.geocodeAddress(argv.a, (error, results) => {
    if(error){
      console.log(error);
    }
    else{
      console.log(`ADDRESS: ${results.Address}`);

      weather.getWeather(results.Latitude, results.Longitude, (error, result) => {
        if(error){
          console.log(error);
        }
        else {
          console.log(`Its currently ${result.Temperature} , but it feels like ${result.ApparentTemperature}`);
        }
      });

    }
  });
