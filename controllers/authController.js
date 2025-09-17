const connection = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.login = async(req, res) => {
    const {email,password } = await req.body;


    if (email !== 'admin@codesfortomorrow.com') {
        return res.status(401).json({ message: "Invalid credentials" });
    }


    connection.query("SELECT * FROM users WHERE email = ?", [email], (e, results) => {
        if (err) return res.status(500).json({message:e.message });
        if (results.length === 0) 
            return res.status(401).json({message:"Invalid credentials"});

        const user = results[0];
        console.log(user,'user')


        bcrypt.compare(password, user.password, (e, match) => {
            if (match) {
                const token = jwt.sign({ id: user.id,email: user.email },process.env.JWT_SECRET, { expiresIn: '1h' });
                console.log(token,"token")
                return res.json({token});
            } else {
                return res.status(401).json({message: "Invalid credentials"});
            }
        });
    });
};
