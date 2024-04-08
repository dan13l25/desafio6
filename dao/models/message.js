import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  user: String,
  message: String,
  time: String
});

const messagesModel = mongoose.model('Message', messageSchema);

export default messagesModel;