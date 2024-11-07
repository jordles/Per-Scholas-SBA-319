import {Schema, model} from 'mongoose';

let UserSchema = new Schema({
  userId: { type: Number, required: true, unique: true, message: "must be an integer" },
  name: {
    first: { type: String, required: true },
    last: { type: String },
    display: { type: String, required: true }
  },
  email: { type: String, required: true, unique: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
}, { versionKey: false }) //disables the __v field

export default model('User', UserSchema);