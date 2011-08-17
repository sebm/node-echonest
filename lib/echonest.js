var EchoNestAPI_v4 = require('./EchoNestAPI_v4.js');

function EchoNestAPI (apiKey, options) {
  if (!options) {
    var options = {};
  }
  
  if (!apiKey) {
    throw 'You need to provide an API key';
  }
  
  if (!options.version || options.version == '4') {
    return new EchoNestAPI_v4(apiKey, options);
  }
}

module.exports = EchoNestAPI;