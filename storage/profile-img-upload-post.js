const express = require("express");
const router = express.Router();
const upload = require("./profile-img-upload");

const singleUpload = upload.single("image");

router.post("/profile-img-upload", (req, res) => {
    singleUpload(req, res, (error) => {
        // console.log("requestOkokok", req.file);
        // console.log("error", error);
        if (error) {
            console.log("errors", error);
            res.json({ error: error });
        } else {
            // If File not found
            if (req.file === undefined) {
                console.log("Error: No File Selected!");
                res.json("Error: No File Selected");
            } else {
                // If Success
                const imageName = req.file.key;
                const imageLocation = req.file.location;
                res.json({
                    image: imageName,
                    location: imageLocation
                });
            }
        }
    });
});
module.exports = router;
