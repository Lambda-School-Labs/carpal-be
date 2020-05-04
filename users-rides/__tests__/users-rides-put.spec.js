const supertest = require("supertest");
const server = require("../../index");
const db = require("../../database/db-config");

beforeEach(async () => {
    await db.seed.run();
});

describe("Rides-PUT-Router", () => {
    it("returns 200 OK", async () => {
        const res = await supertest(server)
            .put("/users/rides")
            .send({
                ride_id: 1,
                driver_id: 1,
                start_location_id: 1,
                end_location_id: 2,
                status: "pending"
            })
            .set({ authorization: global.token });
        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json");
    });
});
