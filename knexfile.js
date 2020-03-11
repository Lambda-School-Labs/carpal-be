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
    development: pg,
    staging: pg,
    production: pg,
    testing: { ...pg, connection: process.env.DATABASE_URL_TESTING }
};
