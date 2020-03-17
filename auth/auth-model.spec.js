const bcrypt = require("bcryptjs");
const db = require("../database/db-config");
const { Users } = require("../Classes/Users");
const User = new Users();

beforeEach(async () => {
    await db.seed.run();
});

describe("Find user", () => {
    test("Query all users in the db", async () => {
        const users = await User.findAll();
        expect(users).toHaveLength(3);
        expect(users).not.toBeUndefined();
        expect(users[0].first_name).toBe("dang");
    });
});

//FindById
describe("Find user by id", () => {
    test("Query based on the user id", async () => {
        const user = await User.findBy({ id: 2 });
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
        const undefineduser = await User.findBy({ id: 10 });

        expect(undefineduser).toBeUndefined();
        expect(undefineduser).toBeFalsy();
    });
});

//Add User

describe("Add New user", () => {
    test("User doesn't exist", async () => {
        const { first_name, last_name } = newUser();
        const findBy = await User.findBy({ first_name, last_name });

        expect(findBy).toBeUndefined();
        expect(findBy).toBeFalsy();
    });
    test("Add new user", async () => {
        const user = newUser();
        const addUser = await User.add(user);

        // hash instance of password
        const { password } = await User.findBy({ id: addUser[0] });

        expect(addUser).toHaveLength(1);
        expect(addUser).not.toBeFalsy();
        expect(addUser[0].password).toBeUndefined();
        expect(User.findBy({ id: addUser[0] })).toBeTruthy();
        expect(password).not.toBe("abc1234");
    });

    test("test for password hash", async () => {
        const user = newUser();
        const addUser = await User.add(user);

        // hash instance of password
        const { password } = await User.findBy({ id: addUser[0] });

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
        const user = await User.findBy({
            first_name: "Lesley",
            last_name: "banadzem"
        });

        expect(user).toBeDefined();
        expect(user).toHaveProperty("email", "id", "passport");
        expect(user).toHaveProperty("email", "lesley@carpal.com");
        expect(user.password).not.toBe("mnop456");
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
