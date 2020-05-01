const db = require("../../database/db-config");
const supertest = require("supertest");
const server = require("../../index");


const ride_id = 2
beforeEach(async () => {
    await db.seed.run();
});
const token = global.token

describe("Delete ride", () => {
    test("Delete a ride by id", async () => {
        const res = await supertest(server)
            .delete(`/users/rides/${ride_id}`)
            .set({ authorization: token });

        expect(res.status).toBe(204);
    });
});
