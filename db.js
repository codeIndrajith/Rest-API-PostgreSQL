const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test1',
  password: 'indra98',
  port: '6000',
});

module.exports = pool;
