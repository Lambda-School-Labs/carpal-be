const bcrypt = require("bcryptjs");
const db = require("../database/db-config");

beforeEach(()=>{
    db.seed.run();
})

describe('Find user by id',  () => {
    test('Query all users in the db', async () => {
        
        const users = await db('users');

        expect(users).toHaveLength(3);
        expect(users).not.toBeUndefined()
        expect(users[0].first_name).toBe('dang')
    })
    
})
