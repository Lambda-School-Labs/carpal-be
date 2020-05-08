const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");

const accessKeyId = process.env.AWS_ACCESS_KEY || "xxxxxx";
const secretAccessKey = process.env.AWS_SECRET_KEY || "+xxxxxx+B+xxxxxx";

aws.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: "us-east-1"
});

const s3 = new aws.S3();

const profileImgUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "carpal-master",
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
    limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});
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

module.exports = profileImgUpload;
