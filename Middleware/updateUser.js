const checkArrays = () => {
    return (req, res, next) => {
        if (
            !req.body.audioDislikes ||
            !req.body.audioLikes ||
            !req.body.hobbies
        ) {
            return res.status(400).json({ message: "Missing required fields" });
        } else {
            next();
        }
    };
};

module.exports = {
    checkArrays
}
