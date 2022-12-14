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
				setdatabase.select('transactions.id', 'transactions.productId', 'products.ProductName', 'transactions.amount', 'customers.customerName', 'transactions.status', 'transactions.transactionDate', 'transactions.createBy', 'transactions.createOn').from('transactions').leftJoin('products', 'products.id', 'transactions.productID').leftJoin('customers', 'customers.id', 'transactions.customerID').where('transactions.delete_status', false).orderBy('transactions.transactionDate', 'desc').then((result, err) => 
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
		const { productId, customerID, amount, transactionstatus, transactionDate, userID } = request.body
		
		const data = {
			command  : "Store new transaction",
		}
		
		broker.sendData(data);
		
		cektoken = auth.authenticateToken({token:request.headers.authorization});
		if(cektoken == true){
			var validationRule = {
				"productId": "required|integer",
				"customerID": "required|integer",
				"transactionstatus": "required",
				"amount": "required|integer",
				"transactionDate": "required",
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
							productId:productId,
							customerID:customerID,
							status:transactionstatus,
							amount:amount,
							transactionDate:transactionDate,
							createOn:now,
							createBy:userID,
							delete_status:false
						};
						
						setdatabase.transaction(function (trx){
							setdatabase('transactions').insert(insertdata)
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
				setdatabase.select('transactions.id', 'transactions.productId', 'products.ProductName', 'transactions.amount', 'customers.customerName', 'transactions.status', 'transactions.transactionDate', 'transactions.createBy', 'transactions.createOn').from('transactions').leftJoin('products', 'products.id', 'transactions.productID').leftJoin('customers', 'customers.id', 'transactions.customerID').where('transactions.id', id).andWhere('transactions.delete_status', false).limit(1).then((result, err) => 
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
		const { productId, customerID, amount, transactionstatus, transactionDate, userID } = request.body
		
		const data = {
			command  : "Update transaction data",
			target : id 
		}
		
		broker.sendData(data);
		
		cektoken = auth.authenticateToken({token:request.headers.authorization});
		if(cektoken == true){
			var validationRule = {
				"productId": "required|integer",
				"customerID": "required|integer",
				"transactionstatus": "required",
				"amount": "required|integer",
				"transactionDate": "required",
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
							productId:productId,
							customerID:customerID,
							status:transactionstatus,
							amount:amount,
							transactionDate:transactionDate,
							editOn:now,
							editBy:userID,
						};
						
						setdatabase.transaction(function (trx){
							setdatabase('transactions').update(insertdata).where('id', id)
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