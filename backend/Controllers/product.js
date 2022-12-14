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

const index = (request, response) => {
	try{
		const data = {
			command  : "Index product",
		}
		
		broker.sendData(data);
		
		cektoken = auth.authenticateToken({token:request.headers.authorization});
		if(cektoken == true){
			setdatabase.transaction(function (trx){
				setdatabase.select('id', 'ProductName', 'delete_status').from('products').where('delete_status', false).then((result, err) => 
				{
					if(err)
					{
						response.status(400).send({"status" : [{"id" : 1, "name" : "FAILED"}], "data": [err]})
					}
					response.status(400).send({"status" : [{"id" : 1, "name" : "SUCCESS"}], "data": result})			
				});
			});
		}
		else{
			response.status(400).send({"status" : [{"id" : 0, "name" : "FAILED"}], "data": []})			
		}
	} catch (e) {
		response.status(400).send({"status" : [{"id" : 0, "name" : e.message}], "data": []})
	}
}

const store = (request, response) => {
	try{
		const { ProductName, userID } = request.body
		
		const data = {
			command  : "Store new product",
		}
		
		broker.sendData(data);
		
		cektoken = auth.authenticateToken({token:request.headers.authorization});
		if(cektoken == true){
			var validationRule = {
				"ProductName": "required",
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
					try{
						var settime = new Date();
						var now = settime.getFullYear() + '-' + (parseInt(settime.getMonth()) + parseInt("1")) + '-' + parseInt(settime.getDate()) + " " + parseInt(settime.getHours()) + ":" + parseInt(settime.getMinutes()) + ":" + parseInt(settime.getSeconds());
						insertdata = {
							ProductName:ProductName,
							createOn:now,
							createBy:userID,
							delete_status:false
						};
						
						setdatabase.transaction(function (trx){
							setdatabase('products').insert(insertdata)
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
			});
		}
		else{
			response.status(400).send({"status" : [{"id" : 1, "name" : "FAILED"}], "data": []})
		}
	} catch (e) {
		response.status(400).send({"status" : [{"id" : 0, "name" : e.message}], "data": []})
	}
}

const show = (request, response) => {
	try{
		id = request.params.id;
		
		const data = {
			command  : "Get product by id",
			target : id,
		}
		
		broker.sendData(data);
		
		cektoken = auth.authenticateToken({token:request.headers.authorization});
		if(cektoken == true){
			setdatabase.transaction(function (trx){
				setdatabase.select('id', 'ProductName', 'delete_status').from('products').where('id', id).andWhere('delete_status', false).then((result, err) => 
				{
					if(err)
					{
						response.status(400).send({"status" : [{"id" : 1, "name" : "FAILED"}], "data": [err]})
					}
					response.status(400).send({"status" : [{"id" : 1, "name" : "SUCCESS"}], "data": result})			
				});
			});
		}
		else{
			response.status(400).send({"status" : [{"id" : 0, "name" : "FAILED"}], "data": []})			
		}
	} catch (e) {
		response.status(400).send({"status" : [{"id" : 0, "name" : e.message}], "data": []})
	}
}

const update = (request, response) => {
	try{
		id = request.params.id;
		const { ProductName, userID } = request.body
		
		const data = {
			command  : "Update product for " + ProductName,
			target : id,
		}
		
		broker.sendData(data);
		
		cektoken = auth.authenticateToken({token:request.headers.authorization});
		if(cektoken == true){
			var validationRule = {
				"ProductName": "required",
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
					try{
						var settime = new Date();
						var now = settime.getFullYear() + '-' + (parseInt(settime.getMonth()) + parseInt("1")) + '-' + parseInt(settime.getDate()) + " " + parseInt(settime.getHours()) + ":" + parseInt(settime.getMinutes()) + ":" + parseInt(settime.getSeconds());
						insertdata = {
							ProductName:ProductName,
							editOn:now,
							editBy:userID,
						};
						
						setdatabase.transaction(function (trx){
							setdatabase('products').update(insertdata).where('id',id)
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
			});
		}
		else{
			response.status(400).send({"status" : [{"id" : 1, "name" : "FAILED"}], "data": []})
		}
	} catch (e) {
		response.status(400).send({"status" : [{"id" : 0, "name" : e.message}], "data": []})
	}
}

const destroy = (request, response) => {
	try{
		id = request.params.id;
		
		const data = {
			command  : "Delete product",
			target : id,
		}
		
		broker.sendData(data);
		
		cektoken = auth.authenticateToken({token:request.headers.authorization});
		if(cektoken == true){
			try{
				var settime = new Date();
				var now = settime.getFullYear() + '-' + (parseInt(settime.getMonth()) + parseInt("1")) + '-' + parseInt(settime.getDate()) + " " + parseInt(settime.getHours()) + ":" + parseInt(settime.getMinutes()) + ":" + parseInt(settime.getSeconds());
				insertdata = {
					delete_status:true,
					deleteOn:now,
				};
				
				setdatabase.transaction(function (trx){
					setdatabase('products').update(insertdata).where('id',id)
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
			response.status(400).send({"status" : [{"id" : 1, "name" : "FAILED"}], "data": []})
		}
	} catch (e) {
		response.status(400).send({"status" : [{"id" : 0, "name" : e.message}], "data": []})
	}
}

module.exports = {
	index,
	show,
	update,
	store,
	destroy
}