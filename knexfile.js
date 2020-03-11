// Update with your config settings.

const pg = {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        directory: "./database/migrations"
    },
    seeds: {
        directory: "./database/seeds"
    }
};

module.exports = {
    development: {
        ...pg,
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DB,
            user: process.env.USER,
            password: process.env.PASSWORD
        }
    },
    staging: pg,
    production: pg,
    testing: {
        ...pg,
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DB_TEST,
            user: process.env.USER,
            password: process.env.PASSWORD
        }
    }
};
