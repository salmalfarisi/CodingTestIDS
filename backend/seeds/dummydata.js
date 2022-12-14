const bcrypt = require('bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  var settime = new Date();
  var now = settime.getFullYear() + '-' + (parseInt(settime.getMonth()) + parseInt("1")) + '-' + parseInt(settime.getDate());
  // Deletes ALL existing entries
  await knex('transactions').del()
  await knex('customers').del()
  await knex('products').del()
  await knex('users').del()
  
  await knex('users').insert([
    {id: 1, name: 'akun1', username: 'akun1', email:'akun1@email.com', password:bcrypt.hashSync("akun1", bcrypt.genSaltSync(10)), createOn:now, delete_status:false},
    {id: 2, name: 'akun2', username: 'akun2', email:'akun2@email.com', password:bcrypt.hashSync("akun2", bcrypt.genSaltSync(10)), createOn:now, delete_status:false},
    {id: 3, name: 'akun3', username: 'akun3', email:'akun3@email.com', password:bcrypt.hashSync("akun3", bcrypt.genSaltSync(10)), createOn:now, delete_status:false},
  ]);
  
  await knex('products').insert([
	{id:1, ProductName: 'product1', createOn: now, delete_status: false},
	{id:2, ProductName: 'product2', createOn: now, delete_status: false},
	{id:3, ProductName: 'product3', createOn: now, delete_status: false},
  ]);
  
  await knex('customers').insert([
	{id:1, customerName: 'customer1', createOn: now, delete_status: false},
	{id:2, customerName: 'customer2', createOn: now, delete_status: false},
	{id:3, customerName: 'customer3', createOn: now, delete_status: false},
  ]);
};
