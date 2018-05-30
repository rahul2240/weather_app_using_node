const request = require('request');

request({
  url: "https://maps.googleapis.com/maps/api/geocode/json?address=noida",
  json: true
}, (error, response, body)=>{
  console.log(body);
});
