const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async function (req, res, next) {
    const token = await req.headers['authorization'];


    if (!token) {
        return res.status(401).json({message:"Token not provided."});
    }


   const verified = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized." });
        }
        console.log(verified)
        req.user = decoded;
        next();
    });
};
