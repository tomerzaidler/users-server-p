const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usersSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid Email!');
                }
            }
        },
        username: {
          type: String,
          unique: true,
          required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 7,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('Password cannot contain "password"');
                }
            }
        }
    },
    { timestamps: true, versionKey: false}
);

usersSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

usersSchema.methods.generateAuthToken = async function() {
    const user = this;
    // const payload = {user: { username: user.username, email: user.email }};
    const payload = { user };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 360000
    });
    return token;
};

usersSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw Error('Email is not valid');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw Error('password is not valid');
    }

    return user;
};

usersSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model('User', usersSchema);

module.exports = User;
