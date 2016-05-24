var mongoose = require('mongoose');
 
module.exports = mongoose.model('User',{
    local: { username: String,
    password: String,
    email: String,
    firstName: String,
    lastName : String,
    address: String
    },
    fb: {
		id: String,
		access_token: String,
		firstName: String,
		lastName: String,
		email: String
	},
	twitter: {
		id: String,
		token: String,
		username: String,
		displayName: String,
		lastStatus: String
	}
});