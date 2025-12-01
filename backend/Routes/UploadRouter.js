const express = require('express');
const router = express.Router();
const multer = require('multer');
const ensureAuthenticated = require('../Middlewares/Auth');
const UserModel = require('../Models/User');

// Configure multer for memory storage (we'll store as base64)
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    }
});

// Upload profile photo
router.post('/upload', ensureAuthenticated, upload.single('photo'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: 'No file uploaded',
                success: false
            });
        }

        const userId = req.user._id;

        // Convert image to base64
        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        // Update user's avatar
        const user = await UserModel.findByIdAndUpdate(
            userId,
            { $set: { avatar: base64Image } },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }

        res.status(200).json({
            message: 'Profile photo uploaded successfully',
            success: true,
            avatar: user.avatar
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            message: error.message || 'Failed to upload photo',
            success: false
        });
    }
});

// Delete profile photo
router.delete('/photo', ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await UserModel.findByIdAndUpdate(
            userId,
            { $set: { avatar: '' } },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }

        res.status(200).json({
            message: 'Profile photo removed successfully',
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to remove photo',
            success: false
        });
    }
});

module.exports = router;
