const bcrypt = require('bcrypt');
const UserModel = require('../Models/User');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password, role, username } = req.body;

        // Validate username presence
        if (!username) {
            return res.status(400).json({
                message: 'Username is required',
                success: false
            });
        }

        // Validate username format
        if (!/^[a-z0-9_-]+$/.test(username)) {
            return res.status(400).json({
                message: 'Username can only contain lowercase letters, numbers, hyphens, and underscores',
                success: false
            });
        }

        // Validate username length
        if (username.length < 3 || username.length > 20) {
            return res.status(400).json({
                message: 'Username must be between 3 and 20 characters',
                success: false
            });
        }

        // Check if email already exists
        const userByEmail = await UserModel.findOne({ email });
        if (userByEmail) {
            return res.status(409).json({
                message: 'User with this email already exists, you can login',
                success: false
            });
        }

        // Check if username already exists
        const userByUsername = await UserModel.findOne({ username: username.toLowerCase() });
        if (userByUsername) {
            return res.status(409).json({
                message: 'Username is already taken',
                success: false
            });
        }

        const userModel = new UserModel({
            name,
            email,
            password,
            username: username.toLowerCase(),
            role: role || 'freelancer' // Default to freelancer if not provided
        });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({
            message: "Signup successful",
            success: true
        });
    } catch (err) {
        // Handle mongoose validation errors
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: err.message,
                success: false
            });
        }
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed, email or password is wrong';
        if (!user) {
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: user.name,
            username: user.username,
            role: user.role,
            userId: user._id
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

module.exports = {
    signup,
    login
}
