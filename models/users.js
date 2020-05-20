// substitute records array with the trashure db
// var records = [
//     { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
//   , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
// ];

const db = require('./config')

module.exports = {
    findByUsername: (username, cb) => {
        const records = db.query('select * from users;')
        process.nextTick(function() {
        for (var i = 0, len = records.length; i < len; i++) {
            var record = records[i];
            if (record.username === username) {
            return cb(null, record);
            }
        }
        return cb(null, null);
        });
    }
}