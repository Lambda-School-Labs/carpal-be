const supertest = require("supertest");
const server = require("../../index");
const db = require("../../database/db-config");


beforeAll(async () => {
    await db.seed.run();
});
afterEach(async () => {
    await db.destroy()
})
describe("Requests Post Route", () => {
    test("Add new ride request", async () => {
        const res = await supertest(server)
            .post("/rides/requests")
            .send({
                ride_id: 1,
                status: "pending"
            })
            .set({ authorization: global.token });

        expect(res.status).toBe(201);
        expect(res.type).toEqual("application/json");
        expect(res.body).toHaveProperty("ride_id", 2);
        expect(res.body).toHaveProperty("rider_id", 1);
        expect(res.body).toHaveProperty("status", "pending");
    });
});
