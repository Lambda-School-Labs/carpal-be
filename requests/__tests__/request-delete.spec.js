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
            .delete("/rides/requests")
            .send({ ride_id: 1 })
            .set({ authorization: user.body.token });

        expect(res.status).toBe(204);
    });
});
