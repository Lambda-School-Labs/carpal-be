const db = require("../database/db-config");
class UserDetails {
    constructor(name, dbName) {
        this.name = name;
        this.dbName = dbName;
        this.name === "hobbies"
            ? (this.key = "hobby_id")
            : (this.key = this.name + "_id");
    }
    async findByUser(user_id) {
        const details = await db(`${this.name} as t`)
            .join(`${this.dbName} as db`, `db.${this.key}`, `t.id`)
            .join("users as u", "u.id", `db.user_id`)
            .where({ "u.id": user_id })
            .select("t.name");
        return details.map((item) => {
            return item.name;
        });
    }
    async add(user_id, items) {
        await Promise.all(
            //find if hobby/audio is in hobbies or audio DB
            items.map(async (item) => {
                const [tag] = await db(this.name).where({
                    name: item
                });
                if (tag) {
                    const tagToAdd = {
                        user_id,
                        [this.key]: tag.id
                    };
                    //check if tag is in join table with that user id
                    const tagInJoin = await db(this.dbName).where(tagToAdd);
                    //if it's not, add it
                    if (tagInJoin.length < 1) {
                        await db(this.dbName).insert(tagToAdd);
                    }
                } else {
                    //if it's not in either add both
                    const [addedTag] = await db(this.name)
                        .insert({
                            name: item
                        })
                        .returning("id");
                    const addedUserTag = await db(this.dbName).insert({
                        user_id,
                        [this.key]: addedTag
                    });
                }
            })
        );
        return this.findByUser(user_id);
    }
}
module.exports = { UserDetails };
