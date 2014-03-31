var express = require("express");
var logfmt = require("logfmt");
var app = express();
var pg = require("pg");
var constants = require("./constants");
var pgclient;

app.use(logfmt.requestLogger());

//any call will first establish the connection and then move to next
app.get('*', function(req,res,next){
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
     if(client != null){
        pgclient = client;
        console.log("Client connection with Postgres DB is established");
     }
     else{
        console.log("Client is null");
     }
  });
  next();
});

// call to load the home page
app.get('/', function(req, res) {
  res.send('Load the home page here');
});

// rest call 
app.get('/:loc/:srchqry', function(req,res){
  console.log("Location:"+req.params.loc+" search query:"+req.params.srchqry);
  console.log(constants.SELECT_DISH_TABLE_QUERY);
  pgClient.query(constant.SELCT_DISH_TABLE_QUERY,[req.params.srchqry],function(error, result){
	console.log("The result set:"+result.rows.length);
  });
  res.send("Location:"+req.params.loc+" search query:"+req.params.srchqry);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
