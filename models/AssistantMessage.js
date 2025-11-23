import mongoose from 'mongoose';

const AssistantMessageSchema = new mongoose.Schema(
  {
    userMessage: { type: String, required: true },
    assistantReply: { type: String, required: true },
    model: { type: String },
    meta: { type: Object },
  },
  { timestamps: true }
);

export default mongoose.models.AssistantMessage || mongoose.model('AssistantMessage', AssistantMessageSchema);
