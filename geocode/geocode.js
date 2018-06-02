const request = require('request');

var geocodeAddress = (address, callback) => {

  var encoded_address = encodeURIComponent(address);
  request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded_address}&key=AIzaSyCcR9TZhtsEtEd2ACcbceWqaYvpXcUMtx0`,
  json: true
  }, (error, response, body)=>{
  if(error){
    callback("Unable to connect to server");
  }
  else if (body.status==='OK'){
  callback(undefined, {
    Address: body.results[0].formatted_address,
    Latitude: body.results[0].geometry.location.lat,
    Longitude: body.results[0].geometry.location.lng
  });

  }
  else {
    callback("Invalid address ");
  }
  });

};

module.exports.geocodeAddress = geocodeAddress;
