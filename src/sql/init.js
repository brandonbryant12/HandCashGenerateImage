// require('dotenv').config()
// const { parse } = require('pg-connection-string');
// const { Pool } = require('pg')
 
// const config = parse(process.env.postgres_database_url);
// config.connectionTimeoutMillis = 30000;
// const pool = new Pool(config)

// const initQuery = 'CREATE TABLE IF NOT EXISTS "Prompts" (imageUrl varchar, alias varchar, prompt varchar, created_at timestamp default current_timestamp, updated_at timestamp default current_timestamp);';


// async function initialize() {
//   await pool.query(initQuery);
// }

// function getConnection() {
//    return pool.connect();
// }

// ( async () => {
//   await initialize();
// })();

// module.exports = { pool, initialize, getConnection };