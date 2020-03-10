const supertest = require("supertest");
const app = require("./index");

describe("root route", () => {
    test("GET", async () => {
        const res = await supertest(app).get("/");

        // does it return the expected status code?
        expect(res.status).toBe(200);

        // does it return the expected data format?
        expect(res.type).toBe("application/json");

        // does it return the expected data?
        expect(res.body.message).toMatch(/welcome carpalers/i);
    });
});
