var express = require("express");
var logfmt = require("logfmt");
var app = express();
var pg = require("pg");
var constants = require("./constants");
var pgclient;

app.use(logfmt.requestLogger());

//any call will first establish the connection and then move to next.
//TODO - move next() under the connect function
app.get('*', function(req,res,next){
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
     if(client != null){
        pgclient = client;
        console.log("Client connection with Postgres DB is established");
	next();
     }
     else{
        console.log("Client is null");
	//TODO - Load the connection error page
     }
  });
  //next();
});

// call to load the home page
app.get('/', function(req, res) {
  res.send('Load the home page here');
});

// rest call 
app.get('/:loc/:srchqry', function(req,res,next){
  //If first param is "dish" call next() - this will call the other get method 
  if(req.params.loc == "dish"){
    console.log("request.params.loc is equal to dish");
    next();
  }
  else{
    console.log("req.params.loc is not equal to dish");
  
  console.log("Location:"+req.params.loc+" search query:"+req.params.srchqry);
  console.log(constants.SELECT_DISH_TABLE_QUERY);
  var qry = (constants.SELECT_DISH_TABLE_QUERY).replace('$1',req.params.srchqry);
  console.log("Final Query:"+qry);
  pgclient.query(qry,function(error, result){
	console.log("The result set:"+result.rows.length);
  });
  res.send("Location:"+req.params.loc+" search query:"+req.params.srchqry);
  }
});

//API - for the table dish
app.get('/dish/:dish_name', function(req,res){
  console.log(constants.SELECT_DISH_TABLE_QUERY);
  var qry = (constants.SELECT_DISH_TABLE_QUERY).replace('$1',req.params.dish_name);
  console.log("Final Query:"+qry);
  var dish_id;
  pgclient.query(qry,function(error, result){
        console.log("The result set:"+result.rows.length);
	if(result != null && result.rows !=null && result.rows.length > 0){
	    dish_id = result.rows[0].dish_id.toString();
	}
	else{
	    dish_id = "No Data found for the given dish_name";
	}
	console.log("dish_id:"+dish_id);
        //send the dish_id as the response
        res.send(dish_id);
  });
  //res.send(dish_id);
});

//API - for the table hotel
app.get('/hotel/:hotel_name', function(req,res){
  console.log(constants.SELECT_HOTEL_TABLE_QUERY);
  var qry = (constants.SELECT_HOTEL_TABLE_QUERY).replace('$1',req.params.hotel_name);
  console.log("Final Query:"+qry);
  var hotel_id;
  pgclient.query(qry,function(error, result){
        console.log("The result set:"+result.rows.length);
        if(result != null && result.rows !=null && result.rows.length > 0){
            hotel_id = result.rows[0].hotel_id.toString();
        }
        else{
            hotel_id = "No Data found for the given dish_name";
        }
        console.log("hotel_id:"+hotel_id);
        //send the hotel_id as the response
        res.send(hotel_id);
  });
});


//declare the port and listen to it
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
