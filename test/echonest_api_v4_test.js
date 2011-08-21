var vows = require('vows'),
  assert = require('assert'),
  EchoNestAPI = require('../index.js');

var theAPIKey = process.env.ECHONEST_API_KEY;

vows.describe('EchoNest API v4 wrapper').addBatch({
  'An EchoNestAPI object with a valid API key': {
    topic: function () { return new EchoNestAPI(theAPIKey, { version:'4'}); },

    'is successfully instantiated': function (topic) {
      assert.isNotNull(topic);
    },
    'has a "howdy" method': function (topic) {
      assert.equal(topic.howdy(), 'Howdy!');
    },
    'has its version number set': function(topic) {
      assert.equal(topic.version, '4');
    },
    'has its apiKey set': function(topic) {
      assert.equal(topic.apiKey, theAPIKey);
    },
    'when its "execute method" is called correctly' : {
      topic: function (en) {
        en.execute('artist', 'hotttnesss', ['name'], { name : 'Ratatat'}, this.callback);
      },
      'we get the data we expect': function (result,err) {
        assert.isObject(result);
        assert.equal(result.status.message, 'Success');
        assert.equal(result.status.code, 0);
        assert.isObject(result.artist);
        assert.isString(result.artist.name);
        assert.isString(result.artist.id);
        assert.isNumber(result.artist.hotttnesss);
      }
    },
    'when its "execute method" is pointed at an invalid endpoint' : {
      topic: function (en) {
        en.execute('artiste', 'hotttnesss', ['name'], { name : 'Ratatat'}, this.callback);
      },
      'it gets a 404': function (result, err) {
        assert.isObject(result);
        assert.equal(result.code, 404);
      }
    },
    'when its "execute method" is pointed at a valid endpoint with an invalid parameter' : {
      topic: function (en) {
        en.execute('artist', 'hotttnesss', ['name'], { name : 'Ratatatatat'}, this.callback);
      },
      'the error message reflects this': function (result, err) {
        assert.isObject(result);
        assert.match(result.error, /invalid parameter/i);
      }
    },
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
  },
  'An EchoNestAPI object with an invalid API key' : {
    topic: function() { return new EchoNestAPI('notavalidapikey', { version: '4'}); },
    
    'when its "execute" method is called correctly' : {
      topic: function (en) {
        en.execute('artist', 'hotttnesss', ['name'], { name : 'Ratatat'}, this.callback);
      },
      'the error message reflects this': function (result, err) {
        assert.isObject(result);
        assert.match(result.error, /missing\/invalid API key/i);
      }
    }
    
  }
}).export(module);