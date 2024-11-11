const bcrypt = require('bcrypt');
const e = require('express');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */


exports.seed = async function(knex) {

  // Deletes ALL existing entries
  await knex('users').del()
  
  const hashedPassword1 = await bcrypt.hash('user1', 10); // 10 是 salt rounds
  const hashedPassword2 = await bcrypt.hash('user2', 10); // 10 是 salt rounds
  const hashedPassword3 = await bcrypt.hash('user3', 10); // 10 是 salt rounds

  await knex('users').insert([
    {id: 1,user_id:'123451',username:'user1', name: '王小明', password:hashedPassword1,email:'chanzihang0311@gmail.com', created_at: new Date(), updated_at: new Date(), deleted_at: null},
    {id: 2,user_id:'123452',username:'user2', name: '陳小華', password:hashedPassword2,email:'user2@demo.com', created_at: new Date(), updated_at: new Date(), deleted_at: null},
    {id: 3,user_id:'123453',username:'user3', name: '李小強', password:hashedPassword3,email:'user3@demo.com', created_at: new Date(), updated_at: new Date(), deleted_at: null}
  ]);
};
