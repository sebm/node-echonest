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
    },
    'when the artist audio method is called by name with some parameters' : {
      topic: function (en) {
        en.audio({ name: 'Ratatat', start: 15, results: 21 }, this.callback);
      },
      'you get the expected response' : function(result, err) {
        assert.isObject(result);
        assert.isArray(result.audio);
        assert.length(result.audio, 21);
        assert.equal(result.start, 15);
      },
    },
    'when the artist biographies method is called with some parameters' : {
      topic: function (en) {
        en.biographies({ name: 'Ratatat', start: 1, results: 2, 
          license: ['cc-by-sa', 'all-rights-reserved'] }, this.callback);
      },
      'you get the expected response' : function(result, err) {
        assert.isObject(result);
        assert.isArray(result.biographies);
        assert.length(result.biographies, 2);
        assert.equal(result.start, 1);
        result.biographies.forEach(function(bio) {
          assert.include(['cc-by-sa', 'all-rights-reserved'], bio.license.type);
        });
      }
    },
    'when the artist blogs method is called with some parameters' : {
      topic: function (en) {
        en.blogs({ name: 'Ratatat', start: 1, results: 2, high_relevance: true},
          this.callback);
      },
      'you get the expected response' : function(result, err) {
        assert.isObject(result);
        assert.isArray(result.blogs);
        assert.length(result.blogs, 2);
        assert.equal(result.start, 1);
      }
    },
    'when the artist familiarity method is called' : {
      topic: function (en) {
        en.familiarity({ name: 'Ratatat'}, this.callback);
      },
      'you get the expected response' : function(result, err) {
        assert.isObject(result);
        assert.isNumber(result.artist.familiarity);
      }
    },
    'when the artist images method is called' : {
      topic: function (en) {
        en.images({ name: 'Ratatat', results: 20, start: 1}, this.callback);
      },
      'you get the expected response' : function(result, err) {
        assert.isObject(result);
        assert.isArray(result.images);
        assert.length(result.images, 20);
        assert.equal(result.start, 1);
      }
    },
    'when the artist list_terms method is called' : {
      topic: function (en) {
        en.list_terms({ type: 'style'}, this.callback);
      },
      'you get the expected response' : function(result, err) {
        assert.isObject(result);
        assert.equal(result.type, 'style');
        assert.isArray(result.terms);
        assert.deepInclude(result.terms, { name : 'rock' });
      }
    },
    'when the artist news method is called' : {
      topic: function (en) {
        en.news({ name: 'Ratatat', start: 1, results: 2, high_relevance: true },
          this.callback);
      },
      'you get the expected response' : function(result, err) {
        assert.isObject(result);
        assert.equal(result.start, 1);
        assert.isArray(result.news);
        assert.length(result.news, 2);
      }
    },
    'when the artist profile method is called' : {
      topic: function (en) {
        en.artist_profile({ name: 'Ratatat', bucket: ['audio', 'blogs']},this.callback);
      },
      'you get the expected response' : function(result, err) {
        assert.isObject(result);
        assert.isArray(result.artist.blogs);
        assert.isArray(result.artist.audio);
      }
    },
    'when the artist reviews method is called' : {
      topic: function (en) {
        en.reviews({ name: 'Ratatat', results: 2, start: 1}, this.callback);
      },
      'you get the expected response' : function(result, err) {
        assert.isObject(result);
        assert.equal(result.start, 1);
        assert.isArray(result.reviews);
        assert.length(result.reviews, 2);
      }
    },
    'when the artist search method is called with an ambiguous artist name' : {
      topic: function (en) {
        en.artist_search({ name: 'Girls'}, this.callback);
      },
      'you get an array of artist names/ids': function (result, err) {
        assert.isObject(result);
        assert.isArray(result.artists);
        result.artists.forEach(function(a) {
          assert.isString(a.name);
          assert.isString(a.id);
          assert.match(a.name, /girls/i);
        });
      }
    },
    'when the artist search method is called with various non-name params': {
      topic: function (en) {
        en.artist_search({ style: ['jazz', 'metal'], mood: 'happy', 
          bucket: ['familiarity', 'years_active'] }, this.callback);
      },
      'you get an array of artist names/ids plus buckets' : function (result, err) {
        assert.isObject(result);
        assert.isArray(result.artists);
        result.artists.forEach(function(a) {
          assert.isString(a.name);
          assert.isString(a.id);
          assert.isNumber(a.familiarity);
          assert.isArray(a.years_active);
        });
      }
    },
    'when the artist extract method is called on some text' : {
      topic: function(en) {
        en.extract({ text: 'I prefer Ratatat over Ratt.', bucket: 'familiarity'}, this.callback);
      },
      'you get artist names/ids relevant to the text' : function (result, err) {
        assert.isObject(result);
        assert.isArray(result.artists);
        result.artists.forEach(function(a) {
          assert.isString(a.name);
          assert.isString(a.id);
          assert.isNumber(a.familiarity);
          assert.include(['Ratatat', 'Ratt'], a.name);
        });
      }
    },
    'when the artist songs method is called' : {
      topic: function(en) {
        en.songs({ name: 'Ratatat', results: 20, start: 1}, this.callback);
      },
      'you get an array of songs' : function (result, err) {
        assert.isObject(result);
        assert.length(result.songs, 20);
        result.songs.forEach(function(song) {
          assert.isString(song.title);
          assert.isString(song.id);
        });
      }
    },
    'when the artist similar method is called' : {
      topic: function(en) {
        en.similar({ name: 'Ratatat', bucket: 'familiarity', results: 5}, this.callback);
      },
      'you get an array of similar artists' : function (result, err) {
        assert.isObject(result);
        assert.isArray(result.artists);
        assert.length(result.artists, 5);
        result.artists.forEach(function(artist) {
          assert.isString(artist.name);
          assert.isString(artist.id);
        });
      }
    }
  }
}).export(module);
