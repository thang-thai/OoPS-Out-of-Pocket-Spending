const { Pool } = require('pg');
require('dotenv').config();
console.log(process.env);
const PG_URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text: String, params: String, callback: Function) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
