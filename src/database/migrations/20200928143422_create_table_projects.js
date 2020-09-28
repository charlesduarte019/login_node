
exports.up = function (knex) {
    return knex.schema.createTable('projects', function (table) {
        table.string('id').notNullable();
        table.string('project_id').primary();
        table.string('title').notNullable();
        table.text('description').notNullable();
        table.string('date').notNullable();

        table.string('created_at').notNullable();
        table.string('updated_at').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('projects');
};

