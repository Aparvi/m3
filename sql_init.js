var pg = require("pg");


pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  if(client != null){
  console.log("client is not null");
  var query = "CREATE TABLE [if not exists] DISH(dish_id bigserial primary_key, dish_name varchar(40) not null)";
  client.query(query, function(err, result) {
    done();
    if(err) {
      console.log("Error in creating table dish");
      return console.error(err);
    }else{
    console.log("Success in creating table dish");
   }
  });
}else
{
	console.log("client is null");
}
});
