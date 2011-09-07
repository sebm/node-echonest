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
    },
    'when the song search method is called for sad songs from famous Oxford bands' : {
      // this test will break if a sad band from Oxford ever gets big.
      topic: function (en) {
        en.song_search({ min_latitude: 51.7, max_latitude: 51.8, 
          min_longitude: -1.29, max_longitude: -1.2, results: 100,
          artist_min_familiarity: 0.8, mood: 'sad', bucket: ['artist_familiarity']},
          this.callback);
      },
      'they are ALL Radiohead songs': function(result, err) {
        assert.isObject(result);
        assert.isArray(result.songs);
        result.songs.forEach(function(s) {
          assert.equal(s.artist_name, 'Radiohead');
        });
      },
      'the songs\' familiarity is reported' : function(result, err) {
        assert.isObject(result);
        result.songs.forEach(function(s) {
          assert.isNumber(s.artist_familiarity);
        });
      }
    },
    'when the song profile method is called by song id': {
      topic: function (en) {
        en.song_profile({ id: ['SOFLDOK12A8C13E8F7', 'SOGBLMI12AB01856AC'],
        bucket: ['audio_summary']}, this.callback);
      }, 
      'you get some songs by Radiohead': function (result, err) {
        assert.isObject(result);
        assert.isArray(result.songs);
        assert.equal(result);
        result.songs.forEach(function(s) {
          assert.isObject(s.audio_summary);
          assert.equal(s.artist_name, 'Radiohead');
        });
      }
    },
  }
}).export(module);
