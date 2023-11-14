const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  creator_id: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  comments: { type: Number, required: true },
  created_at: { type: String, required: true },
  updated_at: { type: String, required: true },
  // Referência ao modelo User
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
});

const Post = mongoose.model('Posts', postSchema);

module.exports = Post;


