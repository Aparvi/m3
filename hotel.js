//File to define the APIs exposed by HOTEL table

module.exports = function(app, pgclient, constants){
  
  //GET API for hotel table
  //url - http://localhost:port/hotel/<hotel_name>
  app.get('/hotel/:hotel_name', function(req,res){
    if(pgclient != null){
        var qry = (constants.SELECT_HOTEL_TABLE_QUERY).replace('$1',req.params.hotel_name);
        console.log("Final Query:"+qry);
        var hotel_id;
        pgclient.query(qry,function(error, result){
           if(error != null){
              res.send(500, "Error in executing SELECT_HOTEL_TABLE_QUERY");
           }
           else if(result != null && result.rows !=null && result.rows.length > 0){
              hotel_id = result.rows[0].hotel_id.toString();
              res.send(200, hotel_id);
           }
           else{
             dish_id = "No Data found for the given hotel_name";
             res.send(404, hotel_id);
           }
        });
      }
      else{
        //TODO - Load the error connection page
        res.send(500, "pgclient is NULL");
      }
  });

  // API - post request for the table “HOTEL”
  // url - http://localhost:port/hotel - The body to contain all other params required by hotel table.
  app.post('/hotel', function(req,res){
    if(pgclient != null){
      current_date = new Date().getTime();
      var qry = (constants.INSERT_HOTEL_TABLE_QUERY).replace('$1',current_date).replace('$2',req.body.hotel_name).replace('$3',req.body.hotel_street_address)
              .replace('$4',req.body.hotel_location).replace('$5',req.body.hotel_state).replace('$6',req.body.hotel_country);
      console.log("Final Query:"+qry);
      var insert_succeeded = false;
      pgclient.query(qry,function(error, result){
        if(error != null){
	   res.send(500, "Error in executing INSERT_HOTEL_TABLE_QUERY");
        }
	//TODO - indentify the result and check how to proceed.
        else{
           //TODO - Add call to worker to insert the images one by one.
           console.log("Successful insertion in the DB - Proceed call to worker for insertion of images");
           insert_succeeded = true;
	   res.send(200, insert_succeeded);
        }
      });
    }
    else{
      //TODO - load the no connection error page here
      res.send(500, "pgclient is NULL");
    }
  });

  // PUT API for the table "HOTEL"
  // url - http://localhost:port/hotel/<hotel_name>
  // body to contain params that need to be modified.
  //TODO - Finalize the algorithm for the put.
  app.put('/hotel/:hotel_name', function(req,res){
     if(pgclient != null){
     }
     else{
     	//TODO - Load the Connection Error page here
	res.send(500, "pgclient is NULL");
     }
  });

  //DELETE API for the dish table - This is called only by moderater action. Cannot be called by end user
  //      url - http://localhost:port/dish/<dish_name>
  app.delete('/hotel/:hotel_name', function(req,res){
    var qry = (constants.DELETE_HOTEL_TABLE_QUERY).replace('$1',req.params.hotel_name);
    console.log("Final Query:"+qry);
    var delete_succeeded = false;
    if(pgclient != null){
      pgclient.query(qry,function(error, result){
        if(error != null){
           console.log("Error in deleting hotel name from the hotel table");
        }
        else{
           console.log("Successful delete of hotel name from hotel table");
           delete_succeeded = true;
        }
        res.send(delete_succeeded);
        console.log("The result:"+result);
      });
    }
    else{
       //TODO - load the no connection error page here
       res.send(delete_succeeded);
    }
  });

}
