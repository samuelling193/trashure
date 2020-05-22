const pg = require('pg');

let pool;

if (process.env.PRODUCTION) {
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  })
} else {
  pool = new pg.Pool({
    database: 'trashure',
    user: 'debbiepaterson',
    password: 'hello'
  })
}

module.exports = {
    query: (sql, params, callback) => {
        return pool.query(sql, params, callback)
    }
}


