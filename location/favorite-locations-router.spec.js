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

describe("Favorite locations", () => {
    test("Get user's favorite locations", async () => {
        const res = await supertest(server)
            .get("/locations/favorites")
            .set({ authorization: user.body.token });

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json");
        expect(res.body[0]).toHaveProperty("lat", 37.757532);
        expect(res.body[0]).toHaveProperty("name", "Gym");
    });

    test("Add favorite location to user", async () => {
        const res = await supertest(server)
            .post("/locations/favorites")
            .send({
                lat: 38.384318267773,
                long: -80.537760659361,
                name: "Burger King"
            })
            .set({ authorization: user.body.token });

        expect(res.status).toBe(201);
        expect(res.type).toEqual("application/json");
        expect(res.body).toHaveProperty("user_id", 1);
        expect(res.body.location_id).toBeGreaterThan(0);
    });

    test("Delete favorite location", async () => {
        const res = await supertest(server)
            .delete("/locations/favorites/1")
            .set({ authorization: user.body.token });

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json");
        expect(res.body).toBe(1);
    });

    test("Update favorite location", async () => {
        const newLocation = {
            lat: 38.384318267773,
            long: -80.537760659361,
            name: "Burger King"
        };
        const res = await supertest(server)
            .put("/locations/favorites/1")
            .send(newLocation)
            .set({ authorization: user.body.token });

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json");
        expect(res.body.name).toBe("Burger King");
    });
});
