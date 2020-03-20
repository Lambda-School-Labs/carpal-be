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
        expect(res.body[0]).toHaveProperty(
            "name",
            "address",
            "city",
            "state",
            "zip_code"
        );
    });

    test("Add favorite location to user", async () => {
        const res = await supertest(server)
            .post("/locations/favorites/add")
            .send({
                name: "home",
                address: "250 test st",
                city: "roanoke",
                state: "va",
                zip_code: "24012"
            })
            .set({ authorization: user.body.token });

        expect(res.status).toBe(201);
        expect(res.type).toEqual("application/json");
        expect(res.body).toHaveProperty("user_id", 1);
        expect(res.body.location_id).toBeGreaterThan(0);
    });

    test("Delete favorite location", async () => {
        const res = await supertest(server)
            .delete("/locations/favorites/delete/3")
            .set({ authorization: user.body.token });

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json");
        expect(res.body).toBe(1);
    });

    test("Update favorite location", async () => {
        const newLocation = {
            name: "The spot",
            address: "250 test ave",
            city: "Morgantown",
            state: "WV",
            zip_code: "25091"
        };
        const res = await supertest(server)
            .put("/locations/favorites/update/3")
            .send(newLocation)
            .set({ authorization: user.body.token });

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json");
        expect(res.body).toHaveProperty("name", "The spot");
        expect(res.body).toHaveProperty("city", "Morgantown");
    });
});
