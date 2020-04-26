const supertest = require("supertest");
const server = require("../../index");
const db = require("../../database/db-config");

let user;

beforeAll(async () => {
    await db.seed.run();
    //login a user to grab token
    user = await supertest(server)
        .post("/auth/login")
        .send({ email: "dang@carpal.com", password: "abc123" });
});

describe("Requests Post Route", () => {
    test("Add new ride request", async () => {
        const res = await supertest(server)
            .post("/rides/2/requests")
            .send({
                status: "pending"
            })
            .set({ authorization: user.body.token });

        expect(res.status).toBe(201);
        expect(res.type).toEqual("application/json");
        expect(res.body).toHaveProperty("ride_id", 2);
        expect(res.body).toHaveProperty("rider_id", 1);
        expect(res.body).toHaveProperty("status", "pending");
    });
});
