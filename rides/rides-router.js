const express = require("express");
const router = express.Router();
const { Rides } = require("../Classes/rides");
const { UserDetails } = require("../Classes/user-details");

const rides = new Rides();

const hobbiesDB = new UserDetails("hobbies", "users_hobbies");

const audio_likesDB = new UserDetails("audio", "users_audio_likes");

const audio_dislikesDB = new UserDetails("audio", "users_audio_dislikes");

router.get("/", async (req, res, next) => {
    try {
        const allRides = await rides.getDetail();
        const { start_location, end_location } = req.body;
        if (start_location && end_location) {
            const filteredRides = allRides.filter((ride) => {
                const isClose = (coor1, coor2) => {
                    // .15 is equal to a 10 mile radius around a coordinate
                    return Math.abs(coor1 - coor2) < 0.15;
                };
                const startLatDif = isClose(
                    ride.start_location.lat,
                    start_location.lat
                );
                const startLongDif = isClose(
                    ride.start_location.long,
                    start_location.long
                );
                const endLongDif = isClose(
                    ride.end_location.long,
                    end_location.long
                );
                const endLatDif = isClose(
                    ride.end_location.lat,
                    end_location.lat
                );
                if (startLatDif && startLongDif && endLongDif && endLatDif) {
                    return ride;
                }
            });

            const mapped = Promise.all(
                filteredRides.map(async (cur) => {
                    const hobbies = await hobbiesDB.findByUser(cur.driver_id);
                    const audio_likes = await audio_likesDB.findByUser(
                        cur.driver_id
                    );
                    const audio_dislikes = await audio_dislikesDB.findByUser(
                        cur.driver_id
                    );

                    return {
                        ...cur,
                        hobbies,
                        audio_likes,
                        audio_dislikes
                    };
                })
            );

            res.json(await mapped);
        } else {
            res.json(allRides);
        }
    } catch (err) {
        next(err);
    }
});
router.get("/:id", async (req, res, next) => {
    try {
        res.json(await rides.findBy({ id: req.params.id }));
    } catch (err) {
        next(err);
    }
});

module.exports = router;
