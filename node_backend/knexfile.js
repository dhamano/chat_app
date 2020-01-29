const localPg = {
    host: 'localhost',
    port: '5432',
    database: 'postgres',
    user: 'dhamano',
    password: 'password'
}
const productionDBConnection = process.env.DATABASE_URL || localPg;

module.exports = {
    development: {
        client: 'pg',
        connection: productionDBConnection,
        migrations: {
            directory: './data/migrations'
        },
        seeds: {
            directory: './data/seeds'
        }
    },
    production: {
        client: 'pg',
        connection: productionDBConnection,
        migrations: {
            directory: './data/migrations'
        },
        seeds: {
            directory: './data/seeds'
        }
    }
}