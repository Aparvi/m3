var app = require("express");

app.get('/dish_image/:dish_id', function(req,res){
	console.log("Inside the get method of worker process");
});
