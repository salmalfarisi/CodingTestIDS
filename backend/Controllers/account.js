const { kStringMaxLength } = require('buffer');
const fs = require('fs');
const path = require('path');
var dbConnect = require(path.resolve( __dirname, "../databaseconfig.js" ));
var setdatabase = dbConnect.connections;
const validate = require("./validation.js");
const auth = require("../auth");
const broker = require("../queue.js");
const hashcode = require('bcrypt')
const jwt = require('jsonwebtoken');

const login = (request, response) => {
	try{
		const { username, password } = request.body
		
		const data = {
			command  : "Login as " + username
		}
		
		broker.sendData(data);
	
		var validationRule = {
			"username": "required",
			"password": "required",
			
		}
		
		validate(request.body, validationRule, {}, (err, status) => {
			if (!status) {
				response.status(412)
					.send({
						"status" : [{
										"id" : 1, 
										"name" : "FAILED"
									}], 
						"data": err
					});
			} else {
				try{
					setdatabase.transaction(function (trx){
						setdatabase.select('id', 'name', 'username', 'email', 'password', 'delete_status').from('users').where('username', username).andWhere('delete_status', false).limit(1).then((result, err) => 
						{
							if(err)
							{
								response.status(400).send({"status" : [{"id" : 1, "name" : "FAILED"}], "data": [err]})
							}
							
							if (typeof result[0] !== 'undefined')
							{
								checkvalid = hashcode.compareSync(password, result[0].password);
								
								if(checkvalid == true)
								{
									showdata = {
										id:result[0].id,
										name:result[0].name,
										username:result[0].username,
										email:result[0].email,
										delete_status:result[0].delete_status,
										token: auth.generateAccessToken({username:result[0].username, delete_status:result[0].delete_status})
									};
									response.status(200).send({"status" : [{"id" : 0, name : "SUCCESS"}], "data": showdata})
								}
								else
								{
									response.status(200).send({"status" : [{"id" : 1, "name" : "FAILED"}], "data": []})									
								}
							}
							else
							{
								response.status(200).send({"status" : [{"id" : 1, "name" : "FAILED"}], "data": []})
							}
						});
					});
				}
				catch (e) {
					response.status(400).send({"status" : [{"id" : 0, "name" : e.message}], "data": []})
				}		
			}
		});
	} catch (e) {
		response.status(400).send({"status" : [{"id" : 0, "name" : e.message}], "data": []})
	}
}

const logout = (request, response) => {
	const data = {
		command  : "Logout"
	}
		
	broker.sendData(data);
	
	cektoken = auth.authenticateToken({token:request.headers.authorization});
	if(cektoken == true){
		response.status(200).send({"status" : [{"id" : 0, name : "SUCCESS"}], "data": []})
	}
	else{
		response.status(400).send({"status" : [{"id" : 1, "name" : "FAILED"}], "data": []})
	}
}
	
const updateprofile = (request, response) => {
	try{
		id = request.params.id;
		const { name, username, email } = request.body
		
		const data = {
			command  : "Update data for " + username,
			target : id,
			data : { name, username, email },
		}
		
		broker.sendData(data);
	
		cektoken = auth.authenticateToken({token:request.headers.authorization});
		if(cektoken == true){
			var validationRule = {
				"name": "required|string",
				"username": "required|string",
				"email": "required|email",
			}
			
			validate(request.body, validationRule, {}, (err, status) => {
				if (!status) {
					response.status(412)
						.send({
							"status" : [{
											"id" : 1, 
											"name" : "FAILED"
										}], 
							"data": err
						});
				} else {
					try{
						setdatabase.transaction(function (trx0){
							setdatabase('users').select('id', 'name', 'username', 'email', 'password', 'delete_status').from('users').where('username', username).andWhere('delete_status', false).limit(1).then((result, err) => 
							{
								if(err)
								{
									response.status(400).send({"status" : [{"id" : 1, "name" : "FAILED"}], "data": [err]})
								}
								
								let checkvalid = false;
								if (typeof result[0] !== 'undefined')
								{
									if(result[0].id == id)
									{
										checkvalid = true;
									}
								}
								else
								{
									checkvalid = true;
								}
								
								if(checkvalid == true)
								{
									insertdata = {
										name:name,
										email:email,
										username:username,
									};
									
									setdatabase.transaction(function (trx){
										setdatabase('users').update(insertdata).where('id',id)
										.transacting(trx)
										.then((result, err) => 
										{
											if(err)
											{
												response.status(400).send({"status" : [{"id" : 1, "name" : "FAILED"}], "data": [err]})
											}
											response.status(200).send({"status" : [{"id" : 0, name : "SUCCESS"}], "data": [insertdata]})
										})
										.then(trx.commit)
										.catch(trx.rollback);
									});								
								}
							});
						});
					}
					catch (e) {
						response.status(400).send({"status" : [{"id" : 0, "name" : e.message}], "data": []})
					}		
				}
			});
		}
		else{
			response.status(400).send({"status" : [{"id" : 1, "name" : "FAILED"}], "data": []})
		}
	} catch (e) {
		response.status(400).send({"status" : [{"id" : 0, "name" : e.message}], "data": []})
	}
}

const updatepassword = (request, response) => {
	try{
		id = request.params.id;
		const { password, repeatpass } = request.body
		
		const data = {
			command  : "Update password",
			target : id,
		}
		
		broker.sendData(data);
		
		cektoken = auth.authenticateToken({token:request.headers.authorization});
		if(cektoken == true){
			var validationRule = {
				"password": "required",
				"password": "required",
			}
			
			validate(request.body, validationRule, {}, (err, status) => {
				if (!status) {
					response.status(412)
						.send({
							"status" : [{
											"id" : 1, 
											"name" : "FAILED"
										}], 
							"data": err
						})
				} else {
					if(password == repeatpass){
						try{
							insertdata = {
								password:hashcode.hashSync(password, hashcode.genSaltSync(10))
							};
							
							setdatabase.transaction(function (trx){
								setdatabase('users').update(insertdata).where('id',id)
								.transacting(trx)
								.then((result, err) => 
								{
									if(err)
									{
										response.status(400).send({"status" : [{"id" : 1, "name" : "FAILED"}], "data": [err]})
									}
									response.status(200).send({"status" : [{"id" : 0, name : "SUCCESS"}], "data": []})
								})
								.then(trx.commit)
								.catch(trx.rollback);
							});
						}
						catch (e) {
							response.status(400).send({"status" : [{"id" : 0, "name" : e.message}], "data": []})
						}
					}		
					else{
						response.status(412)
							.send({
								"status" : [{
												"id" : 1, 
												"name" : "FAILED"
											}], 
								"data": {
									"errors": {
										"password" : [
											"The password field is not same"
										]
									}
								}
							});
					}
				}
			});
		}
		else{
			response.status(400).send({"status" : [{"id" : 1, "name" : "FAILED"}], "data": []})
		}
	} catch (e) {
		response.status(400).send({"status" : [{"id" : 0, "name" : e.message}], "data": []})
	}
}
  
module.exports = {
	login,
	logout,
	updateprofile,
	updatepassword,
}