function EchoNestAPI_v4(apiKey, options) {
  this.version = '4';
  this.apiKey = apiKey;
}

module.exports = EchoNestAPI_v4;

EchoNestAPI_v4.prototype.howdy = function() {
  return "Howdy!";
};