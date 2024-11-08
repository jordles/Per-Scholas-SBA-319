import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
  userId: { type: Number, required: true, unique: true, immutable: true},
  name: {
    first: { type: String, required: true },
    last: { type: String },
    display: { type: String, required: true }
  },
  email: { type: String, required: true, unique: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
}, { versionKey: false }) //disables the __v field

//indexes
// UserSchema.index({userId: 1})
// UserSchema.index({display: 1})
// UserSchema.index({email: 1})


export default model('User', UserSchema);