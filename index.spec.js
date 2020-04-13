const supertest = require("supertest");
const app = require("./index");
const db = require("./database/db-config");

let user;
let token;
let fullUser;

beforeAll(async () => {
    await db.seed.run();
    //login a user to grab token
    user = await supertest(app)
        .post("/auth/login")
        .send({ email: "dang@carpal.com", password: "abc123" });

    token = user.body.token;
    fullUser = await supertest(app).get("/auth").set({ authorization: token });
});

describe("root route", () => {
    test("GET", async () => {
        const res = await supertest(app).get("/");

        // does it return the expected status code?
        expect(res.status).toBe(200);

        // does it return the expected data format?
        expect(res.type).toBe("application/json");

        // does it return the expected data?
        expect(res.body.message).toMatch(/welcome carpalers/i);
    });
});

describe("users route", () => {
    test("PUT", async () => {
        const res = await supertest(app)
            .put("/users/update")
            .send({
                first_name: fullUser.body.first_name,
                last_name: "testing",
                email: fullUser.body.email,
                password: fullUser.body.password,
                is_driver: fullUser.body.is_driver,
                phone_number: fullUser.body.phone_number,
                zip_code: fullUser.body.zip_code,
                is_disabled: fullUser.body.is_disabled,
                bio: fullUser.body.bio,
                profile_picture: fullUser.body.profile_picture,
                audioDislikes: fullUser.body.audioDislikes,
                audioLikes: fullUser.body.audioLikes,
                hobbies: fullUser.body.hobbies
            })
            .set({ authorization: token });

        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body.last_name).toBe("testing");
        expect(res.body.hobbies[0]).toHaveProperty("name", "video games");
    });

    test("DELETE", async () => {
        const res = await supertest(app)
            .delete("/users/delete")
            .set({ authorization: token });

        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body).toBeGreaterThan(0);
    });
});
