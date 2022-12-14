var path = require('path');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// get config vars
dotenv.config();

// access config var
const APP_KEY = process.env.TOKEN_SECRET;

// Set access token via Controller only
const generateAccessToken = (request) => {
	let token;
	if(parseInt(request.delete_status) == parseInt("0")){
		token = jwt.sign({username:request.username}, APP_KEY, { expiresIn: '6h' });
	}
	else{
		token = jwt.sign({username:request.username}, APP_KEY, { expiresIn: '3h' });		
	}
	if(token){
		return token;
	}
	else{
		return false;
	}
	response.end();
}

// Check access token via Controller only
const authenticateToken = (request, response) => {
	try{
		const result = jwt.verify(request.token.split(' ')[1], APP_KEY);
		return true;
	}catch(e){
		return false;
	}
}

module.exports = {
	generateAccessToken,
	authenticateToken,
}