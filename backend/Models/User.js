const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    imageUrl: String,
    link: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['client', 'freelancer', 'both'],
        default: 'freelancer'
    },
    avatar: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    skills: {
        type: [String],
        default: []
    },
    hourlyRate: {
        type: Number,
        default: 0
    },
    location: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    portfolio: {
        type: [PortfolioItemSchema],
        default: []
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    totalEarnings: {
        type: Number,
        default: 0
    },
    totalSpent: {
        type: Number,
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    completedProjects: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;