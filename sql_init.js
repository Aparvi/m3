var pg = require("pg");


pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  if(client != null){
  console.log("client is not null");

  //populate table dish
  var queryStr = "CREATE TABLE if not exists DISH(dish_id bigserial primary key, dish_name varchar(40) not null, dish_type varchar(20) not null, dish_cat varchar(20) not null)";
  client.query(queryStr, function(err, result) {
    done();
    if(err) {
      console.log("Error in creating table dish");
      return console.error(err);
    }else{
    console.log("Success in creating table dish");
   }
  });
  //end table dish
  //Populate table restaurent
  queryStr = "CREATE TABLE if not exists RESTAURENT(restaurent_id bigserial primary key, restaurent_name varchar(40) not null, restaurent_location varchar(100) not null, restaurent_state varchar(100) not null, restaurent_country varchar(100) not null, restaurent_address varchar(100), restaurent_link varchar(100))";
  client.query(queryStr, function(err, result){
	done();
	if(err){
		console.log(Error in creating table restaurent);
		return console.error(err);
	}
	else{
		console.log("Success in creating table restaurent");
	}

  });
  //end table restaurent
}else
{
	console.log("client is null");
}
});
