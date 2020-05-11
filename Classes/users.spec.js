const db = require("../database/db-config");
const { UserDetails } = require("./user-details");
const { Users } = require("./users");

const userDB = new Users();
const hobbiesDB = new UserDetails("hobbies", "users_hobbies");
const audioLikesDB = new UserDetails("audio", "users_audio_likes");
const audioDislikesDB = new UserDetails("audio", "users_audio_dislikes");

let user;

beforeEach(async () => {
    await db.seed.run();
    user = await userDB.findBy({ email: "dang@carpal.com" });
});


describe("UserDetails class functions", () => {
    test("Add Hobbies", async () => {
        const hobbyResult = await hobbiesDB.add(user.id, ["sports", "biking"]);

        expect(hobbyResult[2]).toHaveProperty("name", "sports");
        expect(hobbyResult[1]).toHaveProperty("name", "biking");
    });

    test("Add Audio Likes", async () => {
        const audioLikesResult = await audioLikesDB.add(user.id, [
            "Punk",
            "Classical"
        ]);

        expect(audioLikesResult[1]).toHaveProperty("name", "Punk");
        expect(audioLikesResult[2]).toHaveProperty("name", "Classical");
    });

    test("Add Audio Dislikes", async () => {
        const audioDislikesResult = await audioDislikesDB.add(user.id, [
            "Jazz",
            "Rap"
        ]);

        expect(audioDislikesResult[2]).toHaveProperty("name", "Jazz");
        expect(audioDislikesResult[3]).toHaveProperty("name", "Rap");
    });
});
