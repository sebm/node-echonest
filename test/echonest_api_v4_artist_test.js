var vows = require('vows'),
  assert = require('assert'),
  EchoNestAPI = require('../index.js');

var theAPIKey = process.env.ECHONEST_API_KEY;

vows.describe('EchoNest API v4 artist methods').addBatch({
  'An EchoNestAPI object with a valid API key': {
    topic: function () { return new EchoNestAPI(theAPIKey, { version:'4'}); },
    
    'when the artist hotttnesss method is called by name': {
      topic: function (en) {
        en.hotttnesss({ name: 'Ratatat' }, this.callback);
      }, 
      'you get the expected response': function (result, err) {
        assert.isObject(result);
        assert.isObject(result.artist);
        assert.match(result.artist.name, /ratatat/i);
        assert.isNumber(result.artist.hotttnesss);
      }
    },
    'when the artist hotttness method is called by id' : {
      topic: function (en) {
        en.hotttnesss({ id: 'AREPZK61187B990670' }, this.callback);
      },
      'you get the expected response': function (result, err) {
        assert.isObject(result);
        assert.isObject(result.artist);
        assert.match(result.artist.name, /ratatat/i);
        assert.isNumber(result.artist.hotttnesss);
      }
    },
    'when the artist hotttnesss method is called without name or id' : {
      topic: function (en) {
        en.hotttnesss(this.callback);
      },
      'you get an error' : function (result, err) {
        assert.isObject(result);
        assert.match(result.error, /missing parameter/i);
      }
    }
  }
}).export(module);