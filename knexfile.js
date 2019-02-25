// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/auth.sqlite3'
    },
    useNullAsDefault: true
  },
  migrations: {
    directory: './data/migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: './data/seeds'
  }
};
