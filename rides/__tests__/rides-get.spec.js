const supertest = require('supertest')
const server = require("../../index")
const db = require("../../database/db-config")

let user;

beforeAll(async () => {
    await db.seed.run();
    user = await supertest(server)
        .post('/auth/login')
        .send({email: "dang@carpal.com", password: "abc123"})
});

describe("Ride Get Route", () => {
    test("Get all rides", async () => {
        const res = await supertest(server)
            .get("/users/rides")
            .set({ authorization: user.body.token})

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json")        
    })
    test("Ride by id", async () => {
        const res = await supertest(server)
            .get("/users/rides/1")
            .set({ authorization: user.body.token });

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json");
    });
})