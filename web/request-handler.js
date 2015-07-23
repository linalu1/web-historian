var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
// var fs = require('fs');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var statusCode = 200;

  // GET / -> ./public/index.html
  // GET /loading -> ./public/loading.html

  var routeUrl = req.url.replace("/", "");

  if(req.method === "GET"){
    if(routeUrl === "") {
      res.writeHead(200, httpHelpers.headers);
      httpHelpers.serveAssets(res, archive.paths.siteAssets + "/index.html");      
    } else if (archive.isUrlArchived(routeUrl)) {
      res.writeHead(200, httpHelpers.headers);
      httpHelpers.serveAssets(res, archive.paths.archivedSites + "/" + routeUrl);      
    } else {
      console.log("evaluated for the test");
      res.writeHead(404, httpHelpers.headers);
    }
    res.end();
  } else if (req.method === "POST") {
    if(!archive.isUrlInList(routeUrl)) {
      archive.addUrlToList(routeUrl);
      res.writeHead(302, httpHelpers.headers);
      res.end('Added Url to list');
    } else {
      res.writeHead(302, httpHelpers.headers);
      res.end('Url already added to list');      
    }
  } else {
    res.writeHead(404, httpHelpers.headers);
    res.end();
  }
};


// var parser = document.createElement('a');
// parser.href = "http://example.com:3000/pathname/?search=test#hash";

// parser.protocol; // => "http:"
// parser.hostname; // => "example.com"
// parser.port;     // => "3000"
// parser.pathname; // => "/pathname/"
// parser.search;   // => "?search=test"
// parser.hash;     // => "#hash"
// parser.host;     // => "example.com:3000"