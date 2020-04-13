const db = require("../database/db-config");

class UserDetails {
    constructor(name, dbName) {
        this.name = name;
        this.dbName = dbName;

        this.name === "hobbies"
            ? (this.key = "hobby_id")
            : (this.key = this.name + "_id");
    }

    findByUser(user_id) {
        return db(`${this.name} as t`)
            .join(`${this.dbName} as db`, `db.${this.key}`, `t.id`)
            .join("users as u", "u.id", `db.user_id`)
            .where({ "u.id": user_id })
            .select("t.name");
    }

    async add(user_id, items) {
        if (items.length >= 1) {
            const forLoop = async () => {
                for (let i = 0; i < items.length; i++) {
                    //find if hobby/audio is in hobbies or audio DB
                    const tag = await db(this.name).where({ name: items[i] });
                    let tagInJoin;
                    if (tag.id) {
                        //check if tag is in join table with that user id
                        tagInJoin = await db(this.dbName).where({
                            user_id,
                            [this.key]: tag.id
                        });

                        //if it's not add it
                        if (!tagInJoin) {
                            await db(this.dbName).insert({
                                user_id,
                                [this.key]: tag.id
                            });
                        }
                    } else {
                        //if it's not in either add both
                        const [addedTag] = await db(this.name)
                            .insert({
                                name: items[i]
                            })
                            .returning("id");

                        const addedUserTag = await db(this.dbName).insert({
                            user_id,
                            [this.key]: addedTag
                        });
                    }
                }
            };
            //this needs to be await or else return is called before the loop finishes
            await forLoop();
        } else {
            return items;
        }

        return this.findByUser(user_id);
    }
}

module.exports = { UserDetails };
