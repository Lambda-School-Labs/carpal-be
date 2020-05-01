const supertest = require("supertest");
const server = require("../index");
const db = require("../database/db-config");
let user;

beforeAll(async () => {
    await db.seed.run();
    //login a user to grab token
    user = await supertest(server)
        .post("/auth/login")
        .send({ email: "dang@carpal.com", password: "abc123" });
});

describe("Location Route", () => {
    test("Get location by id", async () => {
        const res = await supertest(server)
            .get("/locations/1")
            .set({ authorization: user.body.token });

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json");
        expect(res.body).toMatchObject({
            lat: 37.757532, 
            long: -122.388505
        });
    });

    test("Add location", async () => {
        const res = await supertest(server)
            .post("/locations")
            .send({
              lat:33.394348176013,
              long:-80.464474764805
            })
            .set({ authorization: user.body.token });

        expect(res.status).toBe(201);
        expect(res.type).toEqual("application/json");
        expect(res.body).toHaveProperty("lat", 33.394348176013);
    });

    test("Update location", async () => {
        const newLocation = {
            lat: 33.394348176013,
            long:-80.464474764805
        };
        const res = await supertest(server)
            .put("/locations/2")
            .send(newLocation)
            .set({ authorization: user.body.token });

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json");
        expect(res.body).toHaveProperty("lat",33.394348176013);
        expect(res.body).toHaveProperty("long", -80.464474764805);
    });

    test("Delete location", async () => {
        const res = await supertest(server)
            .delete("/locations/1")
            .set({ authorization: user.body.token });

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json");
        expect(res.body).toBe(1);
    });
});
