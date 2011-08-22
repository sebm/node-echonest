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
    if (error || _.include([404], response.statusCode)) {
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
      switch(parsedResponse.response.status.code) {
        case 0:
          callback(parsedResponse.response);
          break;
        case 1:
          callback({ error: 'Missing/Invalid API Key.', code: 'xxx' });
          break;
        case 4:
          callback({ error: parsedResponse.response.status.message, code: 'xxx'})
          break;
        case 5:
          callback({ error: 'Invalid Parameter.', code: 'xxx' });
          break;
        default:
          callback({ error: 'Unrecognized error code', code: 'xxx'});
      }
    }
  });
};

EchoNestAPI_v4.prototype.audio = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'audio', ['id', 'name', 'results', 'start'], params, callback);
};

EchoNestAPI_v4.prototype.biographies = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'biographies', ['id', 'name', 'results', 'start', 'license'], params, callback);
};

EchoNestAPI_v4.prototype.blogs = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'blogs', 
    ['id', 'name', 'results', 'start', 'high_relevance'], params, callback);
};

EchoNestAPI_v4.prototype.familiarity = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'familiarity', ['id', 'name'], params, callback);
};

EchoNestAPI_v4.prototype.hotttnesss = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'hotttnesss', ['id', 'name', 'type'], params, callback);
};

EchoNestAPI_v4.prototype.images = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'images', 
    ['id', 'name', 'results', 'start', 'license'], params, callback);
};

EchoNestAPI_v4.prototype.list_terms = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'list_terms', ['type'], params, callback);
};

EchoNestAPI_v4.prototype.news = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'news', 
    ['id', 'name', 'results', 'start', 'high_relevance'], params, callback);
};

EchoNestAPI_v4.prototype.artist_profile = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'profile', ['id', 'name', 'bucket'], params, callback);
};

EchoNestAPI_v4.prototype.reviews = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'reviews', ['id', 'name', 'results', 'start'], 
    params, callback);
};

EchoNestAPI_v4.prototype.artist_search = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'search', [
    'results',
    'bucket',
    'limit',
    'name',
    'description',
    'style',
    'mood',
    'rank_type',
    'fuzzy_match',
    'max_familiarity',
    'min_familiarity',
    'max_hotttnesss',
    'min_hotttnesss',
    'artist_start_year_before',
    'artist_start_year_after',
    'artist_end_year_before',
    'artist_end_year_after',
    'sort',
    'results',
    'start'
  ], params, callback);
};

EchoNestAPI_v4.prototype.extract = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'extract', [
    'results',
    'bucket',
    'limit',
    'name',
    'text',
    'max_familiarity',
    'min_familiarity',
    'max_hotttnesss',
    'min_hotttnesss',
    'sort',
    'results'
  ], params, callback);
};
