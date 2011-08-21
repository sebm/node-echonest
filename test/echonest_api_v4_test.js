var vows = require('vows'),
  assert = require('assert'),
  EchoNestAPI = require('../index.js');

var theAPIKey = process.env.ECHONEST_API_KEY;

vows.describe('EchoNest API v4 wrapper').addBatch({
  'An EchoNestAPI object': {
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
        assert.equal(result.response.status.message, 'Success');
        assert.equal(result.response.status.code, 0);
        assert.isObject(result.response.artist);
        assert.isString(result.response.artist.name);
        assert.isString(result.response.artist.id);
        assert.isNumber(result.response.artist.hotttnesss);
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
    }
  }
}).export(module);