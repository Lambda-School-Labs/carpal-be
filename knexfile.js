// Update with your config settings.
require("dotenv").config();

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

//Connection Object // comment to make up for forgetting you guys. sorry :(
const localConnection = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB,
    user: process.env.USER || "postgres",
    password: process.env.PASSWORD
};

module.exports = {
    development: {
        ...pg,

        connection: {
            ...localConnection
        }
    },
    staging: pg,
    production: pg,
    testing: {
        ...pg,
        connection: {
            ...localConnection,
            database: process.env.DB_TEST || "postgres"
        }
    }
};
