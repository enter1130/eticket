/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('event').del()
  await knex('event').insert([
    {id: 1, category_id: 1, name:'校外活動1', date:'2022-09-16', location:'台北市信義區', description:'校外活動1 description', organizer:'校外活動1 organizer', image:'https://fakeimg.pl/300/', quota:100, attendee:50, like:0, price:1000, status:'open', tag:JSON.stringify([{"name":"new","color":"default"},{"name":"free","color":"success"},{"name":"discount","color":"processing"}]), created_at: new Date(), updated_at: new Date(), deleted_at: null},
    {id: 2, category_id: 2, name:'校內活動1', date:'2022-12-01', location:'台北市信義區', description:'校內活動1 description', organizer:'校內活動1 organizer', image:'https://fakeimg.pl/300/', quota:100, attendee:50, like:0, price:0, status:'open', tag:JSON.stringify([{"name":"new","color":"default"},{"name":"hot","color":"error"},{"name":"discount","color":"processing"}]), created_at: new Date(), updated_at: new Date(), deleted_at: null},
    {id: 3, category_id: 3, name:'其他活動1', date:'2022-10-16', location:'台北市信義區', description:'其他活動1 description', organizer:'其他活動1 organizer', image:'https://fakeimg.pl/300/', quota:100, attendee:50, like:0, price:200, status:'open', tag:JSON.stringify([{"name":"new","color":"default"},{"name":"free","color":"success"},{"name":"hot","color":"error"}]), created_at: new Date(), updated_at: new Date(), deleted_at: null},
    {id: 4, category_id: 1, name:'校外活動2', date:'2022-09-22', location:'台北市信義區', description:'校外活動2 description', organizer:'校外活動2 organizer', image:'https://fakeimg.pl/300/', quota:100, attendee:50, like:0, price:2500, status:'open', tag:JSON.stringify([{"name":"new","color":"default"},{"name":"free","color":"success"},{"name":"discount","color":"processing"}]), created_at: new Date(), updated_at: new Date(), deleted_at: null}
  ]);
};