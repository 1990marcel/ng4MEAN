var express = require('express');
var router = express.Router();
//mongodb
var mongojs = require('mongojs');
var db = mongojs('mongodb://marcel:magaji@ds127132.mlab.com:27132/firstmongo', ['users']);


//routes

//Get all Users
router.get('/users', function(req, res, next){
  db.users.find(function (err, users) {
    if(err){
      res.send(err);
    }
    res.json(users);
  })
});

//Get Single User
router.get('/user/:id', function (req, res, next) {
	db.users.findOne({_id:mongojs.ObjectId(req.params.id)}, function(err, user){
			if(err){
				res.send(err);
			}
			res.json(user);
	});
});

//save user
router.post('/user', function(req, res, next){
		var user = req.body;
		if(!user.first_name || !(user.last_name + '') || !(user.specialty + '') || !(user.likes + '')){
				res.status(400);
				res.json({
					"error":"bad data"
				});
		}else{
			db.users.save(user, function(err, user){
						if(err){
				res.send(err);
			}
			res.json(user); 
			});
		}
});
//delete user
router.delete('/user/:id', function (req, res, next) {
	db.users.remove({_id:mongojs.ObjectId(req.params.id)}, function(err, user){
			if(err){
				res.send(err);
			}
			res.json(user);
	});
});

//update

router.put('/user/:id', function (req, res, next) {
	var user  = req.body;
	var updUser = {};
	if(user.isDone){
			updUser.isDone = user.isDone;

	}

	if(user.title){
			updUser.title = user.title;

	}

		if(!updUser){
			res.status(400);
			res.json({
				"error":"bad data"
			});
		}else{
			db.users.update({_id:mongojs.ObjectId(req.params.id)}, updUser, {}, function(err, task){
			if(err){
				res.send(err);
			}
			res.json(task);
	});

	}


});
module.exports = router;
