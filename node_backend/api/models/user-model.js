const db = require('../config/config');

module.exports = {
    add,
    findById,
    findByFilter
}

async function findById(id) {
    return await db('users')
                .where({id})
                .select('id', 'username')
                .first();
};

async function findByFilter(filter) {
    return await db('users')
            .where('username');
}

async function add(userCreds) {
    return await db('users')
                .insesrt(userCreds, 'id')
                .then(ids => {
                    const [id] = ids;
                    return findById(id);
                });
};