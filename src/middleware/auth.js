require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    // Verify token
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                res.sendStatus(401);
            }
            const { user } = payload;
            if (!user) {
                throw 'No user was found';
            }
            req.token = token;
            req.user = user;
            next();
        });
       
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
