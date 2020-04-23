const db = require("../database/db-config");
const supertest = require("supertest");
const server = require("./../index.js");

let token;
let user;
const ride_id = 1
beforeAll(async () => {
    await db.seed.run();
    user = await supertest(server)
        .post("/auth/login")
        .send({ email: "dang@carpal.com", password: "abc123" });
    token = user.body.token;
});

describe("Delete ride", () => {
    test("Delete a ride by id", async () => {
        const res = await supertest(server)
            .delete(`/ride/${ride_id}`)
            .set({ authorization: token });

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json");
        expect(res.body).toEqual(1);
    });
});
