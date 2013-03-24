![image_squidhome@2x.png](http://i.imgur.com/RIvu9.png) 

# JSDom Adapter

This adapter provides an interface to JSDom through the ORM (https://github.com/tmpvar/jsdom)


## Installation

Since this isn't released as an npm module, you have to download and put JSDomAdapter.js in your `api/adapters` directory.  If this adapter matures, I'm happy to release on npm.

## Usage


Create a Page model hooked up to the jsdom adapter:

```
module.exports = {
	adapter: 'jsdom'
};
```

Then you can use it:
```
Page.find({
	url: 'http://www.findmyhosting.com/web-hamster/'
}).done(function(err, page) {
	
	// Page object contains some useful stuff
	console.log(page);
});
```



## About Sails.js and Waterline
http://SailsJs.com

Waterline is a new kind of storage and retrieval engine for Sails.js.  It provides a uniform API for accessing stuff from different kinds of databases, protocols, and 3rd party APIs.  That means you write the same code to get users, whether they live in mySQL, LDAP, MongoDB, or Facebook.
