var vows = require('vows'),
  assert = require('assert'),
  EchoNestAPI = require('../index.js');

var theAPIKey = process.env.ECHONEST_API_KEY;

vows.describe('Basics!').addBatch({
  'we can create an EchoNestAPI object': {
    topic: function () { return new EchoNestAPI(theAPIKey, { version:'4'}); },

    'it is not totally borked': function (topic) {
      assert.isNotNull(topic);
    },
    'the howdy function works': function (topic) {
      assert.equal(topic.howdy(), 'Howdy!');
    }
    
  }
}).export(module);