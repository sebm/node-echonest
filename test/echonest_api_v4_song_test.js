var vows = require('vows'),
  assert = require('assert'),
  check = require('validator').check,
  EchoNestAPI = require('../index.js');

var theAPIKey = process.env.ECHONEST_API_KEY;

vows.describe('EchoNest API v4 song methods').addBatch({
  'An EchoNestAPI object with a valid API key': {
    topic: function () { return new EchoNestAPI(theAPIKey, { version:'4'}); },
    
    'when the song search method is called by artist name': {
      topic: function (en) {
        en.song_search({ artist: 'Ratatat' }, this.callback);
      }, 
      'you get some songs by Ratatat': function (result, err) {
        assert.isObject(result);
        assert.isArray(result.songs);
        result.songs.forEach(function(s) {
          assert.equal(s.artist_id, 'AREPZK61187B990670');
        });
      }
    }
  }
}).export(module);
