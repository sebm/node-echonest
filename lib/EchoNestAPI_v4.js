function EchoNestAPI_v4(apiKey, options) {
  this.version = '4';
}

module.exports = EchoNestAPI_v4;

EchoNestAPI_v4.prototype.howdy = function() {
  return "Howdy!";
};