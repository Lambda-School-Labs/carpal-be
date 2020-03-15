const supertest = require("supertest");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets");
const { Models } = require("../ModelClass/Models");
const app = require("./../index.js");

describe("Test Register endpoint", () => {
    test("Register new user", async () => {
        const response = await supertest(app)
            .post("/auth/register")
            .send(newUser());
        //return status code/
        //return the data format
        // return data
        expect(response.status).toBe(201);
        expect(response.type).toEqual("application/json");

        expect(response.body[0]).toHaveProperty(
            "first_name",
            "last_name",
            "email",
            "password",
            "is_driver",
            "phone_number",
            "zip_code",
            "is_admin",
            "is_disabled",
            "bio",
            "profile_picture"
        );
    });
});
describe("Test Login endpoint", () => {
    test("Login user", async () => {
        const { email, password } = newUser();
        const response = await supertest(app)
            .post("/auth/login")
            .send({ email, password });

        expect(response.status).toBe(200);
        expect(response.type).toEqual("application/json");
        expect(response.body).toHaveProperty("id", "token", "email");
    });

    test('Loging in with wrong cred', () => {
        
    })
    
});

//New user to register
function newUser() {
    return {
        id: 4,
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
