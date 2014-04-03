var express = require("express");
var app = express();

app.post('/dish_image/:dish_id', function(req,res){
	console.log("Inside the get method of worker process");
});

//declare the port and listen to it
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
