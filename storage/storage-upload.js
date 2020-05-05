const express = require("express");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const url = require("url");

const router = express.Router();
const accessKeyId = process.env.AWS_ACCESS_KEY || "xxxxxx";
const secretAccessKey = process.env.AWS_SECRET_KEY || "+xxxxxx+B+xxxxxx";
/**
 * PROFILE IMAGE STORING STARTS
 */
const s3 = new aws.S3({
    //need to get the accessJey and the secret key from AWS ask Don
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    Bucket: "carpal-master"
});

/**
 * Single Upload
 */
const profileImgUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "carpal-master",
        acl: "public-read",
        key: function (req, file, cb) {
            cb(
                null,
                path.basename(
                    file.originalname,
                    path.extname(file.originalname)
                ) +
                    "-" +
                    Date.now() +
                    path.extname(file.originalname)
            );
        }
    }),
    limits: { fileSize: 7000000 }, // In bytes: 7000000 bytes = 7 MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single("profileImage");

/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Error: Images Only!");
    }
}

/**
 * @route POST api/profile/business-img-upload
 * @desc Upload post image
 * @access public
 */
router.post("/profile-img-upload", (req, res) => {
    profileImgUpload(req, res, (error) => {
        // console.log( 'requestOkokok', req.file );
        // console.log( 'error', error );
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
