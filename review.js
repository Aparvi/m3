// define all API related to REVIEW table
// NO put or delete is defined for the REVIEW table.
// 
module.exports = function(app, pgclient, constants){
  //   GET API for the table review
  //   url for get - http://localhost:port/review/:hotel_dish_id
  //	       return an array of review_id
  //   Algorithm - Based on the hotel_dish_id, fetch all the reviews(review_id) from the REVIEW table.
  app.get('/review/:hotel_dish_id', function(req,res){
     var qry = (constants.SELECT_REVIEW_TABLE_QUERY).replace('$1', req.params.hotel_dish_id);
     console.log("Final Query:"+qry);
     var review_id;
     if(pgclient != null){
        var qry = (constants.SELECT_REVIEW_TABLE_QUERY).replace('$1', req.params.hotel_dish_id);
        console.log("Final Query:"+qry);
        var review_id;
        pgclient.query(qry, function(error, result){
           if(error != null){
           	res.send(500, "Error in running SELECT_REVIEW_TABLE_QUERY");
 	   }
           else if(result != null && result.rows != null && result.rows.length > 0){
	       //TODO - All review id and the complete result set has to be fetched and populated into the result set.
	       //       Return the result set, instead of just the review id.
               if(result.rows[0].review_id != null){
                   review_id = result.rows[0].review_id.toString();
		   res.send(200, review_id);
               }
               else{
                   review_id = "No Review Id found for the hotel_dish_id";
		   res.send(404, review_id);
               }
           }
           else{
               review_id = "No Review Id found for the hotel_dish_id";
	       res.send(404, review_id);
           }
       });
     }
     else{
        //TODO - load the error connection page.
	res.send(500, "pgclient is NULL");
     }
  });


  // API to post review
  // url for post - http://localhost:port/review/<hotel_dish_id>
  // request body to contain the user_id, each of the 6 review params and text review
  // TODO - complete the code below
  app.post('/review/:hotel_dish_id', function(req, res){
     // TODO - This query can be delegated to a worker node
     if(pgclient != null){
        current_date = new Date().getTime();
        var qry = (constants.INSERT_REVIEW_TABLE_QUERY).replace('$1',current_date).replace('$2',req.params.hotel_dish_id).replace('$3',req.body.user_id)
                 .replace('$4',req.body.rating1).replace('$5',req.body.rating2).replace('$6',req.body.rating3).replace('$7',req.body.rating4).replace('$8',req.body.rating5)
                 .replace('$9',req.body.rating6).replace('$10',req.body.final_rating);
        console.log("FINAL QUERY:"+qry);
        pgclient.query(qry, function(error, result){
           // In case of an error log the details
          if(error != null){
             res.send(500,"Error in inserting review in the postgres DB");
          }
          else{
             //TODO - call the other server to insert review text in the mongo DB.
             res.send(200, "Request delegated");
          }
        });
     }
     else{
        //TODO - load the error connection page.
        res.send(500, "Load the Connection Error Page");
     }
  });

}
