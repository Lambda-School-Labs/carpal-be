const supertest = require("supertest");
const server = require("../index");
const db = require("../database/db-config");

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
            id: 1,
            name: "home",
            address: "4239 longfoot way",
            city: "san jose",
            state: "ca",
            zip_code: 95135
        });
    });

    test("Add location", async () => {
        const res = await supertest(server)
            .post("/locations")
            .send({
                name: "test place",
                address: "844 testers lane",
                city: "test city",
                state: "ts",
                zip_code: 94412
            })
            .set({ authorization: user.body.token });

        expect(res.status).toBe(201);
        expect(res.type).toEqual("application/json");
        expect(res.body).toHaveProperty("name", "test place");
    });

    test("Update location", async () => {
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

    test("Delete location", async () => {
        const res = await supertest(server)
            .delete("/locations/1")
            .set({ authorization: user.body.token });

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json");
        expect(res.body).toBe(1);
    });
});
