test/basics:
	vows -v test/echonest_api_v4_basics_test.js

test/artist:
	vows -v test/echonest_api_v4_artist_test.js

test/song:
	vows -v test/echonest_api_v4_song_test.js

test:
	vows -v test/*

.PHONY: test