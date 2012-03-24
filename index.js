
EchoNestAPI = require('./lib/echonest');


var apiKey = "{API_KEY}";

var sandboxConfig = {
	consumerKey: "{CONSUMER_KEY}",
	consumerSecret: "{CONSUMER_SECRET}",
	sandboxKey: "{SANDBOX_KEY}"
};

var echonest = EchoNestAPI(apiKey);

var sandbox = echonest.sandbox(sandboxConfig);


// Retrieve a list of assets
sandbox.assets(function(data) {
	console.log(data);
});

// Fetch an individual asset
sandbox.access("{assetID}",function(data) {
	console.log(data);
})

//  function assets($start = 0, $per_page=100)
