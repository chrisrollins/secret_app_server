//Import the Messaging SDK
var flowroute = require('./flowroutemessaginglib');

//Set your API credentials
flowroute.configuration.username = "USERNAME";
flowroute.configuration.password = "PASSWORD";

//Setup your callback function
var cb =  function(err, response){
	if(err){
		console.log(err);
	}
	console.log(response);
};

//Setup your msg variable
var msg = {"to": "E.164 To", "from": "E.164 From", "content": "YOUR_MESSAGE_GOES_IN_HERE"};

//Execute the method
flowroute.MessagesController.createMessage(msg, cb);

//Retrieve a MDR
	//getMessageLookup : function(recordId, callback)
		//flowroute.MessagesController.getMessageLookup("MDRid", cb)