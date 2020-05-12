const express = require("express");
const router = express.Router();
const { Requests } = require("../Classes/requests");
const { UserDetails } = require("../Classes/user-details");

const requests = new Requests();

const hobbiesDB = new UserDetails("hobbies", "users_hobbies");
const audio_likesDB = new UserDetails("audio", "users_audio_likes");
const audio_dislikesDB = new UserDetails("audio", "users_audio_dislikes");

router.get("/rider", async (req, res, next) => {
    try {
        const minimizedRequests = await requests.getByRider(req.user.id);

        const mapped = await Promise.all(
            minimizedRequests.map(async (cur) => {
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

        res.json(mapped);
    } catch (err) {
        next(err);
    }
});

router.get("/driver", async (req, res, next) => {
    try {
        const minimizedRequests = await requests.getByDriver(req.user.id);

        const mapped = await Promise.all(
            minimizedRequests.map(async (cur) => {
                const hobbies = await hobbiesDB.findByUser(cur.rider_id);
                const audio_likes = await audio_likesDB.findByUser(
                    cur.rider_id
                );
                const audio_dislikes = await audio_dislikesDB.findByUser(
                    cur.rider_id
                );

                return {
                    ...cur,
                    hobbies,
                    audio_likes,
                    audio_dislikes
                };
            })
        );

        res.json(mapped);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
