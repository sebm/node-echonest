testbasics:
	vows -v test/echonest_api_v4_basics_test.js

testartist:
	vows -v test/echonest_api_v4_artist_test.js

test:
	vows -v test/*

.PHONY: test