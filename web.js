var express = require("express");
var logfmt = require("logfmt");
var app = express();
var pg = require("pg");
var date;

pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  if(client != null){
  console.log("client is not null");
  client.query('SELECT * FROM dish', function(err, result) {
    done();
    if(err) {
      console.log("error in running sql query");
      return console.error(err);
    }else{
    console.log("rows returned"+result.rows);
    console.log(result.rows);
   }
  });
}else
{
	console.log("client is null");
}
});

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send('Welcome Back');
  date = new Date().getTime();
  console.log("The Current Timestamp is:"+date);
  var date2 = new Date(date).toUTCString();
  console.log("Readable date format:"+date2);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
