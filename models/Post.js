import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  views: Number,
  shares: Number,
  mints: Number,
  boosts: Number
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);