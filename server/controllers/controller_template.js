//Controller template

//the following things enable this controller to access the models, and also to send html files as responses
var path = require("path");
var htmlPath = path.join(__dirname, "./../../client/");
var requireFolder = require("./../config/req_folder.js");
var models = requireFolder("models");
var crypto = require("crypto");
var flowroute = require(path.join(__dirname, './../flowroute-messaging-nodejs-master/flowroutemessaginglib'));
flowroute.configuration.username = "95004144";
flowroute.configuration.password = "ca2d914d75da2b78953b98c13473c718";

//when you call a model function it should return a value (usually an array, the result of a query)
//after that you can make the response here in the controller

module.exports = {
	test: function(req, res){
		console.log(req.sessionID, "controller function called successfully");
			res.send("successfully made it through route->controller->model->response");
		// });
	},

	start_task: function(req, res){
		console.log("task:", req.body);
		setTimeout(function(){
			console.log("Countdown done");
		}, parseInt(req.body.minutes) * 60000);
	},

	start_task_sms: function(req, res){
    	//Create and send a message
		flowroute.MessagesController.createMessage({"to": req.body.phone_number, "from": "14089122921", "content": `${req.body.user_name} is starting task ${req.body.event_name}. You will be alerted again if they don't check in after ${req.body.duration} minutes.`}, function(err, response){
		      if(err){
		        console.log(err);
		      }
		      console.log(response);
    	});
	},

	add_contact_sms: function(req, res){
    	//Create and send a message
		flowroute.MessagesController.createMessage({"to": req.body.phone_number, "from": "14089122921", "content": `${req.body.user_name} wants you to be an emergency contact for uSafe. Reply "YES" or "NO"`}, function(err, response){
		      if(err){
		        console.log(err);
		      }
		      console.log(response);
    	});
	},

	alert_contact_sms: function(req, res){
    	//Create and send a message
		flowroute.MessagesController.createMessage({"to": req.body.phone_number, "from": "14089122921", "content": `${req.body.user_name} has not checked in after the specified time. Please contact your friend and make sure they are ok.`}, function(err, response){
		      if(err){
		        console.log(err);
		      }
		      console.log(response);
    	});
	},

	incoming_sms: function(req, res){
		console.log(`Incoming sms: ${req.body}`);
		res.sendStatus(200);
	},

	index: function(req, res){
		//response inside callback
		// models.model_template.test(req, res, function(){
			res.render('/index.html');
		// });
	},

	ajax_test: function(req, res){
		// models.model_template.test(req, res, function(){
			res.json({ajax_test1 : "ajax_test1", ajax_test2 : "ajax_test2"});
			console.log("ajax testing");
		// });
	},
	registration: function(req, res){
		models.model_template.registration(req, res, function(err, rows, fields){
			// console.log(req.body, "res.data from registration");
			console.log(rows);
			// res.json({id: rows.insertId});
			res.json(rows.insertId);
		});
	},

	login: function(req, res){
		models.model_template.login(req, res, function(err, rows, fields){
			console.log("AKJHDFKJSDFG", req.body);
			req.session.data = {};
			if (rows.length > 0){
				req.session.data.id = rows[0].id;
				console.log(req.session, "session");
			}
			res.json({validation_errors: []});
		});
	},

	add_new_event: function(req, res){
		models.model_template.add_new_event(req, res, function(err, rows, fields){
		console.log(rows, "add_new_event from controllers")
		res.json(rows);
		})
	},
	add_new_contact: function(req, res){
		models.model_template.add_new_contact(req, res, function(err, rows, fields){
		console.log(rows, "add_new_contact from controllers")
		res.json(rows);
		})
	},
	display_events: function(req, res){
		models.model_template.display_events(req, res, function(err, rows, fields){
			console.log(rows)
			res.json({data:rows});
		});
	},
	display_contacts: function(req, res){
		models.model_template.display_contacts(req, res, function(err, rows, fields){
			console.log(rows, "rows from display_contacts in controller")
			res.json({data:rows});
		});
	},

	delete_event: function(req, res){
		models.model_template.delete_event(req, res, function(err, rows, fields){
			res.json(rows);
		})
	},
	delete_contact: function(req, res){
		models.model_template.delete_contact(req, res, function(err, rows, fields){
			res.json(rows);
		})
	}
	}
