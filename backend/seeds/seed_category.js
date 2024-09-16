/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('category').del()
  await knex('category').insert([
    {id: 1, name:'校外', description: 'category1 description', created_at: new Date(), updated_at: new Date(), deleted_at: null},
    {id: 2, name:'校內', description: 'category2 description', created_at: new Date(), updated_at: new Date(), deleted_at: null},
    {id: 3, name:'其他', description: 'category3 description', created_at: new Date(), updated_at: new Date(), deleted_at: null}
  ]);
};
