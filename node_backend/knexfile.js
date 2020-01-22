const lovalPg = {
    host: 'localhost',
    port: '5432',
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
}
const productionDBConnection = process.env.DATABASE_URL || localPg;

module.exports = {
    development: {
        client: 'pg',
    }
}