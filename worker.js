
module.exports = function(app){
     app.get('/review/:review_id', function(req, res){
	console.log("INSIDE GET METHOD OF WORKER.JS");
     });
     app.post('/dish_image/:dish_id', function(req,res){
        console.log("INSIDE POST METHOD OF WORKER.JS");
     });
}

