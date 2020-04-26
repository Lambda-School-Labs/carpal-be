const supertest = require("supertest");
const server = require("../../index");
const db = require("../../database/db-config");

let user;

beforeAll(async () => {
    await db.seed.run();
    user = await supertest(server)
        .post("/auth/login")
        .send({ email: "dang@carpal.com", password: "abc123" });
});

describe("Request Get Route", () => {
    test("Get all ride requests", async () => {
        const res = await supertest(server)
            .get("/rides/1/requests")
            .set({ authorization: user.body.token });

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json");
        expect(res.body.length).toBeGreaterThan(0);
    });
});
