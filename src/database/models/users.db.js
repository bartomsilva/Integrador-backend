const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    created_at: { type: String, required: true },
    news_letter: { type: String },
    reset_password: { type: String },
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
