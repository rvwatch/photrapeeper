exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('albums', function (table) {
      table.increments('id').primary();
      table.string('title');
      table.string('url');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('albums')
  ]);
};
