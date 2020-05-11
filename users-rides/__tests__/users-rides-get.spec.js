const supertest = require('supertest')
const server = require("../../index")
const db = require("../../database/db-config")

beforeEach(async () => {
    await db.seed.run();
});

describe("Ride Get Route", () => {
    test("Get all rides", async () => {
        const res = await supertest(server)
            .get("/users/rides")
            .set({ authorization: global.token })

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json")
    })
    test("Ride by id", async () => {
        const res = await supertest(server)
            .get("/users/rides/1")
            .set({ authorization: token });

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json");
    });
})