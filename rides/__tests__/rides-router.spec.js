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
            .get('/rides?start_location=%7B"long":-122.463,"lat":37.7648%7D&end_location=%7B"long":-122.39941175,"lat":37.7946225%7D')
            .set({ authorization: token })

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