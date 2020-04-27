const db = require("../../database/db-config");
const supertest = require("supertest");
const server = require("../../index");

let user;

beforeAll(async () => {
    await db.seed.run();
    user = await supertest(server)
        .post("/auth/login")
        .send({ email: "dang@carpal.com", password: "abc123" });
});

describe("Delete ride", () => {
    test("delete a request by id", async () => {
        const res = await supertest(server)
        .delete('/rides/1/request/1')
        .set({ authorization: user.body.token})

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json");
        expect(res.body).toBe(1);
    })
})