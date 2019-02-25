exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', table => {
    table.increments();
    table
      .string('username', 128)
      .unique()
      .notNullable();
    table
      .string('password', 128)
      .unique()
      .notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
