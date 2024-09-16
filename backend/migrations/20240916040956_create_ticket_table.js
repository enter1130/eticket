/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('ticket', function(table) {
        table.increments('id').unsigned();        // 自動遞增的 ID
        table.integer('user_id').unsigned().notNullable();       // 用戶 ID
        table.foreign('user_id').references('id').inTable('users');
        table.integer('event_id').unsigned().notNullable();      // 活動 ID
        table.foreign('event_id').references('id').inTable('event');
        table.string('status');        // 狀態
        table.string('description');   //心得
        table.integer('rate');         //評價
        table.timestamps();            // created_at 和 updated_at 欄位
        table.timestamp('deleted_at'); // soft delete 欄位
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('ticket');
};
