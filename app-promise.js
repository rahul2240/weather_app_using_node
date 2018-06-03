const yargs = require('yargs');
const axios = require('axios');
const key = require('./keys/keys');

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

  var encoded_address = encodeURIComponent(argv.address);
  var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded_address}&key=${key.key}`;

  axios.get(geocodeUrl).then((response)=> {
    if(response.data.status === 'ZERO_RESULTS'){
      throw new Error(' Unable to find the address');
    }

    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    var weatherUrl =  `https://api.darksky.net/forecast/${key.key1}/${latitude},${longitude}`;

    console.log(response.data.results[0].formatted_address);

    return axios.get(weatherUrl);

  }).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`its currently ${temperature} but feels like ${apparentTemperature}`);
  }).catch((e) => {
    if(e.code === 'ENOTFOUND'){
      console.log('UNABLE TO CONNECT TO SERVER');
    } else {
      console.log(e.message);
    }
  });
