const db = require("../../database/db-config");
const supertest = require("supertest");
const server = require("../../index");

beforeEach(async () => {
    await db.seed.run();
});

describe("Delete ride", () => {
    test("Delete a ride by id", async () => {
        const res = await supertest(server)
            .delete("/users/rides")
            .set({ authorization: global.token })
            .send({
                "ride_id": 2
            })

        expect(res.status).toBe(204);
    });
});
