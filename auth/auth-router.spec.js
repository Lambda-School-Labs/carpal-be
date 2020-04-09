const supertest = require("supertest");
const app = require("./../index.js");
const db = require("./../database/db-config");

beforeAll(async () => {
    await db.seed.run();
});
describe("Test Register endpoint", () => {
    test("Register new user", async () => {
        const response = await supertest(app)
            .post("/auth/register")
            .send(newUser());
        expect(response.status).toBe(201);
        expect(response.type).toEqual("application/json");
        expect(response.body.first_name).toBe("Ruth");
    });
});
describe("Test Login endpoint", () => {
    //this user needs to be in a DB seed or created here since before every describe the DB reseeds
    const user = {
        email: "dang@carpal.com",
        password: "abc123"
    };
    test("Login user", async () => {
        const response = await supertest(app)
            .post("/auth/login")
            .send(user);

        expect(response.status).toBe(200);
        expect(response.type).toEqual("application/json");
        expect(response.body).toHaveProperty("id", 1);
        expect(response.body).toHaveProperty("email", "dang@carpal.com");
    });

    test("Get user from token", async () => {
        //grab user token
        const userRes = await supertest(app)
            .post("/auth/login")
            .send(user);
        const res = await supertest(app)
            .get("/auth")
            .set({ authorization: userRes.body.token }); //set user's token in auth header

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json");
        expect(res.body.first_name).toMatch(/dang/i);
    });

    test("Login in with wrong cred", async () => {
        const response = await supertest(app)
            .post("/auth/login")
            .send({ email: user.email, password: "hello" });
        expect(response.status).toBe(401);
        expect(response.type).toEqual("application/json");
        expect(response.body).toMatchObject({ message: "unauthorized user" });
    });
});

//New user to register
function newUser() {
    return {
        first_name: "Ruth",
        last_name: "Poliakon",
        email: "ruth.pol@carpal.com",
        password: "abc1234",
        is_driver: true,
        phone_number: 4112439932,
        zip_code: 94150,
        is_admin: false,
        is_disabled: false,
        bio: "blah2 blah2 blah2 ble bla",
        profile_picture: "profile.jpeg"
    };
}
