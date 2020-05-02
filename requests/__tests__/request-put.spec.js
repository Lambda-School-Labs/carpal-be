const db = require("../../database/db-config");
const supertest = require("supertest");
const server = require("../../index");

let user;

beforeAll(async () => {
    await db.seed.run();

});

describe("Update ride", () => {
    test("update a request by id", async () => {
        const res = await supertest(server)
            .put("/rides/requests")
            .send({
                ride_id: 1,
                rider_id: 1,
                status: "accepted"
            })
            .set({ authorization: global.token });

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json");
        expect(res.body).toHaveProperty("ride_id", 1);
        expect(res.body).toHaveProperty("rider_id", 1);
        expect(res.body).toHaveProperty("status", "accepted");
    });
});
