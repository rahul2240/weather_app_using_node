const request = require('request');
const key = require('../keys/keys');


var getWeather = (latitude, longitude, callback) => {

  request({
    url: `https://api.darksky.net/forecast/${key.key1}/${latitude},${longitude}`,
    json: true
    },  (error, response, body) => {

      if(!error && response.statusCode===200)
        callback( undefined, {
          Temperature: body.currently.temperature,
          ApparentTemperature: body.currently.apparentTemperature
        });
      else {
        callback('Unable to fetch weather');
      }

  });


}

module.exports.getWeather = getWeather;
