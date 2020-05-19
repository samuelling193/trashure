const pg = require('pg');

const pool = new pg.Pool({
    database: ' '
})

module.exports = {
    query: (sql, params, callback) => {
        return pool.query(sql, params, callback)
    }
}