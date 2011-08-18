var vows = require('vows'),
  assert = require('assert'),
  EchoNestAPI = require('../index.js');

var theAPIKey = process.env.ECHONEST_API_KEY;

vows.describe('EchoNest API v4 wrapper').addBatch({
  'we can create an EchoNestAPI object': {
    topic: function () { return new EchoNestAPI(theAPIKey, { version:'4'}); },

    'it is not totally borked': function (topic) {
      assert.isNotNull(topic);
    },
    'the howdy function works': function (topic) {
      assert.equal(topic.howdy(), 'Howdy!');
    },
    'the version number is set': function(topic) {
      assert.equal(topic.version, '4');
    },
    'the apiKey is set': function(topic) {
      assert.equal(topic.apiKey, theAPIKey);
    },
    'the execute method (when called correctly)' : {
      topic: function (en) {
        en.execute('artist', 'hotttnesss', ['name'], { name : 'Ratatat'}, this.callback);
      },
      'has some data': function (result) {
        assert.isNotNull(result);
      }
    }
  }
}).export(module);