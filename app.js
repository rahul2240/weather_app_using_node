const request = require('request');
const yargs = require('yargs');

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

  var encoded_address = encodeURIComponent(argv['a']);
request({
  url: "https://maps.googleapis.com/maps/api/geocode/json?address="+encoded_address +"&key=AIzaSyCcR9TZhtsEtEd2ACcbceWqaYvpXcUMtx0",
  json: true
}, (error, response, body)=>{
  console.log("Address: " + body.results[0].formatted_address);
  console.log("Latitude: " + body.results[0].geometry.location.lat);
  console.log("Longitude: " + body.results[0].geometry.location.lng);
});
