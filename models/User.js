import {Schema, model} from 'mongoose';

let UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: {
    first: { type: String, required: true },
    last: { type: String },
    display: { type: String, required: true }
  },
  email: { type: String, required: true, unique: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
})

export default model('User', UserSchema);