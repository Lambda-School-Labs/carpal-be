const { Models } = require("../ModelClass/Models");
const express = require("express");
const db = require('../database/db-config')

const router = express.Router();

const { verifyToken, validateUserToken } = require('../Middleware/auth')
const locations = new Models("locations");

class FavLocations extends Models {
    constructor(name) {
        super(name)
        this.name = 'favorite_locations'
    }

    getFavorites(user_id) {
        return db(`${this.name} as f`)
            .join(`locations as l`, 'l.id', 'f.location_id')
            .join('users as u', 'u.id', 'f.user_id')
            .where({ 'u.id': user_id })
            .select('u.id', 'l.name', 'l.address', 'l.city', 'l.state', 'l.zip_code')
    }
}

const FaveLocations = new FavLocations()


router.get("/", async (req, res, next) => {
    try {
        res.json(await locations.findAll());
    } catch (err) {
        next(err);
    }
});

router.get('/favorites', verifyToken(), validateUserToken(), async (req, res, next) => {
    try {

        res.json(await FaveLocations.getFavorites(req.user.id))
    }
    catch (err) {
        next(err)
    }
})

//needs middleware validation for valid ID
router.get("/:id", async (req, res, next) => {
    try {
        res.json(await locations.findBy({ id: req.params.id }));
    } catch (err) {
        next(err);
    }
});

//needs middleware validation for req.body
router.post("/", async (req, res, next) => {
    try {
        res.status(201).json(await locations.add(req.body));
    } catch (err) {
        next(err);
    }
});

//needs middleware validation for req.body and id
router.put("/:id", async (req, res, next) => {
    try {
        res.json(await locations.update(req.params.id, req.body));
    } catch (err) {
        next(err);
    }
});

//needs middleware validation for valid ID
router.delete("/:id", async (req, res, next) => {
    try {
        res.json(await locations.delete(req.params.id));
    } catch (err) {
        next(err);
    }
});

module.exports = router;