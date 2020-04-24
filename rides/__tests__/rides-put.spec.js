const supertest = require("supertest");
const server = require("../../index");
const db = require("../../database/db-config");

let user;

beforeEach(async () => {
    await db.seed.run();

    user = await supertest(server)
        .post("/auth/login")
        .send({ email: "dang@carpal.com", password: "abc123" });
});

describe("Rides-PUT-Router", () => {
    it("returns 200 OK", async () => {
        const res = await supertest(server)
            .put("/users/rides/1")
            .send({
                start_location_id: 1,
                end_location_id: 2,
                status: "pending"
            })
            .set({ authorization: user.body.token });

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json");
    });
});
