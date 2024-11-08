import {Schema, model} from 'mongoose';

const loginSchema = new Schema({
  loginId: { type: Number, required: true, unique: true, immutable: true },
  username: { type: String, required: true },
  password: { type: String, minLength: 5, required: true },
  salt: { type: String, required: true, unique: true},
  sha256: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', immutable: true }
}, { versionKey: false }); //disables the __v field

// loginSchema.index({email: 1}, {unique: true})
export default model('Login', loginSchema)