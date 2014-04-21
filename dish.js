//This file defines all the APIs of the table dish

module.exports = function(app, pgclient, constants){

  //API - for the table "DISH"
  //GET API for the dish table
  //    url - http://locahost:port/dish/<dish_name>
  app.get('/dish/:dish_name', function(req,res){
    if(pgclient != null){
      console.log(constants.SELECT_DISH_TABLE_QUERY);
      var qry = (constants.SELECT_DISH_TABLE_QUERY).replace('$1',req.params.dish_name);
      console.log("Final Query:"+qry);
      var dish_id;
      pgclient.query(qry,function(error, result){
        if(error != null){
	   res.send(500, "Error in running SELECT_DISH_TABLE_QUERY");        
        }
        else if(result != null && result.rows !=null && result.rows.length > 0){
            dish_id = result.rows[0].dish_id.toString();
	    res.send(200, dish_id);
        }
        else{
            dish_id = "No Data found for the given dish_name";
	    res.send(404, dish_id);
        }
      });
    }
    else{
       //TODO - Load the error connection page
       res.send(500, "pgclient is NULL");
    }
  });

  //POST API for the dish table
  //      url - http://localhost:port/dish/<dish_name>
  //TODO - call worker service to insert images.
  //TODO - extract image from the body the request. there can be multiple images. images will be sent in Base64 encoded format.
  app.post('/dish/:dish_name/:dish_type/:dish_category', function(req,res){
    if(pgclient != null){
      current_date = new Date().getTime();
      var qry = (constants.INSERT_DISH_TABLE_QUERY).replace('$1',current_date).replace('$2',req.params.dish_name).replace('$3',req.params.dish_type).replace('$4',req.params.dish_category);
      console.log("Final Query:"+qry);
      var insert_succeeded = false;

      pgclient.query(qry,function(error, result){
        if(error != null){
	   res.send(500, "Error in inserting dish to the dish table");
        }
        else{
	   //TODO - check the result object. Test the following scenarios
	   // 1. try to insert invalid data in the table - check the response. It can either be an error or a result with failure.
           // in case of failure from above, send a response with 500 error code(or an error code of failure)
	   // Make changes for PUT as well.
           //TODO - Add call to worker to insert the images one by one.
           console.log("Successful insertion in the DB - Proceed call to worker for insetion of images");
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

  //PUT API for the dish table
  //      url - http://localhost:port/dish/<dish_name>
  // request body to contain the new dish name <new_dish_name>
  app.put('/dish/:dish_name', function(req,res){
    if(pgclient != null){
      current_date = new Date().getTime();
      var qry = (constants.UPDATE_DISH_TABLE_QUERY).replace('$2',req.params.dish_name).replace('$1',req.body.new_dish_name);
      console.log("Final Query:"+qry);
      var update_succeeded = false;
      pgclient.query(qry,function(error, result){
        if(error != null){
           console.log("Error in updating into the DB");
	   res.send(500, "Error in updating dish in the dish table");
        }
        else{
 	   //TODO - do the above check as done for post and modify the response appropriately.
           console.log("Successful update in the DB");
           update_succeeded = true;
	   res.send(200, update_succeeded);
        }
      });
    }
    else{
       //TODO - load the no connection error page here
       res.send(500,"pgclient is NULL");
    }
  });

  //DELETE API for the dish table - This is called only by moderater action. Cannot be called by end user
  //      url - http://localhost:port/dish/<dish_name>
  app.delete('/dish/:dish_name', function(req,res){
    if(pgclient != null){
      var qry = (constants.DELETE_DISH_TABLE_QUERY).replace('$1',req.params.dish_name);
      console.log("Final Query:"+qry);
      var delete_succeeded = false;
      pgclient.query(qry,function(error, result){
        if(error != null){
	   res.send(500, "Error in deleting dish from the dish table");
        }
        else{
	   //TODO - do the above check as done for post and modify the response appropriately.
           console.log("Successful delete of dish name from dish table");
           delete_succeeded = true;
	   res.send(200, delete_succeeded);
        }
      });
    }
    else{
       //TODO - load the no connection error page here
       res.send(500, "pgclient is NULL");
    }
  });
}
