require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// const createUser = async (req, res) => {
//     try {
//         const { email, password, role } = req.body;
//         const user = new User({ email, password, role });
//         await user.save();
//         const token = await user.generateAuthToken();
//         res.status(200).json({ user, token });
//     } catch (err) {
//         logger.error(`createUser failed: ${err.message}`);
//         res.status(err.code).json({ code: err.code, message: err.message });
//     }
// };
const createUser = async (req, res) => {
    try {
        const { user } = req.body;
        let accessToken;

        if (user) {
            const payload = {user};
            accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
            
        }
        if (accessToken) { return res.status(200).json({ accessToken, user }); }
        
    } catch (err) {
        console.log(`createUser failed: ${err.message}`);
        res.status(err.code).json({ code: err.code, message: err.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({ user });
    } catch (err) {
        res.status(err.code).json({ code: err.code, message: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await req.user.remove();
        res.status(200).json(req.user);
    } catch (err) {
        logger.error(`deleteUser failed: ${err.message}`);
        res.status(err.code).json({ code: err.code, message: err.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.status(200).json({ user, token });
    } catch (err) {
        logger.error(`loginUser failed: ${err.message}`);
        res.status(err.code).json(err);
    }
};

const editUser = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['email', 'password'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        throw errors.update;
    }
    try {
        updates.forEach(update => (req.user[update] = req.body[update]));
        await req.user.save();
        logger.info(req.user);
        res.status(200).json(req.user);
    } catch (err) {
        res.status(err.code).json({ code: err.code, message: err.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        const userMap = {};
        users.forEach(user => {
            userMap[user._id] = user;
        });
        res.status(200).json(userMap);
    } catch (err) {
        res.status(err.code).json({ code: err.code, message: err.message });
    }
};

router.post('/create', createUser);
router.get('/get', auth, getUser);
// router.post('/delete', auth, deleteUser);
// router.post('/login', loginUser);
// router.post('/edit', auth, editUser);
// router.get('/get', auth, getUsers);

module.exports = router;
