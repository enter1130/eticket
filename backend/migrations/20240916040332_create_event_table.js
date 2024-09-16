/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('event', function(table) {
        table.increments('id').unsigned();        // 自動遞增的 ID
        table.integer('category_id').unsigned().notNullable();  // 活動類別 ID
        table.foreign('category_id').references('id').inTable('category');
        table.string('name');          // 活動名稱
        table.string('date');          // 舉辦時間
        table.string('location');      // 舉辦地點
        table.string('description');   // 活動描述
        table.string('organizer');   // 主辦單位
        table.string('image');         // 海報
        table.integer('quota');        // 人數上限
        table.integer('attendee');     // 參加人數
        table.integer('like');         // 按讚數
        table.integer('price');        // 價格
        table.string('status');        // 活動狀態
        table.json('tag');              // 活動標籤
        table.timestamps();            // created_at 和 updated_at 欄位
        table.timestamp('deleted_at'); // soft delete 欄位
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('event');
};
