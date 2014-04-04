//var express = require("express");
//var app = express();

// import the other js file
var webjs = require('./web');


webjs.app.post('/dish_image/:dish_id', function(req,res){
	console.log("Inside the get method of worker process");
});

