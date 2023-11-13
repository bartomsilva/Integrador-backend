const mongoose = require('mongoose');

const likeDislikeSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    action_id: { type: String, required: true },
    like: { type: Number, required: true },
});

const LikeDislike = mongoose.model('LikesDislikes', likeDislikeSchema);

module.exports = LikeDislike;
