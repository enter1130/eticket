/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('category', function(table) {
        table.increments('id').unsigned();        // 自動遞增的 ID
        table.string('name');          // 類別名稱
        table.string('description');   // 類別描述
        table.timestamps();            // created_at 和 updated_at 欄位
        table.timestamp('deleted_at'); // soft delete 欄位
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('catagory');
};
