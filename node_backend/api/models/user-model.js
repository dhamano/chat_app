const db = require('../config/config');

module.exports = {
    add,
    findById
}

function findById(id) {
    return db('users')
                .where({id})
                .select('id', 'username')
                .first();
};

function add(userCreds) {
    return db('users')
                .insesrt(userCreds, 'id')
                .then(ids => {
                    const [id] = ids;
                    return findById(id);
                });
};