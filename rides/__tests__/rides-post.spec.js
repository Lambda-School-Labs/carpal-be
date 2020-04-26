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

describe("Rides Post Route", () => {
    test("Add new saved ride", async () => {
        const res = await supertest(server)
            .post("/users/rides")
            .send({
                start_location_id: 1,
                end_location_id: 2
            })
            .set({ authorization: user.body.token });

        expect(res.status).toBe(201);
        expect(res.type).toEqual("application/json");
        expect(res.body).toHaveProperty("driver_id", 1);
        expect(res.body.id).toBeGreaterThan(0);
    });
});
