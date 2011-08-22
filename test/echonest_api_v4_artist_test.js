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
    }    
  }
}).export(module);