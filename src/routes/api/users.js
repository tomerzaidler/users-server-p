require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const User = require('../../models/users');
const logger = require('../../utils/logger');

const createUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username, password });
        await user.save();
        const token = await user.generateAuthToken();
        res.status(200).json({ user, token });
    } catch (err) {
        logger.error(`createUser failed: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({ user });
    } catch (err) {
        res.status(400).json({ code: err.code, message: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await req.user.remove();
        res.status(200).json({user});
    } catch (err) {
        logger.error(`deleteUser failed: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
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
        res.status(400).json(err);
    }
};

const editUser = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'password'];
    try {
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));
        if (!isValidOperation) {
            throw Error('Error: You can ONLY edit email, username or password');
        }
        updates.forEach(update => (req.user[update] = req.body[update]));
        await req.user.save();
        res.status(200).json(req.user);
    } catch (err) {
        logger.error(`editUser failed: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
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
router.delete('/delete', auth, deleteUser);
router.post('/login', loginUser);
router.patch('/edit', auth, editUser);
router.get('/get/all', getUsers);

module.exports = router;
