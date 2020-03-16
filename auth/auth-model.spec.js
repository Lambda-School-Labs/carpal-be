const bcrypt = require("bcryptjs");
const db = require("../database/db-config");
const authModels = require("./auth-model");
const { Models } = require("./../ModelClass/Models");
const models = new Models("users");

beforeEach(async () => {
    await db.seed.run();
});

describe("Find user", () => {
    test("Query all users in the db", async () => {
        const users = await models.findAll();
        expect(users).toHaveLength(3);
        expect(users).not.toBeUndefined();
        expect(users[0].first_name).toBe("dang");
    });
});

//FindById
describe("Find user by id", () => {
    test("Query based on the user id", async () => {
        const user = await authModels.findUsersById(2).first();
        expect(user).not.toBeUndefined();
        expect(user.id).toEqual(2);
        expect(typeof user).toBe("object");
        expect(user).toMatchObject({
            first_name: "daniel",
            last_name: "martin",
            email: "daniel@carpal.com"
        });
    });
    test("Checking for incorrect user id", async () => {
        const undefineduser = await authModels.findUsersById(10).first();

        expect(undefineduser).toBeUndefined();
        expect(undefineduser).toBeFalsy();
    });
});

//Add User

describe("Add New user", () => {
    test("User doesn't exist", async () => {
        const { first_name, last_name } = newUser();
        const findBy = await authModels.findBy({ first_name, last_name });

        expect(findBy).toHaveLength(0);
        expect(findBy[0]).toBeFalsy();
    });
    test("Add new user", async () => {
        const user = newUser();
        const addUser = await authModels.addUser(user);

        // hash instance of password
        const { password } = await authModels.findBy(addUser[0]).first();

        expect(addUser).toHaveLength(1);
        expect(addUser).not.toBeFalsy();
        expect(addUser[0].password).toBeUndefined();
        expect(authModels.findBy(addUser[0])).toBeTruthy();
        expect(password).not.toBe("abc1234");
    });

    test("test for password hash", async () => {
        const user = newUser();
        const addUser = await authModels.addUser(user);

        // hash instance of password
        const { password } = await authModels.findBy(addUser[0]).first();

        //Compare password
        const hash = bcrypt.compareSync("abc1234", password);
        expect(hash).toBeTruthy();
        expect(typeof hash).toBe("boolean");

        //Wrong password
        expect(bcrypt.compareSync("ABC1234", password)).not.toBeTruthy();
        expect(bcrypt.compareSync("abc234 ", password)).toBeFalsy();
    });
});

describe("FindBy Module", () => {
    test("should Test the findByModule", async () => {
        const lesley = { first_name: "Lesley", last_name: "banadzem" };
        const user = await authModels.findBy(lesley);

        expect(user).toBeDefined();
        expect(user[0]).toHaveProperty("email", "id", "passport");
        expect(user[0]).toHaveProperty("email", "lesley@carpal.com");
        expect(user[0].password).not.toBe("mnop456");
    });
});

//function to return new user Object
//Verify why adding a new user without id throws an error
function newUser() {
    return {
        id: 4,
        first_name: "Hira",
        last_name: "Khan",
        email: "hira.khan@carpal.com",
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
