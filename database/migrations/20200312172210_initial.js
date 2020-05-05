exports.up = async function (knex) {
    await knex.schema.createTable("users", (tbl) => {
        tbl.increments();
        tbl.string("first_name").notNullable();
        tbl.string("last_name").notNullable();
        tbl.string("email").unique().notNullable();
        //provider_id from social login
        tbl.string("provider_id").unique();

        tbl.string("password").notNullable();
        tbl.boolean("is_driver").defaultTo(false);
        //default phone_number
        tbl.bigInteger("phone_number").notNullable().defaultTo(555555555);
        tbl.timestamp("created_at").defaultTo(knex.fn.now());
        //default zip
        tbl.integer("zip_code").notNullable().defaultTo(12345);
        tbl.boolean("is_admin").defaultTo(false);
        tbl.boolean("is_disabled").defaultTo(false);
        tbl.text("bio");
        tbl.string("profile_picture");
    });
    await knex.schema.createTable("locations", (tbl) => {
        tbl.increments();

        // knex doesn't have double precision built in
        tbl.specificType("lat", "double precision").notNullable();
        tbl.specificType("long", "double precision").notNullable();

        // tbl.string("name").notNullable();
        // tbl.string("address").notNullable();
        // tbl.integer("zip_code").notNullable();
        // tbl.string("city").notNullable();
        // tbl.string("state").notNullable();
    });
    await knex.schema.createTable("hobbies", (tbl) => {
        tbl.increments();
        tbl.string("name").notNullable();
    });
    await knex.schema.createTable("audio", (tbl) => {
        tbl.increments();
        tbl.string("name").notNullable();
    });
    await knex.schema.createTable("users_hobbies", (tbl) => {
        tbl.integer("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        tbl.integer("hobby_id")
            .notNullable()
            .references("id")
            .inTable("hobbies")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        tbl.increments();
    });
    await knex.schema.createTable("users_audio_likes", (tbl) => {
        tbl.integer("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        tbl.integer("audio_id")
            .notNullable()
            .references("id")
            .inTable("audio")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        tbl.increments();
    });
    await knex.schema.createTable("users_audio_dislikes", (tbl) => {
        tbl.integer("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        tbl.integer("audio_id")
            .notNullable()
            .references("id")
            .inTable("audio")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        tbl.increments();
    });
    await knex.schema.createTable("favorite_locations", (tbl) => {
        tbl.integer("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

        // add a name to favorites
        tbl.string("name", 128).notNullable().defaultTo("Home");

        tbl.integer("location_id")
            .notNullable()
            .references("id")
            .inTable("locations")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        tbl.increments();
    });
};
exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("favorite_locations");
    await knex.schema.dropTableIfExists("users_audio_dislikes");
    await knex.schema.dropTableIfExists("users_audio_likes");
    await knex.schema.dropTableIfExists("users_hobbies");
    await knex.schema.dropTableIfExists("audio");
    await knex.schema.dropTableIfExists("hobbies");
    await knex.schema.dropTableIfExists("locations");
    await knex.schema.dropTableIfExists("users");
};
