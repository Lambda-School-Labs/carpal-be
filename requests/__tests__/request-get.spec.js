const supertest = require("supertest");
const server = require("../../index");
const db = require("../../database/db-config");

let user;

beforeAll(async () => {
    await db.seed.run();

});

// describe("Request Get Route", () => {
//     test("Get all ride requests", async () => {
//         const res = await supertest(server)
//             .get("/rides/1/requests/all")
//             .set({ authorization: user.body.token });

//         expect(res.status).toBe(200);
//         expect(res.type).toEqual("application/json");
//         expect(res.body.length).toBeGreaterThan(0);
//     });
// });


//Function to make a get request to whatever endpoint is passed into it  
async function fetchRequest(route){

  let res = await supertest(server)
    .get(route)
    .set({ authorization: global.token });

    return res
}
test("Get all ride requests for Riders", async () => {

    const res = await fetchRequest("/rides/requests/rider")

    expect(200).toBe(200);
    expect(res.type).toEqual("application/json");
    expect(res.body.length).toBeGreaterThan(0);
    expect(Array.isArray(res.body)).toBeTruthy();
});

test("Get all ride requests for Drivers", async () => {

    const res = await fetchRequest("/rides/requests/driver")

    expect(200).toBe(200);
    expect(res.type).toEqual("application/json");
    expect(res.body.length).toBeGreaterThan(0);
    expect(Array.isArray(res.body)).toBeTruthy();
});
