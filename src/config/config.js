exports.pgConfig = {
  client: 'pg',
  connection: {
    user: '', //env var: PGUSER
    database: 'graffy', //env var: PGDATABASE
    password: '', //env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5433, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  },
  pool: { min: 0, max: 7 }
};