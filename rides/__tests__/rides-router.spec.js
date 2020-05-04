const supertest = require('supertest')
const server = require("../../index")
const db = require("../../database/db-config")

beforeEach(async () => {
    await db.seed.run();
});
const token = global.token

describe("Ride Get Route", () => {
    test("Get all rides", async () => {
        const res = await supertest(server)
            .get("/rides")
            .set({ authorization: token })

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json")
        expect(res.body.length).toEqual(10)
    })
    test("Get filtered rides", async () => {
        const res = await supertest(server)
            .get("/rides")
            .set({ authorization: token })
            .send({
                "start_location": {
                    "lat": 37.769233,
                    "long": -122.426907
                },
                "end_location": {
                    "lat": 37.793427,
                    "long": -122.412691
                }
            })

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json")
        expect(res.body.length).toEqual(8)
    })
    test("Ride by id", async () => {
        const res = await supertest(server)
            .get("/rides/1")
            .set({ authorization: token });

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json");
        expect(res.body.id).toEqual(1)
        expect(res.body.status).toBe("pending")
    });
})