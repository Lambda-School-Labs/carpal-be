const jwt = require("jsonwebtoken");
const db = require("../database/db-config");
const { Rides } = require("./rides");

const ridesDB = new Rides()

beforeEach(async () => {
    await db.seed.run();
});

const user = jwt.decode(global.token);



describe("Rides class functions", () => {
  test("Add Ride", async () => {
      const newRide = await ridesDB.add({
        start_location_id: 1,
        end_location_id: 2,
        driver_id: 1
    });

      expect(newRide).toHaveProperty("start_location_id", 1);
      expect(newRide).toHaveProperty("driver_id", 1);
  });

  test("Delete Ride", async () => {
    const deletedRide = await ridesDB.delete(1);

    expect(deletedRide).toBe( 1);
  });

  test("Modify Ride", async () => {
    const newRide = await ridesDB.update(2, {
      start_location_id: 1,
      end_location_id: 2,
      driver_id: 1
  });

    expect(newRide).toHaveProperty("start_location_id", 1);
    expect(newRide).toHaveProperty("driver_id", 1);
  });
  test("Get Ride", async () => {
    const newRide = await ridesDB.findAll();

    expect(newRide.length).toBe(10)
});
});
