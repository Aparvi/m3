var express = require("express");
var logfmt = require("logfmt");
var app = express();

var pg = require("pg");

pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  if(client != null){
  console.log("client is not null");
  client.query('SELECT * FROM your_table', function(err, result) {
    done();
    if(err) return console.error(err);
    console.log(result.rows);
  });
}else
{
	console.log("client is null");
}
});

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send('Welcome Back');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
