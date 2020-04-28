const db = require("../database/db-config");
const supertest = require("supertest");
const server = require("./../index.js");

let token;
let user;
beforeAll(async () => {
    await db.seed.run();
    user = await supertest(server)
        .post("/auth/login")
        .send({ email: "dang@carpal.com", password: "abc123" });
    token = user.body.token;
});

describe("Update user", () => {
    test("Return user object", async () => {
        const res = await supertest(server)
            .put("/users/update")
            .send({
                ...user.body,
                hobbies: ["biking", "swimming"],
                audioLikes: ["Rap", "Pop"],
                audioDislikes: ["Classical"]
            })
            .set({ authorization: token });

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json");
        expect(res.body.hobbies[1]).toHaveProperty("name", "biking");
        expect(res.body.audioLikes[1]).toHaveProperty("name", "Rap");
        expect(res.body.audioDislikes[2]).toHaveProperty("name", "Classical");
    });

    test("Reject", async () => {
        const res = await supertest(server)
            .put("/users/update")
            .send(user.body)
            .set({ authorization: token });

        expect(res.status).toBe(400);
        expect(res.type).toBe("application/json");
    });
});

describe("Delete user", () => {
    test("Delete a user", async () => {
        const res = await supertest(server)
            .delete("/users/delete")
            .set({ authorization: token });

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json");
        expect(res.body).toEqual(1);
    });
});
