var http = require('http'),
  request = require('request'),
  _ = require('underscore')._,
  querystring = require('querystring');

function EchoNestAPI_v4(apiKey, options) {
  this.version = '4';
  this.apiKey = apiKey;
  this.apiUrl = 'http://developer.echonest.com/api/v4/'
}

module.exports = EchoNestAPI_v4;

EchoNestAPI_v4.prototype.howdy = function() {
  return "Howdy!";
};

EchoNestAPI_v4.prototype.execute = function(type, method, availableParams, givenParams, callback) {
  var finalParams = { api_key : this.apiKey, format : 'json' };
  
  for (var i = 0; i < availableParams.length; i++) {
    currentParam = availableParams[i];
    if (typeof givenParams[currentParam] !== 'undefined')
      finalParams[currentParam] = givenParams[currentParam];
  }
  var uri = this.apiUrl + type + '/' + method + '?' + querystring.stringify(finalParams);
  request(uri, function (error, response, body) {
    var parsedResponse;
    if (error || response.statusCode != 200 ) {
      callback({ 
        error : 'Unable to connect to the Echo Nest API endpoint.', 
        code : response.statusCode
      });
    } else {
      try {
        parsedResponse = JSON.parse(body);
      } catch (error) {
        callback({ error : 'Error parsing JSON answer from the Echo Nest API.', code : 'xxx'});
      }
      callback(parsedResponse);
    }
  });
};