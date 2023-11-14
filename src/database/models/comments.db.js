const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    creator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    post_id: { type: String, required: true },
    parental_post_id: { type: String },
    content: { type: String, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    comments: { type: Number, required: true },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true },
});

const Comment = mongoose.model('Comments', commentSchema);

module.exports = { Comment, commentSchema };
