const db = require("../../database/db-config");
const supertest = require("supertest");
const server = require("../../index");

let user;

beforeAll(async () => {
    await db.seed.run();
});

describe("Delete ride", () => {
    test("delete a request by id", async () => {
        const res = await supertest(server)
            .delete("/rides/requests/1")
            .set({ authorization: global.token });

        expect(res.status).toBe(204);
    });
});
