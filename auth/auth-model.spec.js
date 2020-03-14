const bcrypt = require("bcryptjs");
const db = require("../database/db-config");
const authModels = require('./auth-model');
beforeEach(async ()=>{
    await db.seed.run();
})

describe('Find user',  () => {
    test('Query all users in the db', async () => {

        const users = await db('users');

        expect(users).toHaveLength(3);
        expect(users).not.toBeUndefined()
        expect(users[0].first_name).toBe('dang')
    })
})
describe('Find user by id',  () => {
    test('Query based on the user id', async () => {

        const user = await authModels.findUsersById(2).first();

        expect(user).not.toBeUndefined()
        expect(user.id).toEqual(2)
        expect(typeof user).toBe('object');
        expect(user).toMatchObject({first_name: 'daniel', last_name: 'martin', email: 'daniel@carpal.com'})
    });
    test('Checking for incorrect user id', async () => {

        const undefineduser = await authModels.findUsersById(4).first();
        
        expect(undefineduser).toBeUndefined();
        expect(undefineduser).toBeFalsy();
    });


})
