var _ = require("underscore");
var request = require("request");
var jsdom = require("jsdom");

/*---------------------
	:: Jsdom 
	-> adapter
---------------------*/
var adapter = {

	channels: {},

	// This method runs when a model is initially registered at server start time
	registerCollection: function(collection, cb) {
		if (!collection.url) {
			cb("No url defined in " + collection.identity + " model.  " +
				"For the HTTP adapter to work, its models need a url property!");
		}

		// Save URL and other identifying info
		this.channels[collection.identity] = {
			url: collection.url
			// method: collection.method || ''
		};
	},


	// Get a page
	find: function(collectionName, options, cb) {
		var urlPattern = '/';
		var url = options.where.url + urlPattern;

		// Start clock
		var stopwatch = new Date();

		request(url, function(err, res, body) {
			if (err) return cb(err, body);

			// End clock
			var duration = new Date() - stopwatch;


			console.log(body);
			// Build dom
			var html = body;
			// var html = '<html><head></head><body><script>io={hi:"yest"};</script></body></html>';

			jsdom.defaultDocumentFeatures = {
				FetchExternalResources: ["script", "img", "css"],
				ProcessExternalResources: ['script'],

				// Solves https://github.com/tmpvar/jsdom/issues/426
				MutationEvents: '2.0',
				QuerySelector: false
			};

			var dom = jsdom.jsdom(html);
			var window = dom.createWindow();
			
			// Extend with additional testing information
			var response = _.extend({
				window: window,
				latency: duration,
				url: url,
				size: res.headers['content-length']
			}, options.where);
			
			// Pluralize to make the adapter happy
			response = [response];

			// Return information about the download
			cb(err, response);

		});
	}

};

_.bindAll(adapter, 'registerCollection', 'find');
module.exports = adapter;