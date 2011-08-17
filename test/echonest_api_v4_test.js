var vows = require('vows'),
  assert = require('assert'),
  EchoNestAPI = require('../index.js');

vows.describe('Basics!').addBatch({
  'we can create an EchoNestAPI object': {
    topic: function () { return new EchoNestAPI('apikey', { version:'4'}); },

    'it is not totally borked': function (topic) {
      assert.isNotNull(topic);
    },
    'the howdy function works': function (topic) {
      assert.equal(topic.howdy(), 'Howdy!');
    }
    
  }
}).export(module);