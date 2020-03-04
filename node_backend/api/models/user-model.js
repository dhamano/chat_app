const db = require('../config/config');

module.exports = {
    add,
    findById,
    findByFilter
}

async function findById(id) {
    try {
        return await db('users')
                    .where({id})
                    .select('id', 'username')
                    .first();
    }
    catch(err) {
        console.log("findById: ERR",err);
        console.error(err);
    }
};

async function findByFilter(filter) {
    try {
        return await db('users')
                    .where(filter)
                    .first();         
    }
    catch(err) {
        console.log("findByFilter: ERR",err);
        console.error(err);
    }
}

async function add(userCreds) {
    try {
        return await db('users')
                    .insert(userCreds, 'id')
                    .then(ids => {
                        const [id] = ids;
                        return findById(id);
                    });
    }
    catch(err) {
        console.log("add: ERR",err);
        console.error(err);
        return err;
    }
};