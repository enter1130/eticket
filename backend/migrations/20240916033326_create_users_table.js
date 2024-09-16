/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').unsigned();        // 自動遞增的 ID
        table.string('name');          // 姓名
        table.string('username');          // 用戶名
        table.string('password');      // 密碼
        table.string('email').unique(); // 唯一的 email
        table.timestamps();            // created_at 和 updated_at 欄位
        table.timestamp('deleted_at'); // soft delete 欄位
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
