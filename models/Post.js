import {Schema, model} from 'mongoose';

const postSchema = new Schema({
  postId: { type: Number, required: true, unique: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  content: { type: String, required: true }
}, { versionKey: false }) //disables the __v field

export default model('Post', postSchema)