
import mongoose from 'mongoose';

const ReelCommentSchema = new mongoose.Schema({
  reelId: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.ReelComment || mongoose.model('ReelComment', ReelCommentSchema);
