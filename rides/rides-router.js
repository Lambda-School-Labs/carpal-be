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

        // baseUrl/users/rides?start_location=xxxx&end_location=xxxx

        const { start_location, end_location } = req.query ? req.query : null;

        if (start_location && end_location) {
            const start = JSON.parse(start_location);
            const end = JSON.parse(end_location);
            const filteredRides = allRides.reduce((newRides, ride) => {
                const isClose = (coor1, coor2) => {
                    // .15 is equal to a 10 mile radius around a coordinate
                    const distanceDelta = Math.abs(coor1 - coor2);
                    const isWithinRadius = distanceDelta < 0.15;
                    return { isWithinRadius, distanceDelta };
                };

                const startLatDif = isClose(ride.start_location.lat, start.lat);
                const startLongDif = isClose(
                    ride.start_location.long,
                    start.long
                );
                const endLongDif = isClose(ride.end_location.long, end.long);
                const endLatDif = isClose(ride.end_location.lat, end.lat);

                const distanceDeltaAvg =
                    (startLatDif.distanceDelta +
                        startLatDif.distanceDelta +
                        endLongDif.distanceDelta +
                        endLatDif.distanceDelta) /
                    4;

                if (
                    startLatDif.isWithinRadius &&
                    startLongDif.isWithinRadius &&
                    endLongDif.isWithinRadius &&
                    endLatDif.isWithinRadius
                ) {
                    const scored = { ...ride, score: distanceDeltaAvg };
                    newRides.push(scored);
                }
                return newRides;
            }, []);

            const mapped = Promise.all(
                filteredRides.map(async (cur) => {
                    if (cur) {
                        const hobbies = await hobbiesDB.findByUser(
                            cur.driver_id
                        );
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
                    }
                })
            );

            res.json(await mapped);
        } else {
            const mapped = Promise.all(
                allRides.map(async (cur) => {
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
